import type { ProteinQueryResult } from "@/lib/static-data/protein-pack-types";
import type { ClientIntelligenceResult, IntelligenceWorkerResponse, WorkerAnalyzeRequest, WorkerProteinQueryRequest } from "./types";
import { analyzeScientificInput } from "./rule-engine";
import { isLowMemoryDevice, supportsWorkers } from "./runtime";

const pending = new Map<
  string,
  {
    resolve: (value: ClientIntelligenceResult | ProteinQueryResult) => void;
    reject: (reason?: unknown) => void;
  }
>();

let intelligenceWorker: Worker | null = null;

function getWorker() {
  if (!supportsWorkers()) return null;
  if (!intelligenceWorker) {
    intelligenceWorker = new Worker(new URL("../../workers/intelligence.worker.ts", import.meta.url), {
      type: "module"
    });
    intelligenceWorker.onmessage = (event: MessageEvent<IntelligenceWorkerResponse>) => {
      const response = event.data;
      const request = pending.get(response.id);
      if (!request) return;
      pending.delete(response.id);

      if (response.type === "error") {
        request.reject(new Error(response.error ?? "Client intelligence worker failed"));
        return;
      }

      if (!response.result) {
        request.reject(new Error("Client intelligence worker returned no result"));
        return;
      }

      if (response.type === "result") {
        request.resolve({
          ...response.result,
          runtime: {
            ...response.result.runtime,
            executedInWorker: true
          }
        });
        return;
      }

      request.resolve(response.result);
    };
    intelligenceWorker.onerror = (error) => {
      for (const request of pending.values()) {
        request.reject(error);
      }
      pending.clear();
      intelligenceWorker?.terminate();
      intelligenceWorker = null;
    };
  }
  return intelligenceWorker;
}

export async function runClientIntelligence(input: string): Promise<ClientIntelligenceResult> {
  const lowMemoryMode = isLowMemoryDevice();
  const worker = getWorker();

  if (!worker) {
    return analyzeScientificInput(input, { lowMemoryMode });
  }

  const id = crypto.randomUUID();
  const message: WorkerAnalyzeRequest = {
    id,
    type: "analyze",
    input,
    options: { lowMemoryMode }
  };

  return new Promise((resolve, reject) => {
    pending.set(id, {
      resolve: (value) => resolve(value as ClientIntelligenceResult),
      reject
    });
    worker.postMessage(message);
  });
}

export async function resolveProteinQuery(query: string): Promise<ProteinQueryResult> {
  const lowMemoryMode = isLowMemoryDevice();
  const worker = getWorker();

  if (!worker) {
    const { resolveProteinQuery: resolveProteinQueryInMainThread } = await import("./query-engine");
    return resolveProteinQueryInMainThread(query, { lowMemoryMode });
  }

  const id = crypto.randomUUID();
  const message: WorkerProteinQueryRequest = {
    id,
    type: "resolve-query",
    query,
    options: { lowMemoryMode }
  };

  return new Promise((resolve, reject) => {
    pending.set(id, {
      resolve: (value) => resolve(value as ProteinQueryResult),
      reject
    });
    worker.postMessage(message);
  });
}
