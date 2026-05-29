import { mkdir, readFile, readdir, stat, writeFile } from "node:fs/promises";
import { createBrotliCompress, createGzip } from "node:zlib";
import { createReadStream, createWriteStream } from "node:fs";
import { pipeline } from "node:stream/promises";
import path from "node:path";

export const rootDir = process.cwd();
export const publicDir = path.join(rootDir, "public");
export const dataDir = path.join(publicDir, "data");
export const proteinPacksDir = path.join(dataDir, "protein-packs");
export const structureIntelligenceDir = path.join(dataDir, "structure-intelligence");
export const modelsDir = path.join(publicDir, "models");
export const indexesDir = path.join(publicDir, "indexes");

export async function ensureRuntimeDirs() {
  await Promise.all([
    mkdir(dataDir, { recursive: true }),
    mkdir(proteinPacksDir, { recursive: true }),
    mkdir(structureIntelligenceDir, { recursive: true }),
    mkdir(modelsDir, { recursive: true }),
    mkdir(indexesDir, { recursive: true })
  ]);
}

export async function readJson(filePath) {
  return JSON.parse(await readFile(filePath, "utf8"));
}

export async function writeJson(filePath, value) {
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, `${JSON.stringify(value, null, 2)}\n`);
}

export async function walkFiles(dir, predicate = () => true) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walkFiles(fullPath, predicate)));
    } else if (predicate(fullPath)) {
      files.push(fullPath);
    }
  }
  return files;
}

export async function compressFile(filePath) {
  const fileStat = await stat(filePath);
  if (!fileStat.isFile() || fileStat.size === 0) return;
  await pipeline(createReadStream(filePath), createBrotliCompress(), createWriteStream(`${filePath}.br`));
  await pipeline(createReadStream(filePath), createGzip(), createWriteStream(`${filePath}.gz`));
}
