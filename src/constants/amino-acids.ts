import type { AminoAcidResidue } from "@/types/protein";

export const AMINO_ACIDS: Record<string, AminoAcidResidue> = {
  A: { code: "A", name: "Alanine", polarity: "nonpolar", hydrophobicity: 1.8, molecularWeight: 89.09 },
  R: { code: "R", name: "Arginine", polarity: "positive", hydrophobicity: -4.5, molecularWeight: 174.2 },
  N: { code: "N", name: "Asparagine", polarity: "polar", hydrophobicity: -3.5, molecularWeight: 132.12 },
  D: { code: "D", name: "Aspartic acid", polarity: "negative", hydrophobicity: -3.5, molecularWeight: 133.1 },
  C: { code: "C", name: "Cysteine", polarity: "polar", hydrophobicity: 2.5, molecularWeight: 121.16 },
  E: { code: "E", name: "Glutamic acid", polarity: "negative", hydrophobicity: -3.5, molecularWeight: 147.13 },
  Q: { code: "Q", name: "Glutamine", polarity: "polar", hydrophobicity: -3.5, molecularWeight: 146.15 },
  G: { code: "G", name: "Glycine", polarity: "special", hydrophobicity: -0.4, molecularWeight: 75.07 },
  H: { code: "H", name: "Histidine", polarity: "positive", hydrophobicity: -3.2, molecularWeight: 155.16 },
  I: { code: "I", name: "Isoleucine", polarity: "nonpolar", hydrophobicity: 4.5, molecularWeight: 131.18 },
  L: { code: "L", name: "Leucine", polarity: "nonpolar", hydrophobicity: 3.8, molecularWeight: 131.18 },
  K: { code: "K", name: "Lysine", polarity: "positive", hydrophobicity: -3.9, molecularWeight: 146.19 },
  M: { code: "M", name: "Methionine", polarity: "nonpolar", hydrophobicity: 1.9, molecularWeight: 149.21 },
  F: { code: "F", name: "Phenylalanine", polarity: "nonpolar", hydrophobicity: 2.8, molecularWeight: 165.19 },
  P: { code: "P", name: "Proline", polarity: "special", hydrophobicity: -1.6, molecularWeight: 115.13 },
  S: { code: "S", name: "Serine", polarity: "polar", hydrophobicity: -0.8, molecularWeight: 105.09 },
  T: { code: "T", name: "Threonine", polarity: "polar", hydrophobicity: -0.7, molecularWeight: 119.12 },
  W: { code: "W", name: "Tryptophan", polarity: "nonpolar", hydrophobicity: -0.9, molecularWeight: 204.23 },
  Y: { code: "Y", name: "Tyrosine", polarity: "polar", hydrophobicity: -1.3, molecularWeight: 181.19 },
  V: { code: "V", name: "Valine", polarity: "nonpolar", hydrophobicity: 4.2, molecularWeight: 117.15 }
};

export const SAMPLE_SEQUENCE =
  "MKTAYIAKQRQISFVKSHFSRQDILDLICENHDNCKVVAGEGAGDPEGLKQFFENAGKAVNFGVDFDLPENLQKQGDEFVYHLLD";

export const STRUCTURE_COLORS = {
  helix: "#3b82f6",
  sheet: "#14b8a6",
  turn: "#f59e0b",
  coil: "#94a3b8",
  domain: "#8b5cf6",
  mutation: "#f43f5e",
  chainA: "#38bdf8",
  chainB: "#a78bfa",
  chainC: "#34d399"
};
