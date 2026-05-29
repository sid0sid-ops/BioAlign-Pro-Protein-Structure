"use client";

import { useQuery } from "@tanstack/react-query";
import { resolveProteinQuery } from "@/lib/intelligence/worker-client";
import type { ProteinQueryResult } from "@/lib/static-data/protein-pack-types";

export function useProteinQuery(query: string, enabled = true) {
  return useQuery({
    queryKey: ["protein-query", query.trim()],
    queryFn: (): Promise<ProteinQueryResult> => resolveProteinQuery(query),
    enabled: enabled && query.trim().length > 0,
    staleTime: 10 * 60_000,
    gcTime: 60 * 60_000,
    retry: 0,
    placeholderData: (previous) => previous
  });
}
