@echo off
cd /d "%~dp0server"

echo ======================================
echo 🚀 Starting Next.js Server in the Background...
echo ======================================

:: Use wscript to hide CMD and run server
start /B wscript.exe run_hidden.vbs
exit
