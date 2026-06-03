param(
  [string]$Distro = "",
  [string]$CondaEnv = "bioalign-tools",
  [int]$StructureJobs = 8
)

$ErrorActionPreference = "Stop"

$repo = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$drive = $repo.Substring(0, 1).ToLower()
$tail = $repo.Substring(2).Replace("\", "/")
$repoForWsl = "/mnt/$drive$tail"

if (-not $Distro) {
  $list = @(& wsl.exe -l -q 2>$null | ForEach-Object { ($_ -replace "`0", "").Trim() } | Where-Object { $_ })
  if (-not $list -or $list.Count -eq 0) {
    throw "No WSL distro was visible to this PowerShell session. Open the same user terminal where Ubuntu works and rerun this script."
  }
  $Distro = $list[0]
}

$repoForWslQuoted = "'" + $repoForWsl.Replace("'", "'\''") + "'"
$condaEnvQuoted = "'" + $CondaEnv.Replace("'", "'\''") + "'"
$distroQuoted = "'" + $Distro.Replace("'", "'\''") + "'"

$bash = @"
set -e
source "`$HOME/miniforge3/etc/profile.d/conda.sh"
conda activate $condaEnvQuoted
export TMPDIR=/tmp
cd $repoForWslQuoted
echo "Using WSL distro: $distroQuoted"
echo "Using conda env: $condaEnvQuoted"
echo "Using structure enrichment workers: $StructureJobs"
echo "Checking required tools..."
which mafft clustalo muscle foldseek TMalign USalign mmseqs hmmscan blastp mkdssp
export BIOALIGN_STRUCTURE_JOBS=$StructureJobs
npm run data:build
echo "WSL data build complete. Run 'npm run build' from Windows PowerShell, not inside WSL, unless Linux node_modules are installed."
"@

$bash | & wsl.exe -d $Distro bash -s
