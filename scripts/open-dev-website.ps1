# PowerShell script to run the local development server for BioAlign Pro Fold Explorer
# Ensure we run from the project root directory
Set-Location "$PSScriptRoot\.."

Write-Host "=============================================" -ForegroundColor Cyan
Write-Host "  Starting BioAlign Pro Fold Explorer (Dev)  " -ForegroundColor Cyan
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

# 3. Open browser automatically in 3 seconds in the background
Write-Host "Opening browser at http://localhost:3000 ..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoProfile", "-Command", "Start-Sleep -Seconds 3; Start-Process 'http://localhost:3000'" -WindowStyle Hidden

# 4. Start the dev server in the foreground
Write-Host "Starting the development server..." -ForegroundColor Green
Write-Host "Do not close this window while using the website." -ForegroundColor Yellow
Write-Host "---------------------------------------------" -ForegroundColor Gray

npm run dev
