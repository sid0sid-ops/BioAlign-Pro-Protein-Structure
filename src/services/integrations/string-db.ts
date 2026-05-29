/**
 * STRING-DB Integration — Protein interaction networks
 */
import { providerGet } from "./http";

const STRING_BASE = "https://string-db.org/api";

export interface StringInteraction {
  preferredName_A: string;
  preferredName_B: string;
  ncbiTaxonId: number;
  score: number;
  experimentalScore: number;
  databaseScore: number;
  textminingScore: number;
  coexpressionScore: number;
}

export interface StringNetworkResult {
  query: string;
  organism: number;
  interactions: StringInteraction[];
  networkImageUrl: string;
}

export async function fetchStringInteractions(
  identifier: string, species = 9606, limit = 20
): Promise<StringNetworkResult> {
  try {
    const { data } = await providerGet<any[]>(
      "string",
      `${STRING_BASE}/json/interaction_partners?identifiers=${encodeURIComponent(identifier)}&species=${species}&limit=${limit}&caller_identity=bioalign_pro`
    );
    const interactions: StringInteraction[] = (data ?? []).map((item: any) => ({
      preferredName_A: item.preferredName_A ?? "",
      preferredName_B: item.preferredName_B ?? "",
      ncbiTaxonId: item.ncbiTaxonId ?? species,
      score: item.score ?? 0,
      experimentalScore: item.escore ?? 0,
      databaseScore: item.dscore ?? 0,
      textminingScore: item.tscore ?? 0,
      coexpressionScore: item.ascore ?? 0,
    }));
    const networkImageUrl = `${STRING_BASE}/image/network?identifiers=${encodeURIComponent(identifier)}&species=${species}&limit=${limit}`;
    return { query: identifier, organism: species, interactions, networkImageUrl };
  } catch {
    return { query: identifier, organism: species, interactions: [], networkImageUrl: "" };
  }
}

export async function resolveStringId(geneName: string, species = 9606): Promise<string> {
  try {
    const { data } = await providerGet<any[]>(
      "string",
      `${STRING_BASE}/json/get_string_ids?identifiers=${encodeURIComponent(geneName)}&species=${species}`
    );
    return data?.[0]?.stringId ?? geneName;
  } catch {
    return geneName;
  }
}
