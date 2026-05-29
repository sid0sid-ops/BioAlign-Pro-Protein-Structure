import axios, { AxiosRequestConfig } from "axios";
import type { CacheLayer } from "../../types/intelligence";
import { withRetry } from "./retry";
import { getCachedJsonHit, setCachedJson } from "./cache";
import { scheduleProviderRequest } from "../api/request-manager";

export interface ProviderResponse<T> {
  data: T;
  cacheHit: boolean;
  cacheLayer?: CacheLayer;
  stale?: boolean;
}

const inflightRequests = new Map<string, Promise<unknown>>();

export async function providerGet<T>(
  provider: string,
  url: string,
  config: AxiosRequestConfig = {},
  ttlSeconds = 3600
): Promise<ProviderResponse<T>> {
  const cacheKey = `${provider}:${url}`;

  const cached = await getCachedJsonHit<T>(cacheKey);
  if (cached?.state === "fresh") {
    return { data: cached.value, cacheHit: true, cacheLayer: cached.layer, stale: false };
  }

  if (cached?.state === "stale") {
    if (!inflightRequests.has(cacheKey)) {
      const refreshPromise = fetchAndCache<T>(provider, url, config, ttlSeconds, cacheKey).finally(() =>
        inflightRequests.delete(cacheKey)
      );
      inflightRequests.set(cacheKey, refreshPromise);
    }
    return { data: cached.value, cacheHit: true, cacheLayer: cached.layer, stale: true };
  }

  if (inflightRequests.has(cacheKey)) {
    const data = (await inflightRequests.get(cacheKey)) as T;
    return { data, cacheHit: false };
  }

  const requestPromise = fetchAndCache<T>(provider, url, config, ttlSeconds, cacheKey);
  inflightRequests.set(cacheKey, requestPromise);

  try {
    const data = await requestPromise;
    return { data, cacheHit: false };
  } finally {
    inflightRequests.delete(cacheKey);
  }
}

async function fetchAndCache<T>(
  provider: string,
  url: string,
  config: AxiosRequestConfig,
  ttlSeconds: number,
  cacheKey: string
) {
  const response = await scheduleProviderRequest(provider, () =>
    withRetry(() => axios.get<T>(url, { timeout: 25_000, ...config }))
  );
  await setCachedJson(cacheKey, response.data, ttlSeconds);
  return response.data;
}
