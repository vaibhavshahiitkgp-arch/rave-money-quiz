// One-off local test for netlify/functions/submit.js — exercises the exact
// code path the deployed app will use (not just the Apps Script directly).
// Run: GOOGLE_SHEETS_WEBAPP_URL=<url> node scripts/test-submit-function.mjs

import handler from "../netlify/functions/submit.js";

const payload = {
  name: "Netlify Function Test (delete this row)",
  whatsapp: "918888888888",
  language: "en",
  score: 9,
  total: 20,
  tier: "Money Aware",
  weakTopics: ["Real Estate", "Guarantors"],
  answers: { 1: 2, 3: 0 },
  submittedAt: new Date().toISOString(),
};

const req = new Request("http://localhost/.netlify/functions/submit", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(payload),
});

const res = await handler(req);
const body = await res.json();
console.log("status:", res.status);
console.log("body:", body);
