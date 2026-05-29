import { providerGet } from "./http";

export interface UniProtEntry {
  primaryAccession: string;
  uniProtkbId: string;
  proteinDescription?: {
    recommendedName?: { fullName?: { value: string } };
    submissionNames?: Array<{ fullName?: { value: string } }>;
  };
  organism?: {
    scientificName?: string;
    commonName?: string;
    taxonId?: number;
    lineage?: string[];
  };
  sequence?: { value: string; length: number; molWeight: number; crc64: string };
  genes?: Array<{ geneName?: { value: string }; synonyms?: Array<{ value: string }> }>;
  comments?: Array<{
    commentType: string;
    texts?: Array<{ value: string }>;
    disease?: { diseaseId: string; description: string; acronym: string };
    subcellularLocations?: Array<{ location: { value: string } }>;
  }>;
  features?: Array<{
    type: string;
    description: string;
    location: { start: { value: number }; end: { value: number } };
    evidences?: Array<{ code: string }>;
  }>;
  keywords?: Array<{ id: string; name: string; category: string }>;
  uniProtKBCrossReferences?: Array<{
    database: string;
    id: string;
    properties?: Array<{ key: string; value: string }>;
  }>;
}

export async function fetchUniProtEntry(accession: string) {
  const baseUrl = process.env.UNIPROT_BASE_URL ?? "https://rest.uniprot.org";
  return providerGet<UniProtEntry>("uniprot", `${baseUrl}/uniprotkb/${encodeURIComponent(accession)}.json`);
}

export async function searchUniProt(query: string, limit = 10) {
  const baseUrl = process.env.UNIPROT_BASE_URL ?? "https://rest.uniprot.org";
  return providerGet<{ results: UniProtEntry[] }>(
    "uniprot",
    `${baseUrl}/uniprotkb/search?query=${encodeURIComponent(query)}&size=${limit}&format=json`
  );
}

export function extractProteinName(entry: UniProtEntry): string {
  return (
    entry.proteinDescription?.recommendedName?.fullName?.value ??
    entry.proteinDescription?.submissionNames?.[0]?.fullName?.value ??
    entry.uniProtkbId ??
    entry.primaryAccession
  );
}

export function extractGeneName(entry: UniProtEntry): string {
  return entry.genes?.[0]?.geneName?.value ?? "";
}

export function extractDiseases(entry: UniProtEntry) {
  return (entry.comments ?? [])
    .filter((c) => c.commentType === "DISEASE")
    .map((c) => ({
      id: c.disease?.diseaseId ?? "",
      name: c.disease?.acronym ?? "",
      description: c.disease?.description ?? c.texts?.[0]?.value ?? "",
    }));
}

export function extractDomains(entry: UniProtEntry) {
  return (entry.features ?? [])
    .filter((f) => ["Domain", "Region", "Motif", "Active site", "Binding site"].includes(f.type))
    .map((f) => ({
      type: f.type,
      description: f.description,
      start: f.location.start.value,
      end: f.location.end.value,
    }));
}

export function extractPdbCrossRefs(entry: UniProtEntry) {
  return (entry.uniProtKBCrossReferences ?? [])
    .filter((x) => x.database === "PDB")
    .map((x) => ({
      pdbId: x.id,
      method: x.properties?.find((p) => p.key === "Method")?.value ?? "",
      resolution: x.properties?.find((p) => p.key === "Resolution")?.value ?? "",
      chains: x.properties?.find((p) => p.key === "Chains")?.value ?? "",
    }));
}
