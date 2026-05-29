"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { runClientIntelligence } from "@/lib/intelligence/worker-client";
import { loadStaticBioRecord } from "@/lib/static-data/local-bio-intelligence";
import type { ProteinIntelligence } from "@/types/intelligence";

function staticProteinIntelligence(accession: string, geneName: string, record: Awaited<ReturnType<typeof loadStaticBioRecord>>): ProteinIntelligence {
  const requestedAt = new Date().toISOString();

  return {
    schemaVersion: "bioalign.protein-intelligence.v1",
    query: { accession, geneName, requestedAt },
    protein: {
      accession,
      id: accession,
      name: geneName || accession,
      gene: { primary: geneName, synonyms: [] },
      keywords: ["static", "client-side"],
      crossReferences: { pdb: [], databases: [] }
    },
    structure: {
      entries: [],
      predictedModels: [],
      ligands: []
    },
    interactions: {
      nodes: record.interactions.flatMap((interaction) => [
        { id: geneName || accession, label: geneName || accession },
        { id: interaction.target, label: interaction.target }
      ]),
      edges: record.interactions.map((interaction) => ({
        source: { id: geneName || accession, label: geneName || accession },
        target: { id: interaction.target, label: interaction.target },
        score: interaction.score,
        evidence: {}
      }))
    },
    domains: {
      entries: record.domains,
      goTerms: []
    },
    pathways: {
      entries: record.pathways.map((pathway) => ({ ...pathway, source: "unknown" }))
    },
    confidence: {
      plddtHistogram: [],
      paeAvailable: false
    },
    diseases: {
      variants: record.variants.map((variant) => ({
        ...variant,
        id: variant.title,
        source: "unknown"
      }))
    },
    ligands: {
      compounds: []
    },
    providers: {
      staticPack: {
        provider: "staticPack",
        status: "fulfilled",
        latencyMs: 0,
        cacheHit: true,
        cacheLayer: "memory"
      }
    },
    cache: {
      key: `static:${accession}:${geneName}`,
      hit: true,
      layer: "memory",
      state: "fresh",
      ttlSeconds: 24 * 60 * 60
    },
    diagnostics: {
      durationMs: 0,
      providerCount: 1,
      fulfilledCount: 1,
      rejectedCount: 0,
      warnings: ["Static GitHub Pages mode: no runtime backend or live scientific API calls."]
    }
  };
}

export function useUniProtQuery(accession: string, enabled = true) {
  return useQuery({
    queryKey: ["static-uniprot", accession],
    queryFn: () => loadStaticBioRecord(accession, accession),
    enabled: enabled && accession.length > 0,
    staleTime: 24 * 60_000,
    retry: 0
  });
}

export function useRcsbQuery(pdbId: string, enabled = true) {
  return useQuery({
    queryKey: ["static-rcsb", pdbId],
    queryFn: async () => ({ pdbId, mode: "static-client", message: "RCSB live lookup is not used in GitHub Pages mode." }),
    enabled: enabled && pdbId.length === 4,
    staleTime: 24 * 60_000,
    retry: 0
  });
}

export function useAlphaFoldQuery(accession: string, enabled = true) {
  return useQuery({
    queryKey: ["static-alphafold", accession],
    queryFn: async () => [],
    enabled: enabled && accession.length > 0,
    staleTime: 24 * 60_000,
    retry: 0
  });
}

export function useInterProQuery(accession: string, enabled = true) {
  return useQuery({
    queryKey: ["static-interpro", accession],
    queryFn: async () => loadStaticBioRecord(accession, accession),
    enabled: enabled && accession.length > 0,
    staleTime: 24 * 60_000,
    retry: 0
  });
}

export function useStringQuery(identifier: string, enabled = true) {
  return useQuery({
    queryKey: ["static-string", identifier],
    queryFn: async () => loadStaticBioRecord(identifier, identifier),
    enabled: enabled && identifier.length > 0,
    staleTime: 24 * 60_000,
    retry: 0
  });
}

export function useClinVarQuery(geneName: string, enabled = true) {
  return useQuery({
    queryKey: ["static-clinvar", geneName],
    queryFn: async () => (await loadStaticBioRecord(geneName, geneName)).variants,
    enabled: enabled && geneName.length > 0,
    staleTime: 24 * 60_000,
    retry: 0
  });
}

export function useKeggQuery(geneName: string, enabled = true) {
  return useQuery({
    queryKey: ["static-kegg", geneName],
    queryFn: async () => (await loadStaticBioRecord(geneName, geneName)).pathways,
    enabled: enabled && geneName.length > 0,
    staleTime: 24 * 60_000,
    retry: 0
  });
}

export function useProteinAnalysis(name: string, sequence: string) {
  return useQuery({
    queryKey: ["client-protein-analysis", name, sequence],
    queryFn: async () => {
      const result = await runClientIntelligence(sequence);
      return {
        name,
        validation: {
          clean: result.input.cleaned,
          isValid: result.metrics.invalidResidues.length === 0,
          invalidResidues: result.metrics.invalidResidues
        },
        metrics: result.metrics,
        intelligence: result
      };
    },
    enabled: sequence.length > 0,
    staleTime: 10 * 60_000,
    retry: 0
  });
}

export function useHomologyWorkflow() {
  return useMutation({
    mutationFn: async ({ name, sequence }: { name: string; sequence: string }) => {
      const result = await runClientIntelligence(sequence);
      return {
        name,
        sequenceLength: result.metrics.length,
        status: "local-only",
        message: "Static mode ranks only bundled or user-provided templates; no BLAST backend is invoked.",
        motifs: result.motifs
      };
    }
  });
}

export function useOrchestratedAnalysis(accession: string, enabled = true) {
  return useProteinIntelligence(accession, { geneName: accession, enabled });
}

export function useProteinIntelligence(
  accession: string,
  options: { geneName?: string; pdbId?: string; enabled?: boolean; refresh?: boolean } = {}
) {
  const geneName = options.geneName ?? accession;
  return useQuery({
    queryKey: ["static-protein-intelligence", accession, geneName],
    queryFn: async () => staticProteinIntelligence(accession, geneName, await loadStaticBioRecord(accession, geneName)),
    enabled: (options.enabled ?? true) && accession.trim().length > 0,
    staleTime: 24 * 60_000,
    gcTime: 7 * 24 * 60_000,
    retry: 0
  });
}

export function useSequenceAnalysis(sequence: string, name: string) {
  return useProteinAnalysis(name, sequence);
}
