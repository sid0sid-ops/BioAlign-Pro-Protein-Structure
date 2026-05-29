import type { ProteinPack } from "./protein-pack-types";

const UNIPROT_BASE = "https://rest.uniprot.org/uniprotkb";
const ALPHAFOLD_BASE = "https://alphafold.ebi.ac.uk/api/prediction";
const RCSB_BASE = "https://data.rcsb.org/rest/v1/core";

interface UniProtFeature {
  type?: string;
  description?: string;
  location?: {
    start?: { value?: number };
    end?: { value?: number };
  };
}

interface UniProtCrossReference {
  database?: string;
  id: string;
  properties?: Array<{ key: string; value?: string }>;
}

interface UniProtEntry {
  primaryAccession?: string;
  uniProtkbId?: string;
  proteinDescription?: {
    recommendedName?: { fullName?: { value?: string } };
    submissionNames?: Array<{ fullName?: { value?: string } }>;
  };
  genes?: Array<{ geneName?: { value?: string } }>;
  organism?: {
    scientificName?: string;
    commonName?: string;
    taxonId?: number;
  };
  sequence?: {
    value?: string;
    length?: number;
    molWeight?: number;
    crc64?: string;
  };
  uniProtKBCrossReferences?: UniProtCrossReference[];
  features?: UniProtFeature[];
}

interface AlphaFoldPrediction {
  entryId?: string;
  modelEntityId?: string;
  pdbUrl?: string;
  cifUrl?: string;
  bcifUrl?: string;
  paeDocUrl?: string;
  plddtDocUrl?: string;
  confidenceAvg?: number;
  globalMetricValue?: number;
}

interface RcsbEntry {
  struct?: { title?: string };
  exptl?: Array<{ method?: string }>;
  rcsb_entry_info?: {
    resolution_combined?: number[];
  };
}

interface RcsbPolymerEntity {
  entity_poly?: {
    pdbx_seq_one_letter_code_can?: string;
  };
  rcsb_polymer_entity?: {
    pdbx_description?: string;
  };
  rcsb_polymer_entity_container_identifiers?: {
    auth_asym_ids?: string[];
    uniprot_ids?: string[];
  };
  rcsb_entity_source_organism?: Array<{
    scientific_name?: string;
    ncbi_taxonomy_id?: number;
  }>;
}

async function fetchJson<T>(url: string): Promise<T | null> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12_000);
  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: { Accept: "application/json" }
    });
    if (!response.ok) return null;
    return (await response.json()) as T;
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

function findReferenceProperty(reference: UniProtCrossReference, key: string) {
  return reference.properties?.find((property) => property.key === key)?.value;
}

function uniprotToPack(entry: UniProtEntry | null, alphaFold: AlphaFoldPrediction[] | null): ProteinPack | null {
  if (!entry?.primaryAccession) return null;
  const accession = entry.primaryAccession;
  const geneName = entry.genes?.[0]?.geneName?.value ?? accession;
  const proteinName =
    entry.proteinDescription?.recommendedName?.fullName?.value ??
    entry.proteinDescription?.submissionNames?.[0]?.fullName?.value ??
    entry.uniProtkbId ??
    accession;
  const pdbStructures =
    entry.uniProtKBCrossReferences
      ?.filter((reference) => reference.database === "PDB")
      .slice(0, 12)
      .map((reference) => ({
        pdbId: reference.id,
        method: findReferenceProperty(reference, "Method"),
        resolution: findReferenceProperty(reference, "Resolution"),
        chains: findReferenceProperty(reference, "Chains"),
        source: "UniProt browser API"
      })) ?? [];
  const alphaFoldModel = alphaFold?.[0];

  return {
    schemaVersion: "bioalign.browser-api-pack.v1",
    generatedAt: new Date().toISOString(),
    accession,
    geneName,
    proteinName,
    aliases: [accession, geneName, proteinName],
    organism: {
      scientificName: entry.organism?.scientificName ?? "Unknown organism",
      commonName: entry.organism?.commonName,
      taxonId: entry.organism?.taxonId
    },
    sequence: {
      value: entry.sequence?.value ?? "",
      length: entry.sequence?.length ?? 0,
      molecularWeight: entry.sequence?.molWeight,
      checksum: entry.sequence?.crc64,
      source: "UniProt browser API"
    },
    sequenceType: "protein",
    domains:
      entry.features
        ?.filter((feature) => ["Domain", "Region", "Motif", "Binding site", "Active site"].includes(feature.type ?? ""))
        .slice(0, 20)
        .map((feature) => ({
          name: feature.description || feature.type || "Feature",
          type: feature.type ?? "Feature",
          start: feature.location?.start?.value,
          end: feature.location?.end?.value,
          source: "UniProt browser API"
        })) ?? [],
    motifs: [],
    pdbStructures,
    alphaFold: {
      available: Boolean(alphaFoldModel),
      modelId: alphaFoldModel?.entryId ?? alphaFoldModel?.modelEntityId,
      pdbUrl: alphaFoldModel?.pdbUrl,
      cifUrl: alphaFoldModel?.cifUrl,
      bcifUrl: alphaFoldModel?.bcifUrl,
      paeUrl: alphaFoldModel?.paeDocUrl,
      plddtUrl: alphaFoldModel?.plddtDocUrl,
      confidenceAvg: alphaFoldModel?.confidenceAvg ?? alphaFoldModel?.globalMetricValue
    },
    templates: pdbStructures.slice(0, 6).map((structure, index) => ({
      id: `${structure.pdbId}-${index + 1}`,
      pdbId: structure.pdbId,
      label: structure.method ?? "Browser API structure",
      score: null,
      rankReason: "Structure listed from browser-safe public metadata; no template-ranking score was computed.",
      source: structure.source
    })),
    confidenceCards: [
      {
        id: "browser-api-confidence",
        label: "Browser API metadata",
        value: "loaded",
        detail: "Loaded directly from CORS-enabled public APIs in the browser.",
        source: "Optional Live API"
      }
    ],
    pathways: [],
    interactions: [],
    diseaseSummary: "Live browser API metadata loaded. Review primary databases for clinical interpretation.",
    sourceBadges: ["browser API", "cached in IndexedDB", "no private API key"]
  };
}

