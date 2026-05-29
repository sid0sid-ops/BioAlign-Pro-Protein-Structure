await import("../fetch-public-data/index.mjs");
await import("../normalize-data/index.mjs");
await import("../build-search-index/index.mjs");
await import("../convert-models/index.mjs");
await import("../compress-assets/index.mjs");

console.log("Static BioAlign data pipeline complete.");
