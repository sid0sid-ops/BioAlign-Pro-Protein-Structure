import Fuse from "fuse.js";
import { analyzeScientificInput } from "./rule-engine";
import { getIndexedDbCache, setIndexedDbCache } from "@/lib/static-data/indexed-db-cache";
import { fetchProteinFromBrowserApis } from "@/lib/static-data/browser-public-api";
import { loadProteinPack } from "@/lib/static-data/protein-pack-loader";
import { loadStaticJson } from "@/lib/static-data/data-pack-loader";
import type { ClientIntelligenceResult } from "./types";
import type {
  AliasIndex,
  AliasIndexEntry,
  ProteinDataSource,
  ProteinPack,
  ProteinQueryMatch,
  ProteinQueryResult,
  SearchIndex,
  SearchIndexDocument
} from "@/lib/static-data/protein-pack-types";

const SEARCH_INDEX_PATH = "/indexes/search-index.json";
const ALIAS_INDEX_PATH = "/indexes/alias-index.json";
const LIVE_CACHE_TTL_MS = 7 * 24 * 60 * 60 * 1000;

interface ScoredMatch extends ProteinQueryMatch {
  score: number;
}

interface FuseAliasRecord extends AliasIndexEntry {
  normalizedSearchText: string;
}

function normalizeSearchText(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/haem/g, "hem")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}

function tokenSet(value: string) {
  return new Set(normalizeSearchText(value).split(" ").filter(Boolean));
}

function asMatch(document: SearchIndexDocument, score: number, matchedAlias: string, matchType: ProteinQueryMatch["matchType"]): ScoredMatch {
  return {
    accession: document.accession,
    geneName: document.geneName,
    proteinName: document.proteinName,
    matchedAlias,
    matchType,
    score,
    packPath: document.packPath,
    compressedPackPath: document.compressedPackPath,
    pdbIds: document.pdbIds
  };
}

function scoreDocument(query: string, document: SearchIndexDocument): ScoredMatch | null {
  if (!document.packPath) return null;

  const normalizedQuery = normalizeSearchText(query);
  if (!normalizedQuery) return null;

  const accession = normalizeSearchText(document.accession);
  const gene = normalizeSearchText(document.geneName);
  const protein = normalizeSearchText(document.proteinName);
  const aliases = [document.accession, document.geneName, document.proteinName, ...document.aliases];
  const pdbIds = document.pdbIds ?? [];

  if (normalizedQuery === accession) return asMatch(document, 100, document.accession, "accession");
  if (normalizedQuery === gene) return asMatch(document, 98, document.geneName, "gene");

  const exactPdb = pdbIds.find((pdbId) => normalizeSearchText(pdbId) === normalizedQuery);
  if (exactPdb) return asMatch(document, 96, exactPdb, "pdb");

  const exactAlias = aliases.find((alias) => normalizeSearchText(alias) === normalizedQuery);
  if (exactAlias) return asMatch(document, 94, exactAlias, "alias");

  if (protein.includes(normalizedQuery) || normalizedQuery.includes(protein)) {
    return asMatch(document, 82, document.proteinName, "protein");
  }

  const containingAlias = aliases.find((alias) => {
    const normalizedAlias = normalizeSearchText(alias);
    return normalizedAlias.includes(normalizedQuery) || normalizedQuery.includes(normalizedAlias);
  });
  if (containingAlias) return asMatch(document, 78, containingAlias, "alias");

  const queryTokens = tokenSet(query);
  const documentTokens = new Set([...(document.tokens ?? []), ...aliases.flatMap((alias) => Array.from(tokenSet(alias)))]);
  const overlap = Array.from(queryTokens).filter((token) => documentTokens.has(token)).length;
  if (overlap > 0) {
    const overlapScore = Math.min(74, 48 + overlap * 12);
    return asMatch(document, overlapScore, Array.from(queryTokens).join(" "), "token");
  }

  return null;
}

function fuseScoreToRank(score: number | undefined, exact: boolean, contains: boolean) {
  if (exact) return 99;
  if (contains) return 82;
  return Math.max(50, Math.round((1 - Math.min(score ?? 1, 1)) * 78));
}

