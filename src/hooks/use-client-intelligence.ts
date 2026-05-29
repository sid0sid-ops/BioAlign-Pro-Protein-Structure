"use client";

import { useQuery } from "@tanstack/react-query";
import { getIndexedDbCache, setIndexedDbCache } from "@/lib/static-data/indexed-db-cache";
import { runClientIntelligence } from "@/lib/intelligence/worker-client";
import type { ClientIntelligenceResult } from "@/lib/intelligence/types";

function cacheKey(input: string) {
  return `client-intelligence:${input.trim().slice(0, 4000)}`;
}

export function useClientIntelligence(input: string, enabled = true) {
  return useQuery({
    queryKey: ["client-intelligence", input],
    queryFn: async (): Promise<ClientIntelligenceResult> => {
      const key = cacheKey(input);
      const cached = await getIndexedDbCache<ClientIntelligenceResult>(key);
      if (cached) return cached;
      const result = await runClientIntelligence(input);
      await setIndexedDbCache(key, result, 12 * 60 * 60 * 1000);
      return result;
    },
    enabled: enabled && input.trim().length > 0,
    staleTime: 10 * 60_000,
    gcTime: 60 * 60_000,
    retry: 0,
    placeholderData: (previous) => previous
  });
}
