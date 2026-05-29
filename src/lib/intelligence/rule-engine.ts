import { AMINO_ACIDS } from "@/constants/amino-acids";
import type {
  ClientInputType,
  ClientIntelligenceResult,
  ClientSequenceMetrics,
  ExplanationCard,
  FastaRecord,
  MotifHit,
  SequenceClass,
  SequenceComplexity
} from "./types";

const UNIPROT_REGEX = /^(?:[OPQ][0-9][A-Z0-9]{3}[0-9]|[A-NR-Z][0-9](?:[A-Z][A-Z0-9]{2}[0-9]){1,2})$/i;
const PDB_ID_REGEX = /^[0-9][A-Za-z0-9]{3}$/;
const DNA_SYMBOLS = new Set("ACGTNRYKMSWBDHV".split(""));
const RNA_SYMBOLS = new Set("ACGUNRYKMSWBDHV".split(""));
const PROTEIN_SYMBOLS = new Set("ACDEFGHIKLMNPQRSTVWYBXZJUO*".split(""));
const STANDARD_PROTEIN_SYMBOLS = new Set("ACDEFGHIKLMNPQRSTVWY".split(""));

interface MotifDefinition {
  id: string;
  name: string;
  regex: RegExp;
  pattern: string;
  explanation: string;
  sequenceClass?: SequenceClass;
}

const MOTIFS: MotifDefinition[] = [
  {
    id: "n_glycosylation",
    name: "N-glycosylation sequon",
    regex: /N[^P][ST][^P]/g,
    pattern: "N-{P}-[S/T]-{P}",
    explanation: "A common protein sequon that can indicate possible N-linked glycosylation.",
    sequenceClass: "protein"
  },
  {
    id: "p_loop_ntp",
    name: "P-loop NTP-binding region",
    regex: /[AG]....GKT/g,
    pattern: "[A/G]xxxxGKT",
    explanation: "A Walker A-like motif often associated with nucleotide binding.",
    sequenceClass: "protein"
  },
  {
    id: "zinc_finger_c2h2",
    name: "C2H2 zinc-finger-like pattern",
    regex: /C.{2,4}C.{8,14}H.{3,6}H/g,
    pattern: "C-x(2,4)-C-x(8,14)-H-x(3,6)-H",
    explanation: "A cysteine/histidine spacing pattern compatible with zinc coordination.",
    sequenceClass: "protein"
  },
  {
    id: "basic_nls",
    name: "Basic nuclear localization signal",
    regex: /K[KR].{0,3}[KR]/g,
    pattern: "K-[K/R]-x(0,3)-[K/R]",
    explanation: "A basic cluster that can mark possible nuclear localization.",
    sequenceClass: "protein"
  },
  {
    id: "poly_a_signal",
    name: "Polyadenylation signal",
    regex: /AATAAA/g,
    pattern: "AATAAA",
    explanation: "A canonical DNA polyadenylation signal often found near transcript ends.",
    sequenceClass: "dna"
  },
  {
    id: "start_codon",
    name: "Start codon",
    regex: /ATG/g,
    pattern: "ATG",
    explanation: "A DNA start codon in the first reading frame context may indicate a coding region.",
    sequenceClass: "dna"
  },
  {
    id: "rna_start_codon",
    name: "RNA start codon",
    regex: /AUG/g,
    pattern: "AUG",
    explanation: "A canonical RNA start codon.",
    sequenceClass: "rna"
  }
];

