export interface BuildInterProResult {
  metadata?: {
    accession?: string;
    name?: string;
    source_database?: string;
    type?: string;
    member_databases?: Record<string, Record<string, string>>;
  };
  proteins?: Array<{
    entry_protein_locations?: Array<{
      fragments?: Array<{ start?: number; end?: number }>;
      score?: number | null;
    }>;
  }>;
}

export async function fetchInterPro(accession: string): Promise<BuildInterProResult[]> {
  const response = await fetch(
    `https://www.ebi.ac.uk/interpro/api/entry/interpro/protein/uniprot/${encodeURIComponent(accession)}/?page_size=40`,
    {
      headers: {
        Accept: "application/json",
        "User-Agent": "BioAlignProStaticBuild/1.0"
      }
    }
  );
  if (!response.ok) return [];
  const payload = (await response.json()) as { results?: BuildInterProResult[] };
  return payload.results ?? [];
}
