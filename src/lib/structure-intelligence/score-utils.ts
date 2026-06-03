import type { StructureIntelligencePack } from "./types";

/** Score result: either a numeric value or unavailable with reason */
export interface ScoreResult {
  available: boolean;
  value: number | null;
  label: string;
  reason: string;
  sources: string[];
}

function bestTmScore(intel: StructureIntelligencePack) {
  return intel.metrics.tmScoreComparisons
    .filter((metric) => metric.available)
    .sort((left, right) => right.tmScore - left.tmScore)[0];
}

function bestRmsd(intel: StructureIntelligencePack) {
  return intel.metrics.rmsdComparisons
    .filter((metric) => metric.available)
    .sort((left, right) => left.rmsd - right.rmsd)[0];
}

function formatPercent(value: number | undefined) {
  if (typeof value !== "number" || !Number.isFinite(value)) return null;
  return `${(value * 100).toFixed(1)}%`;
}

function alignmentSummary(intel: StructureIntelligencePack) {
  const tm = bestTmScore(intel);
  const rmsd = bestRmsd(intel);
  if (!tm && !rmsd) return null;

  const alignedLength = tm?.alignedLength ?? rmsd?.alignedResidues;
  const seqId = formatPercent(tm?.sequenceIdentityAligned);
  return [
    alignedLength ? `Aligned length ${alignedLength}` : null,
    rmsd ? `RMSD ${rmsd.rmsd.toFixed(2)} A` : tm?.rmsd ? `RMSD ${tm.rmsd.toFixed(2)} A` : null,
    tm ? `TM-score ${tm.tmScore.toFixed(3)}` : null,
    seqId ? `Seq_ID ${seqId}` : null
  ].filter(Boolean).join(", ");
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
    reason: `pLDDT mean: ${plddt.mean.toFixed(1)}. Higher values indicate stronger model confidence.`,
    sources: ["AlphaFold DB"]
  };
}

/** SC — Structural Conservation: from RMSD/TM-score */
export function computeSC(intel: StructureIntelligencePack): ScoreResult {
  const rmsd = bestRmsd(intel);
  const tm = bestTmScore(intel);
  const hasRmsd = Boolean(rmsd);
  const hasTm = Boolean(tm);

  if (!hasRmsd && !hasTm) {
    // Check if we at least have template/homolog evidence
    const hasTemplates = intel.structures.experimental.length > 0;
    const hasHomologs = intel.domains.length > 0;

    if (hasTemplates || hasHomologs) {
      return {
        available: true, value: null, label: "Partial Evidence",
        reason: "Experimental/domain records are present, but no valid coordinate superposition metric is packaged yet. Run the WSL data build with US-align/TM-align to compute aligned length, RMSD, TM-score, and Seq_ID.",
        sources: hasTemplates ? ["RCSB PDB"] : ["InterPro/Pfam"]
      };
    }

    return {
      available: false, value: null, label: "Unavailable",
      reason: "No RMSD or TM-score comparison has been computed. Run the WSL data build with US-align/TM-align so aligned length, RMSD, TM-score, and Seq_ID are written into the saved record.",
      sources: []
    };
  }

  if (tm) {
    const seqIdBoost = typeof tm.sequenceIdentityAligned === "number" ? Math.min(tm.sequenceIdentityAligned * 20, 10) : 0;
    const rmsdPenalty = typeof tm.rmsd === "number" ? Math.min(Math.max(tm.rmsd - 2, 0) * 4, 18) : 0;
    const score = Math.max(0, Math.min(100, Math.round(tm.tmScore * 100 + seqIdBoost - rmsdPenalty)));
    const label = tm.tmScore >= 0.7 ? "Strong structural match" : tm.tmScore >= 0.5 ? "Similar fold" : tm.tmScore >= 0.3 ? "Possible fold similarity" : "Weak similarity";
    return {
      available: true,
      value: score,
      label,
      reason: alignmentSummary(intel) || `TM-score ${tm.tmScore.toFixed(3)}`,
      sources: [tm.method || "US-align/TM-align"]
    };
  }

  return {
    available: true,
    value: rmsd ? Math.max(0, Math.min(100, Math.round(100 - rmsd.rmsd * 12))) : null,
    label: rmsd?.rmsd && rmsd.rmsd <= 2 ? "Low structural deviation" : "RMSD-only evidence",
    reason: alignmentSummary(intel) || "RMSD available but TM-score not computed.",
    sources: [rmsd?.method || "Build-time Computed"]
  };
}

/** OF — Overall Fold: evidence summary */
export function computeOF(qc: ScoreResult, rc: ScoreResult, mc: ScoreResult, sc: ScoreResult, intel: StructureIntelligencePack): ScoreResult {
  const components = [qc, rc, mc, sc];
  const availableScores = components.filter((c) => c.available && c.value !== null).map((c) => c.value as number);
  const sources = Array.from(new Set(components.flatMap((c) => c.sources)));
  const structuralAlignment = alignmentSummary(intel);

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
  const missingComponents = [
    qc.value === null ? "QC" : null,
    rc.value === null ? "RC" : null,
    mc.value === null ? "MC" : null,
    sc.value === null ? "SC" : null
  ].filter(Boolean).join(", ");

  if (structuralAlignment) {
    return {
      available: true,
      value: score,
      label: score >= 80 ? "Strong fold evidence" : score >= 50 ? "Moderate structural evidence" : "Limited structural evidence",
      reason: partial
        ? `${structuralAlignment}. Overall score still has missing component(s): ${missingComponents}.`
        : `${structuralAlignment}. Based on all scored evidence components.`,
      sources
    };
  }

  return {
    available: true, value: score,
    label: partial ? "Partial evidence" : (score >= 80 ? "Strong fold evidence" : score >= 50 ? "Moderate evidence" : "Limited evidence"),
    reason: partial
      ? `Coordinate superposition metrics are not packaged yet, so aligned length, RMSD, TM-score, and Seq_ID cannot be shown. Missing component(s): ${missingComponents}.`
      : `Based on ${availableScores.length} scored components.`,
    sources
  };
}
