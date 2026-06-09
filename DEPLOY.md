# Deployment Guide — Cine-Stream

This guide shows how to deploy Cine-Stream to Vercel (recommended) and Netlify. It also explains setting environment variables for TMDB.

## Vercel (recommended)

1. Push your repository to GitHub (already done).
2. Open https://vercel.com and import your GitHub repo.
3. In the Vercel Project settings → Environment Variables, add:
   - `VITE_TMDB_KEY` = your TMDB v3 API key (or)
   - `VITE_TMDB_BEARER` = your TMDB v4 Bearer token
   Set the variable for Preview and Production.
4. Deploy. Vercel will run `npm run build` and publish the site.

Notes:
- Do NOT commit `.env` to the repo. `.gitignore` already contains `.env`.
- If using `VITE_TMDB_BEARER`, ensure the value is the full Bearer token.

## Netlify

1. Build locally to verify: `npm run build`.
2. Create a Netlify site and connect your GitHub repo.
3. In Netlify site settings → Build & deploy → Environment, add the same env vars as above.
4. Trigger deploy. Netlify will run `npm run build`.

## Verifying envs & troubleshooting
- If the app shows the yellow banner, credentials are missing or invalid.
- Open DevTools → Console and look for `[tmdb] Request` logs; they show masked URL and `auth=` value.
- For a failing request, copy the response body (Network tab) and check `status_message` for details.
