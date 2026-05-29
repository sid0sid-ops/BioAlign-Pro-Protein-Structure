import { providerGet } from "./http";

export interface EsmAtlasPrediction {
  id: string;
  sequence?: string;
  plddt?: number;
  structureUrl?: string;
}

export async function fetchEsmAtlasPrediction(id: string) {
  const baseUrl = process.env.ESM_ATLAS_BASE_URL ?? "https://api.esmatlas.com";
  return providerGet<EsmAtlasPrediction>("esm-atlas", `${baseUrl}/fetchPredictedStructure/${encodeURIComponent(id)}`);
}
