# BioAlign Pro — System Architecture Document

This document is a comprehensive structural, files-scanned, and flow reference for **BioAlign Pro**. It details the application architecture, design paradigms, directory mappings, state flows, and service integrations.

---

## 1. Directory Structure Map

```

---

## 5. Route Declaration Snapshot - 2026-05-29

This snapshot was taken from the live route declarations in `server/index.ts`,
`server/routes/protein.ts`, and `src/app/api`.

### Express API Gateway

Mounted at `/api/protein`:

| Method | Route | Contract |
| :--- | :--- | :--- |
| POST | `/analyze-sequence` | Validates and computes sequence metrics. |
| POST | `/homology/run` | Starts the homology workflow contract. |
| GET | `/templates` | Template-search contract for provider-backed orchestration. |
| GET | `/integrations/:provider/:id` | Direct provider proxy for legacy provider-specific clients. |
| GET | `/intelligence/:accession` | Normalized multi-provider protein intelligence document. |
| GET | `/analysis/orchestrate/:accession` | Compatibility alias for the normalized intelligence endpoint. |
| GET | `/diagnostics/cache` | Tiered cache stats for memory and Redis. |
| GET | `/diagnostics/requests` | Provider request queue, circuit breaker, and recent timing diagnostics. |
| POST | `/search/rcsb-sequence` | RCSB sequence search contract. |
| GET | `/search/uniprot` | UniProt search and accession resolution. |

Mounted at the Express root:

| Method | Route | Contract |
| :--- | :--- | :--- |
| GET | `/api/health` | Gateway health, uptime, provider list, and timestamp. |

### Next.js Route Handlers

Production static export has no required Next.js route handlers. Browser
workers, static JSON packs, IndexedDB, and optional CORS-safe public APIs power
the GitHub Pages runtime.

---

## 6. Protein Intelligence Core

The production intelligence path now runs through
`src/services/orchestrators/protein-intelligence-orchestrator.ts`.
It concurrently requests UniProt, AlphaFold, InterPro, STRING, KEGG, ClinVar,
and PubChem, then performs dependent RCSB GraphQL enrichment for up to three PDB
cross references discovered from UniProt.

The frontend should prefer:

```ts
useProteinIntelligence(accession, { geneName, pdbId })
```

over direct provider hooks when a dashboard needs a merged scientific view.
Direct provider hooks remain useful for specialized widgets and debugging.

The orchestrator returns the stable `ProteinIntelligence` DTO from
`src/types/intelligence.ts`:

```ts
{
  protein: {},
  structure: {},
  interactions: {},
  domains: {},
  pathways: {},
  confidence: {},
  diseases: {},
  ligands: {},
  providers: {},
  cache: {},
  diagnostics: {}
}
```

Raw provider JSON is normalized in `src/services/normalizers`, keeping the
React dashboard decoupled from UniProt, STRING, PDB, InterPro, AlphaFold, KEGG,
ClinVar, and PubChem response drift.

---

## 7. Request Governance And Caching

The provider HTTP gateway now routes all outbound provider requests through:

- `src/services/api/request-manager.ts` for Bottleneck queues, p-limit global
  concurrency, provider timeouts, retries, and circuit breakers.
- `src/services/cache/tiered-cache.ts` for L2 in-memory cache and optional L3
  Redis cache.
- `src/services/graphql/rcsb.ts` for RCSB GraphQL field selection instead of
  large REST payloads.

Caching uses stale-while-revalidate behavior. Fresh hits return immediately.
Stale hits return immediately and schedule background refresh when requested
through the protein intelligence orchestrator.

---

## 8. Client-Side Intelligence Runtime

Production target: BioAlign Pro is now a static, client-side intelligence app.
The build PC is used only to generate `out/`, data packs, search indexes, and
browser model assets. After deployment, GitHub Pages serves files only and all
scientific intelligence executes inside the user's browser.

### Layer 1 - Rule-Based Scientific Engine

Runtime files:

- `src/lib/intelligence/rule-engine.ts`
- `src/workers/intelligence.worker.ts`
- `src/hooks/use-client-intelligence.ts`

Capabilities:

- Detect UniProt ID, PDB ID, FASTA, DNA, RNA, and protein sequence inputs.
- Parse FASTA records.
- Calculate sequence length and symbol composition.
- Detect invalid residues.
- Scan common motifs.
- Estimate sequence complexity.
- Generate scientific explanation cards.
- Run heavy logic in a Web Worker and cache results in IndexedDB.

### Layer 2 - Browser ML Engine

Runtime files:

- `src/lib/browser-ai/onnx-runtime.ts`
- `src/lib/browser-ai/model-registry.ts`
- `public/models`

ONNX Runtime Web is lazy-loaded only when a model session is requested. WebGPU
is preferred when available, with WASM/CPU fallback. Models are not loaded on
initial page load.

### Layer 3 - Optional Local AI Assistant

Runtime files:

- `src/lib/browser-ai/local-assistant.ts`
- `src/modules/client-intelligence/client-intelligence-panel.tsx`

The local assistant is disabled by default, especially on mobile or low-memory
devices. It explains already-loaded BioAlign data only and must not claim
protein structure prediction.

### Static Runtime Folders

```txt
src/lib/intelligence
src/lib/browser-ai
src/lib/static-data
src/workers
src/hooks
public/data
public/models
public/indexes
```

### Accession Query Workflow

Runtime files:

- `src/lib/intelligence/query-engine.ts`
- `src/hooks/use-protein-query.ts`
- `src/modules/query/protein-query-workflow.tsx`
- `src/modules/visualization/structure-viewer-gate.tsx`
- `public/indexes/search-index.json`
- `public/indexes/alias-index.json`
- `public/data/starter-proteins.json`
- `public/data/protein-packs/*.json`

Flow:

1. The worker detects UniProt accessions, PDB IDs, FASTA, DNA, RNA, protein
   sequences, and local gene/protein aliases.
2. The worker loads `/indexes/search-index.json` first and uses Fuse.js over
   `/indexes/alias-index.json` for case-insensitive exact and fuzzy alias
   matching.
3. Local matches load compressed static packs from
   `/data/protein-packs/<accession>.json.gz`, falling back to plain JSON.
4. If no static match exists, the worker attempts CORS-safe public browser
   lookups through UniProt, AlphaFold, and RCSB without private API keys.
5. Static packs and live browser API responses are cached in IndexedDB.
6. Sequence-only inputs produce local scientific packs from the rule engine.
7. The Mol* adapter and 3D visualization bundle load only after the structure
   viewer gate is opened.

The starter release contains 19 famous proteins, including TP53/p53,
hemoglobin alpha/beta, EGFR, BRCA1/2, insulin, albumin, APP, tau, RAS family,
ACE2, SARS-CoV-2 spike, actin, tubulin, collagen, and GFP. The alias index is
case-insensitive and supports fuzzy spellings such as `humoglobin`; a
`hemoglobin` query returns both alpha and beta hemoglobin options.

### Scientific Structure Intelligence Layer

Runtime files:

- `src/lib/structure-intelligence`
- `src/workers/structure/structure-metrics.worker.ts`
- `src/components/structure-intelligence/structure-intelligence-explorer.tsx`
- `public/data/structure-intelligence/*.json`

Build-time files:

- `scripts/structure-intelligence/fetch`
- `scripts/structure-intelligence/normalize`
- `scripts/structure-intelligence/compute`
- `scripts/structure-intelligence/export`

Each static protein pack can include a `structureIntelligence` extension with:

- UniProt identity, sequence, function comments, features, and cross references.
- RCSB PDB experimental structure metadata.
- AlphaFold DB predicted model links, pLDDT confidence, and PAE summaries when
  available and small enough for static delivery.
- InterPro/Pfam/UniProt domain annotations.
- Compact MSA/conservation summaries only when curated or UniProt/ortholog
  homolog sequences are aligned during the static build with MAFFT, Clustal
  Omega, or MUSCLE. AlphaFold DB MSA links are not used as the conservation
  source; packs mark MSA unavailable when no homolog set or aligner is present.
- RMSD and TM-score records that show real computed values only when available;
  otherwise the pack stores an explicit unavailable reason.
- Rule-based sequence to structure to function evidence cards generated only
  from loaded source data.

The Fold Explorer UI renders seven tabs: Overview, Structure, Metrics, Domains,
Evolution, Function, and Sources. PAE heatmaps and the 3D viewer are lazy-loaded.
Small browser RMSD jobs use a Web Worker and Kabsch superposition; expensive
template comparisons remain a build-time concern.

### Build-Time Pipeline

```txt
scripts/build-data
scripts/fetch-public-data
scripts/normalize-data
scripts/build-search-index
scripts/convert-models
scripts/compress-assets
```

`npm run build` runs the static data pipeline and then `next build` with
`output: "export"`, producing the GitHub Pages-ready `out/` directory.
BioAlign Pro Root
├── dist/                      # Compiled production server assets
├── docs/                      # Technical documentation
│   ├── architecture.md        # [THIS FILE] System Architecture
│   └── deployment.md          # Deployment & Infrastructure Guide
├── server/                    # Node Express API Proxy Gateway
│   ├── index.ts               # Server entry point
│   ├── middleware/            # Rate-limiting, logging, CORS, helmet rules
│   ├── routes/
│   │   └── protein.ts         # Integrations routing & BLAST/Prediction API
│   └── services/
│       └── prediction-engine.ts # Ab-initio simulation/threading runner
├── src/                       # Next.js Frontend App React workspace
│   ├── agents/
│   │   └── protein-analysis-agent.ts # Agentic multi-db background query orchestrator
│   ├── api/
│   │   └── contracts.ts       # Zod schemas for sequence, BLAST, and Homology contracts
│   ├── components/
│   │   └── ui/                # Core visual UI components library
│   │       ├── animated-score-bar.tsx
│   │       ├── badge.tsx
│   │       ├── heatmap.tsx
│   │       ├── metric-ring.tsx
│   │       ├── pae-matrix-viewer.tsx
│   │       ├── pipeline-stepper.tsx
│   │       ├── plddt-viewer.tsx
│   │       ├── radial-meter.tsx
│   │       ├── score-card.tsx
│   │       ├── sequence-viewer.tsx
│   │       └── template-card.tsx
│   ├── constants/             # Constants for amino-acid properties & color palettes
│   ├── hooks/
│   │   └── use-workbench-query.ts # React Query wrappers for database fetching
│   ├── layouts/
│   │   └── app-shell.tsx      # Main responsive shell with active section observer
│   ├── lib/
│   │   └── utils.ts           # Styling (clsx/tailwind-merge) & Sequence clean utilities
│   ├── store/                 # Zustand central stores
│   │   ├── analysis-store.ts  # Background step progression store
│   │   └── workbench-store.ts # Workbench selection and result values store
│   ├── services/              # Core business services
│   │   ├── input-detector.ts  # Pattern-matching heuristic engine
│   │   ├── api-client.ts      # Axios wrapper for Next-to-Express proxy communication
│   │   └── integrations/      # Third-party database connectors
│   │       ├── alphafold.ts   # AlphaFold DB coordinates & metadata
│   │       ├── blast.ts       # BLAST helper types
│   │       ├── cache.ts       # Local filesystem/Redis JSON cache wrapper
│   │       ├── clinvar.ts     # ClinVar mutations & variant data
│   │       ├── ensembl.ts     # Gene transcripts & Ensembl properties
│   │       ├── esm-atlas.ts   # ESM-Atlas predicted structures
│   │       ├── foldseek.ts    # Foldseek structural search submissions
│   │       ├── http.ts        # Axios gateway wrapper with deduplication/throttling
│   │       ├── index.ts       # Consolidated integration gateway export
│   │       ├── interpro.ts    # Domain, motifs, and GO annotations
│   │       ├── kegg.ts        # KEGG biological pathways
│   │       ├── ncbi.ts        # NCBI BLAST runner & polling engine
│   │       ├── pdbe.ts        # PDBe summary mapping
│   │       ├── pubchem.ts     # Small molecules, ligands & chemicals lookup
│   │       ├── rcsb.ts        # RCSB PDB structure mapping
│   │       ├── retry.ts       # Exponential backoff handler
│   │       ├── string-db.ts   # STRING network interaction mapping
│   │       └── uniprot.ts     # UniProtKB primary metadata
│   └── modules/               # Feature dashboard modules
│       ├── alignment/         # Sequence alignment view panels
│       ├── biological-intelligence/ # Mutations, pathway, interaction card views
│       ├── blast/             # NCBI BLAST job status & hits panels
│       ├── dashboard/         # Dashboard shell & header controllers
│       ├── foldseek/          # Foldseek structural alignment sankey view
│       ├── homology-modeling/ # Template matching & step progress panels
│       ├── rmsd-analysis/     # Structural deviation chart dashboards
│       ├── score-dashboard/   # Radial meter quality score card grids
│       ├── sequence-analysis/ # FASTA parsing & residue properties view
│       ├── threading/         # Distance-homology profile comparisons
│       └── visualization/     # 3D canvas and ribbon renderers
```

---

## 2. Core Functional Layers

### A. Input Detection Heuristics (`src/services/input-detector.ts`)
The `detectInputType` parser matches inputs to avoid manual configuration:
* **FASTA**: Matches sequence lines starting with `>`.
* **Accession**: Identifies UniProt IDs (e.g., `P69905`, `Q13535`) using standard RegExp patterns.
* **PDB ID**: Detects 4-digit alphanumeric codes (e.g., `1A3N`).
* **Gene Name**: Standard alphabetic symbols (`HBA1`, `BRCA1`).
* **Sequence**: Standard capitalized amino acid characters (`ARNDCEQGHILKMFPSTWYV`).

### B. Agentic Multi-Database Orchestrator (`src/agents/protein-analysis-agent.ts`)
Coordinates full analysis jobs by calling the API gateway:
1. Triggers initial parsing step in `useAnalysisStore`.
2. Resolves mapped accessions (e.g., Gene $\rightarrow$ Accession).
3. Concurrently retrieves data from UniProt, STRING, KEGG, ClinVar, and InterPro.
4. Spawns homology modeling templates.
5. Queries AlphaFold DB coordinates and updates `useWorkbenchStore` with consolidated outputs.

---

## 3. Web Service & API Routes (`server/routes/protein.ts`)

| HTTP Method | Route | Description |
| :--- | :--- | :--- |
| **GET** | `/api/protein/search/uniprot` | Searches UniProt using query criteria |
| **GET** | `/api/protein/integrations/:provider/:id` | Proxy request to external providers (UniProt, STRING, KEGG, etc.) |
| **POST** | `/api/protein/homology/run` | Runs target sequence search against local template database |
| **POST** | `/api/protein/predict` | Executes tertiary structure ab-initio rendering model |

---

## 4. State Flow & Data Binding

```
[ User Search Query ]
        │
        ▼
[ input-detector.ts ] ──► (Determine Category)
        │
        ▼
[ protein-analysis-agent.ts ] ──► (Updates step progress inside useAnalysisStore)
        │
        ▼
[ HTTP Proxy Layer ] ──► (Aggregates UniProt, STRING, KEGG, ClinVar, InterPro, NCBI)
        │
        ▼
[ useWorkbenchStore ] ──► (Stores retrieved payloads)
        │
        ├─► [ sequence-viewer.tsx ] (Updates colored residue grids)
        ├─► [ molecular-viewer.tsx ] (Fibers R3F ribbon coordinates dynamically)
        └─► [ bio-intel-panel.tsx ] (Renders mutations, pathways & interactions)
```
