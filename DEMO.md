# Demo Script & Recording Checklist — Cine-Stream (Level 1)

Record a 2–3 minute demo showing the required features. Follow this script for a clear submission video.

1. Intro (5–10s)
   - Say your name and the project: "This is Cine-Stream — a TMDB media explorer." Mention this demo shows Level 1 features.

2. Show app loads (10–20s)
   - Open the app URL and point out the grid of popular movies. Scroll briefly.

3. Search (20–40s)
   - Type a query (e.g., "Batman"). Wait ~500ms and show the debounced network request and results.
   - (Optional) Open DevTools → Network and show the request to TMDB.

4. Movie card details (20–30s)
   - Point at a card and show poster, title, release year, and rating.

5. Favorites (optional for Level 1) (15–20s)
   - Click the heart on a card, open `/favorites`, and show persistence after a refresh.

6. Wrap-up (10s)
   - Provide GitHub repo link and live URL.

Recording tips
- Use a stable viewport (desktop) and 1080p if possible.
- Keep the recording under 3 minutes.
- Narrate succinctly and show the network console when demonstrating debounced requests.

Checklist to tick before submitting
- [ ] App shows Popular Movies on load
- [ ] Search returns results after typing stops (500ms debounce)
- [ ] Movie cards display poster, title, year, rating
- [ ] Repo URL and Live URL ready to submit
