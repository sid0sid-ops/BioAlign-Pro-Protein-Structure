import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import type { StructureIntelligencePack } from "../../../src/lib/structure-intelligence/types";

export async function exportStructureIntelligencePack(rootDir: string, accession: string, pack: StructureIntelligencePack) {
  const targetDir = path.join(rootDir, "public", "data", "structure-intelligence");
  await mkdir(targetDir, { recursive: true });
  await writeFile(path.join(targetDir, `${accession}.json`), `${JSON.stringify(pack, null, 2)}\n`, "utf8");
}
