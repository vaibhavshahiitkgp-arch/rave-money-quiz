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
 * Rows are keyed by the frontend's per-attempt sessionId (last column). A
 * quiz completion first writes an anonymous row (blank Name/WhatsApp) the
 * moment someone sees their score; if they later unlock the detailed
 * solution, that submission carries the same sessionId and updates the
 * existing row in place (filling in Name/WhatsApp) instead of appending a
 * second row. Matching by sessionId rather than row number means manually
 * deleting or sorting rows in the Sheet never corrupts a later update.
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
  "Session ID",
];

function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  ensureHeaders(sheet);

  const data = JSON.parse(e.postData.contents);
  const row = [
    new Date(),
    data.name || "",
    data.whatsapp || "",
    data.language || "",
    data.score ?? "",
    data.total ?? "",
    data.tier || "",
    (data.weakTopics || []).join(", "),
    JSON.stringify(data.answers || {}),
    data.sessionId || "",
  ];

  const existingRow = data.sessionId ? findRowBySessionId(sheet, data.sessionId) : -1;
  if (existingRow > 0) {
    sheet.getRange(existingRow, 1, 1, row.length).setValues([row]);
  } else {
    sheet.appendRow(row);
  }

  return ContentService.createTextOutput(
    JSON.stringify({ ok: true })
  ).setMimeType(ContentService.MimeType.JSON);
}

// Handles both a brand-new empty sheet and an existing sheet that predates
// a newly-added column (e.g. "Session ID") — fills in the header row
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
  const sessionCol = HEADERS.length; // "Session ID" is the last column
  const values = sheet.getRange(2, sessionCol, lastRow - 1, 1).getValues();
  for (let i = 0; i < values.length; i++) {
    if (values[i][0] === sessionId) return i + 2; // +2: 1-indexed, header row offset
  }
  return -1;
}
