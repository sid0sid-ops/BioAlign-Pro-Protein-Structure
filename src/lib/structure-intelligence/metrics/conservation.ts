import type { ConservedResidue, MsaAlignedSequence, MsaSummary } from "../types";

const GAP = "-";

function columnResidues(sequences: string[], index: number) {
  return sequences.map((sequence) => sequence[index] ?? GAP);
}

function consensusForColumn(residues: string[]) {
  const counts = residues.reduce<Record<string, number>>((acc, residue) => {
    if (residue !== GAP) acc[residue] = (acc[residue] ?? 0) + 1;
    return acc;
  }, {});
  const best = Object.entries(counts).sort((left, right) => right[1] - left[1])[0];
  return best?.[0] ?? GAP;
}

export function summarizeMsa(alignedSequences: MsaAlignedSequence[], method: string, source: string): MsaSummary {
  if (alignedSequences.length < 2) {
    return {
      available: false,
      method,
      alignedSequences,
      consensus: "",
      conservationScores: [],
      gapFrequencies: [],
      sourceSequenceCount: alignedSequences.length,
      source,
      unavailableReason: "At least two aligned sequences are required for conservation analysis."
    };
  }

  const sequenceStrings = alignedSequences.map((entry) => entry.sequence);
  const width = Math.max(...sequenceStrings.map((sequence) => sequence.length));
  const consensus: string[] = [];
  const conservationScores: number[] = [];
  const gapFrequencies: number[] = [];

  for (let index = 0; index < width; index += 1) {
    const residues = columnResidues(sequenceStrings, index);
    const consensusResidue = consensusForColumn(residues);
    const nonGap = residues.filter((residue) => residue !== GAP);
    const conserved = nonGap.filter((residue) => residue === consensusResidue).length;
    consensus.push(consensusResidue);
    conservationScores.push(Number((conserved / Math.max(nonGap.length, 1)).toFixed(3)));
    gapFrequencies.push(Number((residues.filter((residue) => residue === GAP).length / residues.length).toFixed(3)));
  }

  return {
    available: true,
    method,
    alignedSequences,
    consensus: consensus.join(""),
    conservationScores,
    gapFrequencies,
    sourceSequenceCount: alignedSequences.length,
    source
  };
}

export function conservedResiduesFromMsa(msa: MsaSummary, sequence: string): ConservedResidue[] {
  if (!msa.available) return [];
  const residues: ConservedResidue[] = [];
  let sequencePosition = 0;

  for (let column = 0; column < msa.consensus.length; column += 1) {
    const residue = sequence[sequencePosition];
    const consensusResidue = msa.consensus[column];
    if (consensusResidue !== GAP) sequencePosition += 1;
    const conservationScore = msa.conservationScores[column] ?? 0;
    if (residue && conservationScore >= 0.9 && consensusResidue === residue) {
      residues.push({
        position: sequencePosition,
        residue,
        conservationScore,
        evidence: ["MSA"],
        possibleRole: "unknown",
        notes: "Highly conserved in the precomputed alignment; inspect domains and known sites for biological role."
      });
    }
  }

  return residues.slice(0, 24);
}
