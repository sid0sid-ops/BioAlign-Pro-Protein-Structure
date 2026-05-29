import { conservedResiduesFromMsa, summarizeMsa } from "../../../src/lib/structure-intelligence/metrics/conservation";
import type { ConservedResidue, MsaAlignedSequence, MsaSummary } from "../../../src/lib/structure-intelligence/types";

export function computeConservation(
  alignedSequences: MsaAlignedSequence[],
  canonicalSequence: string,
  method = "Build-time homolog MSA (MAFFT/Clustal Omega/MUSCLE)"
): { msa: MsaSummary; conservedResidues: ConservedResidue[] } {
  const msa = summarizeMsa(alignedSequences, method, "computed-build-time");
  return {
    msa,
    conservedResidues: conservedResiduesFromMsa(msa, canonicalSequence)
  };
}
