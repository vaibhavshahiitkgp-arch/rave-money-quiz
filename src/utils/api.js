// Writes the lead record to the backend regardless of whether the user
// actually taps Send on the WhatsApp deep link — that's the passively
// captured lead. Failure here must never block the UI (the detailed
// solution screen still shows even if this call fails).
export async function submitLead(payload) {
  try {
    const res = await fetch("/.netlify/functions/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      // survives the page navigating away right after the call (e.g. tapping
      // a WhatsApp/mailto link immediately after this fires)
      keepalive: true,
    });
    return res.ok;
  } catch {
    return false;
  }
}
