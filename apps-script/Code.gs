/**
 * RAVE Money Money Quiz — Google Apps Script Web App backend.
 *
 * SETUP (one-time, no coding needed beyond pasting this file):
 * 1. Create a new Google Sheet (e.g. "Money Quiz Leads"). Add a header row
 *    to the first sheet/tab: Timestamp | Name | WhatsApp | Language | Score
 *    | Total | Tier | Weak Topics | Answers JSON
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
 */

function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  const data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    new Date(),
    data.name || "",
    data.whatsapp || "",
    data.language || "",
    data.score ?? "",
    data.total ?? "",
    data.tier || "",
    (data.weakTopics || []).join(", "),
    JSON.stringify(data.answers || {}),
  ]);

  return ContentService.createTextOutput(
    JSON.stringify({ ok: true })
  ).setMimeType(ContentService.MimeType.JSON);
}
