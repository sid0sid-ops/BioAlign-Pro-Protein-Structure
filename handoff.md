## Changed

Fixed GitHub Pages deployment using Next.js static export and GitHub Actions.

- Confirmed the active project root contains `package.json`, `package-lock.json`, `next.config.mjs`, `src/`, `public/`, `scripts/`, `.github/workflows/`, `README.md`, and `handoff.md`.
- Updated the Pages workflow to build the app and upload only `out/`.
- Consolidated static asset path handling through `withBasePath`.
- Added `OPEN_STATIC_PREVIEW.bat` for a local static export preview.
- Added `out` to `.gitignore` so future static exports are not committed.

## Deployment

GitHub Actions builds the app and deploys the `out/` folder only.

Set GitHub Pages to:

Repository -> Settings -> Pages -> Build and deployment -> Source -> GitHub Actions

## Static Output

Confirmed local static export contains:

- `out/index.html`
- `out/.nojekyll`
- `out/_next/`
- `out/data/`
- `out/indexes/`

## Verification

- `npm.cmd run data:build` passed.
- `npm.cmd run typecheck` passed.
- `npm.cmd run build` passed.
- Local `out/` inspection confirmed `index.html`, `.nojekyll`, `_next/`, `data/`, and `indexes/`.
- Local `out/data/protein-packs/` includes `P04637.json` and generated compressed variants.
- Local `out/indexes/` includes `alias-index.json` and `search-index.json`.
- Live URL test is pending until the updated workflow is pushed and completes.
- Search tests for `TP53`, `p53`, `hemoglobin`, `humoglobin`, `EGFR`, `insulin`, `ACE2`, and `GFP` are pending live deployment verification.

## Known Issues

- Live GitHub Pages verification has not run yet because the updated workflow has not deployed from `main`.
- Existing scientific unavailable states remain intentional: MSA, RMSD, TM-score, and other metrics are not faked.
- Build logs still show non-fatal webpack cache snapshot warnings and a non-fatal package type warning for `tailwind.config.ts`.
- Local verification regenerated tracked `out/` and public static data files; discard those generated working-tree changes before committing if this repo keeps generated output out of source control.

## Next Step

Push these changes to `main`, then verify https://sid0sid-ops.github.io/BioAlign-Pro-Protein-Structure/ after GitHub Actions completes.
