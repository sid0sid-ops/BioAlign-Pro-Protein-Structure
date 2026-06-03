import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const workspaceRoot = path.resolve(scriptDir, "../..");
const publicDataDir = path.join(workspaceRoot, "public", "data");
const docsDataDir = path.join(workspaceRoot, "docs", "data");
const publicStructuresDir = path.join(publicDataDir, "structures");
const docsStructuresDir = path.join(docsDataDir, "structures");
const BUILD_USER_AGENT = "BioAlignProStaticBuild/1.0 (structure coordinate cache)";

async function ensureDirs() {
  await Promise.all([
    mkdir(publicStructuresDir, { recursive: true }),
    mkdir(docsStructuresDir, { recursive: true })
  ]);
}

async function readJsonIfExists(filePath, fallback = null) {
  try {
    return JSON.parse(await readFile(filePath, "utf8"));
  } catch {
    return fallback;
  }
}

async function fetchText(url, accept, timeoutMs = 15_000) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        Accept: accept,
        "User-Agent": BUILD_USER_AGENT
      }
    });
    if (!response.ok) return null;
    const text = await response.text();
    return text.trim().length ? text : null;
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

async function writeBoth(relativeName, text) {
  await Promise.all([
    writeFile(path.join(publicStructuresDir, relativeName), text, "utf8"),
    writeFile(path.join(docsStructuresDir, relativeName), text, "utf8")
  ]);
}

async function readExistingBoth(relativeName) {
  try {
    return await readFile(path.join(publicStructuresDir, relativeName), "utf8");
  } catch {
    try {
      return await readFile(path.join(docsStructuresDir, relativeName), "utf8");
    } catch {
      return null;
    }
  }
}

async function writeManifest(records, status) {
  const manifest = {
    version: "bioalign.structure-coordinate-files.v2",
    generatedAt: new Date().toISOString(),
    count: records.length,
    status,
    records
  };
  await writeBoth("manifest.json", `${JSON.stringify(manifest, null, 2)}\n`);
}

function rcsbRequests(pdbId) {
  return [
    {
      id: `rcsb-${pdbId}-pdb`,
      sourceType: "RCSB PDB",
      coordinateType: "experimental",
      format: "PDB",
      fileName: `rcsb-${pdbId}.pdb`,
      sourceUrl: `https://files.rcsb.org/download/${pdbId}.pdb`,
      accept: "chemical/x-pdb,text/plain,*/*"
    },
    {
      id: `rcsb-${pdbId}-cif`,
      sourceType: "RCSB PDB",
      coordinateType: "experimental",
      format: "mmCIF",
      fileName: `rcsb-${pdbId}.cif`,
      sourceUrl: `https://files.rcsb.org/download/${pdbId}.cif`,
      accept: "chemical/x-cif,text/plain,*/*"
    }
  ];
}

function alphaFoldRequests(accession, pack) {
  const modelId = pack.alphaFold?.modelId || `AF-${accession}-F1`;
  const version = "v4";
  return [
    {
      id: `alphafold-${accession}-pdb`,
      sourceType: "AlphaFold DB",
      coordinateType: "predicted",
      format: "PDB",
      fileName: `alphafold-${accession}.pdb`,
      sourceUrl: pack.alphaFold?.pdbUrl || `https://alphafold.ebi.ac.uk/files/AF-${accession}-F1-model_${version}.pdb`,
      accept: "chemical/x-pdb,text/plain,*/*",
      modelId
    },
    {
      id: `alphafold-${accession}-cif`,
      sourceType: "AlphaFold DB",
      coordinateType: "predicted",
      format: "mmCIF",
      fileName: `alphafold-${accession}.cif`,
      sourceUrl: pack.alphaFold?.cifUrl || `https://alphafold.ebi.ac.uk/files/AF-${accession}-F1-model_${version}.cif`,
      accept: "chemical/x-cif,text/plain,*/*",
      modelId
    },
    {
      id: `alphafold-${accession}-pae`,
      sourceType: "AlphaFold DB",
      coordinateType: "confidence",
      format: "PAE JSON",
      fileName: `alphafold-${accession}-pae.json`,
      sourceUrl: pack.alphaFold?.paeUrl || `https://alphafold.ebi.ac.uk/files/AF-${accession}-F1-predicted_aligned_error_${version}.json`,
      accept: "application/json,text/plain,*/*",
      modelId
    },
    {
      id: `alphafold-${accession}-plddt`,
      sourceType: "AlphaFold DB",
      coordinateType: "confidence",
      format: "pLDDT JSON",
      fileName: `alphafold-${accession}-plddt.json`,
      sourceUrl: pack.alphaFold?.plddtUrl || `https://alphafold.ebi.ac.uk/files/AF-${accession}-F1-confidence_${version}.json`,
      accept: "application/json,text/plain,*/*",
      modelId
    }
  ];
}

