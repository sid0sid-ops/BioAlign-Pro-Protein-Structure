#!/usr/bin/env bash
set -euo pipefail

echo "Updating Ubuntu packages..."
sudo apt update
sudo apt upgrade -y
sudo apt install -y build-essential git wget curl unzip python3 python3-pip python3-venv nodejs npm
sudo apt install -y mafft clustalo muscle hmmer ncbi-blast+ dssp

if ! command -v conda >/dev/null 2>&1; then
  cd "$HOME"
  wget -O Miniforge3-Linux-x86_64.sh https://github.com/conda-forge/miniforge/releases/latest/download/Miniforge3-Linux-x86_64.sh
  bash Miniforge3-Linux-x86_64.sh -b -p "$HOME/miniforge3"
  "$HOME/miniforge3/bin/conda" init bash
  export PATH="$HOME/miniforge3/bin:$PATH"
fi

conda create -n bioalign-tools python=3.11 -y || true
source "$(conda info --base)/etc/profile.d/conda.sh"
conda activate bioalign-tools
conda config --add channels conda-forge || true
conda config --add channels bioconda || true
conda config --set channel_priority strict
conda install -y -c bioconda foldseek mmseqs2 tmalign usalign
conda install -y -c conda-forge dssp
pip install biopython gemmi MDAnalysis biotite prody freesasa networkx
pip install numpy scipy pandas polars pyarrow orjson zstandard httpx aiohttp tenacity tqdm rich typer joblib diskcache

echo "BioAlign WSL tools installed. Reopen Ubuntu, then run:"
echo "  conda activate bioalign-tools"
echo "  cd \"/mnt/c/Users/Siddharth Tripathi/OneDrive/Desktop/Protein Structure\""
echo "  npm run data:build"
