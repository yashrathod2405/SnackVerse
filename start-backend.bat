@echo off
echo Starting Backend Server...
cd backend
call env\Scripts\activate
python manage.py runserver
pause
