import { execFile } from "node:child_process";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import { dataDir, ensureRuntimeDirs, proteinPacksDir, structureIntelligenceDir, writeJson } from "../shared/static-pipeline.mjs";
import { starterProteinSeeds } from "../shared/starter-protein-seeds.mjs";

await ensureRuntimeDirs();

const execFileAsync = promisify(execFile);
const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const workspaceRoot = path.resolve(scriptDir, "../..");
const curatedHomologDir = path.join(workspaceRoot, "scripts", "structure-intelligence", "curated-homologs");
const UNIPROT_BASE = "https://rest.uniprot.org/uniprotkb";
const ALPHAFOLD_BASE = "https://alphafold.ebi.ac.uk/api/prediction";
const RCSB_ENTRY_BASE = "https://data.rcsb.org/rest/v1/core/entry";
const INTERPRO_BASE = "https://www.ebi.ac.uk/interpro/api/entry/interpro/protein/uniprot";
const BUILD_USER_AGENT = "BioAlignProStaticBuild/1.0";
const HOMOLOG_FETCH_LIMIT = 14;
const MSA_TOOL_CANDIDATES = [
  { id: "mafft", label: "MAFFT", command: "mafft" },
  { id: "clustal-omega", label: "Clustal Omega", command: "clustalo" },
  { id: "muscle", label: "MUSCLE", command: "muscle" }
];
const commandAvailability = new Map();
let resolvedMsaTool;

async function fetchJson(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12_000);
  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: { Accept: "application/json", "User-Agent": BUILD_USER_AGENT }
    });
    if (!response.ok) return null;
    return await response.json();
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

function extractProteinName(entry, fallback) {
  return (
    entry?.proteinDescription?.recommendedName?.fullName?.value ??
    entry?.proteinDescription?.submissionNames?.[0]?.fullName?.value ??
    fallback.displayName
  );
}

function extractOrganism(entry, fallback) {
  return {
    scientificName: entry?.organism?.scientificName ?? fallback.fallbackOrganism,
    commonName: entry?.organism?.commonName,
    taxonId: entry?.organism?.taxonId
  };
}

function extractSequence(entry, fallback) {
  return {
    value: entry?.sequence?.value ?? "",
    length: entry?.sequence?.length ?? fallback.fallbackLength,
    molecularWeight: entry?.sequence?.molWeight,
    checksum: entry?.sequence?.crc64,
    source: entry?.sequence?.value ? "UniProt build-time fetch" : "starter metadata fallback"
  };
}

function extractPdbStructures(entry, fallback) {
  const crossRefs =
    entry?.uniProtKBCrossReferences
      ?.filter((reference) => reference.database === "PDB")
      .map((reference) => ({
        pdbId: reference.id,
        method: reference.properties?.find((property) => property.key === "Method")?.value,
        resolution: reference.properties?.find((property) => property.key === "Resolution")?.value,
        chains: reference.properties?.find((property) => property.key === "Chains")?.value,
        source: "UniProt cross-reference"
      })) ?? [];

  const fallbackRefs = fallback.representativePdbIds.map((pdbId) => ({
    pdbId,
    source: "starter representative"
  }));

  const seen = new Set();
  return [...fallbackRefs, ...crossRefs].filter((structure) => {
    if (seen.has(structure.pdbId)) return false;
    seen.add(structure.pdbId);
    return true;
  }).slice(0, 40);
}

function extractMotifs(entry) {
  return (
    entry?.features
      ?.filter((feature) => ["Motif", "Region", "Binding site", "Active site", "Site"].includes(feature.type))
      .slice(0, 20)
      .map((feature) => ({
        name: feature.description || feature.type,
        type: feature.type,
        start: feature.location?.start?.value,
        end: feature.location?.end?.value,
        source: "UniProt feature"
      })) ?? []
  );
}

function extractFunctionComments(entry) {
  return (
    entry?.comments
      ?.filter((comment) => ["FUNCTION", "SUBUNIT", "DISEASE", "ACTIVITY REGULATION"].includes(comment.commentType))
      .flatMap((comment) => comment.texts?.map((text) => text.value).filter(Boolean) ?? [])
      .slice(0, 6) ?? []
  );
}

function extractUniProtFeatures(entry) {
  return (
    entry?.features
      ?.map((feature) => ({
        type: feature.type ?? "Feature",
        description: feature.description ?? feature.type ?? "Feature",
        start: feature.location?.start?.value,
        end: feature.location?.end?.value,
        source: "UniProt"
      }))
      .slice(0, 80) ?? []
  );
}

function extractCrossReferences(entry) {
  return (
    entry?.uniProtKBCrossReferences
      ?.map((reference) => ({
        database: reference.database,
        id: reference.id
      }))
      .filter((reference) => reference.database && reference.id)
      .slice(0, 160) ?? []
  );
}

function parsePlddtConfidence(confidence) {
  const values = confidence?.confidenceScore?.filter((value) => Number.isFinite(value)) ?? [];
  if (!values.length) {
    return {
      available: false,
      reason: "No per-residue pLDDT values were available in the AlphaFold source data.",
      method: "AlphaFold confidence JSON parsing",
      source: "AlphaFold DB"
    };
  }

  const sorted = [...values].sort((left, right) => left - right);
  const midpoint = Math.floor(sorted.length / 2);
  const median = sorted.length % 2 ? sorted[midpoint] : (sorted[midpoint - 1] + sorted[midpoint]) / 2;
  const regionScan = (predicate, label) => {
    const regions = [];
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
        if (length >= 5) {
          regions.push({ start: start + 1, end: index, mean: Number((total / length).toFixed(2)), label });
        }
        start = -1;
        total = 0;
      }
    }
    return regions.slice(0, 12);
  };

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
    lowConfidenceRegions: regionScan((value) => value < 70, "Low pLDDT"),
    highConfidenceRegions: regionScan((value) => value >= 90, "Very high pLDDT"),
    source: "AlphaFold DB"
  };
}

