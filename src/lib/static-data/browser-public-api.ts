import type { ProteinPack } from "./protein-pack-types";
import type {
  DomainAnnotation,
  ExperimentalStructure,
  PlddtMetric,
  ProteinPipelineStep,
  SourceMetadata,
  StructureIntelligencePack
} from "@/lib/structure-intelligence/types";

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

interface UniProtComment {
  commentType?: string;
  texts?: Array<{ value?: string }>;
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
  comments?: UniProtComment[];
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
  rcsb_accession_info?: { initial_release_date?: string };
  rcsb_entry_info?: {
    resolution_combined?: number[];
  };
  nonpolymer_entities?: Array<{ pdbx_entity_nonpoly?: { comp_id?: string; name?: string } }>;
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

const DISPLAY_FEATURE_TYPES = new Set([
  "Chain",
  "Peptide",
  "Propeptide",
  "Transit peptide",
  "Signal peptide",
  "Domain",
  "Region",
  "Repeat",
  "Motif",
  "Compositional bias",
  "Binding site",
  "Active site",
  "Site",
  "Disulfide bond",
  "Modified residue",
  "Glycosylation",
  "Lipidation",
  "Cross-link"
]);

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

function extractComments(entry: UniProtEntry | null, types: string[]) {
  return (
    entry?.comments
      ?.filter((comment) => types.includes(comment.commentType ?? ""))
      .flatMap((comment) => comment.texts?.map((text) => text.value).filter((value): value is string => Boolean(value)) ?? [])
      .slice(0, 8) ?? []
  );
}

function extractCrossReferences(entry: UniProtEntry | null) {
  return (
    entry?.uniProtKBCrossReferences
      ?.map((reference) => ({ database: reference.database ?? "Unknown", id: reference.id }))
      .filter((reference) => reference.database && reference.id)
      .slice(0, 180) ?? []
  );
}

function featureKind(type: string): DomainAnnotation["type"] {
  if (/site|bond|residue|glycosylation|lipidation|cross-link/i.test(type)) return "site";
  if (/motif/i.test(type)) return "motif";
  if (/repeat/i.test(type)) return "repeat";
  if (/family/i.test(type)) return "family";
  if (/region|chain|peptide|signal|transit|bias/i.test(type)) return "region";
  return "domain";
}

function featureRange(feature: UniProtFeature) {
  const start = feature.location?.start?.value;
  const end = feature.location?.end?.value ?? start;
  if (!start || !end) return null;
  return { start, end };
}

function featureToDomain(feature: UniProtFeature, index: number, accession: string): DomainAnnotation | null {
  const range = featureRange(feature);
  if (!range) return null;
  const type = feature.type ?? "Feature";
  return {
    id: `T${index + 1}`,
    name: feature.description || type,
    sourceDatabase: "UniProt",
    type: featureKind(type),
    start: range.start,
    end: range.end,
    description: feature.description || type,
    evidence: "UniProt feature annotation",
    sourceUrl: `https://www.uniprot.org/uniprotkb/${accession}/entry`
  };
}

function parsePlddtValues(confidence: unknown) {
  const payload = confidence as { confidenceScore?: unknown; plddt?: unknown } | number[] | null;
  if (Array.isArray(payload)) {
    return payload.filter((value): value is number => Number.isFinite(value));
  }
  const raw = payload?.confidenceScore ?? payload?.plddt;
  return Array.isArray(raw) ? raw.filter((value): value is number => Number.isFinite(value)) : [];
}

function confidenceRegions(values: number[], predicate: (value: number) => boolean, label: string) {
  const out: Array<{ start: number; end: number; mean: number; label: string }> = [];
  let start = -1;
  let total = 0;
  for (let index = 0; index <= values.length; index += 1) {
    const value = values[index];
    const active = typeof value === "number" && predicate(value);
    if (active && start === -1) {
      start = index;
      total = value;
    } else if (active) {
      total += value;
    }
    if ((!active || index === values.length) && start !== -1) {
      const length = index - start;
      if (length >= 5) out.push({ start: start + 1, end: index, mean: Number((total / length).toFixed(2)), label });
      start = -1;
      total = 0;
    }
  }
  return out.slice(0, 12);
}

function parsePlddtConfidence(confidence: unknown, fallbackMean?: number): PlddtMetric {
  const values = parsePlddtValues(confidence);
  if (!values.length && fallbackMean) {
    const mean = Number(fallbackMean.toFixed(2));
    return {
      available: true,
      mean,
      median: mean,
      bins: { veryHigh_90_100: 0, confident_70_90: 0, low_50_70: 0, veryLow_0_50: 0 },
      perResidue: [],
      lowConfidenceRegions: [],
      highConfidenceRegions: [],
      source: "AlphaFold DB"
    };
  }
  if (!values.length) {
    return {
      available: false,
      reason: "No per-residue pLDDT confidence data was returned by AlphaFold DB.",
      method: "AlphaFold confidence JSON parsing",
      source: "AlphaFold DB"
    };
  }

  const sorted = [...values].sort((left, right) => left - right);
  const midpoint = Math.floor(sorted.length / 2);
  const median = sorted.length % 2 ? sorted[midpoint] : (sorted[midpoint - 1] + sorted[midpoint]) / 2;
  return {
    available: true,
    mean: Number((values.reduce((sum, value) => sum + value, 0) / values.length).toFixed(2)),
    median: Number(median.toFixed(2)),
    bins: {
      veryHigh_90_100: Number((values.filter((value) => value >= 90).length / values.length).toFixed(3)),
      confident_70_90: Number((values.filter((value) => value >= 70 && value < 90).length / values.length).toFixed(3)),
      low_50_70: Number((values.filter((value) => value >= 50 && value < 70).length / values.length).toFixed(3)),
      veryLow_0_50: Number((values.filter((value) => value < 50).length / values.length).toFixed(3))
    },
    perResidue: values,
    lowConfidenceRegions: confidenceRegions(values, (value) => value < 70, "Low pLDDT"),
    highConfidenceRegions: confidenceRegions(values, (value) => value >= 90, "Very high pLDDT"),
    source: "AlphaFold DB"
  };
}

async function enrichRcsbStructures(pdbStructures: ProteinPack["pdbStructures"], accession: string): Promise<ExperimentalStructure[]> {
  return Promise.all(
    pdbStructures.slice(0, 10).map(async (structure) => {
      const entry = await fetchJson<RcsbEntry>(`${RCSB_BASE}/entry/${encodeURIComponent(structure.pdbId)}`);
      const chains = (structure.chains ?? "")
        .split(/[,\s=/-]+/)
        .map((chain) => chain.trim())
        .filter((chain) => /^[A-Za-z0-9]+$/.test(chain))
        .slice(0, 12);
      return {
        pdbId: structure.pdbId,
        title: entry?.struct?.title,
        experimentalMethod: structure.method ?? entry?.exptl?.[0]?.method,
        resolution: Number.parseFloat(structure.resolution ?? "") || entry?.rcsb_entry_info?.resolution_combined?.[0] || null,
        chains,
        polymerEntities: [
          {
            entityId: "browser-record",
            description: entry?.struct?.title,
            chains,
            relatedUniProtIds: accession ? [accession] : []
          }
        ],
        ligands:
          entry?.nonpolymer_entities
            ?.map((entity) => ({ id: entity.pdbx_entity_nonpoly?.comp_id ?? "", name: entity.pdbx_entity_nonpoly?.name }))
            .filter((ligand) => ligand.id)
            .slice(0, 16) ?? [],
        relatedUniProtIds: accession ? [accession] : [],
        releaseDate: entry?.rcsb_accession_info?.initial_release_date,
        source: {
          name: "RCSB PDB Data API",
          url: `https://data.rcsb.org/rest/v1/core/entry/${structure.pdbId}`,
          accessedAt: new Date().toISOString(),
          sourceType: "RCSB PDB"
        }
      };
    })
  );
}

function buildPipeline(pack: ProteinPack, hasPlddt: boolean): ProteinPipelineStep[] {
  return [
    {
      step: "Sequence Retrieval",
      status: pack.sequence.value ? "complete" : "partial",
      dataUsed: ["UniProtKB or RCSB polymer sequence"],
      output: pack.sequence.value ? `${pack.sequence.length} residues loaded.` : "Only sequence length was available.",
      source: pack.sequence.source
    },
    {
      step: "Experimental Structure Discovery",
      status: pack.pdbStructures.length ? "complete" : "missing",
      dataUsed: ["UniProt PDB cross-references", "RCSB PDB Data API"],
      output: `${pack.pdbStructures.length} PDB structure record(s) mapped.`,
      source: "RCSB PDB"
    },
    {
      step: "AlphaFold Confidence",
      status: hasPlddt ? "complete" : pack.alphaFold.available ? "partial" : "missing",
      dataUsed: ["AlphaFold DB prediction endpoint", "pLDDT document when available"],
      output: hasPlddt ? "AlphaFold pLDDT parsed." : "No pLDDT metric was available in the current source response.",
      source: "AlphaFold DB"
    },
    {
      step: "Structure Validation",
      status: "missing",
      dataUsed: ["PDB/mmCIF coordinates", "AlphaFold coordinates", "TM-align or US-align"],
      output: "RMSD/TM-score are not shown until valid coordinate superposition is produced.",
      source: "Build-time Computed"
    }
  ];
}

function coverageFromDomains(domains: DomainAnnotation[], sequenceLength: number) {
  if (!domains.length || !sequenceLength) {
    return {
      available: false,
      coveredResidues: 0,
      sequenceLength,
      percent: 0,
      source: "UniProt browser API",
      reason: "No feature ranges were available."
    };
  }
  const covered = new Set<number>();
  domains.forEach((domain) => {
    for (let position = domain.start; position <= domain.end; position += 1) {
      covered.add(position);
    }
  });
  return {
    available: true,
    coveredResidues: covered.size,
    sequenceLength,
    percent: Number(((covered.size / sequenceLength) * 100).toFixed(1)),
    source: "UniProt browser API"
  };
}

async function buildBrowserStructureIntelligence(
  pack: ProteinPack,
  entry: UniProtEntry | null,
  alphaFoldModel?: AlphaFoldPrediction
): Promise<StructureIntelligencePack> {
  const sourceFeatures = entry?.features?.filter((feature) => DISPLAY_FEATURE_TYPES.has(feature.type ?? "")) ?? [];
  const features = sourceFeatures.map((feature) => ({
    type: feature.type ?? "Feature",
    description: feature.description ?? feature.type ?? "Feature",
    start: feature.location?.start?.value,
    end: feature.location?.end?.value,
    source: "UniProt browser API"
  }));
  const domains = sourceFeatures
    .map((feature, index) => featureToDomain(feature, index, pack.accession))
    .filter((domain): domain is DomainAnnotation => Boolean(domain))
    .slice(0, 120);
  const experimental = await enrichRcsbStructures(pack.pdbStructures, pack.accession);
  const confidencePayload = alphaFoldModel?.plddtDocUrl ? await fetchJson<unknown>(alphaFoldModel.plddtDocUrl) : null;
  const plddt = parsePlddtConfidence(confidencePayload, pack.alphaFold.confidenceAvg);
  const functionComments = extractComments(entry, ["FUNCTION", "SUBUNIT", "ACTIVITY REGULATION"]);
  const diseaseComments = extractComments(entry, ["DISEASE", "BIOTECHNOLOGY"]);
  const ligandCount = experimental.reduce((count, structure) => count + structure.ligands.length, 0);
  const sources: SourceMetadata[] = [
    {
      name: entry ? "UniProtKB REST API" : "RCSB PDB Data API",
      url: entry ? `${UNIPROT_BASE}/${pack.accession}.json` : `https://data.rcsb.org/rest/v1/core/entry/${pack.accession}`,
      accessedAt: new Date().toISOString(),
      sourceType: entry ? "UniProt" : "RCSB PDB"
    },
    ...experimental.slice(0, 2).map((structure) => structure.source),
    ...(pack.alphaFold.available
      ? [
          {
            name: "AlphaFold DB API",
            url: `https://alphafold.ebi.ac.uk/entry/${pack.accession}`,
            accessedAt: new Date().toISOString(),
            sourceType: "AlphaFold DB" as const
          }
        ]
      : [])
  ];

  return {
    schemaVersion: "bioalign.structure-intelligence.v1",
    generatedAt: new Date().toISOString(),
    protein: {
      accession: pack.accession,
      name: pack.proteinName,
      gene: pack.geneName,
      organism: pack.organism.scientificName,
      sequence: pack.sequence.value,
      length: pack.sequence.length,
      functionComments,
      features,
      crossReferences: extractCrossReferences(entry)
    },
    structures: {
      experimental,
      predicted: pack.alphaFold.available
        ? [
            {
              provider: "AlphaFold DB",
              modelId: pack.alphaFold.modelId || `AF-${pack.accession}-F1`,
              modelUrl: pack.alphaFold.pdbUrl,
              cifUrl: pack.alphaFold.cifUrl,
              pdbUrl: pack.alphaFold.pdbUrl,
              bcifUrl: pack.alphaFold.bcifUrl,
              paeUrl: pack.alphaFold.paeUrl,
              plddtUrl: pack.alphaFold.plddtUrl,
              meanPlddt: pack.alphaFold.confidenceAvg,
              source: sources.find((source) => source.sourceType === "AlphaFold DB") ?? {
                name: "AlphaFold DB API",
                sourceType: "AlphaFold DB"
              }
            }
          ]
        : []
    },
    domains,
    msa: {
      available: false,
      method: "Browser-side homolog MSA",
      alignedSequences: [],
      consensus: "",
      conservationScores: [],
      gapFrequencies: [],
      sourceSequenceCount: 0,
      source: "UniProt browser homolog search",
      unavailableReason: "Conservation is shown only after a real MSA is generated from homolog sequences."
    },
    profileEvidence: domains.slice(0, 30).map((domain) => ({
      profileId: domain.id,
      profileName: domain.name,
      database: domain.sourceDatabase,
      start: domain.start,
      end: domain.end,
      score: null,
      eValue: null,
      description: domain.description,
      interpretation: "Feature/profile evidence imported from UniProt browser API."
    })),
    conservedResidues: [],
    metrics: {
      rmsdComparisons: [
        {
          available: false,
          reason: "No RMSD is displayed because no valid coordinate superposition result is stored for this record.",
          method: "TM-align/US-align coordinate superposition",
          source: "Build-time Computed"
        }
      ],
      tmScoreComparisons: [
        {
          available: false,
          reason: "No TM-score is displayed because no valid coordinate superposition result is stored for this record.",
          method: "TM-align/US-align coordinate superposition",
          source: "Build-time Computed"
        }
      ],
      plddt,
      pae: {
        available: false,
        reason: pack.alphaFold.paeUrl
          ? "AlphaFold DB provides a PAE source link, but the full matrix is not embedded in this browser record."
          : "No AlphaFold PAE matrix was available for this accession.",
        method: "AlphaFold PAE JSON parsing",
        source: "AlphaFold DB"
      },
      domainCoverage: coverageFromDomains(domains, pack.sequence.length),
      conservationSummary: null
    },
    structureFunction: {
      summary: functionComments[0] ?? diseaseComments[0] ?? pack.diseaseSummary,
      evidenceCards: [
        ...(functionComments[0]
          ? [
              {
                title: "UniProt function",
                claim: functionComments[0],
                evidence: ["UniProt function comment"],
                confidence: "high" as const,
                source: "UniProt"
              }
            ]
          : []),
        ...(domains.length
          ? [
              {
                title: "Feature evidence",
                claim: `${domains.length} source feature/domain records are mapped.`,
                evidence: domains.slice(0, 6).map((domain) => domain.name),
                confidence: "medium" as const,
                source: "UniProt"
              }
            ]
          : []),
        ...(ligandCount
          ? [
              {
                title: "Ligand evidence",
                claim: `${ligandCount} ligand annotations are present in mapped RCSB records.`,
                evidence: [`${ligandCount} ligand annotations`],
                confidence: "medium" as const,
                source: "RCSB PDB"
              }
            ]
          : [])
      ],
      warnings: ["RMSD/TM-score are not displayed without a successful coordinate superposition result."]
    },
    intelligence: {
      structureFunctionSummary: functionComments[0] ?? diseaseComments[0] ?? pack.diseaseSummary,
      sequenceStructureFunctionPipeline: buildPipeline(pack, plddt.available),
      warnings: ["Browser records are cached locally after loading; source database records should be checked for clinical interpretation."],
      confidenceNotes: ["Direct database fields are separated from computed, partial, and missing values."],
      sourceBadges: [
        ...(entry ? (["UniProt"] as const) : []),
        ...(experimental.length ? (["RCSB PDB"] as const) : []),
        ...(pack.alphaFold.available ? (["AlphaFold DB"] as const) : []),
        "Optional Live API"
      ]
    },
    sources
  };
}

async function uniprotToPack(entry: UniProtEntry | null, alphaFold: AlphaFoldPrediction[] | null): Promise<ProteinPack | null> {
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
      .slice(0, 14)
      .map((reference) => ({
        pdbId: reference.id,
        method: findReferenceProperty(reference, "Method"),
        resolution: findReferenceProperty(reference, "Resolution"),
        chains: findReferenceProperty(reference, "Chains"),
        source: "UniProt browser API"
      })) ?? [];
  const alphaFoldModel = alphaFold?.[0];
  const sourceFeatures = entry.features?.filter((feature) => DISPLAY_FEATURE_TYPES.has(feature.type ?? "")) ?? [];
  const diseaseComments = extractComments(entry, ["DISEASE", "BIOTECHNOLOGY"]);
  const functionComments = extractComments(entry, ["FUNCTION", "SUBUNIT", "ACTIVITY REGULATION"]);

  const pack: ProteinPack = {
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
    domains: sourceFeatures.slice(0, 120).map((feature) => ({
      name: feature.description || feature.type || "Feature",
      type: feature.type ?? "Feature",
      start: feature.location?.start?.value,
      end: feature.location?.end?.value,
      source: "UniProt browser API"
    })),
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
    templates: pdbStructures.slice(0, 8).map((structure, index) => ({
      id: `${structure.pdbId}-${index + 1}`,
      pdbId: structure.pdbId,
      label: structure.method ?? "Browser API structure",
      score: null,
      rankReason: "Structure listed from public metadata; no template-ranking score was computed.",
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
    pathways:
      entry.uniProtKBCrossReferences
        ?.filter((reference) => ["Reactome", "KEGG"].includes(reference.database ?? ""))
        .slice(0, 12)
        .map((reference) => ({ id: reference.id, name: reference.id, source: reference.database ?? "UniProt cross-reference" })) ?? [],
    interactions:
      entry.uniProtKBCrossReferences
        ?.filter((reference) => ["IntAct", "STRING", "BioGRID"].includes(reference.database ?? ""))
        .slice(0, 12)
        .map((reference) => ({ target: reference.id, score: null, source: reference.database ?? "UniProt cross-reference" })) ?? [],
    diseaseSummary: diseaseComments[0] ?? functionComments[0] ?? "No disease or function comment was returned in the browser UniProt record.",
    sourceBadges: ["browser API", "cached in IndexedDB", "no private API key"]
  };

  pack.structureIntelligence = await buildBrowserStructureIntelligence(pack, entry, alphaFoldModel);
  return pack;
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

  const pack: ProteinPack = {
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

  pack.structureIntelligence = await buildBrowserStructureIntelligence(pack, null, alphaFoldModel);
  return pack;
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
