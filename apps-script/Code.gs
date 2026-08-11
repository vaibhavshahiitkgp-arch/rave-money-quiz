/**
 * RAVE Money Money Quiz — Google Apps Script Web App backend.
 *
 * SETUP (one-time, no coding needed beyond pasting this file):
 * 1. Create a new Google Sheet (e.g. "Money Quiz Leads"). Leave it empty —
 *    the header row is created automatically on the first submission.
 * 2. In the Sheet, go to Extensions > Apps Script.
 * 3. Delete any starter code and paste this entire file in.
 * 4. Click Deploy > New deployment > select type "Web app".
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Click Deploy, authorize the permissions Google asks for.
 * 6. Copy the Web App URL it gives you.
 * 7. In Netlify: Site settings > Environment variables > add
 *    GOOGLE_SHEETS_WEBAPP_URL = <that URL>. Redeploy the site.
 *
 * If you ever need to update this script, edit it here, then
 * Deploy > Manage deployments > edit (pencil icon) > New version > Deploy.
 * The Web App URL stays the same, so no Netlify change is needed.
 *
 * Rows are keyed by the frontend's per-attempt sessionId (last column), and
 * updates MERGE onto the existing row rather than overwriting it — each of
 * the three submissions a single quiz attempt can generate (anonymous
 * score-log, results-unlock, course-interest click) only carries the fields
 * relevant to that moment, so a later, smaller submission (e.g. just a
 * course-interest flag) never blanks out a name or score written earlier.
 * Matching by sessionId rather than row number also means manually deleting
 * or sorting rows in the Sheet never corrupts a later update.
 *
 * QUESTION_META below mirrors src/data/questions.en.js's id/correctIndex/
 * topic fields (identical across all 3 languages by design) — it's what
 * lets this script turn a raw {"1":2,"2":3,...} answers object into
 * human-readable letters and a "Topic (Q1, Q5)" weak-topics breakdown,
 * without the frontend needing to send anything extra. If the question
 * bank's correct answers or topics ever change, update this table to match.
 */

const QUESTION_META = {
  1: { correctIndex: 2, topic: "Bonds & Lending" },
  2: { correctIndex: 3, topic: "Gold & Jewellery" },
  3: { correctIndex: 0, topic: "Stock Market Basics" },
  4: { correctIndex: 0, topic: "Diversification" },
  5: { correctIndex: 3, topic: "Investment Horizon" },
  6: { correctIndex: 1, topic: "Time Value of Money" },
  7: { correctIndex: 1, topic: "Credit Cards" },
  8: { correctIndex: 2, topic: "Dividends & Reinvestment" },
  9: { correctIndex: 3, topic: "Insurance" },
  10: { correctIndex: 1, topic: "Net Worth" },
  11: { correctIndex: 2, topic: "Budgeting" },
  12: { correctIndex: 2, topic: "Mutual Funds (NAV)" },
  13: { correctIndex: 1, topic: "Compounding" },
  14: { correctIndex: 1, topic: "Market Risk" },
  15: { correctIndex: 0, topic: "Compounding" },
  16: { correctIndex: 3, topic: "Digital Payments & Fraud" },
  17: { correctIndex: 2, topic: "Real Estate" },
  18: { correctIndex: 0, topic: "Loans & Guarantors" },
  19: { correctIndex: 3, topic: "Credit Score" },
  20: { correctIndex: 3, topic: "Credit Cards" },
};

const OPTION_LETTERS = ["A", "B", "C", "D"];

const HEADERS = [
  "Timestamp",
  "Name",
  "WhatsApp",
  "Language",
  "Score",
  "Total",
  "Tier",
  "Weak Topics (by Question)",
  "Answers (A-D)",
  "Course Interest",
  "Session ID",
];

const COL = {
  TIMESTAMP: 1,
  NAME: 2,
  WHATSAPP: 3,
  LANGUAGE: 4,
  SCORE: 5,
  TOTAL: 6,
  TIER: 7,
  WEAK_TOPICS: 8,
  ANSWERS_JSON: 9,
  COURSE_INTEREST: 10,
  SESSION_ID: 11,
};

// {"1":2,"2":0,...} -> {"1":"C","2":"A",...}
function answersToLetters(answers) {
  const out = {};
  Object.keys(answers || {}).forEach((qid) => {
    const idx = answers[qid];
    if (typeof idx === "number" && idx >= 0 && idx < OPTION_LETTERS.length) {
      out[qid] = OPTION_LETTERS[idx];
    }
  });
  return out;
}

// {"1":2,"13":3,...} -> "Bonds & Lending (Q1), Compounding (Q13, Q15)"
// A question counts as wrong if unanswered or not equal to its correctIndex.
function weakTopicsDetailedFromAnswers(answers) {
  const byTopic = {};
  const order = [];
  Object.keys(QUESTION_META).forEach((qid) => {
    const meta = QUESTION_META[qid];
    const chosen = (answers || {})[qid];
    if (chosen !== meta.correctIndex) {
      if (!byTopic[meta.topic]) {
        byTopic[meta.topic] = [];
        order.push(meta.topic);
      }
      byTopic[meta.topic].push("Q" + qid);
    }
  });
  return order.map((topic) => `${topic} (${byTopic[topic].join(", ")})`).join(", ");
}

