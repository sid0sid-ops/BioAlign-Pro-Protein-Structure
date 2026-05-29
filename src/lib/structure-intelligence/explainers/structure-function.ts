import type { DomainAnnotation, PlddtMetric, StructureFunctionSummary } from "../types";

function hasDomain(domains: DomainAnnotation[], pattern: RegExp) {
  return domains.some((domain) => pattern.test(`${domain.name} ${domain.description} ${domain.type}`));
}

export function buildStructureFunctionSummary(input: {
  proteinName: string;
  functionComments: string[];
  domains: DomainAnnotation[];
  plddt: PlddtMetric;
  ligandCount: number;
  conservedResidueCount: number;
}): StructureFunctionSummary {
  const evidenceCards: StructureFunctionSummary["evidenceCards"] = [];
  const warnings: string[] = [];

  if (input.functionComments.length) {
    evidenceCards.push({
      title: "UniProt function annotation",
      claim: input.functionComments[0],
      evidence: ["UniProt function comment"],
      confidence: "high",
      source: "UniProt"
    });
  }

  if (hasDomain(input.domains, /kinase/i)) {
    evidenceCards.push({
      title: "Kinase-like domain evidence",
      claim: "A kinase-domain annotation indicates a fold commonly associated with phosphate-transfer chemistry.",
      evidence: input.domains.filter((domain) => /kinase/i.test(domain.name)).map((domain) => domain.name),
      confidence: "medium",
      source: "InterPro/Pfam/UniProt"
    });
  }

  if (hasDomain(input.domains, /dna|binding/i)) {
    evidenceCards.push({
      title: "Binding or DNA-associated region",
      claim: "Annotated binding or DNA-associated regions can connect sequence positions to molecular recognition.",
      evidence: input.domains.filter((domain) => /dna|binding/i.test(`${domain.name} ${domain.description}`)).map((domain) => domain.name),
      confidence: "medium",
      source: "InterPro/Pfam/UniProt"
    });
  }

  if (input.plddt.available && input.plddt.lowConfidenceRegions.length) {
    warnings.push("Low pLDDT regions may indicate flexible, disordered, or uncertain model regions.");
    evidenceCards.push({
      title: "Flexible or uncertain regions",
      claim: "AlphaFold reports low confidence for one or more continuous sequence regions.",
      evidence: input.plddt.lowConfidenceRegions.map((region) => `${region.start}-${region.end}`),
      confidence: "medium",
      source: "AlphaFold DB"
    });
  }

  if (input.conservedResidueCount > 0) {
    evidenceCards.push({
      title: "Conserved residue evidence",
      claim: "Highly conserved residues can mark structurally or functionally important positions.",
      evidence: [`${input.conservedResidueCount} conserved residues from precomputed MSA`],
      confidence: "medium",
      source: "Build-time Computed"
    });
  }

  if (input.ligandCount > 0) {
    evidenceCards.push({
      title: "Ligand-bound structure evidence",
      claim: "One or more RCSB structures include ligand annotations that may support binding-site inspection.",
      evidence: [`${input.ligandCount} ligand annotations`],
      confidence: "medium",
      source: "RCSB PDB"
    });
  }

  const summary =
    evidenceCards[0]?.claim ??
    `${input.proteinName} has static structural annotations, but this pack does not include enough source-backed evidence for a detailed structure-function claim.`;

  return {
    summary,
    evidenceCards,
    warnings
  };
}
