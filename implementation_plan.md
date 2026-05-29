# BioAlign Pro — Full Upgrade to AI-Powered Protein Intelligence Workspace

> Current production direction, updated 2026-05-29: the first release is a
> static GitHub Pages client intelligence app. Backend-dependent gateway phases
> below are historical planning context only. Runtime accession search now uses
> Web Workers, `/public/indexes/search-index.json`, `/public/indexes/alias-index.json`,
> `/public/data/protein-packs/`, IndexedDB cache, and optional CORS-safe public
> API fallback without private keys.

## Current State Assessment

The existing codebase is a **well-structured Next.js + Express.js scaffold** with ~40 files across a modular architecture. However, the current implementation is largely **static/mock-driven** with significant gaps:

| Area | Status | Issues |
|------|--------|--------|
| **UI Components** | 🟡 Partial | 8 basic ShadCN primitives — no radial meters, score cards, heatmaps, PAE viewer |
| **Database Integrations** | 🟡 Minimal | Only UniProt, RCSB, AlphaFold, PDBe, ESM Atlas, Foldseek stubs — all thin wrappers |
| **Dashboard Panels** | 🟡 Static | All 11 panels render hardcoded mock data, no live API calls from UI |
| **3D Viewer** | 🟡 Demo only | Three.js placeholder ribbon — no PDB loading, Mol*/NGL not wired |
| **Workbench Store** | 🟡 Basic | 7 state fields — no query workflow, analysis pipeline, or agent state |
| **Server** | 🟡 Scaffold | Express server with mock prediction engine, no real orchestration |
| **Command Palette** | 🟡 Shell | Renders a dialog but doesn't dispatch real actions |
| **Prisma Schema** | ✅ Good | Production-grade schema with proper relations |
| **Design System** | ✅ Good | Strong glassmorphism foundation, teal/violet palette, particles |

---

## Proposed Changes

This is an enormous scope. I'll break it into **6 phased components** to be executed sequentially. Each phase builds on the previous and produces a testable, shippable increment.

> [!IMPORTANT]
> Given the scale (~80+ files to create/modify), I recommend we proceed **phase by phase**, with you reviewing each phase before I continue. This ensures quality and prevents massive rework.

---

### Phase 1: Intelligent Input Detection + Live API Integration Engine

**Goal**: Make the platform actually work with real data. User enters any input → system detects type → fetches live data from APIs.

#### [NEW] `src/services/input-detector.ts`
- Auto-detect input type: FASTA, UniProt accession, PDB ID, gene name, DNA/RNA/protein sequence
- Pattern matching with regex + validation rules
- Returns `{ type, value, confidence }` for downstream routing

#### [MODIFY] `src/services/integrations/uniprot.ts`
- Expand UniProtEntry type with full fields: features, GO annotations, diseases, pathways, cross-references
- Add `searchUniProt(query)` for gene name / free-text search
- Add `fetchUniProtFeatures(accession)` for domains, motifs, active sites

#### [MODIFY] `src/services/integrations/rcsb.ts`
- Expand with `searchRcsbBySequence(sequence)` using RCSB search API
- Add `fetchRcsbPolymerEntity(pdbId)` for chain-level details
- Add ligand/binding site information

#### [MODIFY] `src/services/integrations/alphafold.ts`
- Add PAE matrix fetching
- Add pLDDT per-residue data
- Add CIF/PDB structure URL resolution

#### [NEW] `src/services/integrations/ncbi.ts`
- NCBI BLAST submission (PUT to blast.ncbi.nlm.nih.gov)
- Job polling with exponential backoff
- Result parsing and normalization

#### [NEW] `src/services/integrations/interpro.ts`
- InterPro domain search by sequence/accession
- Domain annotations, family classification

#### [NEW] `src/services/integrations/string-db.ts`
- STRING protein interaction network
- Interaction confidence scores

#### [NEW] `src/services/integrations/kegg.ts`
- KEGG pathway lookup by gene/accession
- Pathway visualization data

#### [NEW] `src/services/integrations/ensembl.ts`
- Ensembl gene lookup
- Cross-reference resolution

#### [NEW] `src/services/integrations/clinvar.ts`
- ClinVar variant data by gene name
- Pathogenic mutation annotations

#### [NEW] `src/services/integrations/drugbank-pubchem.ts`
- PubChem compound search by protein target
- Ligand binding data aggregation

#### [MODIFY] `src/services/integrations/index.ts`
- Re-export all new integrations
- Create unified `DatabaseAggregator` class that orchestrates parallel multi-DB queries

#### [MODIFY] `src/services/integrations/http.ts`
- Add request deduplication (same URL → return existing Promise)
- Add rate limiting per provider

---

### Phase 2: Zustand Store Upgrade + React Query Hooks + Agent Pipelines

**Goal**: Replace mock-data-driven panels with live-data-driven reactive state.

