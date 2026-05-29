# Protein Structure Prediction & Bioinformatics Workbench

[![CI](https://github.com/your-org/protein-structure-workbench/actions/workflows/ci.yml/badge.svg)](https://github.com/your-org/protein-structure-workbench/actions)
[![Next.js](https://img.shields.io/badge/Next.js-latest-black)](https://nextjs.org/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2d3748)](https://www.prisma.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

A production-ready browser workbench for protein sequence analysis, local scientific intelligence, fold-recognition-style visual exploration, AI prediction confidence analytics, and molecular visualization.

The production app is static-first: Next.js exports GitHub Pages-compatible files, scientific intelligence runs inside the user's browser, heavy analysis runs in Web Workers, IndexedDB caches local results, static JSON packs provide bundled knowledge, and browser ML models are lazy-loaded only when explicitly needed.

## Highlights

- Protein hierarchy views for primary, secondary, tertiary, and quaternary structure.
- Homology modeling pipeline with BLAST, template ranking, sequence identity bands, alignment, model building, refinement, validation, RMSD, and 3D review.
- Threading and fold recognition dashboard with profile-profile alignment, HMM comparison, fold library matching, conservation, and similarity matrix views.
- AI prediction lab for AlphaFold, ESMFold, ColabFold, and RoseTTAFold concepts, including pLDDT, PAE, confidence coloring, and attention map visualization.
- Molecular visualization shell with Three.js ribbon rendering plus lazy Mol* and NGL adapter hooks.
- Accession/query workflow for UniProt accessions, PDB IDs, FASTA, DNA/RNA/protein sequences, gene symbols, aliases, and Fuse.js fuzzy famous-protein search.
- Starter static dataset with TP53/p53, hemoglobin alpha/beta, EGFR, BRCA1/2, insulin, albumin, APP, tau, RAS proteins, ACE2, SARS-CoV-2 spike, actin, tubulin, collagen, and GFP.
- Scientific Structure Intelligence tabs for Overview, Structure, Metrics, Domains, Evolution, Function, and Sources.
- Build-time pLDDT, PAE, InterPro/Pfam domain, and MSA/conservation enrichment where real source data and build-time aligners are available.
- Client-side rule engine for UniProt IDs, PDB IDs, FASTA, DNA, RNA, and protein sequences.
- Browser ML scaffolding with ONNX Runtime Web, WebGPU preference, and WASM/CPU fallback.
- Optional local AI explanation mode that is disabled by default and never claims structure prediction.
- Dark/light theme, command palette, animated sidebar, drag-and-drop FASTA input, export actions, bookmarks, recent history, and responsive dashboards.

## Quick Start

```bash
npm install
npm run dev
```

Build static files for GitHub Pages:

```bash
npm run build
```

Deploy the generated `out/` directory. No server is required after deployment.
Build-time public data fetching enriches static packs when the build machine has
network access; the deployed app then runs from static files only.

## Project Layout

```txt
src/
  app/                 Next.js App Router entrypoints
  components/          Reusable UI primitives
  modules/             Domain modules: homology, threading, AlphaFold, RMSD, visualization
  lib/intelligence/    Browser rule and accession query engines
  lib/static-data/     Static pack loaders, IndexedDB cache, browser API fallback
  services/            Legacy/development API clients and integrations
  hooks/               Shared hooks for queries, theme, and workspace state
  store/               Zustand stores
  lib/                 Utilities, environment, fetch helpers
  api/                 Shared API contracts and Next route helpers
  database/            Prisma client exports and database helpers
  styles/              Design tokens and global styles
  types/               Protein, analysis, API, and visualization types
public/data/           Static starter proteins, protein packs, compressed data
public/data/structure-intelligence/
public/indexes/        Search and alias indexes
public/models/         Browser-compatible model/runtime assets
scripts/               Build-time data, index, model, and compression pipeline
server/                Legacy/development Express API engine
prisma/                PostgreSQL schema
docs/                  Architecture, API, and deployment documentation
```

## Environment

GitHub Pages production does not require server environment variables, private
API keys, PostgreSQL, or Redis. Use `NEXT_PUBLIC_BASE_PATH=/repo-name` only when
deploying under a GitHub Pages repository subpath.

## Scripts

- `npm run dev`: start the Next.js workstation.
- `npm run dev:api`: start the Express API engine.
- `npm run dev:full`: run both services together.
- `npm run data:build`: generate static public data packs, search indexes, model manifest, and compressed assets.
- `npm run lint`: run ESLint.
- `npm run typecheck`: run TypeScript checks for frontend and backend.
- `npm run build`: run the static data pipeline and export the Next.js app to `out/`.

## Screenshots

Add screenshots to `public/screenshots` after deployment or local browser QA.

## License

MIT. See [LICENSE](LICENSE).
