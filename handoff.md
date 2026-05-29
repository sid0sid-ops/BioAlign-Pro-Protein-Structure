## Changed

- Pivoted production architecture to static GitHub Pages mode with client-side intelligence as the runtime default.
- Configured `next.config.mjs` with `output: "export"`, static image handling, optional `NEXT_PUBLIC_BASE_PATH`, and trailing slashes.
- Removed the Next route handler under `src/app/api/workbench/analyze`; the static export now has no API routes.
- Added the Layer 1 rule engine under `src/lib/intelligence`, workerized through `src/workers/intelligence.worker.ts`, and exposed through `useClientIntelligence()`.
- Added Layer 2 browser ML scaffolding under `src/lib/browser-ai` using lazy ONNX Runtime Web session creation with WebGPU/WASM fallback.
- Added Layer 3 optional local assistant scaffolding that is disabled on low-memory/mobile devices and explains only already-loaded BioAlign data.
- Added IndexedDB cache and static data pack loading under `src/lib/static-data`.
- Added runtime static assets under `public/data`, `public/models`, and `public/indexes`.
- Added build-time script pipeline under `scripts/build-data`, `scripts/fetch-public-data`, `scripts/normalize-data`, `scripts/build-search-index`, `scripts/convert-models`, and `scripts/compress-assets`.
- Rewired Sequence Workbench, Biological Intelligence, AlphaFold Confidence, compatibility hooks, and the analysis agent away from backend API calls.
- Added `public/.nojekyll` for GitHub Pages.
- Installed `onnxruntime-web` for lazy browser ML runtime support.
- Added the accession/query workflow with worker-side query detection, static index lookup, alias/fuzzy scoring, compressed protein-pack loading, browser API fallback, and IndexedDB cache reuse.
- Replaced the custom alias edit-distance logic with Fuse.js over `/public/indexes/alias-index.json`, with short-query noise filtering for exact aliases like `p53` and `BRCA1`.
- Added `src/modules/query/protein-query-workflow.tsx`, `src/hooks/use-protein-query.ts`, and `src/lib/intelligence/query-engine.ts`.
- Added lazy structure loading through `src/modules/visualization/structure-viewer-gate.tsx`; Mol* and the 3D bundle load only when the viewer is opened.
- Generated the famous-protein starter release: `/public/data/starter-proteins.json`, `/public/indexes/search-index.json`, `/public/indexes/alias-index.json`, and 19 static packs under `/public/data/protein-packs/`.
- Starter packs now include build-time UniProt sequences, representative PDB structures, AlphaFold availability checks, domains/motifs where present, template cards, confidence cards, interaction/pathway summaries, relevance summaries, and source badges.
- Scientific Structure Intelligence Layer added.
- Corrected MSA/conservation provenance: AlphaFold DB MSA links are no longer used as a conservation source. Static packs only emit MSA/conservation when curated or UniProt/ortholog homolog sequences are aligned during build time with MAFFT, Clustal Omega, or MUSCLE; otherwise the panels show unavailable with a reason.
- Removed production-surface mock scientific panels and generated placeholder scientific scores. Template cards now show `unranked` unless a real ranking computation exists; starter/browser API confidence cards use source-backed status/counts instead of synthetic percentages; curated interaction summaries no longer emit invented scores.
- Added explicit source badge strips across Fold Explorer Structure, Metrics, Domains, Evolution, Function, and missing-data panels.
- Added structure intelligence types, explainers, metric helpers, and a browser structure worker under `src/lib/structure-intelligence` and `src/workers/structure`.
- Added the tabbed Fold Explorer UI under `src/components/structure-intelligence/structure-intelligence-explorer.tsx` with Overview, Structure, Metrics, Domains, Evolution, Function, and Sources tabs.
- Added build-time structure-intelligence script folders under `scripts/structure-intelligence`.
- Enriched protein packs with `structureIntelligence` and exported mirrored files under `/public/data/structure-intelligence`.
- Updated README and docs for the static client accession workflow.
- Added one-click Windows local runners (`OPEN_DEV_WEBSITE.bat` and `scripts/open-dev-website.ps1`) for starting the development server.
- Added static production preview runners (`OPEN_PRODUCTION_PREVIEW.bat` and `scripts/open-production-preview.ps1`) for building and serving the static export.
- Optimized `scripts/open-production-preview.ps1` to execute `npx next build --webpack` directly instead of running the redundant `npm run build` command (which runs `data:build` a second time), preventing rate limiting and execution timeouts on external APIs.
- Added `LOCAL_RUN_GUIDE.md` detailing quick start, troubleshooting, and testing terms.
- Added `preview:static` script to `package.json` to run `npx -y serve@latest out -l 4173`.
- Performed a visual QA pass verifying that the dark theme, accession search, and layout are premium and responsive.


