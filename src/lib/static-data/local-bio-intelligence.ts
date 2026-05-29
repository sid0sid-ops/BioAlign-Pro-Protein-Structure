import { loadStaticJson } from "./data-pack-loader";

export interface StaticBioRecord {
  accession: string;
  geneName: string;
  domains: Array<{ name: string; type: string; start: number; end: number }>;
  pathways: Array<{ id: string; name: string; externalUrl: string }>;
  interactions: Array<{ target: string; score: number }>;
  variants: Array<{ title: string; clinicalSignificance: string; condition: string }>;
}

interface StaticBioPack {
  version: string;
  records: StaticBioRecord[];
}

export async function loadStaticBioRecord(accession: string, geneName: string): Promise<StaticBioRecord> {
  const pack = await loadStaticJson<StaticBioPack>("/data/protein-intelligence-seeds.json");
  const normalizedAccession = accession.toUpperCase();
  const normalizedGene = geneName.toUpperCase();
  const record = pack.records.find(
    (item) => item.accession.toUpperCase() === normalizedAccession || item.geneName.toUpperCase() === normalizedGene
  );

  return (
    record ?? {
      accession,
      geneName,
      domains: [],
      pathways: [],
      interactions: [],
      variants: []
    }
  );
}