function aliasFuseMatches(query: string, aliasIndex: AliasIndex | null): ScoredMatch[] {
  const normalizedQuery = normalizeSearchText(query);
  if (!aliasIndex || !normalizedQuery) return [];

  const records: FuseAliasRecord[] = aliasIndex.entries.map((entry) => ({
    ...entry,
    normalizedSearchText: [
      entry.normalizedAlias,
      normalizeSearchText(entry.alias),
      normalizeSearchText(entry.geneName),
      normalizeSearchText(entry.proteinName),
      normalizeSearchText(entry.accession)
    ].join(" ")
  }));

  const fuse = new Fuse(records, {
    includeScore: true,
    ignoreLocation: true,
    minMatchCharLength: Math.min(3, normalizedQuery.length),
    threshold: 0.38,
    keys: [
      { name: "normalizedAlias", weight: 0.55 },
      { name: "alias", weight: 0.15 },
      { name: "normalizedSearchText", weight: 0.1 },
      { name: "geneName", weight: 0.1 },
      { name: "proteinName", weight: 0.1 },
      { name: "accession", weight: 0.05 }
    ]
  });

  const fuseResults = fuse.search(normalizedQuery, { limit: 16 });
  return fuseResults.flatMap((result) => {
    const entry = result.item;
    const normalizedAlias = normalizeSearchText(entry.alias);
    const exact = normalizedAlias === normalizedQuery || entry.normalizedAlias === normalizedQuery;
    const contains = normalizedAlias.includes(normalizedQuery) || normalizedQuery.includes(normalizedAlias);
    if (!exact && !contains && normalizedQuery.length < 6) return [];

    return {
      accession: entry.accession,
      geneName: entry.geneName,
      proteinName: entry.proteinName,
      matchedAlias: entry.alias,
      matchType: exact || contains ? "alias" : "fuzzy",
      score: fuseScoreToRank(result.score, exact, contains),
      packPath: entry.packPath,
      compressedPackPath: entry.compressedPackPath
    };
  });
}

async function loadSearchIndexes() {
  const [searchIndex, aliasIndex] = await Promise.all([
    loadStaticJson<SearchIndex>(SEARCH_INDEX_PATH).catch(() => null),
    loadStaticJson<AliasIndex>(ALIAS_INDEX_PATH).catch(() => null)
  ]);

  return {
    searchIndex,
    aliasIndex
  };
}

function rankMatches(query: string, searchIndex: SearchIndex | null, aliasIndex: AliasIndex | null) {
  const scored = [
    ...(searchIndex?.documents.flatMap((document) => {
      const match = scoreDocument(query, document);
      return match ? [match] : [];
    }) ?? []),
    ...aliasFuseMatches(query, aliasIndex)
  ];

  const bestByAccession = new Map<string, ScoredMatch>();
  for (const match of scored) {
    const previous = bestByAccession.get(match.accession);
    if (!previous || match.score > previous.score) {
      bestByAccession.set(match.accession, match);
    }
  }

  return Array.from(bestByAccession.values())
    .sort((left, right) => right.score - left.score || left.proteinName.localeCompare(right.proteinName))
    .slice(0, 8);
}

function isSequenceLike(analysis: ClientIntelligenceResult) {
  return ["fasta", "dna_sequence", "rna_sequence", "protein_sequence"].includes(analysis.input.type);
}

function shouldResolveAsSequenceBeforeLiveLookup(query: string, analysis: ClientIntelligenceResult) {
  if (!isSequenceLike(analysis)) return false;
  return query.trim().startsWith(">") || analysis.metrics.length >= 30 || /\s/.test(query);
}

function sequenceTypeFromAnalysis(analysis: ClientIntelligenceResult): ProteinPack["sequenceType"] {
  if (analysis.input.sequenceClass === "dna" || analysis.input.sequenceClass === "rna" || analysis.input.sequenceClass === "protein") {
    return analysis.input.sequenceClass;
  }
  return "unknown";
}

function userInputPack(query: string, analysis: ClientIntelligenceResult): ProteinPack {
  const sequence = analysis.input.cleaned;
  const label = analysis.input.fasta?.header ?? "User-provided sequence";
  return {
    schemaVersion: "bioalign.browser-api-pack.v1",
    generatedAt: new Date().toISOString(),
    accession: "USER-SEQUENCE",
    geneName: "User input",
    proteinName: label,
    aliases: [label, "user sequence"],
    organism: {
      scientificName: "Not specified"
    },
    sequence: {
      value: sequence,
      length: analysis.metrics.length,
      molecularWeight: analysis.metrics.molecularWeight,
      source: "Browser rule engine"
    },
    sequenceType: sequenceTypeFromAnalysis(analysis),
    domains: [],
    motifs: analysis.motifs.map((motif) => ({
      name: motif.name,
      type: motif.pattern,
      start: motif.start,
      end: motif.end,
      source: "Browser motif rules"
    })),
    pdbStructures: [],
    alphaFold: {
      available: false
    },
    templates: [],
    confidenceCards: [
      {
        id: "sequence-classification",
        label: "Input confidence",
        value: Math.round(analysis.input.confidence * 100),
        detail: `Classified as ${analysis.input.sequenceClass} by the browser rule engine.`
      },
      {
        id: "complexity-score",
        label: "Sequence complexity",
        value: Math.round(analysis.complexity.normalizedEntropy * 100),
        detail: `${analysis.complexity.label} normalized Shannon complexity.`
      }
    ],
    pathways: [],
    interactions: [],
    diseaseSummary:
      query.trim().startsWith(">")
        ? "FASTA parsed locally. Static deployment does not infer disease relevance for user-provided sequences."
        : "Sequence parsed locally. Use known accession or gene searches for curated biological context.",
    sourceBadges: ["user input", "worker rule engine", "no backend"]
  };
}

