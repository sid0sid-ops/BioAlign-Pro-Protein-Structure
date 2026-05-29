/**
 * Ensembl Gene Lookup Integration
 */
import { providerGet } from "./http";

const ENSEMBL_BASE = "https://rest.ensembl.org";

export interface EnsemblGene {
  id: string;
  displayName: string;
  description: string;
  species: string;
  biotype: string;
  start: number;
  end: number;
  strand: number;
  chromosome: string;
}

export async function searchEnsemblGene(symbol: string, species = "homo_sapiens"): Promise<EnsemblGene[]> {
  try {
    const { data } = await providerGet<any[]>(
      "ensembl",
      `${ENSEMBL_BASE}/xrefs/symbol/${species}/${encodeURIComponent(symbol)}?content-type=application/json`
    );
    return (data ?? []).slice(0, 5).map((entry: any) => ({
      id: entry.id ?? "",
      displayName: symbol,
      description: entry.description ?? "",
      species,
      biotype: entry.type ?? "",
      start: 0, end: 0, strand: 0, chromosome: "",
    }));
  } catch {
    return [];
  }
}

export async function fetchEnsemblSequence(geneId: string): Promise<string> {
  try {
    const { data } = await providerGet<any>(
      "ensembl",
      `${ENSEMBL_BASE}/sequence/id/${encodeURIComponent(geneId)}?content-type=application/json&type=protein`
    );
    return data?.seq ?? "";
  } catch {
    return "";
  }
}
