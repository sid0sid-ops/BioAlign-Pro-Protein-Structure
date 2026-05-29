import pLimit from "p-limit";
import type {
  CacheLayer,
  ProteinIntelligence,
  ProviderExecutionStatus,
  ProviderTrace
} from "../../types/intelligence";
import { fetchAlphaFoldPrediction } from "../integrations/alphafold";
import { fetchClinVarVariants } from "../integrations/clinvar";
import { fetchInterProByAccession } from "../integrations/interpro";
import { fetchKeggPathways } from "../integrations/kegg";
import { searchPubChemByProtein } from "../integrations/pubchem";
import { fetchStringInteractions } from "../integrations/string-db";
import { fetchUniProtEntry } from "../integrations/uniprot";
import { getTieredCache, setTieredCache } from "../cache/tiered-cache";
import { fetchRcsbEntryGraphQL } from "../graphql/rcsb";
import {
  normalizeAlphaFold,
  normalizeClinVar,
  normalizeConfidence,
  normalizeInterPro,
  normalizeKegg,
  normalizePubChem,
  normalizeRcsbEntries,
  normalizeStringNetwork,
  normalizeUniProt,
  normalizeUniProtDiseases,
  normalizeUniProtDomains,
  uniqueBy,
  unwrapProviderData
} from "../normalizers";
import type { AlphaFoldPrediction } from "../integrations/alphafold";
import type { ClinVarVariant } from "../integrations/clinvar";
import type { InterProResult } from "../integrations/interpro";
import type { KeggPathway } from "../integrations/kegg";
import type { PubChemCompound } from "../integrations/pubchem";
import type { RcsbGraphqlEntry } from "../graphql/rcsb";
import type { StringNetworkResult } from "../integrations/string-db";
import type { UniProtEntry } from "../integrations/uniprot";

interface CompileProteinIntelligenceOptions {
  accession: string;
  geneName?: string;
  pdbId?: string;
  forceRefresh?: boolean;
}

interface ProviderOutcome<T> {
  provider: string;
  status: ProviderExecutionStatus;
  latencyMs: number;
  value?: T;
  error?: string;
  cacheHit?: boolean;
  cacheLayer?: CacheLayer;
  stale?: boolean;
}

interface ProviderEnvelope {
  cacheHit?: boolean;
  cacheLayer?: CacheLayer;
  stale?: boolean;
}

const INTELLIGENCE_SCHEMA_VERSION = "bioalign.protein-intelligence.v1";
const INTELLIGENCE_CACHE_TTL_SECONDS = 6 * 60 * 60;
const INTELLIGENCE_CACHE_STALE_SECONDS = 30 * 60;
const providerLimit = pLimit(8);
const refreshes = new Map<string, Promise<ProteinIntelligence>>();

function intelligenceCacheKey(options: CompileProteinIntelligenceOptions) {
  return [
    "protein-intelligence",
    "v1",
    options.accession.toUpperCase(),
    options.geneName?.toUpperCase() ?? "gene:auto",
    options.pdbId?.toUpperCase() ?? "pdb:auto"
  ].join(":");
}

function errorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Unknown provider error";
}

function providerEnvelope(value: unknown): ProviderEnvelope {
  if (typeof value !== "object" || value === null) return {};
  const candidate = value as ProviderEnvelope;
  return {
    cacheHit: candidate.cacheHit,
    cacheLayer: candidate.cacheLayer,
    stale: candidate.stale
  };
}

async function collectProvider<T>(provider: string, task: () => Promise<T>): Promise<ProviderOutcome<T>> {
  const started = Date.now();
  try {
    const value = await providerLimit(task);
    const envelope = providerEnvelope(value);
    return {
      provider,
      status: "fulfilled",
      latencyMs: Date.now() - started,
      value,
      cacheHit: envelope.cacheHit,
      cacheLayer: envelope.cacheLayer,
      stale: envelope.stale
    };
  } catch (error) {
    return {
      provider,
      status: "rejected",
      latencyMs: Date.now() - started,
      error: errorMessage(error)
    };
  }
}

