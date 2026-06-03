"use client";

import { loadCompressedStaticJson, loadStaticJson } from "@/lib/static-data/data-pack-loader";

const prefetched = new Set<string>();

function looksLikeUniProtAccession(value?: string) {
  return /^(?:[OPQ][0-9][A-Z0-9]{3}[0-9]|[A-NR-Z][0-9](?:[A-Z][A-Z0-9]{2}[0-9]){1,2})$/i.test(value || "");
}

async function prefetchJson(path: string, compressedPath?: string) {
  const key = compressedPath || path;
  if (prefetched.has(key)) return;
  prefetched.add(key);

  try {
    if (compressedPath) {
      await loadCompressedStaticJson(path, compressedPath);
    } else {
      await loadStaticJson(path);
    }
  } catch {
    prefetched.delete(key);
  }
}

export async function prefetchProteinRouteBundle(href: string, accession?: string) {
  const jobs: Array<Promise<unknown>> = [
    prefetchJson("/data/starter-proteins.json", "/data/starter-proteins.json.gz"),
    prefetchJson("/indexes/search-index.json", "/indexes/search-index.json.gz"),
    prefetchJson("/indexes/alias-index.json", "/indexes/alias-index.json.gz")
  ];

  if (href.startsWith("/info")) {
    jobs.push(prefetchJson("/data/public-data-sources.json", "/data/public-data-sources.json.gz"));
  }

  const normalizedAccession = looksLikeUniProtAccession(accession) ? accession!.toUpperCase() : "";
  if (normalizedAccession) {
    jobs.push(
      prefetchJson(`/data/protein-packs/${normalizedAccession}.json`, `/data/protein-packs/${normalizedAccession}.json.gz`),
      prefetchJson(
        `/data/structure-intelligence/${normalizedAccession}.json`,
        `/data/structure-intelligence/${normalizedAccession}.json.gz`
      )
    );
  }

  await Promise.allSettled(jobs);
}