## Data Sources

- UniProt REST API for canonical sequence, identity, function comments, features, and cross references.
- RCSB PDB Data API for experimental structure metadata.
- AlphaFold DB for predicted model metadata, pLDDT confidence JSON, and PAE JSON when available.
- InterPro/Pfam through InterPro API for domain/profile-style evidence.
- MSA/conservation only from curated homolog FASTA or UniProt/ortholog sequences aligned at build time by MAFFT, Clustal Omega, or MUSCLE; profile/HMM concepts remain represented through InterPro/Pfam-style evidence unless real build-time tools are added.

## Computed Metrics

- RMSD: available only when real paired coordinates are provided; otherwise stored as unavailable with reason.
- TM-score: unavailable unless TM-align/Foldseek is available during build time; no fake TM-score is generated.
- pLDDT summary: parsed from AlphaFold DB confidence data when available.
- PAE summary: parsed and downsampled from AlphaFold DB PAE JSON when available and small enough for static delivery.
- Conservation scores: computed only from real build-time homolog MSAs when curated/UniProt homologs and MAFFT/Clustal Omega/MUSCLE are available; otherwise marked unavailable.
- Domain coverage: computed from InterPro/Pfam/UniProt ranges.

## Failed Attempts

- First `npm.cmd install onnxruntime-web --save` failed under sandboxed network/permissions; reran with escalation and succeeded.
- Stale `.next` generated types referenced the deleted API route; removed the generated `.next` directory and regenerated through static build.
- The Browser plugin/tool was not callable in this session (`tool_search` returned no browser automation tools), so UI verification used static HTTP and worker/query smoke checks instead of in-app visual automation.
- Full repository lint remains blocked by pre-existing generated and legacy issues outside this pass.
- A first sandboxed data build produced fallback metadata-only packs because public network calls were blocked; reran the data build with approved network access and generated real UniProt sequences.
- AlphaFold PAE JSON is served as an array-wrapped payload to Node fetch; first parse produced unavailable PAE, then the parser was corrected and packs regenerated.
- TM-align/Foldseek are not installed/configured in this workspace, so TM-score remains unavailable with an explicit reason.
- Build-time coordinate superposition inputs are not downloaded/aligned yet, so RMSD remains unavailable with an explicit reason.
- MAFFT, Clustal Omega, and MUSCLE were not found in the current build environment, so MSA/conservation should regenerate as unavailable instead of using AlphaFold-derived MSA data.

## Next Step

Install MAFFT, Clustal Omega, or MUSCLE in the build environment and add small curated homolog FASTA files for starter proteins, then rerun `npm run data:build` to generate real MSA/conservation tracks.

## Known Issues

- Legacy Express/server files remain in the repository for development/reference, but the production build no longer depends on them.
- Browser ML has runtime scaffolding and ONNX asset copying, but no real quantized scientific model has been placed in `public/models/<model-id>/model.onnx` yet.
- Mol* is lazy-loaded by the structure gate, but the current rendered structure view is still the existing browser-native Three.js ribbon shell rather than full Mol* structure rendering.
- MSA/conservation panels remain unavailable unless future builds provide curated/UniProt homolog FASTA and a real build-time aligner.
- RMSD and TM-score panels currently show unavailable unless future build-time coordinate/TM-align jobs populate real values.
- `npm audit` reports 5 moderate vulnerabilities.

## Debug Notes

