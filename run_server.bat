@echo off
echo Starting local web server for NR507 Study Platform...
echo.
echo Navigate to: http://localhost:8000
echo Press Ctrl+C to stop the server
echo.
python -m http.server 8000
pause