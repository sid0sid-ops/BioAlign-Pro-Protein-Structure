# PowerShell script to build and preview the static production site for BioAlign-Pro-Protein-Structure
# Ensure we run from the project root directory
Set-Location "$PSScriptRoot\.."

Write-Host "=============================================" -ForegroundColor Cyan
Write-Host "  Building and Previewing BioAlign-Pro-Protein-Structure (Prod) " -ForegroundColor Cyan
Write-Host "=============================================" -ForegroundColor Cyan

# 1. Check for Node.js and npm
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "[ERROR] Node.js is not installed or not added to your system PATH." -ForegroundColor Red
    Write-Host "Please download and install Node.js from https://nodejs.org" -ForegroundColor Yellow
    Read-Host "Press Enter to exit..."
    exit 1
}

if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
    Write-Host "[ERROR] npm is not installed or not added to your system PATH." -ForegroundColor Red
    Read-Host "Press Enter to exit..."
    exit 1
}

# 2. Check for node_modules and install if missing
if (-not (Test-Path "node_modules")) {
    Write-Host "node_modules folder not found. Installing dependencies (npm install)..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "[ERROR] npm install failed. Please check the logs above." -ForegroundColor Red
        Read-Host "Press Enter to exit..."
        exit 1
    }
}

# 3. Run Data Build
Write-Host "Step 1/3: Running data:build..." -ForegroundColor Green
npm run data:build
if ($LASTEXITCODE -ne 0) {
    Write-Host "[WARNING] data:build failed or returned non-zero code. Attempting to continue..." -ForegroundColor Yellow
}

# 4. Run Typecheck
Write-Host "Step 2/3: Running typecheck..." -ForegroundColor Green
npm run typecheck
if ($LASTEXITCODE -ne 0) {
    Write-Host "[WARNING] typecheck failed. Continuing with build anyway..." -ForegroundColor Yellow
}

# 5. Run Build
Write-Host "Step 3/3: Building project and exporting static files (npx next build)..." -ForegroundColor Green
npx next build --webpack
if ($LASTEXITCODE -ne 0) {
    Write-Host "[ERROR] Build failed." -ForegroundColor Red
    Read-Host "Press Enter to exit..."
    exit 1
}

# 6. Verify out/index.html exists
if (-not (Test-Path "out\index.html")) {
    Write-Host "[ERROR] Production static export folder ('out') or 'out/index.html' was not created." -ForegroundColor Red
    Write-Host "Please check the build output for errors above." -ForegroundColor Yellow
    Read-Host "Press Enter to exit..."
    exit 1
}

# 7. Open browser automatically in 3 seconds in the background
Write-Host "Opening browser at http://localhost:4173 ..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoProfile", "-Command", "Start-Sleep -Seconds 3; Start-Process 'http://localhost:4173'" -WindowStyle Hidden

# 8. Start the preview server in the foreground
Write-Host "Serving static site from 'out' directory on port 4173..." -ForegroundColor Green
Write-Host "Do not close this window while previewing the website." -ForegroundColor Yellow
Write-Host "---------------------------------------------" -ForegroundColor Gray

npm run preview:static