function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  ensureHeaders(sheet);

  const data = JSON.parse(e.postData.contents);
  const existingRow = data.sessionId ? findRowBySessionId(sheet, data.sessionId) : -1;

  if (existingRow > 0) {
    updateRow(sheet, existingRow, data);
  } else {
    appendNewRow(sheet, data);
  }

  return ContentService.createTextOutput(
    JSON.stringify({ ok: true })
  ).setMimeType(ContentService.MimeType.JSON);
}

function appendNewRow(sheet, data) {
  const row = new Array(HEADERS.length).fill("");
  row[COL.TIMESTAMP - 1] = new Date();
  row[COL.NAME - 1] = data.name || "";
  row[COL.WHATSAPP - 1] = data.whatsapp || "";
  row[COL.LANGUAGE - 1] = data.language || "";
  row[COL.SCORE - 1] = data.score ?? "";
  row[COL.TOTAL - 1] = data.total ?? "";
  row[COL.TIER - 1] = data.tier || "";
  row[COL.WEAK_TOPICS - 1] = data.answers ? weakTopicsDetailedFromAnswers(data.answers) : "";
  row[COL.ANSWERS_JSON - 1] = data.answers ? JSON.stringify(answersToLetters(data.answers)) : "";
  row[COL.COURSE_INTEREST - 1] = data.courseInterest || "";
  row[COL.SESSION_ID - 1] = data.sessionId || "";
  sheet.appendRow(row);
}

// Only overwrites a field when this submission actually carries a new value
// for it — a course-interest-only ping, for example, must never blank out
// the name/score a previous submission already wrote for this session.
function updateRow(sheet, rowIndex, data) {
  const range = sheet.getRange(rowIndex, 1, 1, HEADERS.length);
  const current = range.getValues()[0];

  current[COL.TIMESTAMP - 1] = new Date();
  if (data.name) current[COL.NAME - 1] = data.name;
  if (data.whatsapp) current[COL.WHATSAPP - 1] = data.whatsapp;
  if (data.language) current[COL.LANGUAGE - 1] = data.language;
  if (typeof data.score === "number") {
    current[COL.SCORE - 1] = data.score;
    current[COL.TOTAL - 1] = data.total ?? "";
    current[COL.TIER - 1] = data.tier || "";
    current[COL.WEAK_TOPICS - 1] = data.answers ? weakTopicsDetailedFromAnswers(data.answers) : "";
    current[COL.ANSWERS_JSON - 1] = data.answers ? JSON.stringify(answersToLetters(data.answers)) : "";
  }
  if (data.courseInterest) current[COL.COURSE_INTEREST - 1] = data.courseInterest;

  range.setValues([current]);
}

// Handles both a brand-new empty sheet and an existing sheet that predates
// a newly-added column (e.g. "Course Interest") — fills in the header row
// without disturbing already-present header text.
function ensureHeaders(sheet) {
  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
    return;
  }
  const lastHeaderCell = sheet.getRange(1, HEADERS.length).getValue();
  if (!lastHeaderCell) {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
  }
}

function findRowBySessionId(sheet, sessionId) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return -1;
  const values = sheet.getRange(2, COL.SESSION_ID, lastRow - 1, 1).getValues();
  for (let i = 0; i < values.length; i++) {
    if (values[i][0] === sessionId) return i + 2; // +2: 1-indexed, header row offset
  }
  return -1;
}

/**
 * ONE-TIME MIGRATION — run this manually once (Apps Script editor: select
 * "migrateExistingRows" from the function dropdown at the top, click Run)
 * to convert every existing row's "Answers JSON" from raw 0-3 indices to
 * A-D letters, and rebuild "Weak Topics" with per-question numbers. Safe
 * to re-run — rows already in the new format (letter values) are skipped.
 */
function migrateExistingRows() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) {
    Logger.log("No data rows to migrate.");
    return;
  }

  sheet.getRange(1, COL.WEAK_TOPICS).setValue(HEADERS[COL.WEAK_TOPICS - 1]);
  sheet.getRange(1, COL.ANSWERS_JSON).setValue(HEADERS[COL.ANSWERS_JSON - 1]);

  const range = sheet.getRange(2, 1, lastRow - 1, HEADERS.length);
  const values = range.getValues();
  let migrated = 0;
  let skipped = 0;

  for (let i = 0; i < values.length; i++) {
    const cell = values[i][COL.ANSWERS_JSON - 1];
    if (!cell) {
      skipped++;
      continue;
    }
    let answers;
    try {
      answers = JSON.parse(cell);
    } catch (err) {
      skipped++;
      continue;
    }
    const firstValue = Object.values(answers)[0];
    if (typeof firstValue === "string") {
      skipped++; // already migrated (letters, not numbers)
      continue;
    }
    values[i][COL.ANSWERS_JSON - 1] = JSON.stringify(answersToLetters(answers));
    values[i][COL.WEAK_TOPICS - 1] = weakTopicsDetailedFromAnswers(answers);
    migrated++;
  }

  range.setValues(values);
  Logger.log("Migration complete: " + migrated + " rows converted, " + skipped + " skipped (already migrated or blank).");
}
