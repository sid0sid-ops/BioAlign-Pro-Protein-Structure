import { providerGet } from "./http";

export async function fetchPdbeSummary(pdbId: string) {
  const baseUrl = process.env.PDBE_BASE_URL ?? "https://www.ebi.ac.uk/pdbe/api";
  return providerGet<Record<string, unknown>>("pdbe", `${baseUrl}/pdb/entry/summary/${encodeURIComponent(pdbId)}`);
}
