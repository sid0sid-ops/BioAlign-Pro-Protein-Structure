@echo off
setlocal
cd /d "%~dp0docs"
start "" http://localhost:4173
echo Serving BioAlign Pro static docs site at http://localhost:4173
python -m http.server 4173
pause
