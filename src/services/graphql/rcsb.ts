import { scheduleProviderRequest } from "../api/request-manager";
import { getCachedJsonHit, setCachedJson } from "../cache/tiered-cache";
import type { ProviderResponse } from "../integrations/http";
import type { CacheLayer } from "../../types/intelligence";

export interface RcsbGraphqlLigand {
  id?: string;
  name?: string;
  formula?: string;
  formula_weight?: number;
  type?: string;
}

export interface RcsbGraphqlEntry {
  rcsb_id: string;
  struct?: {
    title?: string;
    pdbx_descriptor?: string;
  };
  exptl?: Array<{
    method?: string;
  }>;
  rcsb_entry_info?: {
    resolution_combined?: number[];
    deposited_atom_count?: number;
    polymer_entity_count?: number;
  };
  polymer_entities?: Array<{
    entity_poly?: {
      pdbx_seq_one_letter_code_can?: string;
      rcsb_sample_sequence_length?: number;
      type?: string;
    };
    rcsb_polymer_entity?: {
      pdbx_description?: string;
      formula_weight?: number;
    };
    rcsb_polymer_entity_container_identifiers?: {
      auth_asym_ids?: string[];
      asym_ids?: string[];
      uniprot_ids?: string[];
    };
    rcsb_entity_source_organism?: Array<{
      ncbi_scientific_name?: string;
      ncbi_taxonomy_id?: number;
    }>;
  }>;
  nonpolymer_entities?: Array<{
    pdbx_entity_nonpoly?: {
      comp_id?: string;
      name?: string;
    };
    nonpolymer_comp?: {
      chem_comp?: RcsbGraphqlLigand;
    };
  }>;
}

interface RcsbGraphqlResponse {
  entry: RcsbGraphqlEntry | null;
}

const RCSB_GRAPHQL_ENDPOINT = "https://data.rcsb.org/graphql";
const CACHE_TTL_SECONDS = 12 * 60 * 60;

export async function fetchRcsbEntryGraphQL(pdbId: string): Promise<ProviderResponse<RcsbGraphqlEntry | null>> {
  const normalizedId = pdbId.toUpperCase();
  const cacheKey = `rcsb:graphql:entry:${normalizedId}`;
  const cached = await getCachedJsonHit<RcsbGraphqlEntry | null>(cacheKey);

  if (cached) {
    return {
      data: cached.value,
      cacheHit: true,
      cacheLayer: cached.layer as CacheLayer,
      stale: cached.state === "stale"
    };
  }

  const data = await scheduleProviderRequest("rcsb", async () => {
    const { request, gql } = await import("graphql-request");
    const query = gql`
      query BioAlignStructureSummary($id: String!) {
        entry(entry_id: $id) {
          rcsb_id
          struct {
            title
            pdbx_descriptor
          }
          exptl {
            method
          }
          rcsb_entry_info {
            resolution_combined
            deposited_atom_count
            polymer_entity_count
          }
          polymer_entities {
            entity_poly {
              pdbx_seq_one_letter_code_can
              rcsb_sample_sequence_length
              type
            }
            rcsb_polymer_entity {
              pdbx_description
              formula_weight
            }
            rcsb_polymer_entity_container_identifiers {
              auth_asym_ids
              asym_ids
              uniprot_ids
            }
            rcsb_entity_source_organism {
              ncbi_scientific_name
              ncbi_taxonomy_id
            }
          }
          nonpolymer_entities {
            pdbx_entity_nonpoly {
              comp_id
              name
            }
            nonpolymer_comp {
              chem_comp {
                id
                name
                formula
                formula_weight
                type
              }
            }
          }
        }
      }
    `;
    const response = await request<RcsbGraphqlResponse>(RCSB_GRAPHQL_ENDPOINT, query, { id: normalizedId });
    return response.entry;
  });

  await setCachedJson(cacheKey, data, CACHE_TTL_SECONDS);
  return { data, cacheHit: false };
}
