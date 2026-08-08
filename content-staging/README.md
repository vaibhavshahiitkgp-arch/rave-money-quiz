Not wired into the app yet. Held here so nothing gets lost.

- `explanations_hi.js` / `explanations_gu.js` — Hindi and Gujarati explanations
  for all 20 questions, already translated (supplied 2026-08-08). Written to
  line up 1:1 with the English question order in `src/data/questions.en.js`.
- `RAVE_Money_Quiz_Answer_Key_Private.pdf` — the private answer key with
  correct answers marked and English explanations (source for the English
  content now live in `src/data/questions.en.js`).

Still missing before Hindi/Gujarati can go live: the actual translated
question text + 4 options per question in each language (only the
explanations exist so far). Once that arrives, build `questions.hi.js` /
`questions.gu.js` matching the shape of `questions.en.js`, drop these
explanation strings in as the `explanation` field (same order = same
question), and flip `available: true` for that language in
`src/data/languages.js`.
