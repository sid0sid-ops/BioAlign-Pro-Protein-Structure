import type { NormalizedDiseaseVariant, NormalizedDomain, NormalizedProtein } from "../../types/intelligence";
import type { UniProtEntry } from "../integrations/uniprot";

function proteinName(entry: UniProtEntry) {
  return (
    entry.proteinDescription?.recommendedName?.fullName?.value ??
    entry.proteinDescription?.submissionNames?.[0]?.fullName?.value ??
    entry.uniProtkbId ??
    entry.primaryAccession
  );
}

export function normalizeUniProt(entry: UniProtEntry | null): NormalizedProtein | null {
  if (!entry) return null;

  return {
    accession: entry.primaryAccession,
    id: entry.uniProtkbId,
    name: proteinName(entry),
    gene: entry.genes?.[0]
      ? {
          primary: entry.genes[0].geneName?.value,
          synonyms: (entry.genes[0].synonyms ?? []).map((synonym) => synonym.value)
        }
      : undefined,
    organism: entry.organism
      ? {
          scientificName: entry.organism.scientificName,
          commonName: entry.organism.commonName,
          taxonId: entry.organism.taxonId,
          lineage: entry.organism.lineage ?? []
        }
      : undefined,
    sequence: entry.sequence
      ? {
          value: entry.sequence.value,
          length: entry.sequence.length,
          molecularWeight: entry.sequence.molWeight,
          checksum: entry.sequence.crc64
        }
      : undefined,
    keywords: (entry.keywords ?? []).map((keyword) => keyword.name),
    crossReferences: {
      pdb: (entry.uniProtKBCrossReferences ?? [])
        .filter((reference) => reference.database === "PDB")
        .map((reference) => ({
          pdbId: reference.id,
          method: reference.properties?.find((property) => property.key === "Method")?.value,
          resolution: reference.properties?.find((property) => property.key === "Resolution")?.value,
          chains: reference.properties?.find((property) => property.key === "Chains")?.value
        })),
      databases: (entry.uniProtKBCrossReferences ?? []).map((reference) => ({
        database: reference.database,
        id: reference.id,
        properties: Object.fromEntries((reference.properties ?? []).map((property) => [property.key, property.value]))
      }))
    }
  };
}

export function normalizeUniProtDomains(entry: UniProtEntry | null): NormalizedDomain[] {
  if (!entry) return [];

  return (entry.features ?? [])
    .filter((feature) => ["Domain", "Region", "Motif", "Active site", "Binding site"].includes(feature.type))
    .map((feature) => ({
      name: feature.description || feature.type,
      type: feature.type,
      source: "UniProt",
      description: feature.description,
      start: feature.location.start.value,
      end: feature.location.end.value
    }));
}

export function normalizeUniProtDiseases(entry: UniProtEntry | null): NormalizedDiseaseVariant[] {
  if (!entry) return [];

  return (entry.comments ?? [])
    .filter((comment) => comment.commentType === "DISEASE")
    .map((comment) => ({
      id: comment.disease?.diseaseId ?? comment.disease?.acronym ?? "uniprot-disease",
      title: comment.disease?.acronym ?? comment.disease?.diseaseId ?? "UniProt disease annotation",
      clinicalSignificance: "curated association",
      condition: comment.disease?.description ?? comment.texts?.[0]?.value,
      source: "UniProt" as const
    }));
}
