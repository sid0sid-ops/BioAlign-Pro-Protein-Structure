@echo off
setlocal
cd /d "%~dp0"

echo Building static data...
call npm run data:build --if-present
if errorlevel 1 goto failed

echo Building static export...
call npm run build
if errorlevel 1 goto failed

start "" http://localhost:4173
echo Serving static export at http://localhost:4173
call npx -y serve@latest out -l 4173
goto end

:failed
echo Static preview failed. See the messages above for details.

:end
pause
