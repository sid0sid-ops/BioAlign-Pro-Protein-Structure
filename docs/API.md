# API Documentation

> Production note: BioAlign Pro's GitHub Pages deployment does not require any
> runtime API. The sections below document legacy/development gateway contracts.
> The production app uses Web Workers, IndexedDB, and static JSON/model assets in
> the browser.

## Client Intelligence Runtime

Primary runtime modules:

- `src/lib/intelligence/rule-engine.ts`
- `src/lib/intelligence/query-engine.ts`
- `src/workers/intelligence.worker.ts`
- `src/hooks/use-client-intelligence.ts`
- `src/hooks/use-protein-query.ts`
- `src/lib/static-data/data-pack-loader.ts`
- `src/lib/browser-ai/onnx-runtime.ts`

Static assets:

- `/data/manifest.json`
- `/data/starter-proteins.json`
- `/data/protein-packs/<accession>.json`
- `/data/protein-packs/<accession>.json.gz`
- `/data/motifs.json`
- `/data/protein-intelligence-seeds.json`
- `/indexes/search-index.json`
- `/indexes/alias-index.json`
- `/indexes/protein-search-index.json`
- `/models/manifest.json`

The browser worker returns input type, sequence class, FASTA metadata, length,
composition, invalid residues, motif hits, complexity estimates, explanation
cards, and runtime metadata.

## Structure Intelligence Pack

Protein packs may include `structureIntelligence`, and the same payload is also
exported under `/data/structure-intelligence/<accession>.json`.

Important fields:

- `protein`: UniProt identity, canonical sequence, function comments, features,
  and cross references.
- `structures.experimental`: RCSB PDB metadata.
- `structures.predicted`: AlphaFold DB model metadata.
- `domains`: InterPro/Pfam/UniProt normalized domain annotations.
- `msa`: compact conservation tracks only when curated or UniProt/ortholog
  homolog sequences were aligned at build time with MAFFT, Clustal Omega, or
  MUSCLE; otherwise it carries an unavailable reason.
- `metrics.rmsdComparisons`: real RMSD values or explicit unavailable reasons.
- `metrics.tmScoreComparisons`: real TM-score values or explicit unavailable
  reasons.
- `metrics.plddt`: AlphaFold pLDDT summary parsed from source data.
- `metrics.pae`: AlphaFold PAE summary/downsampled matrix when available.
- `structureFunction`: rule-based explanation from loaded source evidence only.
- `sources`: provenance records for visible source badges.

## Static Query Contract

There is no production HTTP API for the accession workflow. The browser worker
returns a `ProteinQueryResult` from static files and optional public browser API
fallbacks:

- `query`: original submitted text.
- `detectedType`: local input classification.
- `matches`: ranked local static matches from search and alias indexes.
- `selectedPack`: normalized protein pack or sequence-only local pack.
- `source`: `local-static-pack`, `browser-api`, `browser-cache`, `user-input`,
  or `fallback`.
- `sourceBadges`: UI badges for static pack, browser API, browser cache, and
  no-backend state.
- `fallbackMessage`: user-facing fallback text when live lookup fails.

The starter static dataset supports accession, gene name, protein name, alias,
disease-associated names, and Fuse.js fuzzy matching for the bundled famous proteins.
For example, `hemoglobin` and `humoglobin` both rank the alpha and beta
hemoglobin packs.

Legacy development gateway base URL: `http://localhost:4000/api`

## Health

`GET /health`

Returns API status, uptime, and integration availability.

## Sequence Analysis

`POST /protein/analyze-sequence`

```json
{
  "name": "Example kinase",
  "sequence": "MSTNPKPQRKTKRNTNRRPQDVKFPGGGQIVGGVYLLPRRG..."
}
```

Returns validation, residue composition, molecular weight estimate, charge hints, hydrophobicity, and secondary structure tendencies.

## Homology Modeling

`POST /protein/homology/run`

Starts a simulated orchestration job with BLAST, template ranking, alignment, model building, refinement, validation, RMSD, and visualization payloads. Provider-backed implementations should plug into the same contract.

## Template Search

`GET /protein/templates?query=P69905`

Searches RCSB and AlphaFold-compatible metadata through the service layer.

## Integrations

`GET /protein/integrations/:provider/:id`

Supported providers:

- `uniprot`
- `rcsb`
- `alphafold`
- `pdbe`
- `foldseek`
- `esm-atlas`

All integration endpoints return typed payloads, cache metadata, and normalized errors.

## Protein Intelligence

`GET /protein/intelligence/:accession`

Optional query parameters:

- `geneName`: improves STRING, KEGG, ClinVar, and PubChem lookups.
- `pdbId`: forces an RCSB GraphQL structure enrichment target.
- `refresh=true`: bypasses the intelligence cache and refreshes providers.

Returns the normalized `ProteinIntelligence` contract:

- `protein`: UniProt-normalized identity, sequence, organism, keywords, and cross references.
- `structure`: RCSB GraphQL structure summaries plus AlphaFold predicted models.
- `interactions`: STRING-normalized nodes and edges.
- `domains`: UniProt and InterPro domains plus GO terms.
- `pathways`: KEGG and InterPro pathway references.
- `confidence`: AlphaFold confidence summary.
- `diseases`: UniProt and ClinVar disease/variant annotations.
- `ligands`: RCSB and PubChem ligand/compound references.
- `providers`: per-provider timing, cache, and error traces.
- `cache`: intelligence cache hit/layer/state metadata.

Compatibility alias:

`GET /protein/analysis/orchestrate/:accession`

## Diagnostics

`GET /protein/diagnostics/cache`

Returns memory and Redis cache counters.

`GET /protein/diagnostics/requests`

Returns provider queue, circuit breaker, and recent timing diagnostics.
