const CACHE_NAME = "bioalign-protein-structure-offline-v3";
const CORE_ASSETS = [
  "/",
  "/data/manifest.json",
  "/data/starter-proteins.json",
  "/data/public-data-sources.json",
  "/indexes/search-index.json",
  "/indexes/alias-index.json",
  "/indexes/protein-search-index.json",
  "/models/manifest.json"
];

function scopedPath(path) {
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  return new URL(cleanPath, self.registration.scope).toString();
}

async function cacheUrls(urls) {
  const cache = await caches.open(CACHE_NAME);
  for (const url of urls) {
    try {
      const scopedUrl = url.startsWith("http") ? url : scopedPath(url);
      const response = await fetch(scopedUrl, { cache: "reload" });
      if (response.ok) await cache.put(scopedUrl, response.clone());
    } catch {
      // Offline caching is best effort; failed remote or missing files should not break the app.
    }
  }
}

async function cacheSelectedProteinData() {
  const manifestUrl = scopedPath("/data/manifest.json");
  const response = await fetch(manifestUrl, { cache: "reload" });
  if (!response.ok) return;
  const manifest = await response.json();
  const packUrls = (manifest.packs || []).flatMap((item) => [item.href, item.compressedHref]).filter(Boolean);
  await cacheUrls([...CORE_ASSETS, ...packUrls]);
}

self.addEventListener("install", (event) => {
  event.waitUntil(cacheUrls(CORE_ASSETS).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("message", (event) => {
  if (event.data?.type === "CACHE_SELECTED_PROTEIN_DATA") {
    event.waitUntil(cacheSelectedProteinData());
  }
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  const isStaticData =
    url.pathname.includes("/data/") ||
    url.pathname.includes("/indexes/") ||
    url.pathname.includes("/models/") ||
    url.pathname.endsWith("/offline-sw.js");

  if (isStaticData) {
    event.respondWith(
      caches.match(request).then((cached) => {
        const refresh = fetch(request)
          .then((response) => {
            if (response.ok) caches.open(CACHE_NAME).then((cache) => cache.put(request, response.clone()));
            return response;
          })
          .catch(() => cached);
        return cached || refresh;
      })
    );
    return;
  }

  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response.ok) caches.open(CACHE_NAME).then((cache) => cache.put(request, response.clone()));
        return response;
      })
      .catch(() => caches.match(request))
  );
});
