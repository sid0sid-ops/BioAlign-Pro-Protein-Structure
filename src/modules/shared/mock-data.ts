import type {
  AlignmentRow,
  ConfidencePoint,
  FoldMatch,
  PipelineStep,
  RmsdPoint,
  TemplateHit
} from "@/types/protein";

export const templateHits: TemplateHit[] = [
  {
    id: "4HHB-A",
    pdbId: "4HHB",
    chainId: "A",
    title: "Hemoglobin subunit alpha oxygen-bound template",
    organism: "Homo sapiens",
    resolution: 1.74,
    sequenceIdentity: 68,
    coverage: 91,
    eValue: 1e-58,
    foldseekScore: 0.91,
    reliabilityBand: "highly-reliable"
  },
  {
    id: "2DN2-B",
    pdbId: "2DN2",
    chainId: "B",
    title: "Globin-like regulatory fold",
    organism: "Danio rerio",
    resolution: 2.1,
    sequenceIdentity: 42,
    coverage: 84,
    eValue: 3e-19,
    foldseekScore: 0.78,
    reliabilityBand: "moderate"
  },
  {
    id: "6VXX-C",
    pdbId: "6VXX",
    chainId: "C",
    title: "Remote beta-alpha scaffold candidate",
    organism: "Synthetic construct",
    resolution: 3.2,
    sequenceIdentity: 19,
    coverage: 63,
    eValue: 0.004,
    foldseekScore: 0.62,
    reliabilityBand: "threading-required"
  }
];

export const homologySteps: PipelineStep[] = [
  {
    id: "input",
    title: "Target sequence",
    description: "FASTA cleaned, residue alphabet validated, descriptors calculated.",
    status: "complete",
    progress: 100,
    metric: "92 aa"
  },
  {
    id: "blast",
    title: "BLAST search",
    description: "NCBI-compatible similarity search returns ranked template candidates.",
    status: "complete",
    progress: 100,
    metric: "3 templates"
  },
  {
    id: "templates",
    title: "PDB retrieval",
    description: "RCSB metadata, resolution, ligands, and chain coverage normalized.",
    status: "complete",
    progress: 100,
    metric: "1.74 A"
  },
  {
    id: "identity",
    title: "Identity scoring",
    description: "Templates over 50 percent are routed to reliable homology modeling.",
    status: "complete",
    progress: 100,
    metric: "68%"
  },
  {
    id: "alignment",
    title: "Sequence alignment",
    description: "Conserved residues, gaps, catalytic residues, and domains annotated.",
    status: "running",
    progress: 76,
    metric: "Q-score 0.82"
  },
  {
    id: "model",
    title: "Model build",
    description: "Backbone copied from template, loops rebuilt, side chains packed.",
    status: "running",
    progress: 64,
    metric: "2 loops"
  },
  {
    id: "refine",
    title: "Refinement",
    description: "Steric clashes, Ramachandran outliers, and energy minima optimized.",
    status: "queued",
    progress: 28,
    metric: "12 clashes"
  },
  {
    id: "validate",
    title: "Validation and RMSD",
    description: "RMSD, residue conservation, pLDDT-style confidence, and PAE reviewed.",
    status: "queued",
    progress: 8,
    metric: "1.8 A target"
  }
];

export const alignmentRows: AlignmentRow[] = [
  {
    label: "Target",
    sequence: "MKTAYIAKQRQISFVKSHFSRQDILDLICENHDNCKVVAGEGAGDPEGLKQFFENAGKAVNFGVDFDLPENLQKQGDEFVYHLLD",
    annotations: [
      { start: 7, end: 22, type: "helix", label: "Helix H1" },
      { start: 29, end: 40, type: "sheet", label: "Beta strand" },
      { start: 58, end: 72, type: "domain", label: "Binding domain" }
    ]
  },
  {
    label: "4HHB A",
    sequence: "MKTAYIAKQKQISFVKSNFSRQDILDLICENHDNCKVVAGEGAGDPEGLKQFFENAGKAVNFGVDFDLPENLQKQGDEFVYHLLD",
    annotations: [
      { start: 7, end: 22, type: "helix", label: "Template helix" },
      { start: 29, end: 40, type: "sheet", label: "Template strand" },
      { start: 58, end: 72, type: "domain", label: "Template domain" }
    ]
  }
];

export const confidenceSeries: ConfidencePoint[] = Array.from({ length: 92 }, (_, index) => {
  const residue = index + 1;
  return {
    residue,
    plddt: Math.round(72 + Math.sin(residue / 6) * 18 + (residue % 11) * 0.8),
    pae: Number((2 + Math.abs(Math.cos(residue / 9) * 7)).toFixed(2)),
    conservation: Math.round(45 + Math.cos(residue / 8) * 24 + (residue % 7) * 2)
  };
});

export const rmsdSeries: RmsdPoint[] = Array.from({ length: 48 }, (_, index) => {
  const residue = index + 1;
  const reference = 0.6 + Math.abs(Math.sin(residue / 6));
  const model = reference + Math.abs(Math.cos(residue / 5)) * 0.9;
  return {
    residue,
    reference: Number(reference.toFixed(2)),
    model: Number(model.toFixed(2)),
    deviation: Number(Math.abs(model - reference).toFixed(2))
  };
});

export const foldMatches: FoldMatch[] = [
  { fold: "Globin-like", family: "All-alpha", score: 94, confidence: 89, conservation: 82 },
  { fold: "Rossmann-like", family: "Alpha/beta", score: 81, confidence: 76, conservation: 69 },
  { fold: "Ferredoxin-like", family: "Beta-alpha-beta", score: 72, confidence: 63, conservation: 58 },
  { fold: "TIM barrel", family: "Alpha/beta barrel", score: 65, confidence: 54, conservation: 48 }
];

export const workflowStats = [
  { label: "RMSD", value: "1.82 A", trend: "-0.34 A" },
  { label: "pLDDT", value: "86.4", trend: "+6.2" },
  { label: "Identity", value: "68%", trend: "reliable" },
  { label: "Coverage", value: "91%", trend: "+12%" }
];