function outcomeData<T>(outcome: ProviderOutcome<T> | undefined): T | null {
  if (!outcome || outcome.status !== "fulfilled") return null;
  return unwrapProviderData<T>(outcome.value);
}

function tracesFrom(outcomes: Array<ProviderOutcome<unknown>>): Record<string, ProviderTrace> {
  return Object.fromEntries(
    outcomes.map((outcome) => [
      outcome.provider,
      {
        provider: outcome.provider,
        status: outcome.status,
        latencyMs: outcome.latencyMs,
        cacheHit: outcome.cacheHit,
        cacheLayer: outcome.cacheLayer,
        stale: outcome.stale,
        error: outcome.error
      }
    ])
  );
}

function withCacheMetadata(
  value: ProteinIntelligence,
  cache: {
    key: string;
    hit: boolean;
    layer?: CacheLayer;
    state?: "fresh" | "stale";
    storedAt?: string;
  }
): ProteinIntelligence {
  return {
    ...value,
    cache: {
      key: cache.key,
      hit: cache.hit,
      layer: cache.layer,
      state: cache.state,
      storedAt: cache.storedAt,
      ttlSeconds: INTELLIGENCE_CACHE_TTL_SECONDS
    }
  };
}

function scheduleBackgroundRefresh(options: CompileProteinIntelligenceOptions, cacheKey: string) {
  if (refreshes.has(cacheKey)) return;

  const refresh = compileProteinIntelligence({ ...options, forceRefresh: true }).finally(() => {
    refreshes.delete(cacheKey);
  });
  refreshes.set(cacheKey, refresh);
}

