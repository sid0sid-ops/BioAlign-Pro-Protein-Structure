"use client";

import { useMemo } from "react";
import type { ProteinPack } from "@/lib/static-data/protein-pack-types";
import type { StructureIntelligencePack } from "@/lib/structure-intelligence/types";
import { FoldExplorerDashboard } from "./fold-explorer-dashboard";

export function fallbackIntelligence(pack: ProteinPack): StructureIntelligencePack {
  return {
    schemaVersion: "bioalign.structure-intelligence.v1",
    generatedAt: pack.generatedAt || new Date().toISOString(),
    protein: {
      accession: pack.accession,
      name: pack.proteinName,
      gene: pack.geneName,
      organism: pack.organism.scientificName,
      sequence: pack.sequence.value,
      length: pack.sequence.length,
      functionComments: [],
      features: [],
      crossReferences: []
    },
    structures: {
      experimental: pack.pdbStructures.map((s) => ({
        pdbId: s.pdbId,
        experimentalMethod: s.method,
        resolution: s.resolution ? parseFloat(s.resolution) : null,
        chains: s.chains ? s.chains.split(",") : ["A"],
        polymerEntities: [],
        ligands: [],
        relatedUniProtIds: [pack.accession],
        source: { name: "RCSB PDB", sourceType: "RCSB PDB" }
      })),
      predicted: pack.alphaFold.available ? [{
        provider: "AlphaFold DB",
        modelId: pack.alphaFold.modelId || `AF-${pack.accession}-F1`,
        modelUrl: pack.alphaFold.pdbUrl,
        meanPlddt: pack.alphaFold.confidenceAvg,
        source: { name: "AlphaFold DB", sourceType: "AlphaFold DB" }
      }] : []
    },
    domains: pack.domains.map((d, i) => ({
      id: `dom-${i}`,
      name: d.name,
      sourceDatabase: d.source || "InterPro",
      type: d.type?.toLowerCase().includes("bond")
        ? "site"
        : d.type?.toLowerCase().includes("site")
          ? "site"
          : d.type?.toLowerCase().includes("motif")
            ? "motif"
            : d.type?.toLowerCase().includes("region")
              ? "region"
              : "domain",
      start: d.start || 1,
      end: d.end || pack.sequence.length,
      description: d.type || "Protein structural domain",
      evidence: "Sequence matching"
    })),
    msa: {
      available: false,
      method: "",
      alignedSequences: [],
      consensus: "",
      conservationScores: [],
      gapFrequencies: [],
      sourceSequenceCount: 0,
      source: "Static Pack",
      unavailableReason: "No multiple sequence alignment was found in this pack."
    },
    profileEvidence: [],
    conservedResidues: [],
    metrics: {
      rmsdComparisons: [{ available: false, reason: "No TM-score or RMSD comparison found in static pack." }],
      tmScoreComparisons: [{ available: false, reason: "No TM-score comparison found in static pack." }],
      plddt: pack.alphaFold.available && pack.alphaFold.confidenceAvg ? {
        available: true,
        mean: pack.alphaFold.confidenceAvg,
        median: pack.alphaFold.confidenceAvg,
        bins: { veryHigh_90_100: 0, confident_70_90: 0, low_50_70: 0, veryLow_0_50: 0 },
        perResidue: [],
        lowConfidenceRegions: [],
        highConfidenceRegions: [],
        source: "AlphaFold DB"
      } : { available: false, reason: "No AlphaFold metrics available." },
      pae: { available: false, reason: "No PAE matrix found in static pack." },
      domainCoverage: null,
      conservationSummary: null
    },
    structureFunction: {
      summary: pack.diseaseSummary || "No functional comments available.",
      evidenceCards: [],
      warnings: []
    },
    intelligence: {
      structureFunctionSummary: pack.diseaseSummary || "No summary available.",
      sequenceStructureFunctionPipeline: [],
      warnings: [],
      confidenceNotes: [],
      sourceBadges: ["Static Pack"]
    },
    sources: []
  };
}

export function StructureIntelligenceExplorer({ pack }: { pack: ProteinPack }) {
  const intelligence = useMemo(() => {
    // Map basic structures from pack if structureIntelligence is not present
    if (pack.structureIntelligence) {
      return pack.structureIntelligence;
    }
    return fallbackIntelligence(pack);
  }, [pack]);

  return <FoldExplorerDashboard pack={pack} intelligence={intelligence} />;
}
