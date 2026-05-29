import { providerGet } from "./http";

export interface RcsbEntry {
  rcsb_id: string;
  struct?: { title?: string; pdbx_descriptor?: string };
  rcsb_entry_info?: {
    resolution_combined?: number[];
    experimental_method?: string;
    deposited_atom_count?: number;
    polymer_entity_count?: number;
  };
  rcsb_accession_info?: { deposit_date?: string; initial_release_date?: string };
  cell?: { length_a?: number; length_b?: number; length_c?: number };
}

export interface RcsbPolymerEntity {
  entity_id: string;
  rcsb_polymer_entity?: {
    pdbx_description?: string;
    formula_weight?: number;
  };
  entity_poly?: {
    pdbx_seq_one_letter_code?: string;
    pdbx_seq_one_letter_code_can?: string;
    rcsb_sample_sequence_length?: number;
    type?: string;
  };
  rcsb_entity_source_organism?: Array<{
    ncbi_scientific_name?: string;
    ncbi_taxonomy_id?: number;
  }>;
}

export async function fetchRcsbEntry(pdbId: string) {
  const baseUrl = process.env.RCSB_BASE_URL ?? "https://data.rcsb.org/rest/v1";
  return providerGet<RcsbEntry>("rcsb", `${baseUrl}/core/entry/${encodeURIComponent(pdbId.toUpperCase())}`);
}

export async function fetchRcsbPolymerEntities(pdbId: string) {
  const baseUrl = process.env.RCSB_BASE_URL ?? "https://data.rcsb.org/rest/v1";
  return providerGet<RcsbPolymerEntity[]>("rcsb", `${baseUrl}/core/polymer_entity/${encodeURIComponent(pdbId.toUpperCase())}`);
}

export async function searchRcsbBySequence(sequence: string, eValueCutoff = 0.01, identityCutoff = 0.3) {
  const query = {
    query: {
      type: "terminal",
      service: "sequence",
      parameters: {
        evalue_cutoff: eValueCutoff,
        identity_cutoff: identityCutoff,
        sequence_type: "protein",
        value: sequence,
      },
    },
    return_type: "entry",
    request_options: { results_content_type: ["experimental"], scoring_strategy: "sequence", paginate: { start: 0, rows: 15 } },
  };

  return providerGet<any>(
    "rcsb",
    `https://search.rcsb.org/rcsbsearch/v2/query?json=${encodeURIComponent(JSON.stringify(query))}`,
    {},
    1800
  );
}

export function getStructureFileUrl(pdbId: string, format: "pdb" | "cif" = "cif") {
  const id = pdbId.toLowerCase();
  if (format === "pdb") return `https://files.rcsb.org/download/${id}.pdb`;
  return `https://files.rcsb.org/download/${id}.cif`;
}
