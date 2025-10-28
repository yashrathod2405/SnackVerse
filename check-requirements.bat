@echo off
echo ========================================
echo  System Requirements Checker
echo ========================================
echo.

echo Checking Python installation...
python --version 2>nul
if %errorlevel% equ 0 (
    echo ✅ Python is installed
    python --version
) else (
    echo ❌ Python is NOT installed
    echo Please download and install Python from: https://python.org/downloads/
    echo Make sure to check "Add Python to PATH" during installation
)

echo.
echo Checking pip installation...
pip --version 2>nul
if %errorlevel% equ 0 (
    echo ✅ pip is installed
    pip --version
) else (
    echo ❌ pip is NOT installed
)

echo.
echo Checking Node.js installation...
node --version 2>nul
if %errorlevel% equ 0 (
    echo ✅ Node.js is installed
    node --version
) else (
    echo ❌ Node.js is NOT installed
    echo Please download and install Node.js from: https://nodejs.org/
)

echo.
echo Checking npm installation...
npm --version 2>nul
if %errorlevel% equ 0 (
    echo ✅ npm is installed
    npm --version
) else (
    echo ❌ npm is NOT installed
)

echo.
echo ========================================
echo  Checking Project Structure
echo ========================================

if exist "backend" (
    echo ✅ Backend folder found
) else (
    echo ❌ Backend folder NOT found
)

if exist "client" (
    echo ✅ Client folder found
) else (
    echo ❌ Client folder NOT found
)

if exist "backend\requirements.txt" (
    echo ✅ Requirements.txt found
) else (
    echo ❌ Requirements.txt NOT found
)

if exist "client\package.json" (
    echo ✅ Package.json found
) else (
    echo ❌ Package.json NOT found
)

echo.
echo ========================================
echo  Summary
echo ========================================
echo If all items show ✅, you can run setup.bat
echo If any items show ❌, please install the missing components
echo.
pause
