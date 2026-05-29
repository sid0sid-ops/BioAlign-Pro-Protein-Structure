@echo off
title BioAlign Pro Dev Server
cd /d "%~dp0"
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0scripts\open-dev-website.ps1"
pause
