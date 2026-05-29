import { providerGet } from "./http";

export interface AlphaFoldPrediction {
  entryId: string;
  gene?: string;
  uniprotAccession: string;
  uniprotId?: string;
  uniprotDescription?: string;
  taxId?: number;
  organismScientificName?: string;
  sequenceVersionDate?: string;
  latestVersion?: number;
  modelCreatedDate?: string;
  pdbUrl?: string;
  cifUrl?: string;
  bcifUrl?: string;
  paeDocUrl?: string;
  paeImageUrl?: string;
  confidenceAvg?: number;
  confidenceVersion?: number;
}

export async function fetchAlphaFoldPrediction(accession: string) {
  const baseUrl = process.env.ALPHAFOLD_BASE_URL ?? "https://alphafold.ebi.ac.uk/api";
  return providerGet<AlphaFoldPrediction[]>(
    "alphafold",
    `${baseUrl}/prediction/${encodeURIComponent(accession)}`
  );
}

export async function fetchAlphaFoldPAE(accession: string): Promise<{ predicted_aligned_error: number[][] } | null> {
  try {
    const paeUrl = `https://alphafold.ebi.ac.uk/files/AF-${accession}-F1-predicted_aligned_error_v4.json`;
    const { data } = await providerGet<any[]>("alphafold-pae", paeUrl, {}, 7200);
    return data?.[0] ?? null;
  } catch {
    return null;
  }
}

export async function fetchAlphaFoldPLDDT(accession: string): Promise<number[]> {
  try {
    const cifUrl = `https://alphafold.ebi.ac.uk/files/AF-${accession}-F1-model_v4.cif`;
    const { data } = await providerGet<string>("alphafold-plddt", cifUrl, {}, 7200);
    // Parse B-factor column from mmCIF for pLDDT values
    const text = typeof data === "string" ? data : "";
    const plddtValues: number[] = [];
    const lines = text.split("\n");
    for (const line of lines) {
      if (line.startsWith("ATOM") || line.startsWith("HETATM")) {
        const parts = line.split(/\s+/);
        const bFactor = parseFloat(parts[parts.length - 2] ?? "0");
        if (!isNaN(bFactor) && bFactor > 0) plddtValues.push(bFactor);
      }
    }
    // Deduplicate to per-residue (take first atom per residue)
    const perResidue: number[] = [];
    let lastResNum = -1;
    const atomLines = lines.filter(l => l.startsWith("ATOM"));
    for (const line of atomLines) {
      const parts = line.split(/\s+/);
      const resNum = parseInt(parts[8] ?? "0", 10);
      if (resNum !== lastResNum) {
        const bFactor = parseFloat(parts[parts.length - 2] ?? "0");
        if (!isNaN(bFactor)) perResidue.push(bFactor);
        lastResNum = resNum;
      }
    }
    return perResidue.length > 0 ? perResidue : plddtValues.slice(0, 500);
  } catch {
    return [];
  }
}

export function getAlphaFoldStructureUrl(accession: string, format: "pdb" | "cif" = "cif") {
  if (format === "pdb") return `https://alphafold.ebi.ac.uk/files/AF-${accession}-F1-model_v4.pdb`;
  return `https://alphafold.ebi.ac.uk/files/AF-${accession}-F1-model_v4.cif`;
}
