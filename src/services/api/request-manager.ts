import Bottleneck from "bottleneck";
import pLimit from "p-limit";

export interface ProviderPolicy {
  maxConcurrent: number;
  minTimeMs: number;
  timeoutMs: number;
  failureThreshold: number;
  circuitOpenMs: number;
}

export interface RequestDiagnostic {
  id: string;
  provider: string;
  status: "queued" | "fulfilled" | "rejected";
  startedAt: string;
  finishedAt?: string;
  latencyMs?: number;
  error?: string;
}

interface CircuitState {
  failures: number;
  openedUntil: number;
  lastError?: string;
}

const DEFAULT_POLICY: ProviderPolicy = {
  maxConcurrent: 4,
  minTimeMs: 100,
  timeoutMs: 25_000,
  failureThreshold: 5,
  circuitOpenMs: 30_000
};

const PROVIDER_POLICIES: Record<string, ProviderPolicy> = {
  ncbi: { maxConcurrent: 1, minTimeMs: 350, timeoutMs: 60_000, failureThreshold: 3, circuitOpenMs: 45_000 },
  blast: { maxConcurrent: 1, minTimeMs: 350, timeoutMs: 60_000, failureThreshold: 3, circuitOpenMs: 45_000 },
  clinvar: { maxConcurrent: 2, minTimeMs: 350, timeoutMs: 25_000, failureThreshold: 4, circuitOpenMs: 30_000 },
  uniprot: { maxConcurrent: 3, minTimeMs: 120, timeoutMs: 25_000, failureThreshold: 5, circuitOpenMs: 30_000 },
  rcsb: { maxConcurrent: 3, minTimeMs: 120, timeoutMs: 25_000, failureThreshold: 5, circuitOpenMs: 30_000 },
  string: { maxConcurrent: 2, minTimeMs: 220, timeoutMs: 25_000, failureThreshold: 4, circuitOpenMs: 30_000 },
  alphafold: { maxConcurrent: 3, minTimeMs: 120, timeoutMs: 30_000, failureThreshold: 5, circuitOpenMs: 30_000 },
  "alphafold-pae": { maxConcurrent: 2, minTimeMs: 150, timeoutMs: 45_000, failureThreshold: 4, circuitOpenMs: 45_000 },
  "alphafold-plddt": { maxConcurrent: 2, minTimeMs: 150, timeoutMs: 45_000, failureThreshold: 4, circuitOpenMs: 45_000 },
  interpro: { maxConcurrent: 2, minTimeMs: 180, timeoutMs: 30_000, failureThreshold: 4, circuitOpenMs: 30_000 },
  kegg: { maxConcurrent: 2, minTimeMs: 220, timeoutMs: 20_000, failureThreshold: 4, circuitOpenMs: 30_000 },
  ensembl: { maxConcurrent: 2, minTimeMs: 180, timeoutMs: 25_000, failureThreshold: 4, circuitOpenMs: 30_000 },
  pubchem: { maxConcurrent: 2, minTimeMs: 220, timeoutMs: 25_000, failureThreshold: 4, circuitOpenMs: 30_000 },
  pdbe: { maxConcurrent: 3, minTimeMs: 120, timeoutMs: 25_000, failureThreshold: 5, circuitOpenMs: 30_000 },
  foldseek: { maxConcurrent: 2, minTimeMs: 180, timeoutMs: 45_000, failureThreshold: 3, circuitOpenMs: 45_000 },
  "esm-atlas": { maxConcurrent: 2, minTimeMs: 180, timeoutMs: 30_000, failureThreshold: 4, circuitOpenMs: 30_000 }
};

const globalLimit = pLimit(Number(process.env.PROVIDER_GLOBAL_CONCURRENCY ?? 8));
const limiters = new Map<string, Bottleneck>();
const circuits = new Map<string, CircuitState>();
const diagnostics: RequestDiagnostic[] = [];

function getPolicy(provider: string) {
  return PROVIDER_POLICIES[provider] ?? DEFAULT_POLICY;
}

function getLimiter(provider: string) {
  const existing = limiters.get(provider);
  if (existing) return existing;

  const policy = getPolicy(provider);
  const limiter = new Bottleneck({
    maxConcurrent: policy.maxConcurrent,
    minTime: policy.minTimeMs
  });
  limiters.set(provider, limiter);
  return limiter;
}

function getCircuit(provider: string) {
  const existing = circuits.get(provider);
  if (existing) return existing;

  const state: CircuitState = { failures: 0, openedUntil: 0 };
  circuits.set(provider, state);
  return state;
}

function recordDiagnostic(diagnostic: RequestDiagnostic) {
  diagnostics.unshift(diagnostic);
  diagnostics.splice(100);
}

async function withTimeout<T>(operation: () => Promise<T>, timeoutMs: number): Promise<T> {
  let timeout: ReturnType<typeof setTimeout> | undefined;
  try {
    return await Promise.race([
      operation(),
      new Promise<T>((_resolve, reject) => {
        timeout = setTimeout(() => reject(new Error(`Provider request timed out after ${timeoutMs}ms`)), timeoutMs);
      })
    ]);
  } finally {
    if (timeout) clearTimeout(timeout);
  }
}

export async function scheduleProviderRequest<T>(
  provider: string,
  operation: () => Promise<T>,
  policyOverride: Partial<ProviderPolicy> = {}
): Promise<T> {
  const policy = { ...getPolicy(provider), ...policyOverride };
  const circuit = getCircuit(provider);
  const timestamp = Date.now();

  if (circuit.openedUntil > timestamp) {
    throw new Error(`Circuit breaker open for ${provider}: ${circuit.lastError ?? "recent failures"}`);
  }

  const id = `${provider}:${timestamp}:${Math.random().toString(36).slice(2, 8)}`;
  const startedAt = new Date().toISOString();
  const started = Date.now();
  recordDiagnostic({ id, provider, status: "queued", startedAt });

  try {
    const result = await globalLimit(() =>
      getLimiter(provider).schedule(() => withTimeout(operation, policy.timeoutMs))
    );
    circuit.failures = 0;
    circuit.openedUntil = 0;
    recordDiagnostic({
      id,
      provider,
      status: "fulfilled",
      startedAt,
      finishedAt: new Date().toISOString(),
      latencyMs: Date.now() - started
    });
    return result;
  } catch (error) {
    circuit.failures += 1;
    circuit.lastError = error instanceof Error ? error.message : "Unknown provider error";
    if (circuit.failures >= policy.failureThreshold) {
      circuit.openedUntil = Date.now() + policy.circuitOpenMs;
    }
    recordDiagnostic({
      id,
      provider,
      status: "rejected",
      startedAt,
      finishedAt: new Date().toISOString(),
      latencyMs: Date.now() - started,
      error: circuit.lastError
    });
    throw error;
  }
}

export function getRequestManagerDiagnostics() {
  return {
    global: {
      activeCount: globalLimit.activeCount,
      pendingCount: globalLimit.pendingCount
    },
    circuits: Array.from(circuits.entries()).map(([provider, state]) => ({
      provider,
      failures: state.failures,
      openedUntil: state.openedUntil ? new Date(state.openedUntil).toISOString() : null,
      lastError: state.lastError
    })),
    recent: diagnostics.slice(0, 50)
  };
}
