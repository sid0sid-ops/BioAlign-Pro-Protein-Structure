/**
 * PubChem Integration — Small molecule / ligand data
 */
import { providerGet } from "./http";

const PUBCHEM_BASE = "https://pubchem.ncbi.nlm.nih.gov/rest/pug";

export interface PubChemCompound {
  cid: number;
  name: string;
  molecularFormula: string;
  molecularWeight: number;
  smiles: string;
  imageUrl: string;
}

export async function searchPubChemByProtein(proteinName: string, maxResults = 10): Promise<PubChemCompound[]> {
  try {
    const { data: searchData } = await providerGet<any>(
      "pubchem",
      `${PUBCHEM_BASE}/compound/name/${encodeURIComponent(proteinName)}/cids/JSON`
    );
    const cids: number[] = (searchData?.IdentifierList?.CID ?? []).slice(0, maxResults);
    if (cids.length === 0) return [];

    const { data: propData } = await providerGet<any>(
      "pubchem",
      `${PUBCHEM_BASE}/compound/cid/${cids.join(",")}/property/MolecularFormula,MolecularWeight,CanonicalSMILES,IUPACName/JSON`
    );

    return (propData?.PropertyTable?.Properties ?? []).map((prop: any) => ({
      cid: prop.CID,
      name: prop.IUPACName ?? `CID:${prop.CID}`,
      molecularFormula: prop.MolecularFormula ?? "",
      molecularWeight: prop.MolecularWeight ?? 0,
      smiles: prop.CanonicalSMILES ?? "",
      imageUrl: `${PUBCHEM_BASE}/compound/cid/${prop.CID}/PNG`,
    }));
  } catch {
    return [];
  }
}
