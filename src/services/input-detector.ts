/**
 * BioAlign-Pro-Protein-Structure — Intelligent Input Detection Engine
 * Detects sequence type from any user input:
 *   FASTA, UniProt accession, PDB ID, gene name, DNA, RNA, protein
 */

export type InputType =
  | "fasta"
  | "uniprot_accession"
  | "pdb_id"
  | "gene_name"
  | "dna_sequence"
  | "rna_sequence"
  | "protein_sequence"
  | "unknown";

export interface DetectionResult {
  type: InputType;
  value: string;
  confidence: number;
  metadata: {
    rawInput: string;
    cleanedValue: string;
    sequenceLength?: number;
    detectedOrganism?: string;
    fastaHeader?: string;
  };
}

// UniProt accession: P12345, Q9UHC1, A0A0A0MRZ7
const UNIPROT_REGEX = /^[OPQ][0-9][A-Z0-9]{3}[0-9]|[A-NR-Z][0-9]([A-Z][A-Z0-9]{2}[0-9]){1,2}$/i;

// PDB ID: 4HHB, 6VXX, 1abc
const PDB_ID_REGEX = /^[0-9][A-Za-z0-9]{3}$/;

// FASTA header line
const FASTA_HEADER_REGEX = /^>.*[\r\n]/;

// DNA bases only (with ambiguity codes)
const DNA_REGEX = /^[ATCGNatcgn\s]+$/;

// RNA bases only
const RNA_REGEX = /^[AUCGNaucgn\s]+$/;

// Protein residues (standard amino acids)
const PROTEIN_REGEX = /^[ACDEFGHIKLMNPQRSTVWYacdefghiklmnpqrstvwy\s]+$/;

// Gene name pattern: typically 1-10 chars, uppercase letters/numbers
const GENE_NAME_REGEX = /^[A-Z][A-Z0-9]{0,9}$/;

/**
 * Detect the type of biological input
 */
export function detectInputType(input: string): DetectionResult {
  const trimmed = input.trim();
  if (!trimmed) {
    return makeResult("unknown", trimmed, 0, trimmed);
  }

  // 1. Check FASTA format first (has header line)
  if (FASTA_HEADER_REGEX.test(trimmed)) {
    return parseFasta(trimmed);
  }

  // 2. Check UniProt accession
  if (UNIPROT_REGEX.test(trimmed) && trimmed.length >= 6 && trimmed.length <= 10) {
    return makeResult("uniprot_accession", trimmed.toUpperCase(), 0.95, trimmed);
  }

  // 3. Check PDB ID
  if (PDB_ID_REGEX.test(trimmed)) {
    return makeResult("pdb_id", trimmed.toUpperCase(), 0.92, trimmed);
  }

  // 4. Clean potential sequence (remove spaces, newlines, numbers)
  const cleanedSeq = trimmed.replace(/[\s\d\-\.]/g, "").toUpperCase();

  // 5. If very short (1-10 chars) and all uppercase letters, likely gene name
  if (trimmed.length <= 10 && GENE_NAME_REGEX.test(trimmed.toUpperCase()) && !DNA_REGEX.test(cleanedSeq)) {
    // Could be gene name OR very short sequence
    // Prioritize gene name for short alpha strings
    return makeResult("gene_name", trimmed.toUpperCase(), 0.75, trimmed);
  }

  // 6. Check DNA sequence (only ATCGN)
  if (cleanedSeq.length > 10 && DNA_REGEX.test(cleanedSeq)) {
    // Distinguish DNA from RNA by checking for T vs U
    if (/U/i.test(cleanedSeq) && !/T/i.test(cleanedSeq)) {
      return makeResult("rna_sequence", cleanedSeq, 0.9, trimmed, cleanedSeq.length);
    }
    return makeResult("dna_sequence", cleanedSeq, 0.9, trimmed, cleanedSeq.length);
  }

  // 7. Check RNA sequence (only AUCGN)
  if (cleanedSeq.length > 10 && RNA_REGEX.test(cleanedSeq)) {
    return makeResult("rna_sequence", cleanedSeq, 0.9, trimmed, cleanedSeq.length);
  }

  // 8. Check protein sequence (standard amino acid codes)
  if (cleanedSeq.length > 5 && PROTEIN_REGEX.test(cleanedSeq)) {
    // Additional heuristic: if contains amino-acid-only letters (not found in DNA/RNA)
    const hasProteinOnlyChars = /[DEFHIKLMNPQRSVWY]/i.test(cleanedSeq);
    if (hasProteinOnlyChars) {
      return makeResult("protein_sequence", cleanedSeq, 0.88, trimmed, cleanedSeq.length);
    }
    // Ambiguous — could be DNA subset, treat as protein if long enough
    return makeResult("protein_sequence", cleanedSeq, 0.6, trimmed, cleanedSeq.length);
  }

  // 9. Fallback: try gene name for short inputs
  if (trimmed.length <= 20 && /^[A-Za-z0-9\-_]+$/.test(trimmed)) {
    return makeResult("gene_name", trimmed.toUpperCase(), 0.5, trimmed);
  }

  return makeResult("unknown", trimmed, 0, trimmed);
}