#### [MODIFY] `src/store/workbench-store.ts`
- Add `inputQuery`, `inputType`, `isAnalyzing` fields
- Add `activePanel`, `expandedPanels` for workspace state
- Add `analysisResults` map for storing per-provider results
- Add `comparisonTargets` for structure comparison state

#### [NEW] `src/store/analysis-store.ts`
- Dedicated store for ongoing analysis pipeline
- Pipeline steps with status tracking
- Results accumulator

#### [NEW] `src/hooks/use-protein-analysis.ts`
- Master React Query hook that orchestrates the full analysis pipeline
- Takes raw input → runs detector → dispatches parallel API calls
- Returns aggregated results with loading/error states per provider

#### [NEW] `src/hooks/use-database-query.ts`
- Individual hooks: `useUniProtQuery`, `useRcsbQuery`, `useAlphaFoldQuery`, `useBlastQuery`
- Each wraps React Query with provider-specific options (stale times, retries)

#### [NEW] `src/hooks/use-structure-comparison.ts`
- Hook for comparing two structures
- Computes client-side RMSD estimation, TM-score approximation

#### [NEW] `src/agents/protein-analysis-agent.ts`
- Agent pipeline: receives accession → detects type → fetches metadata → finds structures → ranks templates → generates summary
- Step-by-step status reporting

#### [NEW] `src/agents/structure-comparison-agent.ts`
- Agent pipeline: fetches two structures → computes metrics → generates visualization data

#### [NEW] `src/agents/database-aggregation-agent.ts`
- Agent pipeline: queries multiple APIs in parallel → merges → normalizes → caches

---

### Phase 3: UI Component Library Expansion + Scientific Visualizations

**Goal**: Build the premium scientific UI components needed across all panels.

#### [NEW] `src/components/ui/radial-meter.tsx`
- Animated SVG radial meter for scores (pLDDT, TM-score, RMSD)
- Configurable color scale, label, value

#### [NEW] `src/components/ui/score-card.tsx`
- Premium animated score card with gradient background
- Metric name, value, trend, confidence band

#### [NEW] `src/components/ui/heatmap.tsx`
- Interactive heatmap component for PAE matrix, similarity matrices
- Hover tooltips, color scales, axis labels

#### [NEW] `src/components/ui/animated-score-bar.tsx`
- Horizontal animated score bar with label
- Spring animation, color gradient based on value

#### [NEW] `src/components/ui/metric-ring.tsx`
- Ring/donut chart for quality metrics (QC, RC, MC, SC, OF)

#### [NEW] `src/components/ui/sequence-viewer.tsx`
- Premium sequence viewer with residue coloring by property
- Hover tooltips, domain highlighting, selection

#### [NEW] `src/components/ui/pae-matrix-viewer.tsx`
- PAE (Predicted Aligned Error) matrix viewer
- Interactive heatmap with zoom, click-to-select residue pairs

#### [NEW] `src/components/ui/plddt-viewer.tsx`
- pLDDT per-residue confidence chart
- Color-coded by confidence band (blue/cyan/yellow/orange)

#### [NEW] `src/components/ui/template-card.tsx`
- Rich template hit card with all metadata
- Identity bar, coverage bar, resolution, organism

#### [NEW] `src/components/ui/pipeline-stepper.tsx`
- Animated vertical/horizontal pipeline stepper
- Status icons, progress bars, timing

#### [NEW] `src/components/ui/tabs-enhanced.tsx`
- Enhanced tabs with badge counts, icons, animations

#### [NEW] `src/components/ui/data-table.tsx`
- Sortable, filterable data table for template hits, mutations, etc.

---

### Phase 4: Dashboard Panel Overhaul — Wire to Live Data

**Goal**: Rewrite every dashboard panel to consume live data and use premium UI components.

#### [MODIFY] `src/modules/dashboard/dashboard-shell.tsx`
- Add unified search input at hero level that triggers full analysis pipeline
- Replace static stats with live aggregated results
- Add panel grid with tabs for organized navigation

#### [MODIFY] `src/modules/sequence-analysis/sequence-workbench.tsx`
- Wire to `useProteinAnalysis` hook
- Add input type auto-detection badge
- Add DNA/RNA translation if detected
- Show live metrics from API responses

#### [MODIFY] `src/modules/homology-modeling/homology-pipeline.tsx`
- Wire pipeline steps to actual API call status
- Template hits from live BLAST/RCSB search
- Dynamic identity scoring from real data

#### [MODIFY] `src/modules/blast/blast-panel.tsx`
- Wire to NCBI BLAST API
- Real job submission and polling
- Results table with hit visualization

#### [MODIFY] `src/modules/alignment/alignment-viewer.tsx`
- Enhance with live alignment data
- Add conservation coloring
- Add consensus sequence row

#### [MODIFY] `src/modules/threading/threading-dashboard.tsx`
- Wire fold library matching to real Foldseek/DALI data
- Dynamic similarity matrix from real comparisons

