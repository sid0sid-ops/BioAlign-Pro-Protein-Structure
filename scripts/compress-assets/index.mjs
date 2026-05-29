import { dataDir, ensureRuntimeDirs, indexesDir, walkFiles, compressFile } from "../shared/static-pipeline.mjs";

await ensureRuntimeDirs();

const candidates = [
  ...(await walkFiles(dataDir, (filePath) => filePath.endsWith(".json"))),
  ...(await walkFiles(indexesDir, (filePath) => filePath.endsWith(".json")))
];

await Promise.all(candidates.map((filePath) => compressFile(filePath)));
console.log(`Compressed ${candidates.length} static asset(s).`);