function summarizePae(pae, matrixUrl) {
  const payload = Array.isArray(pae) ? pae[0] : pae;
  const matrix = payload?.predicted_aligned_error;
  if (!Array.isArray(matrix) || matrix.length === 0) {
    return {
      available: false,
      reason: "No PAE JSON matrix was available from AlphaFold DB for this pack.",
      method: "AlphaFold PAE JSON parsing",
      source: "AlphaFold DB"
    };
  }

  let total = 0;
  let count = 0;
  for (const row of matrix) {
    for (const value of row) {
      if (Number.isFinite(value)) {
        total += value;
        count += 1;
      }
    }
  }

  const maxSize = 80;
  const step = Math.max(1, Math.ceil(matrix.length / maxSize));
  const downsampledMatrix = [];
  for (let row = 0; row < matrix.length; row += step) {
    const outputRow = [];
    for (let column = 0; column < matrix[row].length; column += step) {
      outputRow.push(Number(matrix[row][column].toFixed(2)));
    }
    downsampledMatrix.push(outputRow);
  }

  return {
    available: true,
    matrixUrl,
    downsampledMatrix,
    matrixSize: matrix.length,
    meanPae: Number((total / Math.max(count, 1)).toFixed(2)),
    domainPairPae: [],
    highUncertaintyRegions: [],
    source: "AlphaFold DB"
  };
}

function normalizeProteinSequence(sequence, allowGaps = false) {
  return String(sequence ?? "")
    .toUpperCase()
    .replace(allowGaps ? /[^A-Z-]/g : /[^A-Z]/g, "");
}

