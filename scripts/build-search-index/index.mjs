import path from "node:path";
import { dataDir, ensureRuntimeDirs, indexesDir, proteinPacksDir, readJson, writeJson } from "../shared/static-pipeline.mjs";

await ensureRuntimeDirs();

const starters = await readJson(path.join(dataDir, "starter-proteins.json"));

function normalizeAlias(alias) {
  return alias
    .toLowerCase()
    .normalize("NFKD")
    .replace(/haem/g, "hem")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}

const starterDocuments = await Promise.all(starters.proteins.map(async (protein) => {
  const pack = await readJson(path.join(proteinPacksDir, `${protein.accession}.json`)).catch(() => null);
  const pdbIds = pack?.pdbStructures?.map((structure) => structure.pdbId).filter(Boolean) ?? protein.pdbIds ?? [];
  const aliases = Array.from(new Set([protein.accession, protein.geneName, protein.proteinName, ...protein.aliases]));
  const tokens = [...aliases, ...pdbIds]
    .join(" ")
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(Boolean);
  return {
    id: protein.accession,
    accession: protein.accession,
    geneName: protein.geneName,
    proteinName: protein.proteinName,
    aliases,
    tokens,
    packPath: protein.packPath,
    compressedPackPath: protein.compressedPackPath,
    pdbIds,
    pdbCount: protein.pdbCount,
    alphaFoldAvailable: protein.alphaFoldAvailable
  };
}));

const searchIndex = {
  version: starters.version,
  generatedAt: new Date().toISOString(),
  documents: starterDocuments
};

await writeJson(path.join(indexesDir, "protein-search-index.json"), searchIndex);
await writeJson(path.join(indexesDir, "search-index.json"), searchIndex);

const aliasEntries = starterDocuments.flatMap((document) =>
  document.aliases.map((alias) => ({
    alias,
    normalizedAlias: normalizeAlias(alias),
    accession: document.accession,
    geneName: document.geneName,
    proteinName: document.proteinName,
    packPath: document.packPath,
    compressedPackPath: document.compressedPackPath
  }))
);

await writeJson(path.join(indexesDir, "alias-index.json"), {
  version: starters.version,
  generatedAt: new Date().toISOString(),
  entries: aliasEntries
});

console.log(`Built static search and alias indexes with ${starterDocuments.length} starter document(s).`);
