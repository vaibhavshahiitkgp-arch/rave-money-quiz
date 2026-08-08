# RAVE Finance Labs — Money Money Quiz

Mobile-first financial literacy quiz. Static React app on Netlify, with a
Netlify Function proxying submissions to a Google Apps Script Web App that
appends leads to a Google Sheet.

## Status

- English, Hindi, and Gujarati question banks: **real, final content**, all
  three live on the language selector (`src/data/languages.js`).
- Visual design: rebuilt to match the approved Claude Design prototype
  (mascot, animations, ring-meter score reveal, 3D-bevel buttons, etc.).
- Course CTA curriculum copy: still **placeholder** — swap for the real
  12-week outline in `src/pages/CourseCTA.jsx` when supplied.
- Backend: Netlify Function (`netlify/functions/submit.js`) + Google Apps
  Script (`apps-script/Code.gs`), verified end-to-end against a live Google
  Sheet. Needs `GOOGLE_SHEETS_WEBAPP_URL` set in Netlify's environment
  variables before deploying.

## Local development

```bash
npm install
npm run dev
```

## Deploying to Netlify

1. Push this repo to GitHub (or connect the local folder directly via Netlify CLI).
2. In Netlify: New site from Git, pick this repo. Build command `npm run build`, publish directory `dist` (already set in `netlify.toml`).
3. Set the `GOOGLE_SHEETS_WEBAPP_URL` environment variable in Site settings (see `apps-script/Code.gs`'s header comment for the one-time Apps Script setup).