export function analyzeScientificInput(input: string, options: { lowMemoryMode?: boolean } = {}): ClientIntelligenceResult {
  const started = performance.now();
  const parsed = parseInput(input);
  const metrics = calculateClientMetrics(parsed.cleaned, parsed.sequenceClass);
  const motifs = detectMotifs(parsed.cleaned, parsed.sequenceClass, options.lowMemoryMode);
  const complexity = estimateComplexity(parsed.cleaned, parsed.sequenceClass);
  const explanations = buildExplanationCards(parsed, metrics, motifs, complexity);

  return {
    schemaVersion: "bioalign.client-intelligence.v1",
    input: {
      raw: input,
      cleaned: parsed.cleaned,
      type: parsed.type,
      sequenceClass: parsed.sequenceClass,
      confidence: parsed.confidence,
      fasta: parsed.fasta
    },
    metrics,
    motifs,
    complexity,
    explanations,
    runtime: {
      engine: "rule-worker",
      executedInWorker: false,
      durationMs: Math.round(performance.now() - started),
      lowMemoryMode: Boolean(options.lowMemoryMode),
      generatedAt: new Date().toISOString()
    }
  };
}

function parseInput(input: string): {
  cleaned: string;
  type: ClientInputType;
  sequenceClass: SequenceClass;
  confidence: number;
  fasta?: FastaRecord;
} {
  const trimmed = input.trim();
  if (!trimmed) {
    return { cleaned: "", type: "unknown", sequenceClass: "unknown", confidence: 0 };
  }

  if (trimmed.startsWith(">")) {
    const fasta = parseFasta(trimmed);
    const sequenceClass = classifySequence(fasta.sequence);
    return {
      cleaned: fasta.sequence,
      type: "fasta",
      sequenceClass,
      confidence: 0.98,
      fasta
    };
  }

  if (UNIPROT_REGEX.test(trimmed)) {
    return {
      cleaned: trimmed.toUpperCase(),
      type: "uniprot_accession",
      sequenceClass: "identifier",
      confidence: 0.96
    };
  }

  if (PDB_ID_REGEX.test(trimmed)) {
    return {
      cleaned: trimmed.toUpperCase(),
      type: "pdb_id",
      sequenceClass: "identifier",
      confidence: 0.94
    };
  }

  const cleaned = cleanSequence(trimmed);
  const sequenceClass = classifySequence(cleaned);
  const type = sequenceClassToInputType(sequenceClass);

  return {
    cleaned,
    type,
    sequenceClass,
    confidence: confidenceFor(cleaned, sequenceClass)
  };
}

export function parseFasta(input: string): FastaRecord {
  const lines = input.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  const header = lines[0]?.replace(/^>/, "").trim() ?? "Untitled FASTA";
  const sequence = cleanSequence(lines.slice(1).join(""));
  return { header, sequence };
}

function cleanSequence(input: string) {
  return input.replace(/[\s\d\-.]/g, "").toUpperCase();
}

function classifySequence(sequence: string): SequenceClass {
  if (!sequence) return "unknown";
  const symbols = sequence.split("");
  const dnaMatches = symbols.filter((symbol) => DNA_SYMBOLS.has(symbol)).length;
  const rnaMatches = symbols.filter((symbol) => RNA_SYMBOLS.has(symbol)).length;
  const proteinMatches = symbols.filter((symbol) => PROTEIN_SYMBOLS.has(symbol)).length;
  const hasUracil = sequence.includes("U");
  const hasThymine = sequence.includes("T");
  const hasProteinOnly = /[EFILPQZJXB*]/.test(sequence);

  if (proteinMatches / symbols.length < 0.85) return "unknown";
  if (hasUracil && !hasThymine && rnaMatches / symbols.length > 0.9) return "rna";
  if (!hasUracil && dnaMatches / symbols.length > 0.9 && !hasProteinOnly) return "dna";
  return "protein";
}

function sequenceClassToInputType(sequenceClass: SequenceClass): ClientInputType {
  if (sequenceClass === "dna") return "dna_sequence";
  if (sequenceClass === "rna") return "rna_sequence";
  if (sequenceClass === "protein") return "protein_sequence";
  return "unknown";
}

function confidenceFor(sequence: string, sequenceClass: SequenceClass) {
  if (!sequence || sequenceClass === "unknown") return 0.1;
  if (sequenceClass === "protein" && /[EFILPQZJXB*]/.test(sequence)) return 0.9;
  if (sequenceClass === "dna" || sequenceClass === "rna") return 0.88;
  return 0.65;
}

