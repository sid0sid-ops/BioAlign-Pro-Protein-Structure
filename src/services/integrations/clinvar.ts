/**
 * ClinVar Variant Integration — Disease mutations
 */
import { providerGet } from "./http";

const EUTILS_BASE = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils";

export interface ClinVarVariant {
  uid: string;
  title: string;
  clinicalSignificance: string;
  condition: string;
  geneSymbol: string;
  variationType: string;
  position: string;
  reviewStatus: string;
}

export async function fetchClinVarVariants(geneName: string, maxResults = 15): Promise<ClinVarVariant[]> {
  try {
    const searchRes = await providerGet<any>(
      "clinvar",
      `${EUTILS_BASE}/esearch.fcgi?db=clinvar&term=${encodeURIComponent(geneName)}[gene]&retmax=${maxResults}&retmode=json`
    );
    const ids: string[] = searchRes.data?.esearchresult?.idlist ?? [];
    if (ids.length === 0) return [];

    const summaryRes = await providerGet<any>(
      "clinvar",
      `${EUTILS_BASE}/esummary.fcgi?db=clinvar&id=${ids.join(",")}&retmode=json`
    );
    const result = summaryRes.data?.result ?? {};
    return ids.map((id) => {
      const item = result[id] ?? {};
      return {
        uid: id,
        title: item.title ?? "",
        clinicalSignificance: item.clinical_significance?.description ?? "",
        condition: item.trait_set?.[0]?.trait_name ?? "",
        geneSymbol: geneName,
        variationType: item.variation_set?.[0]?.variation_type ?? "",
        position: item.variation_set?.[0]?.canonical_spdi ?? "",
        reviewStatus: item.clinical_significance?.review_status ?? "",
      };
    }).filter((v) => v.title);
  } catch {
    return [];
  }
}
