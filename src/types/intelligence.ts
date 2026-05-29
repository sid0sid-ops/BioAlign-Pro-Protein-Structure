export type CacheLayer = "memory" | "redis";
export type CacheState = "fresh" | "stale";
export type ProviderExecutionStatus = "fulfilled" | "rejected" | "skipped";

export interface CacheMetadata {
  key: string;
  hit: boolean;
  layer?: CacheLayer;
  state?: CacheState;
  storedAt?: string;
  ttlSeconds: number;
}

export interface ProviderTrace {
  provider: string;
  status: ProviderExecutionStatus;
  latencyMs: number;
  cacheHit?: boolean;
  cacheLayer?: CacheLayer;
  stale?: boolean;
  error?: string;
}

export interface NormalizedCrossReference {
  database: string;
  id: string;
  properties: Record<string, string>;
}

export interface NormalizedPdbReference {
  pdbId: string;
  method?: string;
  resolution?: string;
  chains?: string;
}

export interface NormalizedProtein {
  accession: string;
  id: string;
  name: string;
  gene?: {
    primary?: string;
    synonyms: string[];
  };
  organism?: {
    scientificName?: string;
    commonName?: string;
    taxonId?: number;
    lineage: string[];
  };
  sequence?: {
    value: string;
    length: number;
    molecularWeight?: number;
    checksum?: string;
  };
  keywords: string[];
  crossReferences: {
    pdb: NormalizedPdbReference[];
    databases: NormalizedCrossReference[];
  };
}

export interface NormalizedDomain {
  accession?: string;
  name: string;
  type: string;
  source?: string;
  description?: string;
  start: number;
  end: number;
  score?: number;
}

export interface NormalizedGoTerm {
  id: string;
  name: string;
  category: string;
}

export interface NormalizedStructureChain {
  id: string;
  description?: string;
  sequenceLength?: number;
  organism?: string;
  taxonomyId?: number;
  uniprotIds: string[];
}

export interface NormalizedLigand {
  id: string;
  name: string;
  formula?: string;
  molecularWeight?: number;
  source: "rcsb" | "pubchem" | "drugbank" | "unknown";
  externalUrl?: string;
}

export interface NormalizedStructureEntry {
  pdbId: string;
  title?: string;
  experimentalMethod?: string;
  resolution?: number;
  depositedAtomCount?: number;
  polymerEntityCount?: number;
  chains: NormalizedStructureChain[];
  ligands: NormalizedLigand[];
}

export interface NormalizedPredictedModel {
  provider: "AlphaFold" | "ESM Atlas" | "ColabFold" | "RoseTTAFold";
  accession: string;
  modelId: string;
  averagePlddt?: number;
  pdbUrl?: string;
  cifUrl?: string;
  paeUrl?: string;
  createdAt?: string;
}

export interface NormalizedInteractionNode {
  id: string;
  label: string;
  organism?: number;
}

export interface NormalizedInteractionEdge {
  source: NormalizedInteractionNode;
  target: NormalizedInteractionNode;
  score: number;
  evidence: {
    experimental?: number;
    database?: number;
    textMining?: number;
    coexpression?: number;
  };
}

export interface NormalizedPathway {
  id: string;
  name: string;
  organism?: string;
  source: "KEGG" | "Reactome" | "InterPro" | "unknown";
  externalUrl?: string;
}

export interface NormalizedDiseaseVariant {
  id: string;
  title: string;
  clinicalSignificance?: string;
  condition?: string;
  geneSymbol?: string;
  variationType?: string;
  position?: string;
  reviewStatus?: string;
  source: "ClinVar" | "UniProt" | "DisGeNET" | "OMIM" | "unknown";
}

export interface NormalizedConfidence {
  averagePlddt?: number;
  plddtHistogram: Array<{
    band: "very_high" | "confident" | "low" | "very_low";
    count: number;
  }>;
  paeAvailable: boolean;
  modelVersion?: number;
}

export interface ProteinIntelligence {
  schemaVersion: "bioalign.protein-intelligence.v1";
  query: {
    accession: string;
    geneName?: string;
    pdbId?: string;
    requestedAt: string;
  };
  protein: NormalizedProtein | null;
  structure: {
    primaryPdbId?: string;
    entries: NormalizedStructureEntry[];
    predictedModels: NormalizedPredictedModel[];
    ligands: NormalizedLigand[];
  };
  interactions: {
    nodes: NormalizedInteractionNode[];
    edges: NormalizedInteractionEdge[];
    networkImageUrl?: string;
  };
  domains: {
    entries: NormalizedDomain[];
    goTerms: NormalizedGoTerm[];
  };
  pathways: {
    entries: NormalizedPathway[];
  };
  confidence: NormalizedConfidence;
  diseases: {
    variants: NormalizedDiseaseVariant[];
  };
  ligands: {
    compounds: NormalizedLigand[];
  };
  providers: Record<string, ProviderTrace>;
  cache: CacheMetadata;
  diagnostics: {
    durationMs: number;
    providerCount: number;
    fulfilledCount: number;
    rejectedCount: number;
    warnings: string[];
  };
}
