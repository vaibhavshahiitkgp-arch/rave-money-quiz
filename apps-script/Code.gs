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
 */

const HEADERS = [
  "Timestamp",
  "Name",
  "WhatsApp",
  "Language",
  "Score",
  "Total",
  "Tier",
  "Weak Topics",
  "Answers JSON",
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
  row[COL.WEAK_TOPICS - 1] = (data.weakTopics || []).join(", ");
  row[COL.ANSWERS_JSON - 1] = data.answers ? JSON.stringify(data.answers) : "";
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
    current[COL.WEAK_TOPICS - 1] = (data.weakTopics || []).join(", ");
    current[COL.ANSWERS_JSON - 1] = data.answers ? JSON.stringify(data.answers) : "";
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
