# BioAlign-Pro-Protein-Structure — Production Deployment & Configuration Guide

This document explains configuration, local execution scripts, caching configurations, Docker parameters, and hosting targets for **BioAlign-Pro-Protein-Structure**.

---

## 1. Local Configuration

### Scripts Mapping
The `package.json` file contains several development and build scripts:
* **`npm run dev:full`**: Concurrently boots the Next.js dev server on port `3000` (`next dev`) and the Node tsx API proxy watch on port `4000` (`tsx watch server/index.ts`).
* **`npm run build`**: Generates the Prisma client, builds the Next.js web application bundle, and compiles TypeScript servers into the `dist/` directory.
* **`npm run start`**: Standard command to boot compiled production bundle.
* **`npm run api:start`**: Boots the compiled Node Express production proxy API gateway server from `dist/server/index.js`.
* **`npm run typecheck`**: Validates the codebase for TypeScript errors across frontend and backend environments.

---

## 2. Environment Configurations

Define these environment variables in your local `.env` or production orchestrators (e.g. Vercel, Railway, Docker Engine):

```bash
# Gateway configurations
PORT=4000
NEXT_PUBLIC_API_URL=http://localhost:4000/api

# Redis caching database
REDIS_URL=redis://localhost:6379

# External API endpoints (Default fallbacks exist)
FOLDSEEK_BASE_URL=https://search.foldseek.com/api
ESM_ATLAS_BASE_URL=https://api.esmatlas.com
PDBE_BASE_URL=https://www.ebi.ac.uk/pdbe/api
```

---

## 3. High-Throughput Caching Layer

BioAlign-Pro-Protein-Structure integrates a tiered caching strategy to bypass third-party scientific server rate-limiting:
1. **Deduplication (`src/services/integrations/http.ts`)**: In-flight requests are tracked by URL and query. If two components make identical requests simultaneously, they are coalesced into a single fetch.
2. **Local Memory Caching**: Fast fallback for in-memory cache hits.
3. **Redis Caching (`src/services/integrations/cache.ts`)**: In production, the caching client utilizes the connection URL provided in the `REDIS_URL` variable to persist JSON payloads, enabling rapid response speeds for shared queries.

---

## 4. Dockerization

### Build & Deploy with Docker Compose
The system is equipped with containerization files:
* **`Dockerfile`**: Multistage builds that compile dependencies, generate prisma client files, build the Next.js target, and setup minimal runner packages.
* **`docker-compose.yml`**: Spins up the Next.js interface, the Express API gateway proxy, and a Redis container.

Boot up the full application cluster:
```bash
docker compose up --build -d
```

---

## 5. Cloud Hosting Pipelines

### A. Frontend (Vercel)
1. Link your Git repository containing the root project directory.
2. Select **Next.js** as the framework preset.
3. Supply `NEXT_PUBLIC_API_URL` pointing to your deployed API server endpoint.

### B. Backend (Railway / Render)
1. Deploy the backend Node container using the Dockerfile configuration.
2. Ensure you attach a **Redis** service node in the environment.
3. Map the Redis connection link to the `REDIS_URL` environment parameter on the API server.

---

## 6. Production Request Controls

The API gateway uses Bottleneck and p-limit in
`src/services/api/request-manager.ts`.

Recommended production environment variables:

```bash
PROVIDER_GLOBAL_CONCURRENCY=8
REDIS_URL=redis://localhost:6379
```

Provider queues enforce conservative defaults:

- NCBI and BLAST: one concurrent request, roughly three requests per second.
- UniProt, RCSB, AlphaFold, and PDBe: small concurrent pools with short spacing.
- STRING, KEGG, ClinVar, PubChem, InterPro, Foldseek, and ESM Atlas: throttled
  queues with circuit breakers.

Use these diagnostics in production:

```bash
curl http://localhost:4000/api/protein/diagnostics/cache
curl http://localhost:4000/api/protein/diagnostics/requests
```

## 7. Protein Intelligence Endpoint

The primary backend aggregation endpoint is:

```bash
curl "http://localhost:4000/api/protein/intelligence/P69905?geneName=HBA1"
```

It returns a normalized DTO and cache/provider diagnostics. The compatibility
route `/api/protein/analysis/orchestrate/:accession` returns the same contract.

---

## 8. Static GitHub Pages Deployment

Production deployment is static-first. GitHub Pages serves the standalone
`docs/` website directly; no Node server, Express gateway, Redis, database, or
build PC is required after deployment.

The active deployment workflow is `.github/workflows/deploy-pages.yml`. It
uploads `docs/`, checks that required static files exist, blocks TypeScript
source files inside the Pages artifact, blocks tracked coordinate blobs under
`docs/data/structures/`, and fails if the artifact grows above 100 MB.

Confirm these files exist in `docs/` before committing:

```txt
docs/index.html
docs/404.html
docs/.nojekyll
docs/offline-sw.js
docs/assets/css/site.css
docs/assets/js/app.js
docs/data/manifest.json
docs/data/starter-proteins.json
docs/data/protein-packs/P04637.json
docs/data/structure-intelligence/P04637.json
docs/indexes/search-index.json
docs/indexes/alias-index.json
docs/indexes/protein-search-index.json
docs/models/manifest.json
```

After deployment, the user's browser reads saved protein records from the
static JSON packs first, caches selected records with the service worker and
browser Cache API, and opens live database viewers or source records only when
the user needs database-side detail.

### Static Data Build

`npm run build` runs `npm run data:build` first. That build-time pipeline fetches
public UniProt and AlphaFold metadata when the build machine has network access,
normalizes the 19 starter protein packs, enriches structure intelligence from
UniProt, RCSB PDB, AlphaFold DB, and InterPro/Pfam, builds the search and alias
indexes, copies browser model runtime files, and writes `.gz`/`.br` compressed
assets.

Runtime lookup order after deployment:

1. `docs/data/starter-proteins.json` and the local search indexes are loaded.
2. Matching saved records load `docs/data/protein-packs/<accession>.json` and
   `docs/data/structure-intelligence/<accession>.json`.
3. The static app keeps those JSON records in memory and in browser Cache API.
4. The service worker pre-caches the selected saved records in the background.
5. External database links and embedded structure viewers are used for source
   inspection, not as the first path for saved records.

No private API keys should be placed in `public/`, committed static packs, or
frontend environment variables.

Large coordinate files such as RCSB mmCIF/PDB and AlphaFold mmCIF/PDB files are
build inputs for local WSL analysis, not normal GitHub Pages assets. Keep
`docs/data/structures/` and `public/data/structures/` ignored unless a separate
download archive is intentionally published.

RMSD and TM-score are stored only when computed from real build-time coordinate
alignment tools. If TM-align/Foldseek or coordinate superposition inputs are not
available, the static pack stores an unavailable reason and the UI displays that
reason.
