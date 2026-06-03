import { execFile } from "node:child_process";
import { brotliCompressSync, gzipSync } from "node:zlib";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const workspaceRoot = process.cwd();
const publicDataDir = path.join(workspaceRoot, "public", "data");
const docsDataDir = path.join(workspaceRoot, "docs", "data");
const commandCache = new Map();
let structureFileManifest = null;

const homologGroups = [
  {
    id: "tp53-vertebrate-family",
    label: "TP53 vertebrate homolog MSA",
    accessions: ["P04637"],
    extraRecords: [
      {
        accession: "P02340",
        geneName: "Tp53",
        proteinName: "Cellular tumor antigen p53",
        organism: "Mus musculus",
        source: "UniProtKB reviewed P02340",
        sequence:
          "MTAMEESQSDISLELPLSQETFSGLWKLLPPEDILPSPHCMDDLLLPQDVEEFFEGPSEALRVSGAPAAQDPVTETPGPVAPAPATPWPLSSFVPSQKTYQGNYGFHLGFLQSGTAKSVMCTYSPPLNKLFCQLAKTCPVQLWVSATPPAGSRVRAMAIYKKSQHMTEVVRRCPHHERCSDGDGLAPPQHLIRVEGNLYPEYLEDRQTFRHSVVVPYEPPEAGSEYTTIHYKYMCNSSCMGGMNRRPILTIITLEDSSGNLLGRDSFEVRVCACPGRDRRTEEENFRKKEVLCPELPPGSAKRALPTCTSASPPQKKKPLDGEYFTLKIRGRKRFEMFRELNEALELKDAHATEESGDSRAHSSYLKTKKGQSTSRHKKTMVKKVGPDSD"
      },
      {
        accession: "P10361",
        geneName: "Tp53",
        proteinName: "Cellular tumor antigen p53",
        organism: "Rattus norvegicus",
        source: "UniProtKB reviewed P10361",
        sequence:
          "MEDSQSDMSIELPLSQETFSCLWKLLPPDDILPTTATGSPNSMEDLFLPQDVAELLEGPEEALQVSAPAAQEPGTEAPAPVAPASATPWPLSSSVPSQKTYQGNYGFHLGFLQSGTAKSVMCTYSISLNKLFCQLAKTCPVQLWVTSTPPPGTRVRAMAIYKKSQHMTEVVRRCPHHERCSDGDGLAPPQHLIRVEGNPYAEYLDDRQTFRHSVVVPYEPPEVGSDYTTIHYKYMCNSSCMGGMNRRPILTIITLEDSSGNLLGRDSFEVRVCACPGRDRRTEEENFRKKEEHCPELPPGSAKRALPTSTSSSPQQKKKPLDGEYFTLKIRGRERFEMFRELNEALELKDARAAEESGDSRAHSSYPKTKKGQSTSRHKKPMIKKVGPDSD"
      }
    ]
  },
  {
    id: "hemoglobin-globin-family",
    label: "Hemoglobin globin-family MSA",
    accessions: ["P69905", "P68871"]
  },
  {
    id: "ras-small-gtpase-family",
    label: "RAS-family small GTPase MSA",
    accessions: ["P01116", "P01112", "P01111"]
  }
];

const msaToolCandidates = [
  { id: "mafft", label: "MAFFT", command: "mafft" },
  { id: "clustalo", label: "Clustal Omega", command: "clustalo" },
  { id: "muscle", label: "MUSCLE", command: "muscle" }
];

const structureToolCandidates = [
  { id: "usalign", label: "US-align", command: "USalign" },
  { id: "tmalign", label: "TM-align", command: "TMalign" }
];

