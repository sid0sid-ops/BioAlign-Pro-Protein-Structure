export type ProteinStructureLevel = "primary" | "secondary" | "tertiary" | "quaternary";

export type PredictionProvider =
  | "AlphaFold"
  | "ESMFold"
  | "ColabFold"
  | "RoseTTAFold"
  | "Homology"
  | "Threading"
  | "Ab Initio";

export type SequenceIdentityBand = "highly-reliable" | "moderate" | "remote" | "threading-required";

export interface AminoAcidResidue {
  code: string;
  name: string;
  polarity: "nonpolar" | "polar" | "positive" | "negative" | "special";
  hydrophobicity: number;
  molecularWeight: number;
}

export interface SequenceMetrics {
  length: number;
  molecularWeight: number;
  hydrophobicity: number;
  chargedResidues: number;
  glycineProlineContent: number;
  composition: Record<string, number>;
}

export interface TemplateHit {
  id: string;
  pdbId: string;
  chainId: string;
  title: string;
  organism: string;
  resolution: number;
  sequenceIdentity: number;
  coverage: number;
  eValue: number;
  foldseekScore: number;
  reliabilityBand: SequenceIdentityBand;
}

export interface AlignmentRow {
  label: string;
  sequence: string;
  annotations: Array<{
    start: number;
    end: number;
    type: "helix" | "sheet" | "turn" | "domain" | "gap" | "mutation";
    label: string;
  }>;
}

export interface PipelineStep {
  id: string;
  title: string;
  description: string;
  status: "queued" | "running" | "complete" | "warning";
  progress: number;
  metric: string;
}

export interface ConfidencePoint {
  residue: number;
  plddt: number;
  pae: number;
  conservation: number;
}

export interface RmsdPoint {
  residue: number;
  reference: number;
  model: number;
  deviation: number;
}

export interface FoldMatch {
  fold: string;
  family: string;
  score: number;
  confidence: number;
  conservation: number;
}

export interface WorkbenchState {
  sequenceName: string;
  sequence: string;
  selectedChain: string;
  selectedResidue: number;
  activeStructureLevel: ProteinStructureLevel;
  selectedTemplateId: string;
  provider: PredictionProvider;
}