function calculateClientMetrics(sequence: string, sequenceClass: SequenceClass): ClientSequenceMetrics {
  const alphabet = sequenceClass === "protein" ? STANDARD_PROTEIN_SYMBOLS : sequenceClass === "rna" ? RNA_SYMBOLS : DNA_SYMBOLS;
  const composition = sequence.split("").reduce<Record<string, number>>((acc, symbol) => {
    acc[symbol] = (acc[symbol] ?? 0) + 1;
    return acc;
  }, {});
  const invalidResidues = Array.from(new Set(sequence.split("").filter((symbol) => !alphabet.has(symbol))));
  const percentages = Object.fromEntries(
    Object.entries(composition).map(([symbol, count]) => [symbol, Number(((count / Math.max(sequence.length, 1)) * 100).toFixed(2))])
  );

  if (sequenceClass !== "protein") {
    return {
      length: sequence.length,
      composition,
      percentages,
      invalidResidues
    };
  }

  const standardResidues = sequence.split("").filter((symbol) => AMINO_ACIDS[symbol]);
  const molecularWeight = standardResidues.reduce((total, residue) => total + AMINO_ACIDS[residue].molecularWeight, 0);
  const hydrophobicity =
    standardResidues.reduce((total, residue) => total + AMINO_ACIDS[residue].hydrophobicity, 0) / Math.max(standardResidues.length, 1);
  const glycineProlineContent =
    standardResidues.filter((residue) => residue === "G" || residue === "P").length / Math.max(standardResidues.length, 1);

  return {
    length: sequence.length,
    composition,
    percentages,
    invalidResidues,
    molecularWeight: Number(molecularWeight.toFixed(2)),
    hydrophobicity: Number(hydrophobicity.toFixed(2)),
    glycineProlineContent: Number((glycineProlineContent * 100).toFixed(1))
  };
}

function detectMotifs(sequence: string, sequenceClass: SequenceClass, lowMemoryMode = false): MotifHit[] {
  if (!sequence) return [];
  const maxHits = lowMemoryMode ? 12 : 40;
  const motifHits: MotifHit[] = [];

  for (const motif of MOTIFS.filter((item) => item.sequenceClass === sequenceClass)) {
    const regex = new RegExp(motif.regex.source, "g");
    let match: RegExpExecArray | null;
    while ((match = regex.exec(sequence)) && motifHits.length < maxHits) {
      motifHits.push({
        id: motif.id,
        name: motif.name,
        pattern: motif.pattern,
        start: match.index + 1,
        end: match.index + match[0].length,
        matched: match[0],
        explanation: motif.explanation
      });
    }
  }

  if (sequenceClass === "protein") {
    motifHits.push(...detectHydrophobicSegments(sequence, maxHits - motifHits.length));
  }

  return motifHits.slice(0, maxHits);
}

function detectHydrophobicSegments(sequence: string, remainingSlots: number): MotifHit[] {
  if (remainingSlots <= 0) return [];
  const hydrophobic = new Set(["A", "V", "I", "L", "M", "F", "W", "Y"]);
  const hits: MotifHit[] = [];
  let start = -1;

  for (let index = 0; index <= sequence.length; index += 1) {
    const symbol = sequence[index];
    const isHydrophobic = symbol ? hydrophobic.has(symbol) : false;
    if (isHydrophobic && start === -1) start = index;
    if ((!isHydrophobic || index === sequence.length) && start !== -1) {
      const end = index;
      if (end - start >= 16) {
        hits.push({
          id: "hydrophobic_segment",
          name: "Hydrophobic segment",
          pattern: "16+ hydrophobic residues",
          start: start + 1,
          end,
          matched: sequence.slice(start, end),
          explanation: "A long hydrophobic stretch can indicate a membrane-spanning or buried structural segment."
        });
      }
      start = -1;
    }
    if (hits.length >= remainingSlots) break;
  }

  return hits;
}

