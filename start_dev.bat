@echo off
echo.
echo  ============================================
echo   M DINESH KUMAR - Portfolio Dev Environment
echo  ============================================
echo.

cd /d "d:\2nd Semester Btech\Projects\Personal\Protfolio"

echo  [1/2] Installing dependencies...
call npm install >nul 2>&1

echo  [2/2] Starting Vite dev server...
echo.
echo  Your portfolio will open at http://localhost:5173
echo  Press Ctrl+C to stop the server.
echo.

call npm run dev

pause