function sanitizeFastaId(value, fallback) {
  return String(value || fallback)
    .replace(/[^\w.-]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .slice(0, 48);
}

function parseFastaRecords(text, source, allowGaps = false) {
  if (!text) return [];
  const records = [];
  let current = null;
  for (const line of text.split(/\r?\n/)) {
    if (!line.trim()) continue;
    if (line.startsWith(">")) {
      const label = line.slice(1).trim() || `sequence ${records.length + 1}`;
      current = {
        id: sanitizeFastaId(label.split(/\s+/)[0], `seq-${records.length + 1}`),
        label: label.slice(0, 120),
        sequence: "",
        source
      };
      records.push(current);
      continue;
    }
    if (current) current.sequence += normalizeProteinSequence(line, allowGaps);
  }

  return records
    .map((record) => ({ ...record, sequence: normalizeProteinSequence(record.sequence, allowGaps) }))
    .filter((record) => record.sequence.length > 0);
}

function formatFastaRecords(records) {
  return records
    .map((record) => {
      const sequence = record.sequence.match(/.{1,80}/g)?.join("\n") ?? record.sequence;
      return `>${record.id} ${record.label}\n${sequence}`;
    })
    .join("\n");
}

function buildUnavailableMsa(reason, sourceSequenceCount = 0) {
  return {
    available: false,
    method: "Build-time homolog MSA (MAFFT/Clustal Omega/MUSCLE)",
    alignedSequences: [],
    consensus: "",
    conservationScores: [],
    gapFrequencies: [],
    sourceSequenceCount,
    source: "Curated/UniProt homologs",
    unavailableReason: reason
  };
}

async function commandExists(command) {
  if (commandAvailability.has(command)) return commandAvailability.get(command);
  const locator = process.platform === "win32" ? "where.exe" : "which";
  try {
    await execFileAsync(locator, [command], { timeout: 4_000, windowsHide: true });
    commandAvailability.set(command, true);
    return true;
  } catch {
    commandAvailability.set(command, false);
    return false;
  }
}

async function resolveMsaTool() {
  if (resolvedMsaTool !== undefined) return resolvedMsaTool;
  for (const candidate of MSA_TOOL_CANDIDATES) {
    if (await commandExists(candidate.command)) {
      resolvedMsaTool = candidate;
      return resolvedMsaTool;
    }
  }
  resolvedMsaTool = null;
  return resolvedMsaTool;
}

async function safeRemoveMsaTempDir(tempDir) {
  const resolved = path.resolve(tempDir);
  const resolvedTempRoot = path.resolve(os.tmpdir());
  if (resolved.startsWith(`${resolvedTempRoot}${path.sep}`) && path.basename(resolved).startsWith("bioalign-msa-")) {
    await rm(resolved, { recursive: true, force: true });
  }
}

async function runBuildTimeMsa(tool, records) {
  const tempDir = await mkdtemp(path.join(os.tmpdir(), "bioalign-msa-"));
  const inputPath = path.join(tempDir, "homologs.fasta");
  const outputPath = path.join(tempDir, "alignment.fasta");
  const execOptions = { timeout: 120_000, maxBuffer: 20 * 1024 * 1024, windowsHide: true };
  try {
    await writeFile(inputPath, formatFastaRecords(records), "utf8");
    let alignedText = "";
    if (tool.id === "mafft") {
      const { stdout } = await execFileAsync(tool.command, ["--auto", inputPath], execOptions);
      alignedText = stdout;
    } else if (tool.id === "clustal-omega") {
      await execFileAsync(tool.command, ["-i", inputPath, "-o", outputPath, "--force", "--outfmt=fasta"], execOptions);
      alignedText = await readFile(outputPath, "utf8");
    } else {
      try {
        await execFileAsync(tool.command, ["-align", inputPath, "-output", outputPath], execOptions);
      } catch {
        await execFileAsync(tool.command, ["-in", inputPath, "-out", outputPath], execOptions);
      }
      alignedText = await readFile(outputPath, "utf8");
    }

    const alignedSequences = parseFastaRecords(alignedText, `${tool.label} build-time alignment`, true);
    if (alignedSequences.length < 2) {
      return {
        available: false,
        reason: `${tool.label} ran, but it did not produce at least two aligned FASTA records.`
      };
    }
    return {
      available: true,
      alignedSequences,
      method: `${tool.label} build-time MSA`,
      source: "Curated/UniProt homologs aligned at build time"
    };
  } catch (error) {
    return {
      available: false,
      reason: `${tool.label} failed during the static build: ${error?.message ?? "unknown alignment error"}`
    };
  } finally {
    await safeRemoveMsaTempDir(tempDir);
  }
}

async function readCuratedHomologSequences(accession) {
  const extensions = [".fasta", ".fa", ".faa"];
  for (const extension of extensions) {
    try {
      const text = await readFile(path.join(curatedHomologDir, `${accession}${extension}`), "utf8");
      return parseFastaRecords(text, "Curated build-time homolog FASTA");
    } catch (error) {
      if (error?.code !== "ENOENT") throw error;
    }
  }
  return [];
}

async function fetchUniProtHomologSequences(pack, canonicalSequence) {
  if (!pack.geneName) return [];
  const query = `(gene_exact:${pack.geneName}) AND reviewed:true`;
  const fields = "accession,id,protein_name,gene_names,organism_name,length,sequence";
  const url = `${UNIPROT_BASE}/search?query=${encodeURIComponent(query)}&format=json&fields=${encodeURIComponent(fields)}&size=${HOMOLOG_FETCH_LIMIT}`;
  const data = await fetchJson(url);
  const minLength = Math.max(20, Math.floor(canonicalSequence.length * 0.55));
  const maxLength = Math.max(minLength, Math.ceil(canonicalSequence.length * 1.6));
  return (data?.results ?? [])
    .map((entry) => ({
      id: sanitizeFastaId(entry.primaryAccession, `uniprot-${entry.uniProtkbId}`),
      label: `${entry.primaryAccession ?? entry.uniProtkbId ?? "UniProt"} ${entry.organism?.scientificName ?? ""}`.trim(),
      sequence: normalizeProteinSequence(entry.sequence?.value),
      source: "UniProt reviewed homolog search"
    }))
    .filter((record) => record.sequence.length >= minLength && record.sequence.length <= maxLength)
    .slice(0, HOMOLOG_FETCH_LIMIT);
}

function dedupeHomologRecords(records, canonicalSequence) {
  const seenSequences = new Set();
  const seenIds = new Set();
  return records.filter((record) => {
    const sequence = normalizeProteinSequence(record.sequence);
    if (!sequence || seenSequences.has(sequence) || seenIds.has(record.id)) return false;
    seenSequences.add(sequence);
    seenIds.add(record.id);
    record.sequence = sequence;
    return sequence.length >= Math.max(20, canonicalSequence.length * 0.55) && sequence.length <= Math.max(20, canonicalSequence.length * 1.6);
  });
}

function summarizeMsa(alignedSequences, canonicalSequence, method, source) {
  if (alignedSequences.length < 2) {
    return buildUnavailableMsa("At least two aligned homolog sequences are required for conservation analysis.", alignedSequences.length);
  }

  const queryAlignedSequence = alignedSequences[0]?.sequence ?? "";
  const width = Math.max(...alignedSequences.map((record) => record.sequence.length));
  const consensus = [];
  const conservationScores = [];
  const gapFrequencies = [];
  for (let index = 0; index < width; index += 1) {
    const residues = alignedSequences.map((record) => record.sequence[index] ?? "-");
    const counts = residues.reduce((acc, residue) => {
      if (residue !== "-") acc[residue] = (acc[residue] ?? 0) + 1;
      return acc;
    }, {});
    const top = Object.entries(counts).sort((left, right) => right[1] - left[1])[0];
    if ((queryAlignedSequence[index] ?? "-") !== "-") {
      consensus.push(top?.[0] ?? "-");
      conservationScores.push(Number(((top?.[1] ?? 0) / Math.max(residues.filter((residue) => residue !== "-").length, 1)).toFixed(3)));
      gapFrequencies.push(Number((residues.filter((residue) => residue === "-").length / residues.length).toFixed(3)));
    }
  }

  return {
    available: true,
    method,
    alignedSequences,
    consensus: consensus.join("").slice(0, canonicalSequence.length),
    conservationScores: conservationScores.slice(0, canonicalSequence.length),
    gapFrequencies: gapFrequencies.slice(0, canonicalSequence.length),
    sourceSequenceCount: alignedSequences.length,
    source
  };
}

async function buildHomologMsa(pack) {
  const canonicalSequence = normalizeProteinSequence(pack.sequence.value);
  if (!canonicalSequence) {
    return buildUnavailableMsa("No canonical protein sequence was available for build-time homolog alignment.");
  }

  const tool = await resolveMsaTool();
  if (!tool) {
    return buildUnavailableMsa("MAFFT, Clustal Omega, or MUSCLE was not available during static build; MSA and conservation are marked unavailable.");
  }

  const canonicalRecord = {
    id: sanitizeFastaId(pack.accession, "query"),
    label: `${pack.accession} canonical ${pack.organism.scientificName ?? ""}`.trim(),
    sequence: canonicalSequence,
    source: "UniProt canonical sequence"
  };
  const curatedRecords = await readCuratedHomologSequences(pack.accession);
  const uniprotRecords = await fetchUniProtHomologSequences(pack, canonicalSequence);
  const homologRecords = dedupeHomologRecords([canonicalRecord, ...curatedRecords, ...uniprotRecords], canonicalSequence).slice(0, HOMOLOG_FETCH_LIMIT + 1);

  if (homologRecords.length < 2) {
    return buildUnavailableMsa("No curated homolog FASTA or UniProt/ortholog sequence set was available for build-time MSA.", homologRecords.length);
  }

  const alignment = await runBuildTimeMsa(tool, homologRecords);
  if (!alignment.available) {
    return buildUnavailableMsa(alignment.reason, homologRecords.length);
  }

  return summarizeMsa(alignment.alignedSequences, canonicalSequence, alignment.method, alignment.source);
}

function conservedResiduesFromMsa(msa, sequence, domains, features) {
  if (!msa.available) return [];
  const activeOrBindingSites = features.filter((feature) => /active|binding|site/i.test(`${feature.type} ${feature.description}`));
  return msa.conservationScores
    .map((score, index) => {
      const position = index + 1;
      const site = activeOrBindingSites.find((feature) => position >= (feature.start ?? 0) && position <= (feature.end ?? 0));
      const domain = domains.find((item) => position >= item.start && position <= item.end);
      return {
        position,
        residue: sequence[index] ?? "",
        conservationScore: score,
        evidence: site ? ["MSA", "UniProt feature"] : ["MSA"],
        insideDomain: domain?.name,
        possibleRole: site?.type?.toLowerCase().includes("binding") ? "binding" : site ? "active site" : "unknown",
        notes: site
          ? `Conserved position overlaps ${site.description}.`
          : "Highly conserved in the precomputed alignment; inspect domains and structures for role."
      };
    })
    .filter((item) => item.residue && item.conservationScore >= 0.9)
    .slice(0, 24);
}

function interproDomains(results, sequenceLength) {
  return results.flatMap((result) => {
    const metadata = result.metadata;
    const memberDatabases = metadata?.member_databases ?? {};
    const sourceDatabase = Object.keys(memberDatabases)[0] ?? metadata?.source_database ?? "InterPro";
    return (
      result.proteins?.[0]?.entry_protein_locations?.flatMap((location) =>
        location.fragments?.map((fragment) => ({
          id: metadata?.accession ?? `${metadata?.name}-${fragment.start}`,
          name: metadata?.name ?? metadata?.accession ?? "InterPro annotation",
          sourceDatabase: sourceDatabase === "pfam" ? "Pfam" : sourceDatabase === "interpro" ? "InterPro" : sourceDatabase,
          type: metadata?.type ?? "domain",
          start: Math.max(1, Math.min(fragment.start ?? 1, sequenceLength || (fragment.start ?? 1))),
          end: Math.max(1, Math.min(fragment.end ?? sequenceLength, sequenceLength || (fragment.end ?? 1))),
          description: metadata?.name ?? "InterPro domain annotation",
          evidence: "InterPro protein match",
          confidence: location.score ? `score ${location.score}` : "source annotation",
          sourceUrl: metadata?.accession ? `https://www.ebi.ac.uk/interpro/entry/InterPro/${metadata.accession}/` : undefined
        })) ?? []
      ) ?? []
    );
  });
}

function uniprotDomains(pack) {
  return [
    ...pack.domains.map((domain, index) => ({
      id: `uniprot-domain-${index + 1}`,
      name: domain.name,
      sourceDatabase: domain.source?.includes("InterPro") ? "InterPro" : "UniProt",
      type: domain.type ?? "domain",
      start: domain.start ?? 1,
      end: domain.end ?? pack.sequence.length,
      description: domain.name,
      evidence: domain.source ?? "UniProt/starter annotation",
      sourceUrl: `https://www.uniprot.org/uniprotkb/${pack.accession}/entry`
    })),
    ...pack.motifs.map((motif, index) => ({
      id: `uniprot-motif-${index + 1}`,
      name: motif.name,
      sourceDatabase: "UniProt",
      type: /site/i.test(motif.type) ? "site" : "motif",
      start: motif.start ?? 1,
      end: motif.end ?? motif.start ?? 1,
      description: motif.name,
      evidence: motif.source ?? "UniProt feature",
      sourceUrl: `https://www.uniprot.org/uniprotkb/${pack.accession}/entry`
    }))
  ];
}

function domainCoverage(domains, sequenceLength) {
  if (!domains.length || !sequenceLength) {
    return {
      available: false,
      coveredResidues: 0,
      sequenceLength,
      percent: 0,
      source: "InterPro/UniProt",
      reason: "No domain ranges were available in the current static pack."
    };
  }
  const covered = new Set();
  for (const domain of domains) {
    for (let position = domain.start; position <= domain.end; position += 1) {
      covered.add(position);
    }
  }
  return {
    available: true,
    coveredResidues: covered.size,
    sequenceLength,
    percent: Number(((covered.size / sequenceLength) * 100).toFixed(1)),
    source: "InterPro/UniProt"
  };
}

function buildPipeline(pack, structureIntelligence) {
  const hasExperimental = structureIntelligence.structures.experimental.length > 0;
  const hasAlphaFold = structureIntelligence.structures.predicted.length > 0;
  return [
    {
      step: "Input Detection",
      status: "complete",
      dataUsed: [pack.accession, pack.geneName],
      output: "Resolved through static alias/search index.",
      source: "Static Pack"
    },
    {
      step: "Sequence Retrieval",
      status: pack.sequence.value ? "complete" : "partial",
      dataUsed: ["UniProt canonical sequence"],
      output: pack.sequence.value ? `${pack.sequence.length} residues loaded.` : "Sequence length only.",
      source: "UniProt"
    },
    {
      step: "Annotation Retrieval",
      status: structureIntelligence.domains.length ? "complete" : "partial",
      dataUsed: ["UniProt features", "InterPro/Pfam matches"],
      output: `${structureIntelligence.domains.length} domain or feature annotations.`,
      source: "UniProt/InterPro"
    },
    {
      step: "Structure Discovery",
      status: hasExperimental || hasAlphaFold ? "complete" : "missing",
      dataUsed: ["RCSB PDB", "AlphaFold DB"],
      output: `${structureIntelligence.structures.experimental.length} experimental, ${structureIntelligence.structures.predicted.length} predicted.`,
      source: "RCSB PDB/AlphaFold DB"
    },
    {
      step: "Template/Fold Comparison",
      status: "missing",
      dataUsed: ["Coordinates"],
      output: "RMSD/TM-score unavailable until build-time coordinate superposition tools are configured.",
      source: "Build-time Computed"
    },
    {
      step: "Confidence Analysis",
      status: structureIntelligence.metrics.plddt.available || structureIntelligence.metrics.pae.available ? "complete" : "missing",
      dataUsed: ["pLDDT", "PAE"],
      output: "AlphaFold confidence parsed when available.",
      source: "AlphaFold DB"
    },
    {
      step: "Evolutionary Analysis",
      status: structureIntelligence.msa.available ? "complete" : "partial",
      dataUsed: ["curated/UniProt homologs", "MAFFT/Clustal Omega/MUSCLE", "profile/domain evidence"],
      output: structureIntelligence.msa.available
        ? `${structureIntelligence.msa.sourceSequenceCount} homolog sequences aligned at build time.`
        : structureIntelligence.msa.unavailableReason ?? "MSA unavailable in static pack.",
      source: "Build-time MSA/InterPro"
    },
    {
      step: "Structure-Function Interpretation",
      status: structureIntelligence.structureFunction.evidenceCards.length ? "complete" : "partial",
      dataUsed: ["domains", "features", "confidence", "conservation"],
      output: "Rule-based evidence summary generated from loaded sources.",
      source: "Build-time Computed"
    }
  ];
}

function structureFunctionFor(pack, functionComments, domains, plddt, conservedResidues, ligandCount) {
  const cards = [];
  const warnings = [];
  if (functionComments[0]) {
    cards.push({
      title: "UniProt function annotation",
      claim: functionComments[0],
      evidence: ["UniProt function comment"],
      confidence: "high",
      source: "UniProt"
    });
  }
  const bindingDomains = domains.filter((domain) => /binding|dna|kinase|globin|collagen|tubulin|actin/i.test(`${domain.name} ${domain.description}`));
  if (bindingDomains.length) {
    cards.push({
      title: "Domain-function evidence",
      claim: "Annotated domains provide source-backed clues for biological role and fold context.",
      evidence: bindingDomains.slice(0, 4).map((domain) => domain.name),
      confidence: "medium",
      source: "InterPro/Pfam/UniProt"
    });
  }
  if (plddt.available && plddt.lowConfidenceRegions.length) {
    warnings.push("pLDDT and PAE describe model confidence, not direct experimental proof.");
    cards.push({
      title: "Flexible or uncertain model regions",
      claim: "AlphaFold reports low confidence in one or more regions, which may reflect disorder or uncertain placement.",
      evidence: plddt.lowConfidenceRegions.slice(0, 4).map((region) => `${region.start}-${region.end}`),
      confidence: "medium",
      source: "AlphaFold DB"
    });
  }
  if (conservedResidues.length) {
    cards.push({
      title: "Conserved residue evidence",
      claim: "Highly conserved residues may indicate important structural or functional positions.",
      evidence: conservedResidues.slice(0, 6).map((residue) => `${residue.residue}${residue.position}`),
      confidence: "medium",
      source: "Build-time Computed"
    });
  }
  if (ligandCount) {
    cards.push({
      title: "Ligand evidence",
      claim: "RCSB structures include ligand annotations that can guide binding-site inspection.",
      evidence: [`${ligandCount} ligand annotations`],
      confidence: "medium",
      source: "RCSB PDB"
    });
  }
  return {
    summary:
      cards[0]?.claim ??
      `${pack.proteinName} has static sequence and structure annotations, but the current pack lacks enough evidence for a detailed structure-function claim.`,
    evidenceCards: cards,
    warnings
  };
}

async function enrichRcsbStructures(pdbStructures, accession) {
  const structures = [];
  for (const structure of pdbStructures.slice(0, 8)) {
    const entry = await fetchJson(`${RCSB_ENTRY_BASE}/${structure.pdbId}`);
    const chains = (structure.chains ?? "")
      .split(/[,\s=/-]+/)
      .map((chain) => chain.trim())
      .filter((chain) => /^[A-Za-z0-9]+$/.test(chain))
      .slice(0, 12);
    structures.push({
      pdbId: structure.pdbId,
      title: entry?.struct?.title,
      experimentalMethod: structure.method ?? entry?.exptl?.[0]?.method,
      resolution: Number.parseFloat(structure.resolution) || entry?.rcsb_entry_info?.resolution_combined?.[0] || null,
      chains,
      polymerEntities: [
        {
          entityId: "from-uniprot-cross-reference",
          description: entry?.struct?.title,
          chains,
          relatedUniProtIds: [accession]
        }
      ],
      ligands:
        entry?.nonpolymer_entities
          ?.map((entity) => ({
            id: entity.pdbx_entity_nonpoly?.comp_id,
            name: entity.pdbx_entity_nonpoly?.name
          }))
          .filter((ligand) => ligand.id)
          .slice(0, 12) ?? [],
      organism: undefined,
      relatedUniProtIds: [accession],
      releaseDate: entry?.rcsb_accession_info?.initial_release_date,
      source: {
        name: "RCSB PDB Data API",
        url: `https://data.rcsb.org/rest/v1/core/entry/${structure.pdbId}`,
        accessedAt: new Date().toISOString(),
        sourceType: "RCSB PDB"
      }
    });
  }
  return structures;
}

async function buildStructureIntelligence(pack, uniprot, alphaFoldModel, interproResults) {
  const functionComments = extractFunctionComments(uniprot);
  const features = extractUniProtFeatures(uniprot);
  const crossReferences = extractCrossReferences(uniprot);
  const domains = Array.from(
    new Map(
      [...interproDomains(interproResults, pack.sequence.length), ...uniprotDomains(pack)]
        .filter((domain) => domain.start <= domain.end)
        .map((domain) => [`${domain.id}-${domain.start}-${domain.end}`, domain])
    ).values()
  ).slice(0, 60);
  const experimental = await enrichRcsbStructures(pack.pdbStructures, pack.accession);

  let plddt = {
    available: false,
    reason: alphaFoldModel ? "AlphaFold confidence JSON could not be fetched during static build." : "No AlphaFold model was available for this accession.",
    method: "AlphaFold confidence JSON parsing",
    source: "AlphaFold DB"
  };
  let pae = {
    available: false,
    reason: alphaFoldModel ? "PAE JSON was not fetched for this static pack." : "No AlphaFold model was available for this accession.",
    method: "AlphaFold PAE JSON parsing",
    source: "AlphaFold DB"
  };
  let msa = {
    available: false,
    method: "Build-time homolog MSA (MAFFT/Clustal Omega/MUSCLE)",
    alignedSequences: [],
    consensus: "",
    conservationScores: [],
    gapFrequencies: [],
    sourceSequenceCount: 0,
    source: "Curated/UniProt homologs",
    unavailableReason: "Build-time curated/UniProt homolog MSA has not been generated for this static pack."
  };

  if (alphaFoldModel?.plddtDocUrl) {
    plddt = parsePlddtConfidence(await fetchJson(alphaFoldModel.plddtDocUrl));
  } else if (alphaFoldModel?.globalMetricValue) {
    plddt = {
      available: true,
      mean: Number(alphaFoldModel.globalMetricValue.toFixed(2)),
      median: Number(alphaFoldModel.globalMetricValue.toFixed(2)),
      bins: {
        veryHigh_90_100: Number(alphaFoldModel.fractionPlddtVeryHigh ?? 0),
        confident_70_90: Number(alphaFoldModel.fractionPlddtConfident ?? 0),
        low_50_70: Number(alphaFoldModel.fractionPlddtLow ?? 0),
        veryLow_0_50: Number(alphaFoldModel.fractionPlddtVeryLow ?? 0)
      },
      perResidue: [],
      lowConfidenceRegions: [],
      highConfidenceRegions: [],
      source: "AlphaFold DB"
    };
  }

  if (alphaFoldModel?.paeDocUrl && pack.sequence.length <= 900) {
    pae = summarizePae(await fetchJson(alphaFoldModel.paeDocUrl), alphaFoldModel.paeDocUrl);
  } else if (alphaFoldModel?.paeDocUrl) {
    pae = {
      available: false,
      reason: "PAE matrix exists but was not embedded because it is too large for the starter static pack.",
      method: "AlphaFold PAE JSON parsing",
      source: "AlphaFold DB"
    };
  }

  msa = await buildHomologMsa(pack);

  const conservedResidues = conservedResiduesFromMsa(msa, pack.sequence.value, domains, features);
  const profileEvidence = domains
    .filter((domain) => ["InterPro", "Pfam"].includes(domain.sourceDatabase))
    .slice(0, 24)
    .map((domain) => ({
      profileId: domain.id,
      profileName: domain.name,
      database: domain.sourceDatabase,
      start: domain.start,
      end: domain.end,
      score: null,
      eValue: null,
      description: domain.description,
      interpretation: "Profile/domain evidence imported from InterPro/Pfam-style annotations at build time."
    }));
  const predicted = alphaFoldModel
    ? [
        {
          provider: "AlphaFold DB",
          modelId: alphaFoldModel.entryId ?? alphaFoldModel.modelEntityId,
          modelUrl: alphaFoldModel.bcifUrl,
          cifUrl: alphaFoldModel.cifUrl,
          pdbUrl: alphaFoldModel.pdbUrl,
          bcifUrl: alphaFoldModel.bcifUrl,
          paeUrl: alphaFoldModel.paeDocUrl,
          plddtUrl: alphaFoldModel.plddtDocUrl,
          meanPlddt: alphaFoldModel.globalMetricValue,
          source: {
            name: "AlphaFold DB API",
            url: `${ALPHAFOLD_BASE}/${pack.accession}`,
            accessedAt: new Date().toISOString(),
            sourceType: "AlphaFold DB",
            version: alphaFoldModel.latestVersion ? `v${alphaFoldModel.latestVersion}` : undefined
          }
        }
      ]
    : [];
  const structureFunction = structureFunctionFor(
    pack,
    functionComments,
    domains,
    plddt,
    conservedResidues,
    experimental.reduce((count, structure) => count + structure.ligands.length, 0)
  );
  const structureIntelligence = {
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
      crossReferences
    },
    structures: {
      experimental,
      predicted
    },
    domains,
    msa,
    profileEvidence,
    conservedResidues,
    metrics: {
      rmsdComparisons: [
        {
          available: false,
          reason: "No build-time coordinate superposition job has been configured for this protein pair.",
          method: "Kabsch superposition",
          source: "computed-build-time"
        }
      ],
      tmScoreComparisons: [
        {
          available: false,
          reason: "TM-align or Foldseek was not available during the static build.",
          method: "TM-align/Foldseek/build-time",
          source: "computed-build-time"
        }
      ],
      plddt,
      pae,
      domainCoverage: domainCoverage(domains, pack.sequence.length),
      conservationSummary: msa.available
        ? {
            available: true,
            meanConservation: Number((msa.conservationScores.reduce((sum, score) => sum + score, 0) / Math.max(msa.conservationScores.length, 1)).toFixed(3)),
            highlyConservedPositions: conservedResidues.map((residue) => residue.position),
            method: msa.method
          }
        : {
            available: false,
            meanConservation: 0,
            highlyConservedPositions: [],
            method: msa.method,
            reason: msa.unavailableReason
          }
    },
    structureFunction,
    intelligence: {
      structureFunctionSummary: structureFunction.summary,
      sequenceStructureFunctionPipeline: [],
      warnings: [
        "BioAlign Pro Fold Explorer does not perform AlphaFold-level structure prediction.",
        "pLDDT and PAE describe model confidence, not direct experimental proof.",
        "RMSD and TM-score depend on correct residue/structure alignment.",
        ...structureFunction.warnings
      ],
      confidenceNotes: [
        "Experimental structures come from PDB/RCSB.",
        "Predicted structures come from AlphaFold DB when available.",
        "Browser live API refresh may fail due to CORS, rate limits, or network issues."
      ],
      sourceBadges: [
        "Static Pack",
        "UniProt",
        ...(experimental.length ? ["RCSB PDB"] : []),
        ...(predicted.length ? ["AlphaFold DB"] : []),
        ...(interproResults.length ? ["InterPro", "Pfam"] : []),
        "Build-time Computed"
      ]
    },
    sources: [
      {
        name: "UniProt REST API",
        url: `${UNIPROT_BASE}/${pack.accession}.json`,
        accessedAt: new Date().toISOString(),
        sourceType: "UniProt"
      },
      ...(interproResults.length
        ? [
            {
              name: "InterPro API",
              url: `${INTERPRO_BASE}/${pack.accession}/`,
              accessedAt: new Date().toISOString(),
              sourceType: "InterPro"
            }
          ]
        : []),
      ...(msa.available
        ? [
            {
              name: msa.method,
              accessedAt: new Date().toISOString(),
              sourceType: "Build-time Computed",
              version: msa.source
            }
          ]
        : []),
      ...(predicted.length ? [predicted[0].source] : []),
      ...experimental.slice(0, 4).map((structure) => structure.source)
    ]
  };
  structureIntelligence.intelligence.sequenceStructureFunctionPipeline = buildPipeline(pack, structureIntelligence);
  return structureIntelligence;
}