function resultWithPack(
  query: string,
  analysis: ClientIntelligenceResult,
  matches: ProteinQueryMatch[],
  pack: ProteinPack,
  source: ProteinDataSource,
  sourceBadges: string[],
  liveRefreshAttempted = false,
  fallbackMessage?: string
): ProteinQueryResult {
  return {
    query,
    detectedType: analysis.input.type,
    sequenceClass: analysis.input.sequenceClass,
    matches,
    selectedPack: {
      ...pack,
      sourceBadges: Array.from(new Set([...sourceBadges, ...pack.sourceBadges]))
    },
    source,
    sourceBadges: Array.from(new Set(sourceBadges)),
    fallbackMessage,
    liveRefreshAttempted
  };
}

async function loadLocalPackForMatch(match: ProteinQueryMatch) {
  const { pack, compressed } = await loadProteinPack(match.packPath, match.compressedPackPath);
  return {
    pack,
    sourceBadges: [
      "local static pack",
      compressed ? "compressed JSON pack" : "static JSON pack",
      "IndexedDB cached",
      "no backend"
    ]
  };
}

async function loadLiveOrCachedPack(query: string, analysis: ClientIntelligenceResult) {
  const normalizedQuery = normalizeSearchText(query);
  const key = `browser-api-protein-pack:${normalizedQuery}`;
  const cached = await getIndexedDbCache<ProteinPack>(key);
  if (cached) {
    return {
      pack: cached,
      source: "browser-cache" as const,
      liveRefreshAttempted: false,
      sourceBadges: ["browser cache", "IndexedDB", "no backend"]
    };
  }

  const pack = await fetchProteinFromBrowserApis(query.trim(), analysis.input.type);
  if (!pack) return null;

  await setIndexedDbCache(key, pack, LIVE_CACHE_TTL_MS);
  if (pack.accession && pack.accession !== query.trim()) {
    await setIndexedDbCache(`browser-api-protein-pack:${normalizeSearchText(pack.accession)}`, pack, LIVE_CACHE_TTL_MS);
  }

  return {
    pack,
    source: "browser-api" as const,
    liveRefreshAttempted: true,
    sourceBadges: ["browser API", "IndexedDB cached", "no private key", "no backend"]
  };
}

export async function resolveProteinQuery(query: string, options: { lowMemoryMode?: boolean } = {}): Promise<ProteinQueryResult> {
  const analysis = analyzeScientificInput(query, options);
  const trimmedQuery = query.trim();

  if (!trimmedQuery) {
    return {
      query,
      detectedType: analysis.input.type,
      sequenceClass: analysis.input.sequenceClass,
      matches: [],
      selectedPack: null,
      source: "fallback",
      sourceBadges: ["no backend"],
      fallbackMessage: "Enter a UniProt accession, PDB ID, FASTA record, sequence, gene symbol, or protein alias.",
      liveRefreshAttempted: false
    };
  }

  const { searchIndex, aliasIndex } = await loadSearchIndexes();
  const matches = rankMatches(trimmedQuery, searchIndex, aliasIndex);
  const bestMatch = matches[0];

  if (bestMatch) {
    try {
      const local = await loadLocalPackForMatch(bestMatch);
      return resultWithPack(trimmedQuery, analysis, matches, local.pack, "local-static-pack", local.sourceBadges);
    } catch {
      // If a generated pack is missing or unreadable, continue to live browser fallback.
    }
  }

  if (shouldResolveAsSequenceBeforeLiveLookup(trimmedQuery, analysis) && analysis.metrics.length > 0) {
    const pack = userInputPack(trimmedQuery, analysis);
    return resultWithPack(trimmedQuery, analysis, matches, pack, "user-input", pack.sourceBadges);
  }

  try {
    const live = await loadLiveOrCachedPack(trimmedQuery, analysis);
    if (live) {
      return resultWithPack(
        trimmedQuery,
        analysis,
        matches,
        live.pack,
        live.source,
        live.sourceBadges,
        live.liveRefreshAttempted
      );
    }
  } catch (error) {
    return {
      query: trimmedQuery,
      detectedType: analysis.input.type,
      sequenceClass: analysis.input.sequenceClass,
      matches,
      selectedPack: null,
      source: "fallback",
      sourceBadges: ["fallback UI", "no backend"],
      fallbackMessage: "Live browser API lookup failed. Static analysis is still available for pasted sequences.",
      liveRefreshAttempted: true,
      liveRefreshError: error instanceof Error ? error.message : "Unknown browser API failure"
    };
  }

  if (isSequenceLike(analysis) && analysis.metrics.length > 0 && trimmedQuery.length > 5) {
    const pack = userInputPack(trimmedQuery, analysis);
    return resultWithPack(
      trimmedQuery,
      analysis,
      matches,
      pack,
      "user-input",
      pack.sourceBadges,
      true,
      "No local or CORS-safe public record matched; showing local sequence intelligence instead."
    );
  }

  return {
    query: trimmedQuery,
    detectedType: analysis.input.type,
    sequenceClass: analysis.input.sequenceClass,
    matches,
    selectedPack: null,
    source: "fallback",
    sourceBadges: ["fallback UI", "no backend"],
    fallbackMessage: "No local static pack matched this query, and CORS-safe browser APIs did not return a usable protein record.",
    liveRefreshAttempted: true
  };
}
