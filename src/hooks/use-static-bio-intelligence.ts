"use client";

import { useQuery } from "@tanstack/react-query";
import { loadStaticBioRecord } from "@/lib/static-data/local-bio-intelligence";

export function useStaticBioIntelligence(accession: string, geneName: string) {
  return useQuery({
    queryKey: ["static-bio-intelligence", accession, geneName],
    queryFn: () => loadStaticBioRecord(accession, geneName),
    enabled: accession.trim().length > 0 || geneName.trim().length > 0,
    staleTime: 24 * 60 * 60_000,
    gcTime: 7 * 24 * 60 * 60_000,
    retry: 0
  });
}