function packFor(seed, uniprot, alphafold) {
  const proteinName = extractProteinName(uniprot, seed);
  const sequence = extractSequence(uniprot, seed);
  const pdbStructures = extractPdbStructures(uniprot, seed);
  const motifs = extractMotifs(uniprot);
  const alphaFoldModel = Array.isArray(alphafold) && alphafold.length > 0 ? alphafold[0] : null;
  const sourceBadges = [
    "local static pack",
    uniprot ? "UniProt build-time fetch" : "starter fallback",
    alphaFoldModel ? "AlphaFold availability found" : "AlphaFold checked/fallback",
    sequence.value ? "sequence included" : "sequence metadata only"
  ];

  return {
    schemaVersion: "bioalign.static-protein-pack.v1",
    generatedAt: new Date().toISOString(),
    accession: seed.accession,
    geneName: seed.geneName,
    proteinName,
    aliases: seed.aliases,
    organism: extractOrganism(uniprot, seed),
    sequence,
    sequenceType: "protein",
    domains: seed.domains,
    motifs,
    pdbStructures,
    alphaFold: {
      available: Boolean(alphaFoldModel),
      modelId: alphaFoldModel?.entryId ?? alphaFoldModel?.modelEntityId,
      pdbUrl: alphaFoldModel?.pdbUrl,
      cifUrl: alphaFoldModel?.cifUrl,
      confidenceAvg: alphaFoldModel?.confidenceAvg ?? alphaFoldModel?.globalMetricValue,
      paeUrl: alphaFoldModel?.paeDocUrl,
      plddtUrl: alphaFoldModel?.plddtDocUrl
    },
    templates: pdbStructures.slice(0, 6).map((structure, index) => ({
      id: `${structure.pdbId}-${index + 1}`,
      pdbId: structure.pdbId,
      label: structure.method ?? "Representative structure",
      score: null,
      rankReason: "Structure listed from UniProt/RCSB evidence; no template-ranking score was computed.",
      source: structure.source
    })),
    confidenceCards: [
      {
        id: "uniprot-metadata",
        label: "UniProt metadata",
        value: uniprot ? "available" : "fallback",
        detail: uniprot ? "Build-time UniProt metadata was available." : "Using curated starter fallback metadata.",
        source: uniprot ? "UniProt" : "starter curation"
      },
      {
        id: "structure-coverage",
        label: "Structure references",
        value: `${pdbStructures.length}`,
        detail: `${pdbStructures.length} PDB reference${pdbStructures.length === 1 ? "" : "s"} in pack.`,
        source: "UniProt/RCSB PDB"
      }
    ],
    pathways: seed.pathways.map((name) => ({ id: name.toLowerCase().replace(/[^a-z0-9]+/g, "-"), name, source: "starter curation" })),
    interactions: seed.interactions.map((target) => ({ target, score: null, source: "starter curation" })),
    diseaseSummary: seed.relevance,
    sourceBadges
  };
}

