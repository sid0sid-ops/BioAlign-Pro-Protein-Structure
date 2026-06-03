const CACHE_NAME = "bioalign-protein-structure-docs-offline-v3";
const CORE_ASSETS = [
  "./",
  "./index.html",
  "./about.html",
  "./robots.txt",
  "./sitemap.xml",
  "./site.webmanifest",
  "./assets/css/site.css",
  "./assets/js/app.js",
  "./data/manifest.json",
  "./data/starter-proteins.json",
  "./data/public-data-sources.json",
  "./indexes/search-index.json",
  "./indexes/alias-index.json",
  "./indexes/protein-search-index.json",
  "./models/manifest.json"
];

function scopedPath(path) {
  return new URL(path, self.registration.scope).toString();
}

async function cacheUrls(urls) {
  const cache = await caches.open(CACHE_NAME);
  for (const url of urls) {
    try {
      const response = await fetch(scopedPath(url), { cache: "reload" });
      if (response.ok) await cache.put(scopedPath(url), response.clone());
    } catch {
      // Offline caching is best effort.
    }
  }
}

async function cacheSelectedProteinData() {
  const response = await fetch(scopedPath("./data/manifest.json"), { cache: "reload" });
  if (!response.ok) return;
  const manifest = await response.json();
  const packUrls = (manifest.packs || []).flatMap((item) => [item.href, item.compressedHref]).filter(Boolean);
  const docsPackUrls = packUrls.map((url) => `.${url}`);
  await cacheUrls([...CORE_ASSETS, ...docsPackUrls]);
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
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  const isStaticData =
    url.pathname.includes("/data/") ||
    url.pathname.includes("/indexes/") ||
    url.pathname.includes("/models/") ||
    url.pathname.includes("/assets/");

  if (isStaticData) {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        const refresh = fetch(event.request)
          .then((response) => {
            if (response.ok) caches.open(CACHE_NAME).then((cache) => cache.put(event.request, response.clone()));
            return response;
          })
          .catch(() => cached);
        return cached || refresh;
      })
    );
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (response.ok) caches.open(CACHE_NAME).then((cache) => cache.put(event.request, response.clone()));
        return response;
      })
      .catch(() => caches.match(event.request).then((cached) => cached || caches.match(scopedPath("./index.html"))))
  );
});
