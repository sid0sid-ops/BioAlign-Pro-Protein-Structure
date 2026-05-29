# BioAlign Pro Fold Explorer - Local Run Guide

This guide explains how to run the BioAlign Pro Fold Explorer website locally on Windows.

## Quick Start Options

### Option 1: Local Development Server (Recommended for active editing)
Use this option when you want to view the website in development mode. Any changes to the source code will update automatically in the browser.

*   **How to Run:** Double-click **`OPEN_DEV_WEBSITE.bat`** at the project root.
*   **Local URL:** [http://localhost:3000](http://localhost:3000)
*   **What it does:**
    1. Checks for Node.js and npm.
    2. Runs `npm install` automatically if `node_modules` is missing.
    3. Starts the development server (`npm run dev`).
    4. Automatically opens the browser to [http://localhost:3000](http://localhost:3000) after 3 seconds.

---

### Option 2: Production Static Export Preview (Recommended for testing the final build)
Use this option to test the exact static version of the website that gets exported for GitHub Pages. This runs completely client-side without any backend database or server dependencies.

*   **How to Run:** Double-click **`OPEN_PRODUCTION_PREVIEW.bat`** at the project root.
*   **Local URL:** [http://localhost:4173](http://localhost:4173)
*   **What it does:**
    1. Checks for Node.js and npm.
    2. Runs `npm install` if `node_modules` is missing.
    3. Runs the data pipeline (`npm run data:build`).
    4. Runs typescript validation (`npm run typecheck`).
    5. Runs the production build (`npm run build`) which exports static HTML, CSS, and JS into the `out/` directory.
    6. Starts a local static web server to serve the `out/` directory on port 4173.
    7. Automatically opens the browser to [http://localhost:4173](http://localhost:4173) after 3 seconds.

---

## How to Stop the Server
To stop either server, switch to the command prompt/PowerShell terminal window and press:
`Ctrl + C` (and type `Y` to confirm if prompted) or simply **close the terminal window**.

---

## Troubleshooting & Diagnostics

### 1. "Node.js / npm is missing" Error
If the runner script tells you Node.js is missing, download and install the LTS version of Node.js:
*   [Download Node.js](https://nodejs.org)
*   After installing, **close and reopen** your terminal/file explorer for the PATH variables to update, then double-click the `.bat` files again.

### 2. Port is Busy / Port Conflict
If port `3000` or `4173` is already in use by another application:
*   **For Dev:** You can customize the port by editing `package.json` in the `dev` script from `-p 3000` to another number (e.g., `-p 3001`), or let Next.js automatically prompt to use another port.
*   **For Preview:** You can change the port in `package.json` under `preview:static` from `-l 4173` to another number (e.g., `-l 4174`).

### 3. "out/index.html was not created" Error
This happens if the build failed. Review the terminal output logs for compile errors or missing imports. Once fixed, re-run `OPEN_PRODUCTION_PREVIEW.bat`.

---

## Search Testing Terms
Once the website loads, use the search bar to test the structural database using these terms:
*   **TP53** or **p53** (Tumor suppressor protein)
*   **hemoglobin** or **humoglobin** (Oxygen transport protein)
*   **EGFR** (Epidermal growth factor receptor)
*   **insulin** (Metabolic hormone)
*   **ACE2** (Angiotensin-converting enzyme 2)
*   **GFP** (Green fluorescent protein)
