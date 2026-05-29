import type { StructureIntelligencePack } from "./types";

/** Score result: either a numeric value or unavailable with reason */
export interface ScoreResult {
  available: boolean;
  value: number | null;
  label: string;
  reason: string;
  sources: string[];
}

/** QC — Quality Check: data completeness and reliability */
export function computeQC(intel: StructureIntelligencePack): ScoreResult {
  let points = 0;
  let max = 0;
  const sources: string[] = [];

  // Valid sequence
  max += 20;
  if (intel.protein.sequence && intel.protein.length > 0) { points += 20; sources.push("UniProt sequence"); }

  // PDB structures
  max += 20;
  if (intel.structures.experimental.length > 0) { points += 20; sources.push("RCSB PDB"); }

  // AlphaFold model
  max += 20;
  if (intel.structures.predicted.length > 0) { points += 20; sources.push("AlphaFold DB"); }

  // Domain annotations
  max += 20;
  if (intel.domains.length > 0) { points += 20; sources.push("InterPro/Pfam"); }

  // pLDDT confidence
  max += 10;
  if (intel.metrics.plddt.available) { points += 10; sources.push("pLDDT"); }

  // PAE
  max += 10;
  if (intel.metrics.pae.available) { points += 10; sources.push("PAE"); }

  const score = max > 0 ? Math.round((points / max) * 100) : 0;

  if (sources.length === 0) {
    return { available: false, value: null, label: "No data", reason: "No experimental structure or RMSD comparison data available for this sequence in current build.", sources };
  }

  return { available: true, value: score, label: score >= 80 ? "Good coverage" : score >= 50 ? "Partial data" : "Limited data", reason: `${sources.length} data source(s) contributing to quality assessment.`, sources };
}

/** RC — Residue Conservation: from real MSA only */
export function computeRC(intel: StructureIntelligencePack): ScoreResult {
  if (!intel.msa.available) {
    return {
      available: false, value: null, label: "Unavailable",
      reason: "MSA not available for this sequence in current build. Install MAFFT, Clustal Omega, or MUSCLE and rebuild data packs.",
      sources: []
    };
  }

  const mean = intel.metrics.conservationSummary?.meanConservation ?? 0;
  const score = Math.round(mean * 100);
  return {
    available: true, value: score, label: score >= 80 ? "Highly conserved" : score >= 50 ? "Moderately conserved" : "Low conservation",
    reason: `Computed from ${intel.msa.sourceSequenceCount} aligned homolog sequences.`,
    sources: ["Build-time MSA"]
  };
}

/** MC — Model Confidence: from pLDDT */
export function computeMC(intel: StructureIntelligencePack): ScoreResult {
  if (!intel.metrics.plddt.available) {
    return {
      available: false, value: null, label: "Unavailable",
      reason: "No AlphaFold pLDDT confidence data available for this protein.",
      sources: []
    };
  }

  const plddt = intel.metrics.plddt;
  const score = Math.round(plddt.mean);
  return {
    available: true, value: score, label: score >= 90 ? "Very high confidence" : score >= 70 ? "Good confidence" : score >= 50 ? "Low confidence" : "Very low confidence",
    reason: `pLDDT (mean): ${plddt.mean.toFixed(1)}. ${score >= 70 ? "Low values (blue) are better." : "Low values may indicate disorder."}`,
    sources: ["AlphaFold DB"]
  };
}

/** SC — Structural Conservation: from RMSD/TM-score */
export function computeSC(intel: StructureIntelligencePack): ScoreResult {
  const hasRmsd = intel.metrics.rmsdComparisons.some((m) => m.available);
  const hasTm = intel.metrics.tmScoreComparisons.some((m) => m.available);

  if (!hasRmsd && !hasTm) {
    // Check if we at least have template/homolog evidence
    const hasTemplates = intel.structures.experimental.length > 0;
    const hasHomologs = intel.domains.length > 0;

    if (hasTemplates || hasHomologs) {
      return {
        available: true, value: null, label: "Partial Evidence",
        reason: "Limited homologs with known structures at low identity. RMSD/TM-score require build-time coordinate superposition tools.",
        sources: hasTemplates ? ["RCSB PDB"] : ["InterPro/Pfam"]
      };
    }

    return {
      available: false, value: null, label: "Unavailable",
      reason: "No RMSD or TM-score comparison has been computed. Configure TM-align or Foldseek in the build environment.",
      sources: []
    };
  }

  const tmAvail = intel.metrics.tmScoreComparisons.find((m) => m.available);
  if (tmAvail && tmAvail.available) {
    const score = Math.round(tmAvail.tmScore * 100);
    return { available: true, value: score, label: score >= 50 ? "Similar fold" : "Weak similarity", reason: `TM-score: ${tmAvail.tmScore.toFixed(3)}`, sources: ["TM-align"] };
  }

  return { available: true, value: null, label: "Partial", reason: "RMSD available but TM-score not computed.", sources: ["Build-time Computed"] };
}

/** OF — Overall Fold: evidence summary */
export function computeOF(qc: ScoreResult, rc: ScoreResult, mc: ScoreResult, sc: ScoreResult, intel: StructureIntelligencePack): ScoreResult {
  const components = [qc, rc, mc, sc];
  const availableScores = components.filter((c) => c.available && c.value !== null).map((c) => c.value as number);
  const sources = Array.from(new Set(components.flatMap((c) => c.sources)));

  if (availableScores.length === 0) {
    return {
      available: false, value: null, label: "Insufficient data",
      reason: "Not enough scored components (QC/RC/MC/SC) available to compute an overall fold assessment.",
      sources
    };
  }

  // Weighted average: QC=0.15, RC=0.25, MC=0.35, SC=0.25
  const weights = [0.15, 0.25, 0.35, 0.25];
  let weightedSum = 0;
  let weightSum = 0;
  components.forEach((comp, i) => {
    if (comp.available && comp.value !== null) {
      weightedSum += comp.value * weights[i];
      weightSum += weights[i];
    }
  });

  const score = weightSum > 0 ? Math.round(weightedSum / weightSum) : 0;
  const partial = availableScores.length < 4;

  return {
    available: true, value: score,
    label: partial ? "Partial evidence" : (score >= 80 ? "Strong fold evidence" : score >= 50 ? "Moderate evidence" : "Limited evidence"),
    reason: partial
      ? `Fold plausible but not strongly supported by templates. ${4 - availableScores.length} component(s) missing.`
      : `Based on ${availableScores.length} scored components.`,
    sources
  };
}