function estimateComplexity(sequence: string, sequenceClass: SequenceClass): SequenceComplexity {
  if (!sequence) {
    return { shannonEntropy: 0, normalizedEntropy: 0, uniqueSymbols: 0, lowComplexityRegions: [], label: "low" };
  }

  const counts = sequence.split("").reduce<Record<string, number>>((acc, symbol) => {
    acc[symbol] = (acc[symbol] ?? 0) + 1;
    return acc;
  }, {});
  const entropy = Object.values(counts).reduce((total, count) => {
    const p = count / sequence.length;
    return total - p * Math.log2(p);
  }, 0);
  const alphabetSize = sequenceClass === "protein" ? 20 : sequenceClass === "unknown" ? Math.max(Object.keys(counts).length, 1) : 4;
  const normalizedEntropy = entropy / Math.log2(alphabetSize);
  const lowComplexityRegions = detectLowComplexityRuns(sequence);
  const label = normalizedEntropy < 0.45 || lowComplexityRegions.length > 2 ? "low" : normalizedEntropy < 0.75 ? "moderate" : "high";

  return {
    shannonEntropy: Number(entropy.toFixed(3)),
    normalizedEntropy: Number(Math.min(1, normalizedEntropy).toFixed(3)),
    uniqueSymbols: Object.keys(counts).length,
    lowComplexityRegions,
    label
  };
}

function detectLowComplexityRuns(sequence: string) {
  const regions: SequenceComplexity["lowComplexityRegions"] = [];
  let start = 0;

  for (let index = 1; index <= sequence.length; index += 1) {
    if (sequence[index] !== sequence[start]) {
      const length = index - start;
      if (length >= 6) {
        regions.push({
          start: start + 1,
          end: index,
          residue: sequence[start],
          length
        });
      }
      start = index;
    }
  }

  return regions.slice(0, 12);
}

function buildExplanationCards(
  parsed: ReturnType<typeof parseInput>,
  metrics: ClientSequenceMetrics,
  motifs: MotifHit[],
  complexity: SequenceComplexity
): ExplanationCard[] {
  const cards: ExplanationCard[] = [
    {
      id: "input-classification",
      title: "Input classification",
      severity: parsed.sequenceClass === "unknown" ? "warning" : "success",
      body:
        parsed.sequenceClass === "identifier"
          ? `Recognized ${parsed.type.replace(/_/g, " ")} locally. External lookup is not required for static deployment.`
          : `The cleaned input is classified as ${parsed.sequenceClass} with ${(parsed.confidence * 100).toFixed(0)}% confidence.`,
      evidence: `${metrics.length} parsed symbols`
    },
    {
      id: "alphabet-validation",
      title: "Alphabet validation",
      severity: metrics.invalidResidues.length ? "danger" : "success",
      body: metrics.invalidResidues.length
        ? `Invalid or ambiguous symbols were found: ${metrics.invalidResidues.join(", ")}.`
        : "No invalid symbols were detected for the inferred alphabet.",
      evidence: `${Object.keys(metrics.composition).length} unique symbols`
    },
    {
      id: "sequence-complexity",
      title: "Sequence complexity",
      severity: complexity.label === "low" ? "warning" : "info",
      body: `The sequence has ${complexity.label} complexity based on normalized Shannon entropy and repeated-region scans.`,
      evidence: `Entropy ${complexity.normalizedEntropy}`
    },
    {
      id: "motif-summary",
      title: "Motif scan",
      severity: motifs.length ? "info" : "warning",
      body: motifs.length
        ? `${motifs.length} motif candidate${motifs.length === 1 ? "" : "s"} were detected by local rules.`
        : "No common motif candidates were detected by the current local rule pack.",
      evidence: "Rule-based browser scan"
    }
  ];

  if (parsed.fasta) {
    cards.push({
      id: "fasta-record",
      title: "FASTA parsing",
      severity: "success",
      body: `Parsed FASTA record "${parsed.fasta.header}" without contacting a server.`,
      evidence: `${parsed.fasta.sequence.length} sequence symbols`
    });
  }

  return cards;
}