async function fetchRcsbPdbPack(pdbId: string): Promise<ProteinPack | null> {
  const normalizedPdbId = pdbId.toUpperCase();
  const [entry, entity] = await Promise.all([
    fetchJson<RcsbEntry>(`${RCSB_BASE}/entry/${encodeURIComponent(normalizedPdbId)}`),
    fetchJson<RcsbPolymerEntity>(`${RCSB_BASE}/polymer_entity/${encodeURIComponent(normalizedPdbId)}/1`)
  ]);

  if (!entry && !entity) return null;

  const uniprotAccession = entity?.rcsb_polymer_entity_container_identifiers?.uniprot_ids?.[0];
  const alphaFold = uniprotAccession
    ? await fetchJson<AlphaFoldPrediction[]>(`${ALPHAFOLD_BASE}/${encodeURIComponent(uniprotAccession)}`)
    : null;
  const sequence = entity?.entity_poly?.pdbx_seq_one_letter_code_can?.replace(/\s+/g, "") ?? "";
  const proteinName = entity?.rcsb_polymer_entity?.pdbx_description ?? entry?.struct?.title ?? `PDB ${normalizedPdbId}`;
  const chains = entity?.rcsb_polymer_entity_container_identifiers?.auth_asym_ids?.join(", ");
  const resolution = entry?.rcsb_entry_info?.resolution_combined?.[0];
  const alphaFoldModel = alphaFold?.[0];

  return {
    schemaVersion: "bioalign.browser-api-pack.v1",
    generatedAt: new Date().toISOString(),
    accession: uniprotAccession ?? normalizedPdbId,
    geneName: uniprotAccession ?? normalizedPdbId,
    proteinName,
    aliases: [normalizedPdbId, uniprotAccession ?? "", proteinName].filter(Boolean),
    organism: {
      scientificName: entity?.rcsb_entity_source_organism?.[0]?.scientific_name ?? "Unknown organism",
      taxonId: entity?.rcsb_entity_source_organism?.[0]?.ncbi_taxonomy_id
    },
    sequence: {
      value: sequence,
      length: sequence.length,
      source: "RCSB browser API"
    },
    sequenceType: "protein",
    domains: [],
    motifs: [],
    pdbStructures: [
      {
        pdbId: normalizedPdbId,
        method: entry?.exptl?.[0]?.method,
        resolution: resolution ? `${resolution} A` : undefined,
        chains,
        source: "RCSB browser API"
      }
    ],
    alphaFold: {
      available: Boolean(alphaFoldModel),
      modelId: alphaFoldModel?.entryId ?? alphaFoldModel?.modelEntityId,
      pdbUrl: alphaFoldModel?.pdbUrl,
      cifUrl: alphaFoldModel?.cifUrl,
      bcifUrl: alphaFoldModel?.bcifUrl,
      paeUrl: alphaFoldModel?.paeDocUrl,
      plddtUrl: alphaFoldModel?.plddtDocUrl,
      confidenceAvg: alphaFoldModel?.confidenceAvg ?? alphaFoldModel?.globalMetricValue
    },
    templates: [
      {
        id: `${normalizedPdbId}-rcsb`,
        pdbId: normalizedPdbId,
        label: entry?.exptl?.[0]?.method ?? "RCSB structure",
        score: null,
        rankReason: "Direct PDB query result; no template-ranking score was computed.",
        source: "RCSB browser API"
      }
    ],
    confidenceCards: [
      {
        id: "rcsb-browser-api",
        label: "RCSB metadata",
        value: sequence ? "sequence loaded" : "metadata only",
        detail: sequence
          ? "PDB metadata and polymer sequence loaded from CORS-enabled RCSB APIs."
          : "PDB metadata loaded, but the first polymer sequence was not available.",
        source: "RCSB PDB"
      }
    ],
    pathways: [],
    interactions: [],
    diseaseSummary: "Live PDB metadata loaded in the browser. Biological interpretation depends on the deposited structure context.",
    sourceBadges: ["browser API", "RCSB", "cached in IndexedDB", "no private API key"]
  };
}

export async function fetchProteinFromBrowserApis(query: string, detectedType: string): Promise<ProteinPack | null> {
  if (detectedType === "pdb_id") {
    return fetchRcsbPdbPack(query);
  }

  let accession = detectedType === "uniprot_accession" ? query.toUpperCase() : "";

  if (!accession && detectedType !== "pdb_id") {
    const search = await fetchJson<{ results?: UniProtEntry[] }>(
      `${UNIPROT_BASE}/search?query=${encodeURIComponent(query)}&format=json&size=1`
    );
    accession = search?.results?.[0]?.primaryAccession ?? "";
  }

  if (!accession) return null;

  const [entry, alphaFold] = await Promise.all([
    fetchJson<UniProtEntry>(`${UNIPROT_BASE}/${encodeURIComponent(accession)}.json`),
    fetchJson<AlphaFoldPrediction[]>(`${ALPHAFOLD_BASE}/${encodeURIComponent(accession)}`)
  ]);

  return uniprotToPack(entry, alphaFold);
}