export async function compileProteinIntelligence(
  options: CompileProteinIntelligenceOptions
): Promise<ProteinIntelligence> {
  const started = Date.now();
  const accession = options.accession.trim();
  const cacheKey = intelligenceCacheKey({ ...options, accession });

  if (!options.forceRefresh) {
    const cached = await getTieredCache<ProteinIntelligence>(cacheKey);
    if (cached) {
      if (cached.state === "stale") {
        scheduleBackgroundRefresh({ ...options, accession }, cacheKey);
      }
      return withCacheMetadata(cached.value, {
        key: cacheKey,
        hit: true,
        layer: cached.layer,
        state: cached.state,
        storedAt: new Date(cached.createdAt).toISOString()
      });
    }
  }

  const [
    uniprotOutcome,
    alphaFoldOutcome,
    interProOutcome,
    stringOutcome,
    keggOutcome,
    clinVarOutcome,
    pubChemOutcome
  ] = await Promise.all([
    collectProvider("uniprot", () => fetchUniProtEntry(accession)),
    collectProvider("alphafold", () => fetchAlphaFoldPrediction(accession)),
    collectProvider("interpro", () => fetchInterProByAccession(accession)),
    collectProvider("string", () => fetchStringInteractions(options.geneName ?? accession)),
    collectProvider("kegg", () => fetchKeggPathways(options.geneName ?? accession)),
    collectProvider("clinvar", () => fetchClinVarVariants(options.geneName ?? accession)),
    collectProvider("pubchem", () => searchPubChemByProtein(options.geneName ?? accession))
  ]);

  const firstWave = [
    uniprotOutcome,
    alphaFoldOutcome,
    interProOutcome,
    stringOutcome,
    keggOutcome,
    clinVarOutcome,
    pubChemOutcome
  ];
  const uniProt = outcomeData(uniprotOutcome);
  const uniProtEntry = unwrapProviderData<UniProtEntry>(uniProt);
  const protein = normalizeUniProt(uniProtEntry);
  const resolvedGeneName = options.geneName ?? protein?.gene?.primary;
  const pdbIds = uniqueBy(
    [options.pdbId, ...(protein?.crossReferences.pdb.map((reference) => reference.pdbId) ?? [])]
      .filter((id): id is string => Boolean(id))
      .map((id) => id.toUpperCase()),
    (id) => id
  ).slice(0, 3);

  const structureWave = await Promise.all(
    pdbIds.map((pdbId) => collectProvider(`rcsb:${pdbId}`, () => fetchRcsbEntryGraphQL(pdbId)))
  );
  const allOutcomes = [...firstWave, ...structureWave] as Array<ProviderOutcome<unknown>>;

  const alphaFold = unwrapProviderData<AlphaFoldPrediction[]>(outcomeData(alphaFoldOutcome));
  const interPro = outcomeData<InterProResult>(interProOutcome);
  const stringNetwork = outcomeData<StringNetworkResult>(stringOutcome);
  const kegg = outcomeData<KeggPathway[]>(keggOutcome);
  const clinVar = outcomeData<ClinVarVariant[]>(clinVarOutcome);
  const pubChem = outcomeData<PubChemCompound[]>(pubChemOutcome);
  const rcsbEntries = structureWave.map((outcome) =>
    unwrapProviderData<RcsbGraphqlEntry | null>(outcomeData<ReturnType<typeof fetchRcsbEntryGraphQL> extends Promise<infer R> ? R : never>(outcome))
  );

  const interProNormalized = normalizeInterPro(interPro);
  const structures = normalizeRcsbEntries(rcsbEntries);
  const pubChemLigands = normalizePubChem(pubChem);
  const structureLigands = structures.flatMap((structure) => structure.ligands);
  const network = normalizeStringNetwork(stringNetwork);
  const providerTraces = tracesFrom(allOutcomes);
  const fulfilledCount = allOutcomes.filter((outcome) => outcome.status === "fulfilled").length;
  const rejectedCount = allOutcomes.filter((outcome) => outcome.status === "rejected").length;
  const warnings = [
    protein ? null : "UniProt metadata unavailable; normalized protein identity is partial.",
    pdbIds.length ? null : "No PDB cross references were available for RCSB GraphQL enrichment.",
    rejectedCount ? `${rejectedCount} provider request(s) failed; see provider traces.` : null
  ].filter((warning): warning is string => Boolean(warning));

  const intelligence: ProteinIntelligence = {
    schemaVersion: INTELLIGENCE_SCHEMA_VERSION,
    query: {
      accession,
      geneName: resolvedGeneName,
      pdbId: options.pdbId,
      requestedAt: new Date().toISOString()
    },
    protein,
    structure: {
      primaryPdbId: pdbIds[0],
      entries: structures,
      predictedModels: normalizeAlphaFold(alphaFold),
      ligands: uniqueBy(structureLigands, (ligand) => `${ligand.source}:${ligand.id}`)
    },
    interactions: network,
    domains: {
      entries: uniqueBy(
        [...normalizeUniProtDomains(uniProtEntry), ...interProNormalized.domains],
        (domain) => `${domain.source}:${domain.accession ?? domain.name}:${domain.start}:${domain.end}`
      ),
      goTerms: uniqueBy(interProNormalized.goTerms, (term) => term.id)
    },
    pathways: {
      entries: uniqueBy([...interProNormalized.pathways, ...normalizeKegg(kegg)], (pathway) => `${pathway.source}:${pathway.id}`)
    },
    confidence: normalizeConfidence(alphaFold),
    diseases: {
      variants: uniqueBy(
        [...normalizeUniProtDiseases(uniProtEntry), ...normalizeClinVar(clinVar)],
        (variant) => `${variant.source}:${variant.id}:${variant.title}`
      )
    },
    ligands: {
      compounds: uniqueBy([...structureLigands, ...pubChemLigands], (ligand) => `${ligand.source}:${ligand.id}`)
    },
    providers: providerTraces,
    cache: {
      key: cacheKey,
      hit: false,
      ttlSeconds: INTELLIGENCE_CACHE_TTL_SECONDS
    },
    diagnostics: {
      durationMs: Date.now() - started,
      providerCount: allOutcomes.length,
      fulfilledCount,
      rejectedCount,
      warnings
    }
  };

  await setTieredCache(cacheKey, intelligence, INTELLIGENCE_CACHE_TTL_SECONDS, INTELLIGENCE_CACHE_STALE_SECONDS);
  return intelligence;
}
