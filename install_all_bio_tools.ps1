# PowerShell script to install a comprehensive bioinformatics toolkit on Windows

# Define directories
$userHome = $Env:USERPROFILE
$condaDir = "$userHome\Miniconda3"
$envName = "bioenv"

# Function to check if a command exists
function Command-Exists($cmd) {
    $null -ne (Get-Command $cmd -ErrorAction SilentlyContinue)
}

# 1. Install Miniconda if conda is not available
if (-not (Command-Exists conda)) {
    Write-Host "Conda not found. Downloading Miniconda installer..." -ForegroundColor Yellow
    $installerUrl = "https://repo.anaconda.com/miniconda/Miniconda3-latest-Windows-x86_64.exe"
    $installerPath = "$userHome\Downloads\Miniconda3.exe"
    Invoke-WebRequest -Uri $installerUrl -OutFile $installerPath -UseBasicParsing
    Write-Host "Running silent Miniconda installer..." -ForegroundColor Yellow
    Start-Process -FilePath $installerPath -ArgumentList "/InstallationType=JustMe", "/AddToPath=0", "/RegisterPython=0", "/S", "/D=$condaDir" -Wait -NoNewWindow
    Remove-Item $installerPath
    # Initialise conda for the current PowerShell session
    & "$condaDir\Scripts\conda.exe" init powershell
    Write-Host "Miniconda installed. Please close this PowerShell window, open a new one, and re‑run the script." -ForegroundColor Cyan
    exit
}

# Refresh environment for conda in the current session (in case conda is already on PATH)
$env:Path = "$condaDir;${env:Path}"

# 2. Create conda environment with required packages
Write-Host "Creating conda environment '$envName' with bioinformatics packages..." -ForegroundColor Green
conda create -y -n $envName -c bioconda -c conda-forge \
    mafft clustalo muscle foldseek usalign hmmer blast mmseqs2 dssp

# 3. Activate the environment and install tmtools (provides TM‑align wrapper) and other pure‑Python packages
Write-Host "Activating environment and installing Python‑only tools..." -ForegroundColor Green
conda activate $envName
python -m pip install --upgrade pip
python -m pip install biopython gemmi MDAnalysis tmtools

Write-Host "All tools installed successfully in conda environment '$envName'." -ForegroundColor Green

# 4. Show versions to verify installation
Write-Host "--- Versions ---" -ForegroundColor Cyan
mafft --version
clustalo --version
muscle -version
foldseek version
usalign -h | Select-Object -First 1   # US‑align binary
hmmer -h | Select-Object -First 1
blastp -version
mmseqs version
if (Get-Command mkdssp -ErrorAction SilentlyContinue) { mkdssp -h }
python -c "import Bio, gemmi, MDAnalysis, tmtools, sys; print('Biopython', Bio.__version__); print('Gemmi', gemmi.__version__); print('MDAnalysis', MDAnalysis.__version__); print('tmtools OK')"