const packs = [];

for (const seed of starterProteinSeeds) {
  const [uniprot, alphafold, interpro] = await Promise.all([
    fetchJson(`${UNIPROT_BASE}/${seed.accession}.json`),
    fetchJson(`${ALPHAFOLD_BASE}/${seed.accession}`),
    fetchJson(`${INTERPRO_BASE}/${seed.accession}/?page_size=40`)
  ]);
  const pack = packFor(seed, uniprot, alphafold);
  pack.structureIntelligence = await buildStructureIntelligence(
    pack,
    uniprot,
    Array.isArray(alphafold) && alphafold.length > 0 ? alphafold[0] : null,
    interpro?.results ?? []
  );
  packs.push(pack);
  await writeJson(path.join(proteinPacksDir, `${seed.accession}.json`), pack);
  await writeJson(path.join(structureIntelligenceDir, `${seed.accession}.json`), pack.structureIntelligence);
}

await writeJson(path.join(dataDir, "starter-proteins.json"), {
  version: "2026.05.29-starter-proteins-v1",
  generatedAt: new Date().toISOString(),
  count: packs.length,
  proteins: packs.map((pack) => ({
    accession: pack.accession,
    geneName: pack.geneName,
    proteinName: pack.proteinName,
    aliases: pack.aliases,
    organism: pack.organism,
    sequenceLength: pack.sequence.length,
    packPath: `/data/protein-packs/${pack.accession}.json`,
    compressedPackPath: `/data/protein-packs/${pack.accession}.json.gz`,
    alphaFoldAvailable: pack.alphaFold.available,
    pdbCount: pack.pdbStructures.length,
    pdbIds: pack.pdbStructures.map((structure) => structure.pdbId),
    relevance: pack.diseaseSummary,
    sourceBadges: pack.sourceBadges
  }))
});

