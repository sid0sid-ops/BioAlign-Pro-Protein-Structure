/**
 * InterPro Integration — Domain, family, and motif annotations
 */

import { providerGet } from "./http";

const INTERPRO_BASE = "https://www.ebi.ac.uk/interpro/api";

export interface InterProDomain {
  accession: string;
  name: string;
  type: "domain" | "family" | "homologous_superfamily" | "repeat" | "site" | "conserved_site" | "active_site" | "binding_site" | "ptm";
  source_database: string;
  description: string;
  start: number;
  end: number;
  score?: number;
}

export interface InterProResult {
  accession: string;
  domains: InterProDomain[];
  goTerms: Array<{ id: string; name: string; category: "molecular_function" | "biological_process" | "cellular_component" }>;
  pathways: Array<{ db: string; id: string; name: string }>;
}

/**
 * Fetch InterPro annotations for a UniProt accession
 */
export async function fetchInterProByAccession(accession: string): Promise<InterProResult> {
  try {
    const { data } = await providerGet<any>(
      "interpro",
      `${INTERPRO_BASE}/protein/uniprot/${encodeURIComponent(accession)}?page_size=200`
    );

    const domains: InterProDomain[] = [];
    const goTerms: InterProResult["goTerms"] = [];
    const pathways: InterProResult["pathways"] = [];

    if (data?.results) {
      for (const entry of data.results) {
        const meta = entry.metadata ?? {};
        const locations = entry.proteins?.[0]?.entry_protein_locations ?? [];

        for (const loc of locations) {
          for (const frag of loc.fragments ?? []) {
            domains.push({
              accession: meta.accession ?? "",
              name: meta.name ?? "",
              type: meta.type?.toLowerCase() ?? "domain",
              source_database: meta.source_database ?? "",
              description: meta.description?.[0] ?? "",
              start: frag.start ?? 0,
              end: frag.end ?? 0,
              score: frag.score,
            });
          }
        }

        if (meta.go_terms) {
          for (const go of meta.go_terms) {
            goTerms.push({
              id: go.identifier ?? "",
              name: go.name ?? "",
              category: go.category?.name?.toLowerCase().replace(/ /g, "_") ?? "molecular_function",
            });
          }
        }
      }
    }

    return { accession, domains, goTerms, pathways };
  } catch {
    return { accession, domains: [], goTerms: [], pathways: [] };
  }
}

/**
 * Search InterPro by sequence (uses InterProScan-like endpoint)
 */
export async function searchInterProBySequence(sequence: string): Promise<InterProDomain[]> {
  try {
    const { data } = await providerGet<any>(
      "interpro",
      `${INTERPRO_BASE}/protein/sequence/${encodeURIComponent(sequence.slice(0, 100))}`,
      {},
      1800
    );
    return data?.results?.flatMap((r: any) => {
      const meta = r.metadata ?? {};
      return (r.proteins?.[0]?.entry_protein_locations ?? []).flatMap((loc: any) =>
        (loc.fragments ?? []).map((f: any) => ({
          accession: meta.accession ?? "",
          name: meta.name ?? "",
          type: meta.type?.toLowerCase() ?? "domain",
          source_database: meta.source_database ?? "",
          description: "",
          start: f.start ?? 0,
          end: f.end ?? 0,
        }))
      );
    }) ?? [];
  } catch {
    return [];
  }
}