- `npm run typecheck` passes.
- `npm run build` passes and produces a static export in `out/`.
- Touched files pass targeted ESLint.
- Regenerated TP53 static output now shows pLDDT and PAE available, 32 domain annotations, and MSA/conservation unavailable with the explicit no-aligner reason.
- Static pack audit found no non-null generated template-ranking scores or starter interaction scores in `public/data/protein-packs` or `out/data/protein-packs`.
- Visible production route now imports the accession workflow, sequence workbench, and client intelligence panel only; old mock metric dashboards are no longer rendered on the GitHub Pages home surface.
- Runtime import audit found no `fs`, `path`, `child_process`, or `node:` imports in the visible frontend/client runtime surface; remaining `process.env` references are `NEXT_PUBLIC_*` values used by Next/static config.
- Static export includes `out/index.html`, `out/data/starter-proteins.json`, `out/data/protein-packs/*.json`, compressed JSON assets, `out/indexes/search-index.json`, `out/indexes/alias-index.json`, `.nojekyll`, and copied ONNX Runtime Web assets under `out/models/ort`.
- Runtime grep over visible frontend modules/hooks/agent no longer finds `localhost:4000`, `NEXT_PUBLIC_API`, `api/protein`, `axios`, or `use-workbench-query` backend usage.
- A temporary static file server returned `200` for `/`, `/indexes/search-index.json`, `/indexes/alias-index.json`, and `/data/protein-packs/P04637.json`; p53 sequence length was 393 and PDB records were trimmed to 40.
- Query-engine smoke test confirmed `hemoglobin` and `humoglobin` both return P69905 and P68871, and `P04637` loads from `local-static-pack`.
- Fuse.js alias smoke test confirmed `p53` returns only TP53 and `BRCA1` returns only BRCA1 while preserving fuzzy `humoglobin` matches.
- Network-approved live fallback smoke test confirmed `1CRN` resolves through the browser-safe RCSB path to CRAMBIN/P01542.
- Static structure-intelligence smoke test confirmed `TP53` loads from the local static pack with AlphaFold availability, pLDDT, PAE, 32 domain annotations, and pipeline data; MSA/conservation now regenerates as unavailable because no MAFFT/Clustal Omega/MUSCLE aligner is installed.

## Performance Notes

- PAE heatmap and the structure viewer are lazy-loaded.
- RMSD browser calculations are isolated in `src/workers/structure/structure-metrics.worker.ts`.
- Static packs are compressed with gzip/Brotli; PAE payloads and unavailable MSA/conservation states carry explicit reasons.
- Runtime lookup still loads alias/search index first, then only the selected protein pack.
- IndexedDB remains the browser cache for static JSON reads and browser API responses.

## Cache Status

- React Query remains the L1 browser cache.
- IndexedDB stores client intelligence results, static JSON packs, compressed pack reads, and browser API protein packs.
- Redis is not required in production static mode.
- Compressed static JSON assets are generated at build time for hosts/CDNs that can serve precompressed assets.

## How To Run

- Double-click **`OPEN_DEV_WEBSITE.bat`** for local dev server.
- Double-click **`OPEN_PRODUCTION_PREVIEW.bat`** for static production build and local preview.

## Verification

- **Dev server result**: Next.js development server starts on port `3000`. Browser automatically opens `http://localhost:3000`. Searching `TP53` successfully renders the workspace.
- **Static preview result**: Static compilation outputs `out/index.html` successfully. Static server accepts connections at `http://localhost:4173` and automatically opens browser.
- **TP53 search result**: Searching `TP53` in the preview loads the local static pack from `/data/protein-packs/P04637.json` successfully with zero backend/database/worker dependencies.
- **Build result**: Full build pipeline `npm run build` runs and completes with exit code 0.

## Known Issues

- MSA/conservation, RMSD, and TM-score panels currently show unavailable because aligner binaries (MAFFT/Clustal Omega/MUSCLE) and structural aligners (TM-align/Foldseek) were not configured in the build environment during the initial data build.
- Minor hydration warning on ThemeToggle because of initial theme client/server mismatch.

## Next Step

- Double-click and execute the updated PowerShell script **`install_all_bio_tools.ps1`** on Windows to set up Miniconda and install TM-align, Foldseek, MAFFT, Clustal Omega, and MUSCLE. This will allow the next `npm run build` to compute real structure intelligence metrics.

