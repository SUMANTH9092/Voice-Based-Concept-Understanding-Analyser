@echo off
echo ==============================================================
echo   Starting Voice Based Concept Understanding Analyser Project
echo ==============================================================
echo.

echo Starting Backend Server (Streamlit on Port 8501)...
start "Streamlit Backend" cmd /k "cd backend && venv\Scripts\activate && streamlit run app.py"

echo Starting Frontend Server (Vite/React on Port 5173)...
start "Vite Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo Both servers started!
echo - Frontend: http://localhost:5173
echo - Backend (Direct): http://localhost:8501
echo ==============================================================
pause
