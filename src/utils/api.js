// Writes the lead record to the backend regardless of whether the user
// actually taps Send on the WhatsApp deep link — that's the passively
// captured lead. Failure here must never block the UI (the detailed
// solution screen still shows even if this call fails).
//
// One retry on failure (network blip, transient 5xx) — this is the only
// record for someone who never gets further than seeing their score, so
// it's worth a second attempt before giving up silently.
export async function submitLead(payload, attempt = 1) {
  try {
    const res = await fetch("/.netlify/functions/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      // survives the page navigating away right after the call (e.g. tapping
      // a WhatsApp/mailto link immediately after this fires)
      keepalive: true,
    });
    if (!res.ok && attempt < 2) {
      await new Promise((r) => setTimeout(r, 800));
      return submitLead(payload, attempt + 1);
    }
    return res.ok;
  } catch {
    if (attempt < 2) {
      await new Promise((r) => setTimeout(r, 800));
      return submitLead(payload, attempt + 1);
    }
    return false;
  }
}
