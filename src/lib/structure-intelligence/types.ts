export type SourceBadge =
  | "UniProt"
  | "RCSB PDB"
  | "AlphaFold DB"
  | "InterPro"
  | "Pfam"
  | "Build-time Computed"
  | "Browser Computed"
  | "Browser Cache"
  | "Static Pack"
  | "Optional Live API";

export interface SourceMetadata {
  name: string;
  url?: string;
  accessedAt?: string;
  sourceType: SourceBadge;
  version?: string;
}

export interface StructureMetricUnavailable {
  available: false;
  reason: string;
  method?: string;
  source?: string;
}

export interface StructureMetricAvailable {
  available: true;
  method: string;
  source: string;
}

export type StructureMetric = StructureMetricAvailable | StructureMetricUnavailable;

export interface ExperimentalStructure {
  pdbId: string;
  title?: string;
  experimentalMethod?: string;
  resolution?: number | null;
  chains: string[];
  polymerEntities: Array<{
    entityId: string;
    description?: string;
    chains: string[];
    relatedUniProtIds: string[];
  }>;
  ligands: Array<{
    id: string;
    name?: string;
  }>;
  organism?: string;
  relatedUniProtIds: string[];
  releaseDate?: string;
  source: SourceMetadata;
}

export interface PredictedStructure {
  provider: "AlphaFold DB";
  modelId: string;
  modelUrl?: string;
  cifUrl?: string;
  pdbUrl?: string;
  bcifUrl?: string;
  paeUrl?: string;
  plddtUrl?: string;
  meanPlddt?: number;
  source: SourceMetadata;
}

export interface RmsdComparison extends StructureMetricAvailable {
  queryStructure: string;
  templateStructure: string;
  chainA: string;
  chainB: string;
  atomType: "CA";
  alignedResidues: number;
  rmsd: number;
  interpretation: "Low deviation" | "Moderate deviation" | "High deviation";
}

export type RmsdComparisonResult = RmsdComparison | StructureMetricUnavailable;

export interface TmScoreComparison extends StructureMetricAvailable {
  queryStructure: string;
  templateStructure: string;
  tmScore: number;
  alignedLength: number;
  rmsd?: number;
  sequenceIdentityAligned?: number;
  interpretation: "same fold" | "possible similarity" | "weak similarity";
}

export type TmScoreComparisonResult = TmScoreComparison | StructureMetricUnavailable;

export interface ConfidenceRegion {
  start: number;
  end: number;
  mean: number;
  label: string;
}

export interface PlddtSummary {
  available: true;
  mean: number;
  median: number;
  bins: {
    veryHigh_90_100: number;
    confident_70_90: number;
    low_50_70: number;
    veryLow_0_50: number;
  };
  perResidue: number[];
  lowConfidenceRegions: ConfidenceRegion[];
  highConfidenceRegions: ConfidenceRegion[];
  source: "AlphaFold DB";
} 

export type PlddtMetric = PlddtSummary | StructureMetricUnavailable;

export interface PaeDomainPair {
  domainA: string;
  domainB: string;
  meanPae: number;
}

export interface PaeMatrixSummary {
  available: true;
  matrixUrl: string;
  matrix?: number[][];
  downsampledMatrix: number[][];
  matrixSize: number;
  meanPae: number;
  domainPairPae: PaeDomainPair[];
  highUncertaintyRegions: ConfidenceRegion[];
  source: "AlphaFold DB";
}

export type PaeMetric = PaeMatrixSummary | StructureMetricUnavailable;

export interface DomainAnnotation {
  id: string;
  name: string;
  sourceDatabase: "InterPro" | "Pfam" | "PROSITE" | "SMART" | "UniProt" | string;
  type: "domain" | "family" | "repeat" | "site" | "motif" | "region";
  start: number;
  end: number;
  description: string;
  evidence: string;
  confidence?: string;
  sourceUrl?: string;
}

export interface MsaAlignedSequence {
  id: string;
  label: string;
  sequence: string;
  source?: string;
}

export interface MsaSummary {
  available: boolean;
  method: string;
  alignedSequences: MsaAlignedSequence[];
  consensus: string;
  conservationScores: number[];
  gapFrequencies: number[];
  sourceSequenceCount: number;
  source: string;
  unavailableReason?: string;
}

export interface ProfileEvidence {
  profileId: string;
  profileName: string;
  database: "Pfam" | "InterPro" | "HMMER" | string;
  start: number;
  end: number;
  score: number | null;
  eValue: string | null;
  description: string;
  interpretation: string;
}

export interface ConservedResidue {
  position: number;
  residue: string;
  conservationScore: number;
  evidence: string[];
  insideDomain?: string;
  possibleRole: "active site" | "binding" | "stability" | "unknown";
  notes: string;
}

export interface StructureFunctionEvidence {
  title: string;
  claim: string;
  evidence: string[];
  confidence: "high" | "medium" | "low";
  source: string;
}

export interface StructureFunctionSummary {
  summary: string;
  evidenceCards: StructureFunctionEvidence[];
  warnings: string[];
}

export interface ProteinPipelineStep {
  step: string;
  status: "complete" | "partial" | "missing" | "optional";
  dataUsed: string[];
  output: string;
  source: string;
}

export interface StructureIntelligencePack {
  schemaVersion: "bioalign.structure-intelligence.v1";
  generatedAt: string;
  protein: {
    accession: string;
    name: string;
    gene: string;
    organism: string;
    sequence: string;
    length: number;
    functionComments: string[];
    features: Array<{
      type: string;
      description: string;
      start?: number;
      end?: number;
      source: string;
    }>;
    crossReferences: Array<{
      database: string;
      id: string;
    }>;
  };
  structures: {
    experimental: ExperimentalStructure[];
    predicted: PredictedStructure[];
  };
  domains: DomainAnnotation[];
  msa: MsaSummary;
  profileEvidence: ProfileEvidence[];
  conservedResidues: ConservedResidue[];
  metrics: {
    rmsdComparisons: RmsdComparisonResult[];
    tmScoreComparisons: TmScoreComparisonResult[];
    plddt: PlddtMetric;
    pae: PaeMetric;
    domainCoverage: {
      available: boolean;
      coveredResidues: number;
      sequenceLength: number;
      percent: number;
      source: string;
      reason?: string;
    } | null;
    conservationSummary: {
      available: boolean;
      meanConservation: number;
      highlyConservedPositions: number[];
      method: string;
      reason?: string;
    } | null;
  };
  structureFunction: StructureFunctionSummary;
  intelligence: {
    structureFunctionSummary: string;
    sequenceStructureFunctionPipeline: ProteinPipelineStep[];
    warnings: string[];
    confidenceNotes: string[];
    sourceBadges: SourceBadge[];
  };
  sources: SourceMetadata[];
}
