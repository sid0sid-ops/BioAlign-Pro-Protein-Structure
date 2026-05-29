## Changed

Fixed GitHub Pages deployment by moving project to repo root, adding static export workflow, and making asset/data paths base-path-safe.

## Deployment

GitHub Pages uses GitHub Actions and deploys the out/ folder.

## Verification

- `npm run data:build` and `npm run build` locally succeed and output static JSON data and HTML/CSS to the `out/` folder.
- Local verification with `npx serve@latest out -l 4173` successfully serves the site locally.
- GitHub Actions deployment will automatically build and deploy the `out/` folder to GitHub Pages when pushed to the main branch.

## Known Issues

- Please verify the live site once the GitHub Actions deployment completes to ensure there are no remaining 404s or asset path problems.
- Minor hydration warning on ThemeToggle because of initial theme client/server mismatch.

## Next Step

Wait for the GitHub Actions deployment to complete and verify the live site at https://sid0sid-ops.github.io/BioAlign-Pro-Protein-Structure/.