#### [MODIFY] `src/modules/alphafold/alphafold-panel.tsx`
- Wire to AlphaFold DB API
- Real pLDDT visualization
- Real PAE matrix viewer
- Structure download links

#### [MODIFY] `src/modules/foldseek/foldseek-panel.tsx`
- Wire to Foldseek API
- Real structural search results

#### [MODIFY] `src/modules/rmsd-analysis/rmsd-dashboard.tsx`
- Wire to real structural comparison data
- Add all 12 scientific metrics (RMSD, TM-score, etc.)
- Add radial meters and animated score bars

#### [NEW] `src/modules/biological-intelligence/bio-intel-panel.tsx`
- Diseases panel (ClinVar, OMIM integration)
- Pathways panel (KEGG, Reactome)
- Interactions network (STRING)
- GO annotations
- Domain map (InterPro)

#### [NEW] `src/modules/score-dashboard/protein-quality-scores.tsx`
- QC, RC, MC, SC, OF score modules
- Radial meters arranged in a premium dashboard grid
- Scientific explanations for each metric

---

### Phase 5: 3D Structure Visualization Upgrade

**Goal**: Replace the placeholder Three.js ribbon with a real PDB structure loader.

#### [MODIFY] `src/modules/visualization/molecular-viewer.tsx`
- Add PDB file loading from RCSB/AlphaFold URLs
- Parse PDB/mmCIF format client-side
- Render cartoon, surface, stick, ball-stick, electrostatic modes
- Residue hover with annotations
- Chain selection with actual chain data
- Ligand highlighting
- Mutation comparison (overlay two structures)
- Secondary structure coloring

#### [MODIFY] `src/modules/visualization/molecular-adapters.ts`
- Implement Mol* adapter for high-fidelity rendering
- NGL Viewer adapter as fallback
- Unified API surface

---

### Phase 6: Command Palette, Contact System, Docs & Production Config

#### [MODIFY] `src/modules/ui/command-palette.tsx`
- Wire to input detector — type a query, see categorized suggestions
- Quick actions: load demo sequences, switch panels, toggle theme
- Recent queries history

#### [MODIFY] `src/layouts/app-shell.tsx`
- Add floating contact button on all viewport sizes (not just mobile)
- Enhance sidebar with active state highlighting
- Add panel badges with status indicators

#### [MODIFY] `src/app/layout.tsx`
- Add Google Fonts (Inter) import
- Enhanced SEO metadata

#### [MODIFY] `server/index.ts`
- Add new API routes for all new integrations
- Add orchestration endpoints

#### [NEW] `server/routes/analysis.ts`
- Full analysis orchestration endpoint
- Multi-provider aggregation
- Result caching

#### [MODIFY] `README.md`
- Complete rewrite with architecture diagrams, setup guide, API docs

#### [NEW] `docs/architecture.md`
- Mermaid architecture diagrams
- Component dependency map

#### [NEW] `docs/deployment.md`
- Vercel, Railway, Docker deployment guides

#### [NEW] `handoff.md`
- Session summary document

---

## Open Questions

> [!IMPORTANT]
> **Scope Prioritization**: This is 80+ files of work. Should I:
> 1. **Execute all 6 phases** in one go (very large, may take a while)?
> 2. **Start with Phase 1-3** (core engine + UI components), deliver, then continue?
> 3. **Focus on a specific subset** you care most about?

> [!IMPORTANT]
> **Real API Keys**: Some APIs (NCBI BLAST, STRING, DrugBank) may require API keys or have rate limits. Should I:
> 1. Implement all integrations with graceful fallbacks when keys aren't configured?
> 2. Focus only on free/open APIs (UniProt, RCSB, AlphaFold, PDBe, InterPro)?

> [!WARNING]
> **3D Viewer Complexity**: A full Mol* integration is a significant standalone effort. The current Three.js ribbon is visually appealing as a demo. Should I:
> 1. Keep Three.js as primary viewer but add PDB parsing for real protein geometry?
> 2. Integrate Mol* (heavy, ~2MB bundle) for production-grade molecular visualization?
> 3. Use NGL Viewer (lighter, ~500KB) as a middle ground?

---

## Verification Plan

### Automated Tests
- `npm run build` — Ensure zero TypeScript/build errors
- `npm run dev` — Dev server starts without runtime errors
- Browser smoke test via browser tool:
  - Dashboard renders all panels
  - Sequence input + auto-detection works
  - API calls fire and return data (UniProt P69905, PDB 4HHB)
  - 3D viewer renders
  - Command palette opens with ⌘K
  - Dark/light theme toggle works
  - Contact button links to correct GitHub repo
  - Responsive layout at mobile/tablet/desktop

### Manual Verification
- Visual review of all panels with real data
- Confirm API responses render correctly in all chart types
