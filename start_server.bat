@echo off
chcp 65001 >nul
cd /d "%~dp0"

echo ======================================
echo 🚀 Starting Next.js Server...
echo ======================================

:: Ensure Node.js is available
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ ERROR: Node.js is not installed or not found in PATH!
    echo Please ensure Node.js is installed before running this script.
    pause
    exit /b
)

:: Run server and log output
echo Server is starting... Logs will be saved to server.log

echo 🟢 Server is Online. Open http://localhost:3000 in your browser.
echo 📜 Logs are being saved to server.log
node server.js >> server.log 2>&1
pause
