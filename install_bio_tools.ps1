# PowerShell script to install TM-align (via tmtools), US-align, and Foldseek on Windows

# Define installation directory within the project workspace
$workspaceRoot = "C:\Users\Siddharth Tripathi\OneDrive\Desktop\Protein Structure"
$toolsRoot = "$workspaceRoot\bio_tools"

# Create tool subdirectories
New-Item -ItemType Directory -Path "$toolsRoot\tmalign" -Force | Out-Null
New-Item -ItemType Directory -Path "$toolsRoot\usalign" -Force | Out-Null
New-Item -ItemType Directory -Path "$toolsRoot\foldseek" -Force | Out-Null

# --------------------------------------------------
# 1. Install TM-align via Python package tmtools
# --------------------------------------------------
# Ensure pip is up‑to‑date and install tmtools
python -m pip install --upgrade pip
python -m pip install tmtools

# --------------------------------------------------
# 2. Install US‑align (Windows binary)
# --------------------------------------------------
$usAlignUrl = "https://github.com/biomsh/US-align/releases/latest/download/USalign_windows.zip"
$usZip = "$toolsRoot\usalign\USalign_windows.zip"
Invoke-WebRequest -Uri $usAlignUrl -OutFile $usZip -UseBasicParsing
Expand-Archive -Path $usZip -DestinationPath "$toolsRoot\usalign" -Force
Remove-Item $usZip

# --------------------------------------------------
# 3. Install Foldseek (Windows binary)
# --------------------------------------------------
$foldseekUrl = "https://github.com/steineggerlab/foldseek/releases/latest/download/foldseek-windows.zip"
$foldseekZip = "$toolsRoot\foldseek\foldseek-windows.zip"
Invoke-WebRequest -Uri $foldseekUrl -OutFile $foldseekZip -UseBasicParsing
Expand-Archive -Path $foldseekZip -DestinationPath "$toolsRoot\foldseek" -Force
Remove-Item $foldseekZip

# --------------------------------------------------
# 4. Add tool directories to user PATH (persistent)
# --------------------------------------------------
$newPath = [Environment]::GetEnvironmentVariable('Path','User') + ";$toolsRoot\tmalign;$toolsRoot\usalign;$toolsRoot\foldseek"
[Environment]::SetEnvironmentVariable('Path', $newPath, 'User')

Write-Host "Installation complete. Please restart your terminal or log off/on to apply PATH changes." -ForegroundColor Green

# --------------------------------------------------
# 5. Install MAFFT (Windows binary)
# --------------------------------------------------
$mafftUrl = "https://mafft.cbrc.jp/alignment/software/mafft-7.526-win64-signed.zip"
$mafftZip = "$toolsRoot\mafft\mafft.zip"
New-Item -ItemType Directory -Path "$toolsRoot\mafft" -Force | Out-Null
Invoke-WebRequest -Uri $mafftUrl -OutFile $mafftZip -UseBasicParsing
Expand-Archive -Path $mafftZip -DestinationPath "$toolsRoot\mafft" -Force
Remove-Item $mafftZip

# --------------------------------------------------
# 6. Install Clustal Omega (Windows binary)
# --------------------------------------------------
$clustaloUrl = "https://github.com/ebi-cluster/Clustal-Omega/releases/download/1.2.4/clustalo-1.2.4-win64.zip"
$clustaloZip = "$toolsRoot\clustalo\clustalo.zip"
New-Item -ItemType Directory -Path "$toolsRoot\clustalo" -Force | Out-Null
Invoke-WebRequest -Uri $clustaloUrl -OutFile $clustaloZip -UseBasicParsing
Expand-Archive -Path $clustaloZip -DestinationPath "$toolsRoot\clustalo" -Force
Remove-Item $clustaloZip

# --------------------------------------------------
# 7. Install MUSCLE (Windows binary)
# --------------------------------------------------
$muscleUrl = "https://github.com/rcedgar/muscle/releases/latest/download/muscle3.8.1551_win64.zip"
$muscleZip = "$toolsRoot\muscle\muscle.zip"
New-Item -ItemType Directory -Path "$toolsRoot\muscle" -Force | Out-Null
Invoke-WebRequest -Uri $muscleUrl -OutFile $muscleZip -UseBasicParsing
Expand-Archive -Path $muscleZip -DestinationPath "$toolsRoot\muscle" -Force
Remove-Item $muscleZip

# --------------------------------------------------
# 8. Add new tool directories to user PATH (persistent)
# --------------------------------------------------
$newPath = [Environment]::GetEnvironmentVariable('Path','User') + ";$toolsRoot\tmalign;$toolsRoot\usalign;$toolsRoot\foldseek;$toolsRoot\mafft;$toolsRoot\clustalo;$toolsRoot\muscle"
[Environment]::SetEnvironmentVariable('Path', $newPath, 'User')
