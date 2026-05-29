@echo off
title BioAlign Pro Production Preview
cd /d "%~dp0"
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0scripts\open-production-preview.ps1"
pause