function buildRequests(packs) {
  const requests = [];
  const seen = new Set();
  for (const pack of packs) {
    const pdbIds = (pack.pdbStructures || []).map((structure) => structure.pdbId).filter(Boolean);
    for (const pdbId of pdbIds) {
      for (const request of rcsbRequests(String(pdbId).toUpperCase())) {
        if (seen.has(request.id)) continue;
        seen.add(request.id);
        requests.push({ ...request, accession: pack.accession, geneName: pack.geneName, pdbId: String(pdbId).toUpperCase() });
      }
    }
    for (const request of alphaFoldRequests(pack.accession, pack)) {
      if (seen.has(request.id)) continue;
      seen.add(request.id);
      requests.push({ ...request, accession: pack.accession, geneName: pack.geneName });
    }
  }
  return requests;
}

function validateDownloadedText(request, text) {
  if (!text) return false;
  if (request.format === "PDB") return /^(ATOM|HETATM|HEADER|TITLE)/m.test(text);
  if (request.format === "mmCIF") return /data_|_atom_site\./.test(text);
  if (request.format.endsWith("JSON")) {
    try {
      JSON.parse(text);
      return true;
    } catch {
      return false;
    }
  }
  return true;
}

await ensureDirs();

const starter = await readJsonIfExists(path.join(publicDataDir, "starter-proteins.json"), { proteins: [] });
const packs = [];
for (const protein of starter.proteins ?? []) {
  const pack = await readJsonIfExists(path.join(publicDataDir, "protein-packs", `${protein.accession}.json`));
  if (pack?.accession) packs.push(pack);
}

if (!packs.length) {
  await writeManifest([], { ok: false, reason: "No starter protein packs found." });
  console.log("No starter protein packs found for coordinate download.");
  process.exit(0);
}

const requests = buildRequests(packs);
const records = [];
let attempted = 0;
let failed = 0;
let skipped = 0;
let downloaded = 0;
let earlyNetworkFailures = 0;
const failedRequests = [];

console.log(`Checking ${requests.length} structure/confidence file request(s). Existing valid files will be reused.`);

for (const request of requests) {
  attempted += 1;
  let text = await readExistingBoth(request.fileName);
  const reused = validateDownloadedText(request, text);
  if (reused) {
    skipped += 1;
  } else {
    text = await fetchText(request.sourceUrl, request.accept);
  }
  if (!validateDownloadedText(request, text)) {
    failed += 1;
    failedRequests.push({
      id: request.id,
      accession: request.accession,
      geneName: request.geneName,
      pdbId: request.pdbId,
      format: request.format,
      sourceType: request.sourceType,
      sourceUrl: request.sourceUrl
    });
    if (records.length === 0) earlyNetworkFailures += 1;
    if (records.length === 0 && earlyNetworkFailures >= 8) {
      console.log("Coordinate downloads are unavailable from this environment; leaving structure file manifest empty.");
      break;
    }
    continue;
  }

  if (!reused) {
    downloaded += 1;
    await writeBoth(request.fileName, text);
  }
  records.push({
    id: request.id,
    accession: request.accession,
    geneName: request.geneName,
    pdbId: request.pdbId,
    modelId: request.modelId,
    sourceType: request.sourceType,
    coordinateType: request.coordinateType,
    format: request.format,
    href: `/data/structures/${request.fileName}`,
    relativePath: `data/structures/${request.fileName}`,
    sourceUrl: request.sourceUrl
  });

  if (attempted % 50 === 0 || attempted === requests.length) {
    console.log(`Coordinate cache progress: ${attempted}/${requests.length} checked, ${skipped} reused, ${downloaded} downloaded, ${failed} failed.`);
  }
}

await writeManifest(records, {
  ok: records.length > 0,
  attempted,
  failed,
  failedRequests,
  skipped,
  downloaded,
  note: records.length
    ? "Coordinate and confidence source files were downloaded for offline use."
    : "No files were downloaded. Run this build on an online machine or WSL environment with access to RCSB PDB and AlphaFold DB."
});
console.log(`Prepared ${records.length} structure/confidence file(s): ${skipped} reused, ${downloaded} downloaded, ${failed} failed.`);
