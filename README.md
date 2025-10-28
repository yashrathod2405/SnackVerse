# SnackVerse - E-commerce Web Application

A full-stack e-commerce application built with Django (Backend) and React (Frontend).

## Features

- 🛍️ Product catalog with detailed product pages
- 🛒 Shopping cart functionality
- 📦 Order management system
- 📧 Contact form with admin panel
- 🎨 Beautiful UI with Tailwind CSS
- 📱 Responsive design
- 🔔 Beautiful alert notifications

## Prerequisites

Before setting up this project on Windows, make sure you have:

### Required Software:
1. **Python 3.8 or higher**
   - Download from: https://python.org/downloads/
   - ⚠️ **IMPORTANT**: During installation, check "Add Python to PATH"

2. **Node.js 14 or higher**
   - Download from: https://nodejs.org/
   - Choose the LTS version

3. **Git** (Optional but recommended)
   - Download from: https://git-scm.com/downloads

## Quick Setup (Windows)

### Method 1: Automated Setup (Recommended)

1. **Copy the project folder** to your new Windows computer

2. **Open Command Prompt as Administrator**
   - Press `Win + R`, type `cmd`, press `Ctrl + Shift + Enter`

3. **Navigate to the project folder**
   ```cmd
   cd "path\to\New project"
   ```

4. **Run the setup script**
   ```cmd
   setup.bat
   ```
   This will automatically:
   - Check if Python and Node.js are installed
   - Set up the backend virtual environment
   - Install all Python dependencies
   - Run database migrations
   - Install all Node.js dependencies

5. **Start the project**
   ```cmd
   start-project.bat
   ```
   This will open two command prompt windows:
   - Backend server (http://127.0.0.1:8000/)
   - Frontend server (http://localhost:3000/)

### Method 2: Manual Setup

If you prefer to set up manually or the automated setup doesn't work:

#### Backend Setup:
```cmd
cd "New project\backend"
python -m venv env
env\Scripts\activate
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
```

#### Frontend Setup:
```cmd
cd "New project\client"
npm install
```

#### Start the servers:
**Terminal 1 (Backend):**
```cmd
cd backend
env\Scripts\activate
python manage.py runserver
```

**Terminal 2 (Frontend):**
```cmd
cd client
npm start
```

## Project Structure

```
New project/
├── backend/                 # Django Backend
│   ├── api/                # API Application
│   │   ├── models.py       # Database Models
│   │   ├── views.py        # API Views
│   │   ├── urls.py         # URL Routing
│   │   └── admin.py        # Admin Configuration
│   ├── snackverse/         # Django Settings
│   ├── media/              # Uploaded Files
│   ├── env/                # Virtual Environment
│   ├── requirements.txt    # Python Dependencies
│   └── manage.py           # Django Management
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/     # React Components
│   │   ├── pages/          # Page Components
│   │   ├── contexts/       # React Contexts
│   │   └── hooks/          # Custom Hooks
│   ├── public/             # Static Files
│   └── package.json        # Node.js Dependencies
├── setup.bat               # Automated Setup Script
├── start-project.bat       # Start Both Servers
├── start-backend.bat       # Start Backend Only
├── start-frontend.bat      # Start Frontend Only
└── README.md               # This File
```

## Accessing the Application

After starting both servers:

### Main Application
- **Homepage**: http://localhost:3000/
- **Products**: http://localhost:3000/products
- **Cart**: http://localhost:3000/cart
- **Contact**: http://localhost:3000/contact

### Admin Panels
- **Contact Admin**: http://localhost:3000/contact-admin
- **Orders Admin**: http://localhost:3000/orders-admin
- **Django Admin**: http://127.0.0.1:8000/admin/

### API Endpoints
- **Products API**: http://127.0.0.1:8000/api/snacks/
- **Orders API**: http://127.0.0.1:8000/api/orders/
- **Contacts API**: http://127.0.0.1:8000/api/contacts/

## Testing the Application

1. **Browse Products**: Visit the homepage and products page
2. **Add to Cart**: Click on products and add them to cart
3. **Checkout**: Go to cart and complete checkout
4. **View Orders**: Visit http://localhost:3000/orders-admin to see orders
5. **Contact Form**: Submit a contact form and view submissions
6. **Django Admin**: Create superuser and access Django admin panel

## Troubleshooting

### Common Issues:

**1. "Python is not recognized"**
- Reinstall Python and check "Add Python to PATH"
- Or manually add Python to system PATH

**2. "Node is not recognized"**
- Reinstall Node.js
- Restart Command Prompt after installation

**3. "Permission denied" errors**
- Run Command Prompt as Administrator
- Or use PowerShell as Administrator

**4. Port already in use**
```cmd
# For backend (change port)
python manage.py runserver 8001

# For frontend (change port)
set PORT=3001 && npm start
```

**5. Database errors**
```cmd
# Reset database
del db.sqlite3
python manage.py migrate
python manage.py createsuperuser
```

**6. Module not found errors**
```cmd
# Reinstall dependencies
cd backend
pip install -r requirements.txt

cd ../client
npm install
```

### Performance Tips:
- Close unnecessary applications
- Use SSD for better performance
- Ensure stable internet connection for initial setup

## Network Access (Optional)

To access from other devices on the same network:

1. **Find your computer's IP address**:
   ```cmd
   ipconfig
   ```
   Look for "IPv4 Address"

2. **Update Django settings** (`backend/snackverse/settings.py`):
   ```python
   ALLOWED_HOSTS = ['*']
   ```

3. **Start servers with network access**:
   ```cmd
   # Backend
   python manage.py runserver 0.0.0.0:8000
   
   # Frontend
   set HOST=0.0.0.0 && npm start
   ```

4. **Access from other devices**:
   - Frontend: http://YOUR-IP:3000/
   - Backend: http://YOUR-IP:8000/

## Development vs Production

This setup is for **development only**. For production deployment:

1. Set `DEBUG = False` in Django settings
2. Configure proper database (PostgreSQL/MySQL)
3. Use production WSGI server (Gunicorn)
4. Build React for production (`npm run build`)
5. Configure reverse proxy (Nginx)
6. Set up HTTPS
7. Configure environment variables

## Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Ensure all prerequisites are installed correctly
3. Try the manual setup method
4. Check console errors in browser developer tools
5. Look at command prompt output for error messages

## Technologies Used

**Backend:**
- Django 5.0.6
- Django REST Framework
- SQLite Database
- Pillow (Image handling)

**Frontend:**
- React 18
- React Router DOM
- Tailwind CSS
- Custom Hooks & Contexts

---

Happy coding! 🚀
