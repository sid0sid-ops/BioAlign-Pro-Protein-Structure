import type {
  NormalizedDiseaseVariant,
  NormalizedDomain,
  NormalizedGoTerm,
  NormalizedLigand,
  NormalizedPathway
} from "../../types/intelligence";
import type { ClinVarVariant } from "../integrations/clinvar";
import type { InterProResult } from "../integrations/interpro";
import type { KeggPathway } from "../integrations/kegg";
import type { PubChemCompound } from "../integrations/pubchem";

export function normalizeInterPro(result: InterProResult | null) {
  const domains: NormalizedDomain[] =
    result?.domains.map((domain) => ({
      accession: domain.accession,
      name: domain.name,
      type: domain.type,
      source: domain.source_database,
      description: domain.description,
      start: domain.start,
      end: domain.end,
      score: domain.score
    })) ?? [];

  const goTerms: NormalizedGoTerm[] =
    result?.goTerms.map((term) => ({
      id: term.id,
      name: term.name,
      category: term.category
    })) ?? [];

  const pathways: NormalizedPathway[] =
    result?.pathways.map((pathway) => ({
      id: pathway.id,
      name: pathway.name,
      source: "InterPro",
      externalUrl: pathway.db ? `${pathway.db}:${pathway.id}` : undefined
    })) ?? [];

  return { domains, goTerms, pathways };
}

export function normalizeKegg(pathways: KeggPathway[] | null): NormalizedPathway[] {
  return (pathways ?? []).map((pathway) => ({
    id: pathway.id,
    name: pathway.name,
    organism: pathway.organism,
    source: "KEGG",
    externalUrl: pathway.imageUrl
  }));
}

export function normalizeClinVar(variants: ClinVarVariant[] | null): NormalizedDiseaseVariant[] {
  return (variants ?? []).map((variant) => ({
    id: variant.uid,
    title: variant.title,
    clinicalSignificance: variant.clinicalSignificance,
    condition: variant.condition,
    geneSymbol: variant.geneSymbol,
    variationType: variant.variationType,
    position: variant.position,
    reviewStatus: variant.reviewStatus,
    source: "ClinVar"
  }));
}

export function normalizePubChem(compounds: PubChemCompound[] | null): NormalizedLigand[] {
  return (compounds ?? []).map((compound) => ({
    id: String(compound.cid),
    name: compound.name,
    formula: compound.molecularFormula,
    molecularWeight: compound.molecularWeight,
    source: "pubchem",
    externalUrl: `https://pubchem.ncbi.nlm.nih.gov/compound/${compound.cid}`
  }));
}
