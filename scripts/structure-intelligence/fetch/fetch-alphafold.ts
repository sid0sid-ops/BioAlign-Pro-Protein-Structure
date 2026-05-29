export interface BuildAlphaFoldPrediction {
  entryId?: string;
  modelEntityId?: string;
  globalMetricValue?: number;
  fractionPlddtVeryLow?: number;
  fractionPlddtLow?: number;
  fractionPlddtConfident?: number;
  fractionPlddtVeryHigh?: number;
  bcifUrl?: string;
  cifUrl?: string;
  pdbUrl?: string;
  paeDocUrl?: string;
  plddtDocUrl?: string;
  modelCreatedDate?: string;
  latestVersion?: number;
}

export async function fetchAlphaFold(accession: string): Promise<BuildAlphaFoldPrediction | null> {
  const response = await fetch(`https://alphafold.ebi.ac.uk/api/prediction/${encodeURIComponent(accession)}`, {
    headers: {
      Accept: "application/json",
      "User-Agent": "BioAlignProStaticBuild/1.0"
    }
  });
  if (!response.ok) return null;
  const predictions = (await response.json()) as BuildAlphaFoldPrediction[];
  return predictions[0] ?? null;
}
