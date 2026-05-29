export interface BuildRcsbEntry {
  rcsb_id?: string;
  struct?: { title?: string };
  exptl?: Array<{ method?: string }>;
  rcsb_accession_info?: { initial_release_date?: string };
  rcsb_entry_info?: { resolution_combined?: number[] };
  nonpolymer_entities?: Array<{
    pdbx_entity_nonpoly?: { comp_id?: string; name?: string };
  }>;
}

export async function fetchRcsbEntry(pdbId: string): Promise<BuildRcsbEntry | null> {
  const response = await fetch(`https://data.rcsb.org/rest/v1/core/entry/${encodeURIComponent(pdbId)}`, {
    headers: {
      Accept: "application/json",
      "User-Agent": "BioAlignProStaticBuild/1.0"
    }
  });
  if (!response.ok) return null;
  return (await response.json()) as BuildRcsbEntry;
}
