# WSL2 Bioinformatics Toolchain

Use WSL2 Ubuntu for native bioinformatics tools. Run PowerShell as Administrator:

```powershell
wsl --install -d Ubuntu
```

After Ubuntu is installed and opened, go to this project:

```bash
cd "/mnt/c/Users/Siddharth Tripathi/OneDrive/Desktop/Protein Structure"
```

Install the toolchain:

```bash
bash scripts/setup-wsl-bio-tools.sh
```

Reopen Ubuntu, activate the environment, and verify:

```bash
conda activate bioalign-tools
cd "/mnt/c/Users/Siddharth Tripathi/OneDrive/Desktop/Protein Structure"
npm run data:verify-bio-tools
```

Regenerate static structure intelligence:

```bash
npm run data:build
```

The enrichment step detects `mafft`, `clustalo`, `muscle`, `USalign`, and `TMalign`
from `PATH`. It writes MSA, consensus, conservation scores, and conserved residues
only when alignment succeeds. It writes RMSD/TM-score only when coordinate downloads,
US-align/TM-align execution, and metric parsing all succeed.
