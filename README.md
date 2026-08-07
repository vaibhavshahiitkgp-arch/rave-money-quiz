# RAVE Finance Labs — Money Money Quiz

Mobile-first financial literacy quiz. Static React app on Netlify, with a
Netlify Function proxying submissions to a Google Apps Script Web App that
appends leads to a Google Sheet.

## Status

- English question bank: **placeholder content** (`src/data/questions.en.js`)
  — pending the real 20-question bank from the owner.
- Hindi / Gujarati: **not built yet**. Disabled on the language selector
  (`src/data/languages.js`) until real translated content lands in
  `questions.hi.js` / `questions.gu.js`, matching the same shape as the
  English file.
- Backend: Netlify Function scaffolded (`netlify/functions/submit.js`) plus
  a Google Apps Script template (`apps-script/Code.gs`) — needs a real
  Google Sheet + deployed Web App URL to go live (see that file's header
  comment for the one-time setup steps).

## Local development

```bash
npm install
npm run dev
```

## Deploying to Netlify

1. Push this repo to GitHub (or connect the local folder directly via Netlify CLI).
2. In Netlify: New site from Git, pick this repo. Build command `npm run build`, publish directory `dist` (already set in `netlify.toml`).
3. Set the `GOOGLE_SHEETS_WEBAPP_URL` environment variable in Site settings once the Apps Script Web App (see `apps-script/Code.gs`) is deployed.

## Replacing placeholder content

Swap the arrays in `src/data/questions.en.js` (and later `.hi.js` / `.gu.js`)
with the real question banks — same shape, same fixed order (do not
shuffle). Once a language's file has real content, flip its `available`
flag to `true` in `src/data/languages.js`.
