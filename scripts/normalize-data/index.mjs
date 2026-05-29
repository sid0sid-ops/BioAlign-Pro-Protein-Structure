import path from "node:path";
import { dataDir, ensureRuntimeDirs, proteinPacksDir, readJson, walkFiles, writeJson } from "../shared/static-pipeline.mjs";

await ensureRuntimeDirs();

const seedsPath = path.join(dataDir, "protein-intelligence-seeds.json");
const seeds = await readJson(seedsPath);
seeds.records = seeds.records.map((record) => ({
  ...record,
  accession: record.accession.toUpperCase(),
  geneName: record.geneName.toUpperCase()
}));

await writeJson(seedsPath, seeds);

const packFiles = await walkFiles(proteinPacksDir, (filePath) => filePath.endsWith(".json"));
for (const packFile of packFiles) {
  const pack = await readJson(packFile);
  pack.accession = pack.accession.toUpperCase();
  pack.geneName = pack.geneName.toUpperCase();
  pack.aliases = Array.from(new Set(pack.aliases));
  await writeJson(packFile, pack);
}

console.log(`Normalized ${seeds.records.length} seed record(s) and ${packFiles.length} starter pack(s).`);
