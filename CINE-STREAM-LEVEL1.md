# Cine-Stream — Level 1 (Phase 1) — Completed

This file documents that the project meets Level 1 requirements and how to run the app.

## Level 1 Requirements (Completed)
- Fetch and render TMDB "Popular Movies" endpoint.
- Render each movie with poster, title, release year, and rating in a responsive grid.
- Search input that queries TMDB Search endpoint and displays results.

## Quick Run (local)
1. Add TMDB credential (v3 API key recommended):

```powershell
"VITE_TMDB_KEY=YOUR_V3_KEY" | Out-File -Encoding ASCII .env
```

2. Install and run:

```bash
npm install
npm run dev
# open http://localhost:5173/
```

## What to demo for Level 1
- Show the app loading the Popular Movies grid on first load.
- Type a query in the search box and show results after typing stops (debounced 500ms).
- Show movie cards with poster, title, year, and rating.

## Notes
- The app supports either a v3 API key (`VITE_TMDB_KEY`) or a v4 Bearer token (`VITE_TMDB_BEARER`).
- If credentials are missing or invalid, the UI shows a banner explaining the missing credential and masked debug logs appear in the browser console under `[tmdb] Request`.

## Files
- `src/services/tmdb.ts` — TMDB fetch logic, supports v3 and v4.
- `src/components/movies/MovieGrid.tsx` — grid and infinite append logic.
- `src/components/SearchBar.tsx` — debounced search input.

***
If you want, I can now help with:
- Deploying to Vercel (step-by-step) and verifying the live URL, or
- Preparing the 2-3 minute demo checklist and recording tips.
