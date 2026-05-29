import crypto from "node:crypto";
import { templateHits, homologySteps, confidenceSeries, rmsdSeries } from "../../src/modules/shared/mock-data";
import { calculateSequenceMetrics, getSequenceIdentityBand, validateProteinSequence } from "../../src/utils/sequence";

export function analyzeProteinSequence(name: string, sequence: string) {
  const validation = validateProteinSequence(sequence);

  if (!validation.isValid) {
    return {
      ok: false,
      name,
      validation,
      metrics: null
    };
  }

  return {
    ok: true,
    name,
    validation,
    metrics: calculateSequenceMetrics(validation.clean),
    secondaryStructure: {
      helix: 42,
      sheet: 23,
      turn: 12,
      coil: 23
    }
  };
}

export function runHomologyWorkflow(name: string, sequence: string) {
  const analysis = analyzeProteinSequence(name, sequence);

  if (!analysis.ok || !analysis.validation.isValid) {
    return analysis;
  }

  const rankedTemplates = templateHits.map((hit) => ({
    ...hit,
    reliabilityBand: getSequenceIdentityBand(hit.sequenceIdentity)
  }));

  return {
    ok: true,
    jobId: crypto.randomUUID(),
    name,
    status: "running",
    decision:
      rankedTemplates[0].sequenceIdentity > 50
        ? "Top template exceeds 50% identity. Homology modeling is the primary route."
        : "No template exceeds 50% identity. Threading and fold recognition are required.",
    sequence: analysis.validation.clean,
    metrics: analysis.metrics,
    pipeline: homologySteps,
    templates: rankedTemplates,
    alignment: {
      identity: rankedTemplates[0].sequenceIdentity,
      coverage: rankedTemplates[0].coverage,
      gaps: 2,
      conservedResidues: 61
    },
    model: {
      format: "pdb",
      chains: ["A", "B"],
      ligands: ["HEM"],
      refinement: {
        clashscore: 4.1,
        ramachandranFavored: 96.4,
        outliers: 2
      }
    },
    confidence: confidenceSeries,
    rmsd: rmsdSeries
  };
}
