import type { StructureIntelligencePack } from "@/lib/structure-intelligence/types";

export type ProteinDataSource = "local-static-pack" | "browser-api" | "browser-cache" | "user-input" | "fallback";

export interface ProteinDomain {
  name: string;
  type: string;
  start?: number;
  end?: number;
  source?: string;
}

export interface ProteinMotif {
  name: string;
  type: string;
  start?: number;
  end?: number;
  source?: string;
}

export interface KnownPdbStructure {
  pdbId: string;
  method?: string;
  resolution?: string;
  chains?: string;
  source: string;
}

export interface ProteinTemplateCard {
  id: string;
  pdbId: string;
  label: string;
  score?: number | null;
  rankReason?: string;
  source: string;
}

export interface ProteinConfidenceCard {
  id: string;
  label: string;
  value: number | string | null;
  detail: string;
  source?: string;
}

export interface ProteinPack {
  schemaVersion: "bioalign.static-protein-pack.v1" | "bioalign.browser-api-pack.v1";
  generatedAt: string;
  accession: string;
  geneName: string;
  proteinName: string;
  aliases: string[];
  organism: {
    scientificName: string;
    commonName?: string;
    taxonId?: number;
  };
  sequence: {
    value: string;
    length: number;
    molecularWeight?: number;
    checksum?: string;
    source: string;
  };
  sequenceType: "protein" | "dna" | "rna" | "unknown";
  domains: ProteinDomain[];
  motifs: ProteinMotif[];
  pdbStructures: KnownPdbStructure[];
  alphaFold: {
    available: boolean;
    modelId?: string;
    pdbUrl?: string;
    cifUrl?: string;
    bcifUrl?: string;
    paeUrl?: string;
    plddtUrl?: string;
    confidenceAvg?: number;
  };
  templates: ProteinTemplateCard[];
  confidenceCards: ProteinConfidenceCard[];
  pathways: Array<{ id: string; name: string; source: string }>;
  interactions: Array<{ target: string; score?: number | null; source: string }>;
  diseaseSummary: string;
  sourceBadges: string[];
  structureIntelligence?: StructureIntelligencePack;
}

export interface SearchIndexDocument {
  id: string;
  accession: string;
  geneName: string;
  proteinName: string;
  aliases: string[];
  tokens: string[];
  packPath: string;
  compressedPackPath?: string;
  pdbIds?: string[];
  pdbCount?: number;
  alphaFoldAvailable?: boolean;
}

export interface SearchIndex {
  version: string;
  generatedAt: string;
  documents: SearchIndexDocument[];
}

export interface AliasIndexEntry {
  alias: string;
  normalizedAlias: string;
  accession: string;
  geneName: string;
  proteinName: string;
  packPath: string;
  compressedPackPath?: string;
}

export interface AliasIndex {
  version: string;
  generatedAt: string;
  entries: AliasIndexEntry[];
}

export interface ProteinQueryMatch {
  accession: string;
  geneName: string;
  proteinName: string;
  matchedAlias: string;
  matchType: "accession" | "gene" | "alias" | "protein" | "pdb" | "fuzzy" | "token";
  score: number;
  packPath: string;
  compressedPackPath?: string;
  pdbIds?: string[];
}

export interface ProteinQueryResult {
  query: string;
  detectedType: string;
  sequenceClass: string;
  matches: ProteinQueryMatch[];
  selectedPack: ProteinPack | null;
  source: ProteinDataSource;
  sourceBadges: string[];
  fallbackMessage?: string;
  liveRefreshAttempted: boolean;
  liveRefreshError?: string;
}
