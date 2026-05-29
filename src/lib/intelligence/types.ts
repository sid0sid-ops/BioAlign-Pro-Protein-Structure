import type { ProteinQueryResult } from "@/lib/static-data/protein-pack-types";

export type ClientInputType =
  | "uniprot_accession"
  | "pdb_id"
  | "fasta"
  | "dna_sequence"
  | "rna_sequence"
  | "protein_sequence"
  | "unknown";

export type SequenceClass = "dna" | "rna" | "protein" | "identifier" | "unknown";

export interface FastaRecord {
  header: string;
  sequence: string;
}

export interface MotifHit {
  id: string;
  name: string;
  pattern: string;
  start: number;
  end: number;
  matched: string;
  explanation: string;
}

export interface ExplanationCard {
  id: string;
  title: string;
  severity: "info" | "success" | "warning" | "danger";
  body: string;
  evidence: string;
}

export interface SequenceComplexity {
  shannonEntropy: number;
  normalizedEntropy: number;
  uniqueSymbols: number;
  lowComplexityRegions: Array<{
    start: number;
    end: number;
    residue: string;
    length: number;
  }>;
  label: "low" | "moderate" | "high";
}

export interface ClientSequenceMetrics {
  length: number;
  composition: Record<string, number>;
  percentages: Record<string, number>;
  invalidResidues: string[];
  molecularWeight?: number;
  hydrophobicity?: number;
  glycineProlineContent?: number;
}

export interface ClientIntelligenceResult {
  schemaVersion: "bioalign.client-intelligence.v1";
  input: {
    raw: string;
    cleaned: string;
    type: ClientInputType;
    sequenceClass: SequenceClass;
    confidence: number;
    fasta?: FastaRecord;
  };
  metrics: ClientSequenceMetrics;
  motifs: MotifHit[];
  complexity: SequenceComplexity;
  explanations: ExplanationCard[];
  runtime: {
    engine: "rule-worker";
    executedInWorker: boolean;
    durationMs: number;
    lowMemoryMode: boolean;
    generatedAt: string;
  };
}

export interface WorkerAnalyzeRequest {
  id: string;
  type: "analyze";
  input: string;
  options?: {
    lowMemoryMode?: boolean;
  };
}

export interface WorkerProteinQueryRequest {
  id: string;
  type: "resolve-query";
  query: string;
  options?: {
    lowMemoryMode?: boolean;
  };
}

export type IntelligenceWorkerRequest = WorkerAnalyzeRequest | WorkerProteinQueryRequest;

export interface WorkerAnalyzeResponse {
  id: string;
  type: "result" | "error";
  result?: ClientIntelligenceResult;
  error?: string;
}

export interface WorkerProteinQueryResponse {
  id: string;
  type: "protein-query-result" | "error";
  result?: ProteinQueryResult;
  error?: string;
}

export type IntelligenceWorkerResponse = WorkerAnalyzeResponse | WorkerProteinQueryResponse;
