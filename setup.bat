@echo off
echo ========================================
echo  SnackVerse Project Setup for Windows
echo ========================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Python is not installed or not in PATH
    echo Please install Python from https://python.org/downloads/
    echo Make sure to check "Add Python to PATH" during installation
    pause
    exit /b 1
)

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo Python and Node.js are installed. Continuing setup...
echo.

REM Setup Backend
echo ========================================
echo  Setting up Backend (Django)
echo ========================================
cd backend

REM Create virtual environment
echo Creating virtual environment...
python -m venv env
if %errorlevel% neq 0 (
    echo ERROR: Failed to create virtual environment
    pause
    exit /b 1
)

REM Activate virtual environment
echo Activating virtual environment...
call env\Scripts\activate

REM Install dependencies
echo Installing Python dependencies...
pip install -r requirements.txt
if %errorlevel% neq 0 (
    echo ERROR: Failed to install Python dependencies
    pause
    exit /b 1
)

REM Run migrations
echo Running database migrations...
python manage.py makemigrations
python manage.py migrate
if %errorlevel% neq 0 (
    echo ERROR: Failed to run migrations
    pause
    exit /b 1
)

echo.
echo Backend setup complete!
echo.

REM Setup Frontend
echo ========================================
echo  Setting up Frontend (React)
echo ========================================
cd ../client

REM Install Node.js dependencies
echo Installing Node.js dependencies...
npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install Node.js dependencies
    pause
    exit /b 1
)

echo.
echo Frontend setup complete!
echo.

echo ========================================
echo  Setup Complete!
echo ========================================
echo.
echo To start the project:
echo 1. Run 'start-backend.bat' in one command prompt
echo 2. Run 'start-frontend.bat' in another command prompt
echo.
echo Or simply run 'start-project.bat' to start both servers
echo.
pause
