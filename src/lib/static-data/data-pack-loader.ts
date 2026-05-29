import { getIndexedDbCache, setIndexedDbCache } from "./indexed-db-cache";

export interface DataPackManifest {
  version: string;
  generatedAt: string;
  packs: Array<{
    id: string;
    href: string;
    compressedHref?: string;
    description: string;
  }>;
}

export function publicAssetPath(path: string) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return `${basePath}${path.startsWith("/") ? path : `/${path}`}`;
}

export async function loadStaticJson<T>(path: string, cacheTtlMs = 7 * 24 * 60 * 60 * 1000): Promise<T> {
  const key = `static-json:${path}`;
  const cached = await getIndexedDbCache<T>(key);
  if (cached) return cached;

  const response = await fetch(publicAssetPath(path), {
    headers: { Accept: "application/json" }
  });
  if (!response.ok) {
    throw new Error(`Failed to load static data pack: ${path}`);
  }

  const data = (await response.json()) as T;
  await setIndexedDbCache(key, data, cacheTtlMs);
  return data;
}

async function inflateGzipResponse(response: Response) {
  if (!response.body || typeof DecompressionStream === "undefined") return null;
  try {
    const stream = response.body.pipeThrough(new DecompressionStream("gzip"));
    return await new Response(stream).json();
  } catch {
    return null;
  }
}

export async function loadCompressedStaticJson<T>(
  jsonPath: string,
  compressedPath?: string,
  cacheTtlMs = 7 * 24 * 60 * 60 * 1000
): Promise<{ data: T; compressed: boolean }> {
  const key = `compressed-static-json:${compressedPath ?? jsonPath}`;
  const cached = await getIndexedDbCache<{ data: T; compressed: boolean }>(key);
  if (cached) return cached;

  if (compressedPath) {
    try {
      const response = await fetch(publicAssetPath(compressedPath), {
        headers: { Accept: "application/gzip, application/json" }
      });
      if (response.ok) {
        const inflated = await inflateGzipResponse(response);
        if (inflated) {
          const result = { data: inflated as T, compressed: true };
          await setIndexedDbCache(key, result, cacheTtlMs);
          return result;
        }
      }
    } catch {
      // Fall back to plain JSON below.
    }
  }

  const data = await loadStaticJson<T>(jsonPath, cacheTtlMs);
  const result = { data, compressed: false };
  await setIndexedDbCache(key, result, cacheTtlMs);
  return result;
}

export async function loadDataPackManifest() {
  return loadStaticJson<DataPackManifest>("/data/manifest.json");
}