await writeJson(path.join(dataDir, "public-data-sources.json"), {
  generatedAt: new Date().toISOString(),
  mode: "offline-static-seed",
  note: "Network fetching is intentionally a build-time-only concern. Add public datasets here before deployment.",
  sources: [
    { id: "uniprot-seed", license: "public", runtime: "static-json" },
    { id: "motif-rules", license: "curated-local", runtime: "static-json" }
  ]
});

await writeJson(path.join(dataDir, "manifest.json"), {
  version: "2026.05.29-static-client-v2",
  generatedAt: new Date().toISOString(),
  deployment: "github-pages-static",
  packs: [
    {
      id: "starter-proteins",
      href: "/data/starter-proteins.json",
      compressedHref: "/data/starter-proteins.json.gz",
      description: "Famous protein starter dataset with static protein pack pointers."
    },
    {
      id: "motifs",
      href: "/data/motifs.json",
      compressedHref: "/data/motifs.json.gz",
      description: "Browser motif definitions for local sequence scanning."
    },
    ...packs.map((pack) => ({
      id: `protein-pack-${pack.accession}`,
      href: `/data/protein-packs/${pack.accession}.json`,
      compressedHref: `/data/protein-packs/${pack.accession}.json.gz`,
      description: `${pack.geneName} static protein intelligence pack.`
    })),
    ...packs.map((pack) => ({
      id: `structure-intelligence-${pack.accession}`,
      href: `/data/structure-intelligence/${pack.accession}.json`,
      compressedHref: `/data/structure-intelligence/${pack.accession}.json.gz`,
      description: `${pack.geneName} structure intelligence extension pack.`
    }))
  ]
});

console.log(`Prepared ${packs.length} starter protein pack(s).`);
