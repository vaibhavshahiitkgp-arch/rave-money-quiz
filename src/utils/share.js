export async function shareScore({ title, text, url }) {
  if (navigator.share) {
    try {
      await navigator.share({ title, text, url });
      return "native";
    } catch (err) {
      if (err?.name === "AbortError") return "cancelled";
      // fall through to caller, which shows fallback links
    }
  }
  return "unsupported";
}
