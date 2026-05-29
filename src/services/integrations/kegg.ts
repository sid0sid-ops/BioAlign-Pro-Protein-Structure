/**
 * KEGG Pathway Integration
 */
import { providerGet } from "./http";

const KEGG_BASE = "https://rest.kegg.jp";

export interface KeggPathway {
  id: string;
  name: string;
  organism: string;
  imageUrl: string;
}

export async function fetchKeggPathways(geneName: string): Promise<KeggPathway[]> {
  try {
    const { data } = await providerGet<string>(
      "kegg", `${KEGG_BASE}/find/pathway/${encodeURIComponent(geneName)}`
    );
    const text = typeof data === "string" ? data : "";
    return text.split("\n").filter(Boolean).map((line) => {
      const [id, name] = line.split("\t");
      return {
        id: id?.trim() ?? "",
        name: name?.trim() ?? "",
        organism: "hsa",
        imageUrl: `https://www.genome.jp/kegg/pathway/${id?.trim().replace("map", "hsa")}`,
      };
    }).slice(0, 10);
  } catch {
    return [];
  }
}

export async function fetchKeggGeneInfo(geneId: string): Promise<Record<string, string>> {
  try {
    const { data } = await providerGet<string>(
      "kegg", `${KEGG_BASE}/get/hsa:${encodeURIComponent(geneId)}`
    );
    const text = typeof data === "string" ? data : "";
    const info: Record<string, string> = {};
    let currentKey = "";
    for (const line of text.split("\n")) {
      if (/^[A-Z]/.test(line)) {
        const parts = line.match(/^(\S+)\s+(.*)/);
        if (parts) { currentKey = parts[1]; info[currentKey] = parts[2]; }
      } else if (currentKey) {
        info[currentKey] += " " + line.trim();
      }
    }
    return info;
  } catch {
    return {};
  }
}
