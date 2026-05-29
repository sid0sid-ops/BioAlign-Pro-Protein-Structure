export interface BuildUniProtRecord {
  primaryAccession?: string;
  uniProtkbId?: string;
  proteinDescription?: {
    recommendedName?: { fullName?: { value?: string } };
  };
  genes?: Array<{ geneName?: { value?: string } }>;
  organism?: { scientificName?: string; commonName?: string; taxonId?: number };
  sequence?: { value?: string; length?: number };
  comments?: Array<{ commentType?: string; texts?: Array<{ value?: string }> }>;
  features?: Array<{
    type?: string;
    description?: string;
    location?: { start?: { value?: number }; end?: { value?: number } };
  }>;
  uniProtKBCrossReferences?: Array<{ database?: string; id: string; properties?: Array<{ key: string; value?: string }> }>;
}

export async function fetchUniProt(accession: string): Promise<BuildUniProtRecord | null> {
  const response = await fetch(`https://rest.uniprot.org/uniprotkb/${encodeURIComponent(accession)}.json`, {
    headers: {
      Accept: "application/json",
      "User-Agent": "BioAlignProStaticBuild/1.0"
    }
  });
  if (!response.ok) return null;
  return (await response.json()) as BuildUniProtRecord;
}
