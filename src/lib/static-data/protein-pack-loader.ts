import type { ProteinPack } from "./protein-pack-types";
import { loadCompressedStaticJson } from "./data-pack-loader";

export async function loadProteinPack(
  packPath: string,
  compressedPackPath?: string
): Promise<{ pack: ProteinPack; compressed: boolean }> {
  const { data, compressed } = await loadCompressedStaticJson<ProteinPack>(packPath, compressedPackPath);
  return { pack: data, compressed };
}
