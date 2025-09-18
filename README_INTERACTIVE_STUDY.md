# Interactive Study Sections - Troubleshooting Guide

## Problem: Interactive Study Not Working

If the interactive study sections (clicking on topic cards like "Immunity & Inflammation") are not working, this is likely due to **CORS (Cross-Origin Resource Sharing)** restrictions when opening the HTML file directly in your browser.

## Solutions:

### Option 1: Use the Built-in Server (Recommended)
1. Double-click `run_server.bat` in this folder
2. Open your browser and go to: http://localhost:8000
3. The interactive study sections should now work properly

### Option 2: Manual Python Server
1. Open Command Prompt/Terminal in this folder
2. Run: `python -m http.server 8000`
3. Open your browser and go to: http://localhost:8000

### Option 3: Use Node.js Server
1. Install Node.js if you haven't already
2. Run: `npx http-server . -p 8000`
3. Open your browser and go to: http://localhost:8000

## How Interactive Study Works:

1. Click "📚 Class Materials" in the top navigation
2. Make sure you're on the "📖 Midterm Study Guide" tab (active by default)
3. Click on any topic card:
   - 🛡️ Immunity & Inflammation
   - 🩸 Hematological Pathologies
   - ❤️ Cardiovascular Pathologies
   - 🫁 Pulmonary Pathologies
   - 🫀 Urinary System Pathologies
4. This will launch an interactive study session with questions specific to that topic

## Features Available in Interactive Study:
- ✅ Topic-specific questions
- ✅ Immediate rationale/explanations
- ✅ Question navigation bar
- ✅ Progress tracking
- ✅ Back to materials button

## If Problems Persist:
- Check browser console (F12 → Console tab) for error messages
- Ensure all data files are present in the `data/` folder
- Verify you're using a modern browser (Chrome, Firefox, Safari, Edge)