function positiveInteger(value, fallback) {
  const parsed = Number.parseInt(String(value ?? ""), 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

async function mapWithConcurrency(items, concurrency, worker) {
  const output = new Array(items.length);
  let nextIndex = 0;
  const workerCount = Math.max(1, Math.min(concurrency, items.length));
  await Promise.all(
    Array.from({ length: workerCount }, async () => {
      while (nextIndex < items.length) {
        const index = nextIndex;
        nextIndex += 1;
        output[index] = await worker(items[index], index);
      }
    })
  );
  return output;
}

function normalizeSequence(sequence) {
  return String(sequence || "").toUpperCase().replace(/[^A-Z]/g, "");
}

async function readJson(filePath) {
  return JSON.parse(await readFile(filePath, "utf8"));
}

async function readStructureFileManifest() {
  if (structureFileManifest) return structureFileManifest;
  try {
    structureFileManifest = await readJson(path.join(publicDataDir, "structures", "manifest.json"));
  } catch {
    structureFileManifest = { records: [] };
  }
  return structureFileManifest;
}

async function writeJsonWithCompression(filePath, value) {
  const text = `${JSON.stringify(value, null, 2)}\n`;
  await writeFile(filePath, text, "utf8");
  await writeFile(`${filePath}.gz`, gzipSync(Buffer.from(text)));
  await writeFile(`${filePath}.br`, brotliCompressSync(Buffer.from(text)));
}

async function commandExists(command) {
  if (commandCache.has(command)) return commandCache.get(command);
  const locator = process.platform === "win32" ? "where.exe" : "which";
  try {
    await execFileAsync(locator, [command], { timeout: 5_000, windowsHide: true });
    commandCache.set(command, true);
    return true;
  } catch {
    commandCache.set(command, false);
    return false;
  }
}

async function firstAvailable(candidates) {
  for (const candidate of candidates) {
    if (await commandExists(candidate.command)) return candidate;
  }
  return null;
}

function formatFasta(records) {
  return records
    .map((record) => {
      const wrapped = record.sequence.match(/.{1,80}/g)?.join("\n") ?? record.sequence;
      return `>${record.accession} ${record.geneName} ${record.proteinName}\n${wrapped}`;
    })
    .join("\n");
}

function parseFasta(text, source) {
  const records = [];
  let current = null;
  for (const line of String(text || "").split(/\r?\n/)) {
    if (!line.trim()) continue;
    if (line.startsWith(">")) {
      const label = line.slice(1).trim();
      current = {
        id: label.split(/\s+/)[0],
        label,
        sequence: "",
        source
      };
      records.push(current);
    } else if (current) {
      current.sequence += String(line).toUpperCase().replace(/[^A-Z-]/g, "");
    }
  }
  return records.filter((record) => record.sequence.length > 0);
}

async function safeRemoveTempDir(tempDir) {
  const resolved = path.resolve(tempDir);
  const tempRoot = path.resolve(os.tmpdir());
  if (resolved.startsWith(`${tempRoot}${path.sep}`) && path.basename(resolved).startsWith("bioalign-")) {
    await rm(resolved, { recursive: true, force: true });
  }
}

async function runExternalMsa(tool, records) {
  const tempDir = await mkdtemp(path.join(os.tmpdir(), "bioalign-msa-"));
  const inputPath = path.join(tempDir, "input.fasta");
  const outputPath = path.join(tempDir, "alignment.fasta");
  const options = { timeout: 180_000, maxBuffer: 64 * 1024 * 1024, windowsHide: true };
  try {
    await writeFile(inputPath, formatFasta(records), "utf8");
    let alignedText = "";
    if (tool.id === "mafft") {
      const { stdout } = await execFileAsync(tool.command, ["--auto", inputPath], options);
      alignedText = stdout;
    } else if (tool.id === "clustalo") {
      await execFileAsync(tool.command, ["-i", inputPath, "-o", outputPath, "--force", "--outfmt=fasta"], options);
      alignedText = await readFile(outputPath, "utf8");
    } else {
      try {
        await execFileAsync(tool.command, ["-align", inputPath, "-output", outputPath], options);
      } catch {
        await execFileAsync(tool.command, ["-in", inputPath, "-out", outputPath], options);
      }
      alignedText = await readFile(outputPath, "utf8");
    }
    const alignedSequences = parseFasta(alignedText, `${tool.label} build-time alignment`);
    if (alignedSequences.length < 2) {
      return { available: false, reason: `${tool.label} did not produce at least two aligned FASTA records.` };
    }
    return {
      available: true,
      alignedSequences,
      method: `${tool.label} build-time MSA`,
      source: "PATH bioinformatics tool"
    };
  } catch (error) {
    return { available: false, reason: `${tool.label} failed: ${error?.message ?? "unknown alignment error"}` };
  } finally {
    await safeRemoveTempDir(tempDir);
  }
}

function scorePair(a, b) {
  if (a === b) return 3;
  if (a === "-" || b === "-") return -4;
  return -1;
}

function alignPair(a, b) {
  const rows = a.length + 1;
  const cols = b.length + 1;
  const matrix = Array.from({ length: rows }, () => Array(cols).fill(0));
  const trace = Array.from({ length: rows }, () => Array(cols).fill(""));
  for (let i = 1; i < rows; i += 1) {
    matrix[i][0] = matrix[i - 1][0] - 4;
    trace[i][0] = "up";
  }
  for (let j = 1; j < cols; j += 1) {
    matrix[0][j] = matrix[0][j - 1] - 4;
    trace[0][j] = "left";
  }
  for (let i = 1; i < rows; i += 1) {
    for (let j = 1; j < cols; j += 1) {
      const diagonal = matrix[i - 1][j - 1] + scorePair(a[i - 1], b[j - 1]);
      const up = matrix[i - 1][j] - 4;
      const left = matrix[i][j - 1] - 4;
      const best = Math.max(diagonal, up, left);
      matrix[i][j] = best;
      trace[i][j] = best === diagonal ? "diag" : best === up ? "up" : "left";
    }
  }
  const alignedA = [];
  const alignedB = [];
  let i = a.length;
  let j = b.length;
  while (i > 0 || j > 0) {
    const move = trace[i]?.[j];
    if (move === "diag") {
      alignedA.push(a[i - 1]);
      alignedB.push(b[j - 1]);
      i -= 1;
      j -= 1;
    } else if (move === "up") {
      alignedA.push(a[i - 1]);
      alignedB.push("-");
      i -= 1;
    } else {
      alignedA.push("-");
      alignedB.push(b[j - 1]);
      j -= 1;
    }
  }
  return { a: alignedA.reverse().join(""), b: alignedB.reverse().join("") };
}

function mergeAlignment(msa, pairCenter, pairSequence) {
  const mergedRows = msa.rows.map(() => []);
  const newRow = [];
  let oldIndex = 0;
  let newIndex = 0;
  while (oldIndex < msa.center.length || newIndex < pairCenter.length) {
    const oldChar = msa.center[oldIndex];
    const newChar = pairCenter[newIndex];
    if (oldChar === "-" && newChar === "-") {
      for (let rowIndex = 0; rowIndex < msa.rows.length; rowIndex += 1) mergedRows[rowIndex].push(msa.rows[rowIndex][oldIndex] ?? "-");
      newRow.push(pairSequence[newIndex] ?? "-");
      oldIndex += 1;
      newIndex += 1;
    } else if (oldChar === "-") {
      for (let rowIndex = 0; rowIndex < msa.rows.length; rowIndex += 1) mergedRows[rowIndex].push(msa.rows[rowIndex][oldIndex] ?? "-");
      newRow.push("-");
      oldIndex += 1;
    } else if (newChar === "-") {
      for (let rowIndex = 0; rowIndex < msa.rows.length; rowIndex += 1) mergedRows[rowIndex].push("-");
      newRow.push(pairSequence[newIndex] ?? "-");
      newIndex += 1;
    } else {
      for (let rowIndex = 0; rowIndex < msa.rows.length; rowIndex += 1) mergedRows[rowIndex].push(msa.rows[rowIndex][oldIndex] ?? "-");
      newRow.push(pairSequence[newIndex] ?? "-");
      oldIndex += 1;
      newIndex += 1;
    }
  }
  return { center: mergedRows[0].join(""), rows: [...mergedRows.map((row) => row.join("")), newRow.join("")] };
}

function buildCenterStarMsa(records, queryAccession) {
  const query = records.find((record) => record.accession === queryAccession);
  let msa = { center: query.sequence, rows: [query.sequence] };
  const outputRecords = [query];
  for (const record of records.filter((item) => item.accession !== queryAccession)) {
    const pair = alignPair(query.sequence, record.sequence);
    msa = mergeAlignment(msa, pair.a, pair.b);
    outputRecords.push(record);
  }
  return outputRecords.map((record, index) => ({
    id: record.accession,
    label: `${record.accession} ${record.geneName} ${record.proteinName}`,
    sequence: msa.rows[index],
    source: "Starter protein homolog group"
  }));
}

async function buildMsa(records, queryAccession, group) {
  for (const candidate of msaToolCandidates) {
    const tool = await firstAvailable([candidate]);
    if (!tool) continue;
    const result = await runExternalMsa(tool, records);
    if (result.available) {
      const queryIndex = result.alignedSequences.findIndex((record) => record.id === queryAccession);
      const ordered = queryIndex > 0
        ? [result.alignedSequences[queryIndex], ...result.alignedSequences.filter((_, index) => index !== queryIndex)]
        : result.alignedSequences;
      return {
        alignedSequences: ordered,
        method: result.method,
        source: result.source
      };
    }
    console.warn(`MSA tool fallback for ${queryAccession}: ${result.reason}. Trying next aligner if available.`);
  }
  return {
    alignedSequences: buildCenterStarMsa(records, queryAccession),
    method: `${group.label} (center-star global alignment fallback)`,
    source: "Starter protein homolog sequences"
  };
}

function summarizeMsa(alignedSequences, canonicalSequence, method, source) {
  const queryAlignedSequence = alignedSequences[0].sequence;
  const consensus = [];
  const conservationScores = [];
  const gapFrequencies = [];
  for (let index = 0; index < queryAlignedSequence.length; index += 1) {
    if (queryAlignedSequence[index] === "-") continue;
    const residues = alignedSequences.map((record) => record.sequence[index] ?? "-");
    const nonGapResidues = residues.filter((residue) => residue !== "-");
    const counts = new Map();
    for (const residue of nonGapResidues) counts.set(residue, (counts.get(residue) ?? 0) + 1);
    const [topResidue = "-", topCount = 0] = [...counts.entries()].sort((left, right) => right[1] - left[1])[0] ?? [];
    consensus.push(topResidue);
    conservationScores.push(Number((topCount / Math.max(nonGapResidues.length, 1)).toFixed(3)));
    gapFrequencies.push(Number((residues.filter((residue) => residue === "-").length / residues.length).toFixed(3)));
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

function conservedResiduesFromMsa(msa, sequence, domains = [], features = []) {
  const activeOrBindingSites = features.filter((feature) => /active|binding|site/i.test(`${feature.type} ${feature.description}`));
  return msa.conservationScores
    .map((score, index) => {
      const position = index + 1;
      const domain = domains.find((item) => position >= item.start && position <= item.end);
      const site = activeOrBindingSites.find((feature) => position >= (feature.start ?? 0) && position <= (feature.end ?? 0));
      return {
        position,
        residue: sequence[index] ?? "",
        conservationScore: score,
        evidence: site ? ["MSA", "UniProt feature"] : ["MSA"],
        insideDomain: domain?.name,
        possibleRole: site?.type?.toLowerCase().includes("binding") ? "binding" : site ? "active site" : "unknown",
        notes: site ? `Conserved position overlaps ${site.description}.` : "Highly conserved in the homolog alignment; inspect domains and structures for role."
      };
    })
    .filter((item) => item.residue && item.conservationScore >= 0.9)
    .slice(0, 24);
}

function parseAlignmentMetrics(output) {
  const alignedLength = Number(output.match(/Aligned length=\s*(\d+)/i)?.[1]);
  const rmsd = Number(output.match(/RMSD=\s*([0-9.]+)/i)?.[1]);
  const seqIdLine = output.match(/Seq_ID[^\r\n]*/i)?.[0] ?? "";
  const seqIdMatches = [...seqIdLine.matchAll(/=\s*([0-9.]+)/g)].map((match) => Number(match[1])).filter(Number.isFinite);
  const seqId = seqIdMatches.at(-1);
  const tmScores = [...output.matchAll(/TM-score=\s*([0-9.]+)/gi)].map((match) => Number(match[1])).filter(Number.isFinite);
  const tmScore = tmScores.length ? Math.max(...tmScores) : NaN;
  if (!Number.isFinite(alignedLength) || !Number.isFinite(rmsd) || !Number.isFinite(tmScore)) return null;
  return {
    alignedLength,
    rmsd: Number(rmsd.toFixed(3)),
    tmScore: Number(tmScore.toFixed(4)),
    sequenceIdentityAligned: Number.isFinite(seqId) ? Number(seqId.toFixed(4)) : undefined
  };
}

function rmsdInterpretation(rmsd) {
  if (rmsd <= 2) return "Low deviation";
  if (rmsd <= 5) return "Moderate deviation";
  return "High deviation";
}

function tmInterpretation(tmScore) {
  if (tmScore >= 0.5) return "same fold";
  if (tmScore >= 0.3) return "possible similarity";
  return "weak similarity";
}

async function fetchText(url, timeoutMs = 30_000) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.text();
  } finally {
    clearTimeout(timeout);
  }
}

async function readLocalStructureText(record) {
  if (!record?.relativePath) return null;
  try {
    return await readFile(path.join(workspaceRoot, "public", record.relativePath), "utf8");
  } catch {
    return null;
  }
}

async function readLocalStructureJson(record) {
  const text = await readLocalStructureText(record);
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

function parsePlddtConfidence(confidence) {
  const rawValues = confidence?.confidenceScore ?? confidence?.plddt ?? confidence?.confidence ?? confidence;
  const values = Array.isArray(rawValues) ? rawValues.filter((value) => Number.isFinite(value)) : [];
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
        if (length >= 5) regions.push({ start: start + 1, end: index, mean: Number((total / length).toFixed(2)), label });
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
  const matrix = payload?.predicted_aligned_error ?? payload?.pae ?? payload?.paeMatrix;
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
    if (!Array.isArray(row)) continue;
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
      const value = matrix[row][column];
      outputRow.push(Number.isFinite(value) ? Number(value.toFixed(2)) : null);
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

function upsertAlphaFoldSource(structureIntelligence) {
  const sources = structureIntelligence.sources ?? [];
  if (!sources.some((source) => source.sourceType === "AlphaFold DB")) {
    sources.push({
      name: "AlphaFold DB",
      accessedAt: new Date().toISOString(),
      sourceType: "AlphaFold DB",
      url: "https://alphafold.ebi.ac.uk/"
    });
  }
  structureIntelligence.sources = sources;
}

async function applyCachedAlphaFoldConfidence(pack) {
  const manifest = await readStructureFileManifest();
  const records = manifest.records ?? [];
  const alphaFoldRecords = records.filter((record) => record.accession === pack.accession && record.sourceType === "AlphaFold DB");
  if (!alphaFoldRecords.length) return false;

  const pdbRecord = alphaFoldRecords.find((record) => record.coordinateType === "predicted" && record.format === "PDB");
  const cifRecord = alphaFoldRecords.find((record) => record.coordinateType === "predicted" && record.format === "mmCIF");
  const paeRecord = alphaFoldRecords.find((record) => record.coordinateType === "confidence" && record.format === "PAE JSON");
  const plddtRecord = alphaFoldRecords.find((record) => record.coordinateType === "confidence" && record.format === "pLDDT JSON");
  const modelId = pdbRecord?.modelId ?? cifRecord?.modelId ?? paeRecord?.modelId ?? plddtRecord?.modelId ?? pack.alphaFold?.modelId ?? `AF-${pack.accession}-F1`;

  pack.alphaFold = {
    ...(pack.alphaFold ?? {}),
    available: Boolean(pdbRecord || cifRecord || paeRecord || plddtRecord),
    modelId,
    pdbUrl: pack.alphaFold?.pdbUrl ?? pdbRecord?.sourceUrl,
    cifUrl: pack.alphaFold?.cifUrl ?? cifRecord?.sourceUrl,
    paeUrl: pack.alphaFold?.paeUrl ?? paeRecord?.sourceUrl,
    plddtUrl: pack.alphaFold?.plddtUrl ?? plddtRecord?.sourceUrl
  };

  const structureIntelligence = pack.structureIntelligence;
  structureIntelligence.structures.predicted = structureIntelligence.structures.predicted ?? [];
  const predictedRecord = structureIntelligence.structures.predicted.find((record) => record.modelId === modelId);
  if (pdbRecord || cifRecord) {
    const predicted = predictedRecord ?? {
      provider: "AlphaFold DB",
      modelId,
      source: {
        name: "AlphaFold DB",
        sourceType: "AlphaFold DB",
        url: `https://alphafold.ebi.ac.uk/entry/${pack.accession}`
      }
    };
    predicted.modelUrl = predicted.modelUrl ?? cifRecord?.sourceUrl ?? pdbRecord?.sourceUrl;
    predicted.cifUrl = predicted.cifUrl ?? cifRecord?.sourceUrl;
    predicted.pdbUrl = predicted.pdbUrl ?? pdbRecord?.sourceUrl;
    predicted.paeUrl = predicted.paeUrl ?? paeRecord?.sourceUrl;
    predicted.plddtUrl = predicted.plddtUrl ?? plddtRecord?.sourceUrl;
    if (!predictedRecord) structureIntelligence.structures.predicted.unshift(predicted);
  }

  const plddtJson = await readLocalStructureJson(plddtRecord);
  if (plddtJson) {
    const plddt = parsePlddtConfidence(plddtJson);
    if (plddt.available) {
      structureIntelligence.metrics.plddt = plddt;
      pack.alphaFold.confidenceAvg = plddt.mean;
      const predicted = structureIntelligence.structures.predicted.find((record) => record.modelId === modelId);
      if (predicted) predicted.meanPlddt = plddt.mean;
    }
  }

  const paeJson = await readLocalStructureJson(paeRecord);
  if (paeJson) {
    const pae = summarizePae(paeJson, paeRecord?.sourceUrl ?? pack.alphaFold.paeUrl);
    if (pae.available) structureIntelligence.metrics.pae = pae;
  }

  upsertAlphaFoldSource(structureIntelligence);
  return true;
}

async function writeCoordinateInput(tempDir, name, localRecord, remoteUrl) {
  const fileName = `${name}.${localRecord?.format === "mmCIF" ? "cif" : "pdb"}`;
  const filePath = path.join(tempDir, fileName);
  const text = (await readLocalStructureText(localRecord)) ?? (remoteUrl ? await fetchText(remoteUrl) : null);
  if (!text || !/^(ATOM|HETATM|HEADER|TITLE)|data_|_atom_site\./m.test(text)) {
    return null;
  }
  await writeFile(filePath, text, "utf8");
  return filePath;
}

async function computeStructureMetrics(pack) {
  const tool = await firstAvailable(structureToolCandidates);
  if (!tool) {
    return { available: false, reason: "US-align or TM-align was not available on PATH during structure enrichment." };
  }

  const manifest = await readStructureFileManifest();
  const records = manifest.records ?? [];
  const predicted = pack.structureIntelligence?.structures?.predicted?.[0];
  const experimental = pack.structureIntelligence?.structures?.experimental?.find((item) => item.pdbId);
  const experimentalRecord =
    records.find((record) => record.coordinateType === "experimental" && record.format === "PDB" && record.pdbId === experimental?.pdbId) ??
    records.find((record) => record.coordinateType === "experimental" && record.pdbId === experimental?.pdbId);
  const predictedRecord =
    records.find((record) => record.coordinateType === "predicted" && record.format === "PDB" && record.accession === pack.accession) ??
    records.find((record) => record.coordinateType === "predicted" && record.accession === pack.accession);
  const predictedUrl = predicted?.pdbUrl || pack.alphaFold?.pdbUrl || predictedRecord?.sourceUrl;
  const experimentalUrl = experimental?.pdbId ? `https://files.rcsb.org/download/${experimental.pdbId}.pdb` : experimentalRecord?.sourceUrl;
  if ((!predictedRecord && !predictedUrl) || (!experimentalRecord && !experimentalUrl) || !experimental?.pdbId) {
    return { available: false, reason: "A predicted coordinate file and an experimental PDB coordinate file are both required for structure superposition." };
  }

  const tempDir = await mkdtemp(path.join(os.tmpdir(), "bioalign-structure-"));
  try {
    const predictedPath = await writeCoordinateInput(tempDir, `${pack.accession}-alphafold`, predictedRecord, predictedUrl);
    const experimentalPath = await writeCoordinateInput(tempDir, `${experimental.pdbId}-experimental`, experimentalRecord, experimentalUrl);
    if (!predictedPath || !experimentalPath) {
      return { available: false, reason: "Coordinate files were not available locally and could not be downloaded during this build." };
    }

    const { stdout, stderr } = await execFileAsync(tool.command, [predictedPath, experimentalPath], {
      timeout: 180_000,
      maxBuffer: 32 * 1024 * 1024,
      windowsHide: true
    });
    const parsed = parseAlignmentMetrics(`${stdout}\n${stderr}`);
    if (!parsed) return { available: false, reason: `${tool.label} ran, but no valid RMSD/TM-score could be parsed.` };

    return {
      available: true,
      tool,
      experimental,
      predicted: predicted ?? {
        provider: "AlphaFold DB",
        modelId: predictedRecord?.modelId || `AF-${pack.accession}-F1`,
        pdbUrl: predictedUrl,
        source: { name: "AlphaFold DB coordinate file", sourceType: "AlphaFold DB" }
      },
      ...parsed
    };
  } catch (error) {
    return { available: false, reason: `${tool.label} structure superposition failed: ${error?.message ?? "unknown error"}` };
  } finally {
    await safeRemoveTempDir(tempDir);
  }
}

function unavailableMetric(reason, method) {
  return {
    available: false,
    reason,
    method,
    source: "computed-build-time"
  };
}

function hasAvailableStructureMetrics(metrics) {
  return Boolean(
    metrics?.rmsdComparisons?.some((metric) => metric?.available) ||
    metrics?.tmScoreComparisons?.some((metric) => metric?.available)
  );
}

function applyStructureMetrics(pack, result) {
  const metrics = pack.structureIntelligence.metrics;
  if (!result.available) {
    if (hasAvailableStructureMetrics(metrics)) return false;
    metrics.rmsdComparisons = [unavailableMetric(result.reason, "US-align/TM-align build-time superposition")];
    metrics.tmScoreComparisons = [unavailableMetric(result.reason, "US-align/TM-align build-time superposition")];
    return false;
  }

  const queryStructure = result.predicted?.modelId || `${pack.accession} AlphaFold`;
  const templateStructure = result.experimental.pdbId;
  metrics.rmsdComparisons = [
    {
      available: true,
      method: result.tool.label,
      source: "computed-build-time",
      queryStructure,
      templateStructure,
      chainA: "model",
      chainB: result.experimental.chains?.[0] || "PDB",
      atomType: "CA",
      alignedResidues: result.alignedLength,
      rmsd: result.rmsd,
      interpretation: rmsdInterpretation(result.rmsd)
    }
  ];
  metrics.tmScoreComparisons = [
    {
      available: true,
      method: result.tool.label,
      source: "computed-build-time",
      queryStructure,
      templateStructure,
      tmScore: result.tmScore,
      alignedLength: result.alignedLength,
      rmsd: result.rmsd,
      sequenceIdentityAligned: result.sequenceIdentityAligned,
      interpretation: tmInterpretation(result.tmScore)
    }
  ];
  return true;
}

function updatePipeline(structureIntelligence) {
  const pipeline = structureIntelligence.intelligence?.sequenceStructureFunctionPipeline;
  if (!Array.isArray(pipeline)) return;
  const evolutionary = pipeline.find((step) => step.step === "Evolutionary Analysis");
  if (evolutionary) {
    evolutionary.status = "complete";
    evolutionary.output = `${structureIntelligence.msa.sourceSequenceCount} homolog sequences aligned for conservation analysis.`;
    evolutionary.dataUsed = ["homolog protein sequences", structureIntelligence.msa.method, "conservation scoring"];
  }
  const comparison = pipeline.find((step) => step.step === "Template/Fold Comparison");
  if (comparison) {
    const tmScore = structureIntelligence.metrics.tmScoreComparisons?.[0];
    comparison.status = tmScore?.available ? "complete" : "missing";
    comparison.output = tmScore?.available
      ? `TM-score ${tmScore.tmScore} and RMSD ${tmScore.rmsd} computed by ${tmScore.method}.`
      : tmScore?.reason ?? "RMSD/TM-score unavailable until valid coordinate superposition succeeds.";
  }
}

async function loadAllPacks() {
  const starter = await readJson(path.join(publicDataDir, "starter-proteins.json"));
  const packs = new Map();
  for (const protein of starter.proteins ?? []) {
    packs.set(protein.accession, await readJson(path.join(publicDataDir, "protein-packs", `${protein.accession}.json`)));
  }
  return packs;
}

async function writePackToTargets(pack) {
  await writeJsonWithCompression(path.join(publicDataDir, "protein-packs", `${pack.accession}.json`), pack);
  await writeJsonWithCompression(path.join(publicDataDir, "structure-intelligence", `${pack.accession}.json`), pack.structureIntelligence);
  await writeJsonWithCompression(path.join(docsDataDir, "protein-packs", `${pack.accession}.json`), pack);
  await writeJsonWithCompression(path.join(docsDataDir, "structure-intelligence", `${pack.accession}.json`), pack.structureIntelligence);
}

const packs = await loadAllPacks();
const msaUpdated = [];
const structureUpdated = [];
const packList = [...packs.values()];

for (const group of homologGroups) {
  const packedRecords = group.accessions
    .map((accession) => packs.get(accession))
    .filter(Boolean)
    .map((pack) => ({
      accession: pack.accession,
      geneName: pack.geneName,
      proteinName: pack.proteinName,
      sequence: normalizeSequence(pack.sequence?.value),
      source: "Starter protein pack"
    }));
  const records = [
    ...packedRecords,
    ...(group.extraRecords ?? []).map((record) => ({
      accession: record.accession,
      geneName: record.geneName,
      proteinName: record.proteinName,
      sequence: normalizeSequence(record.sequence),
      source: record.source
    }))
  ]
    .filter((record) => record.sequence.length > 0);

  if (records.length < 2) continue;

  for (const record of records) {
    const pack = packs.get(record.accession);
    if (!pack) continue;
    const structureIntelligence = pack.structureIntelligence;
    const alignment = await buildMsa(records, record.accession, group);
    const msa = summarizeMsa(alignment.alignedSequences, record.sequence, alignment.method, alignment.source);
    const conservedResidues = conservedResiduesFromMsa(msa, record.sequence, structureIntelligence.domains, structureIntelligence.protein?.features ?? []);

    structureIntelligence.msa = msa;
    structureIntelligence.conservedResidues = conservedResidues;
    structureIntelligence.metrics.conservationSummary = {
      available: true,
      meanConservation: Number((msa.conservationScores.reduce((sum, score) => sum + score, 0) / Math.max(msa.conservationScores.length, 1)).toFixed(3)),
      highlyConservedPositions: conservedResidues.map((residue) => residue.position),
      method: msa.method
    };
    structureIntelligence.sources = [
      ...(structureIntelligence.sources ?? []),
      {
        name: msa.method,
        accessedAt: new Date().toISOString(),
        sourceType: "Build-time Computed",
        version: group.id
      }
    ];
    msaUpdated.push(`${record.accession} (${record.geneName})`);
  }
}

const structureJobs = positiveInteger(process.env.BIOALIGN_STRUCTURE_JOBS, Math.min(8, Math.max(1, Math.floor((os.cpus()?.length ?? 4) / 2))));
console.log(`Running structure metric enrichment for ${packList.length} protein pack(s) with ${structureJobs} worker(s).`);
await mapWithConcurrency(packList, structureJobs, async (pack, index) => {
  console.log(`Structure enrichment ${index + 1}/${packList.length}: ${pack.accession} (${pack.geneName})`);
  if (await applyCachedAlphaFoldConfidence(pack)) {
    const plddt = pack.structureIntelligence.metrics.plddt;
    const pae = pack.structureIntelligence.metrics.pae;
    console.log(`  cached AlphaFold: pLDDT ${plddt?.available ? plddt.mean : "unavailable"}, PAE ${pae?.available ? pae.meanPae : "unavailable"}`);
  }
  const structureResult = await computeStructureMetrics(pack);
  if (applyStructureMetrics(pack, structureResult)) {
    structureUpdated.push(`${pack.accession} (${pack.geneName})`);
    const tmScore = pack.structureIntelligence.metrics.tmScoreComparisons?.[0];
    const rmsd = pack.structureIntelligence.metrics.rmsdComparisons?.[0];
    console.log(`  computed: TM-score ${tmScore?.tmScore}, RMSD ${rmsd?.rmsd}`);
  } else {
    console.log(`  unavailable: ${structureResult.reason}`);
  }
  updatePipeline(pack.structureIntelligence);
  await writePackToTargets(pack);
});

console.log(`Updated MSA/conservation for ${msaUpdated.length} starter protein pack(s): ${msaUpdated.join(", ") || "none"}`);
console.log(`Computed RMSD/TM-score for ${structureUpdated.length} starter protein pack(s): ${structureUpdated.join(", ") || "none"}`);
