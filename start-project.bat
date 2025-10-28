@echo off
echo ========================================
echo  Starting SnackVerse Project
echo ========================================
echo.
echo Starting Backend Server...
start "Backend Server" cmd /c "cd backend && call env\Scripts\activate && python manage.py runserver && pause"

echo Waiting 5 seconds before starting frontend...
timeout /t 5 /nobreak >nul

echo Starting Frontend Server...
start "Frontend Server" cmd /c "cd client && npm start && pause"

echo.
echo Both servers are starting...
echo Backend: http://127.0.0.1:8000/
echo Frontend: http://localhost:3000/
echo.
echo Press any key to close this window...
pause >nul
