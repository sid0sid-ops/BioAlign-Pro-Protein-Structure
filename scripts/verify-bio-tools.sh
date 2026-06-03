#!/usr/bin/env bash
set -euo pipefail

mafft --version
clustalo --version
muscle -version
foldseek version
TMalign 2>&1 | head
USalign 2>&1 | head
hmmscan -h | head
blastp -version
mmseqs version
mkdssp --version
python -c "import Bio, gemmi, MDAnalysis; print('Python bio libs OK')"
