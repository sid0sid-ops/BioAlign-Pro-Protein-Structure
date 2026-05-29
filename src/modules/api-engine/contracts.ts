export interface ApiEnvelope<T> {
  data: T;
  cache?: {
    hit: boolean;
    provider?: string;
    key?: string;
    expiresAt?: string;
  };
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
}

export interface ProviderHealth {
  provider: string;
  status: "available" | "degraded" | "unconfigured";
  latencyMs?: number;
}