function parseFasta(input: string): DetectionResult {
  const lines = input.split(/[\r\n]+/);
  const header = lines[0].replace(/^>/, "").trim();
  const sequence = lines
    .slice(1)
    .join("")
    .replace(/[\s\d]/g, "")
    .toUpperCase();

  // Determine if the sequence portion is DNA, RNA, or protein
  let seqType: InputType = "protein_sequence";
  if (/^[ATCGN]+$/i.test(sequence)) seqType = "dna_sequence";
  else if (/^[AUCGN]+$/i.test(sequence)) seqType = "rna_sequence";

  return {
    type: "fasta",
    value: sequence,
    confidence: 0.98,
    metadata: {
      rawInput: input,
      cleanedValue: sequence,
      sequenceLength: sequence.length,
      fastaHeader: header,
    },
  };
}

function makeResult(
  type: InputType,
  value: string,
  confidence: number,
  rawInput: string,
  sequenceLength?: number
): DetectionResult {
  return {
    type,
    value,
    confidence,
    metadata: {
      rawInput,
      cleanedValue: value,
      sequenceLength,
    },
  };
}

/**
 * Translate DNA to protein (standard genetic code, reading frame 1)
 */
export function translateDNA(dna: string): string {
  const codonTable: Record<string, string> = {
    TTT: "F", TTC: "F", TTA: "L", TTG: "L",
    CTT: "L", CTC: "L", CTA: "L", CTG: "L",
    ATT: "I", ATC: "I", ATA: "I", ATG: "M",
    GTT: "V", GTC: "V", GTA: "V", GTG: "V",
    TCT: "S", TCC: "S", TCA: "S", TCG: "S",
    CCT: "P", CCC: "P", CCA: "P", CCG: "P",
    ACT: "T", ACC: "T", ACA: "T", ACG: "T",
    GCT: "A", GCC: "A", GCA: "A", GCG: "A",
    TAT: "Y", TAC: "Y", TAA: "*", TAG: "*",
    CAT: "H", CAC: "H", CAA: "Q", CAG: "Q",
    AAT: "N", AAC: "N", AAA: "K", AAG: "K",
    GAT: "D", GAC: "D", GAA: "E", GAG: "E",
    TGT: "C", TGC: "C", TGA: "*", TGG: "W",
    CGT: "R", CGC: "R", CGA: "R", CGG: "R",
    AGT: "S", AGC: "S", AGA: "R", AGG: "R",
    GGT: "G", GGC: "G", GGA: "G", GGG: "G",
  };

  const upper = dna.toUpperCase().replace(/U/g, "T");
  let protein = "";
  for (let i = 0; i + 2 < upper.length; i += 3) {
    const codon = upper.substring(i, i + 3);
    protein += codonTable[codon] ?? "X";
  }
  return protein;
}

/**
 * Transcribe DNA to RNA
 */
export function transcribeDNA(dna: string): string {
  return dna.toUpperCase().replace(/T/g, "U");
}
