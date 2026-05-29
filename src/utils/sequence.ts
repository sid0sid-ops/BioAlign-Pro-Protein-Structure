import { AMINO_ACIDS } from "../constants/amino-acids";
import type { SequenceIdentityBand, SequenceMetrics } from "@/types/protein";

export function validateProteinSequence(sequence: string) {
  const clean = sequence.replace(/\s/g, "").toUpperCase();
  const invalid = clean.split("").filter((residue) => !AMINO_ACIDS[residue]);

  return {
    clean,
    isValid: clean.length > 0 && invalid.length === 0,
    invalidResidues: Array.from(new Set(invalid))
  };
}

export function calculateSequenceMetrics(sequence: string): SequenceMetrics {
  const residues = sequence.split("").filter((residue) => AMINO_ACIDS[residue]);
  const composition = residues.reduce<Record<string, number>>((acc, residue) => {
    acc[residue] = (acc[residue] ?? 0) + 1;
    return acc;
  }, {});

  const molecularWeight = residues.reduce(
    (total, residue) => total + AMINO_ACIDS[residue].molecularWeight,
    0
  );
  const hydrophobicity =
    residues.reduce((total, residue) => total + AMINO_ACIDS[residue].hydrophobicity, 0) /
    Math.max(residues.length, 1);
  const chargedResidues = residues.filter((residue) =>
    ["positive", "negative"].includes(AMINO_ACIDS[residue].polarity)
  ).length;
  const glycineProlineContent =
    residues.filter((residue) => residue === "G" || residue === "P").length /
    Math.max(residues.length, 1);

  return {
    length: residues.length,
    molecularWeight: Number(molecularWeight.toFixed(2)),
    hydrophobicity: Number(hydrophobicity.toFixed(2)),
    chargedResidues,
    glycineProlineContent: Number((glycineProlineContent * 100).toFixed(1)),
    composition
  };
}

export function getSequenceIdentityBand(identity: number): SequenceIdentityBand {
  if (identity >= 50) return "highly-reliable";
  if (identity >= 35) return "moderate";
  if (identity >= 20) return "remote";
  return "threading-required";
}

export function describeIdentity(identity: number) {
  const band = getSequenceIdentityBand(identity);

  const copy: Record<SequenceIdentityBand, string> = {
    "highly-reliable": "Highly reliable homology model",
    moderate: "Usable template with careful validation",
    remote: "Remote homology, combine with fold recognition",
    "threading-required": "Low similarity, threading required"
  };

  return copy[band];
}
