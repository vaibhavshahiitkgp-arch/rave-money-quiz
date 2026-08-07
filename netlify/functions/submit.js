// Thin proxy: receives a quiz submission from the frontend and forwards it
// to the Google Apps Script Web App, which appends a row to the Google
// Sheet. Keeping this as a server-side proxy (rather than calling Apps
// Script directly from the browser) avoids exposing the Apps Script URL
// to any client that inspects network requests, and gives us a place for
// minimal server-side validation.

export default async (req) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const webAppUrl = process.env.GOOGLE_SHEETS_WEBAPP_URL;
  if (!webAppUrl) {
    console.error("GOOGLE_SHEETS_WEBAPP_URL is not configured");
    return new Response(JSON.stringify({ ok: false, error: "not configured" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  let payload;
  try {
    payload = await req.json();
  } catch {
    return new Response(JSON.stringify({ ok: false, error: "invalid json" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { name, whatsapp, score, total } = payload ?? {};
  if (typeof name !== "string" || !name.trim() || typeof whatsapp !== "string" || !whatsapp.trim()) {
    return new Response(JSON.stringify({ ok: false, error: "missing name or whatsapp" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
  if (typeof score !== "number" || typeof total !== "number") {
    return new Response(JSON.stringify({ ok: false, error: "missing score" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const upstream = await fetch(webAppUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    // Apps Script Web Apps redirect on success; treat any non-5xx as ok.
    const ok = upstream.status < 500;
    return new Response(JSON.stringify({ ok }), {
      status: ok ? 200 : 502,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Failed to forward submission to Apps Script", err);
    return new Response(JSON.stringify({ ok: false, error: "upstream failure" }), {
      status: 502,
      headers: { "Content-Type": "application/json" },
    });
  }
};
