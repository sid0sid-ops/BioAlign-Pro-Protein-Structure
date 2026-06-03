# Installs the BioAlign Pro build-time bioinformatics toolkit in the requested order.
# The conda environment is project-local: bio_tools\bioenv

$ErrorActionPreference = "Stop"

$workspaceRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$toolsRoot = Join-Path $workspaceRoot "bio_tools"
$envPrefix = Join-Path $toolsRoot "bioenv"
$condaExe = Join-Path $Env:USERPROFILE "Miniconda3\Scripts\conda.exe"

function Assert-Command($Name, $Command, $Arguments) {
  Write-Host "Checking $Name..." -ForegroundColor Cyan
  try {
    & $Command @Arguments | Select-Object -First 2
  } catch {
    Write-Warning "$Name installed, but version check failed: $($_.Exception.Message)"
  }
}

if (!(Test-Path -LiteralPath $condaExe)) {
  throw "Miniconda was not found at $condaExe. Install Miniconda first, then re-run this script."
}

New-Item -ItemType Directory -Force -Path $toolsRoot | Out-Null

Write-Host "Creating/updating project-local bioinformatics environment..." -ForegroundColor Green
& $condaExe create -y -p $envPrefix -c conda-forge -c bioconda `
  mafft `
  clustalo `
  muscle `
  foldseek `
  usalign `
  hmmer `
  blast `
  mmseqs2 `
  dssp `
  biopython `
  gemmi `
  mdanalysis

if ($LASTEXITCODE -ne 0) {
  throw "Conda environment creation failed. Check network access, conda channel permissions, and the conda cache path, then re-run this script from a normal PowerShell terminal."
}

$bin = Join-Path $envPrefix "Library\bin"
$scripts = Join-Path $envPrefix "Scripts"
$env:Path = "$envPrefix;$scripts;$bin;$env:Path"

Write-Host "--- Installed tool checks ---" -ForegroundColor Green
Assert-Command "MAFFT" "mafft" @("--version")
Assert-Command "Clustal Omega" "clustalo" @("--version")
Assert-Command "MUSCLE" "muscle" @("-version")
Assert-Command "Foldseek" "foldseek" @("version")
Assert-Command "US-align" "USalign" @("-h")
Assert-Command "HMMER" "hmmsearch" @("-h")
Assert-Command "BLAST+" "blastp" @("-version")
Assert-Command "MMseqs2" "mmseqs" @("version")
Assert-Command "DSSP" "mkdssp" @("--version")

python -c "import Bio, gemmi, MDAnalysis; print('BioPython', Bio.__version__); print('Gemmi', gemmi.__version__); print('MDAnalysis', MDAnalysis.__version__)"

Write-Host "Done. To use this environment in a new terminal:" -ForegroundColor Green
Write-Host "  conda activate `"$envPrefix`""
Write-Host "Then run:"
Write-Host "  npm run data:build"
