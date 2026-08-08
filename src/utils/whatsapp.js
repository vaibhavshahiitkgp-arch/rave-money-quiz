import { normalizeIndianMobile } from "./validate";

// RAVE Finance Labs' own WhatsApp number — confirmed current by the owner.
export const RAVE_WHATSAPP_NUMBER = "919933883570";
export const RAVE_EMAIL = "ravefinancelabs@gmail.com";

// Verbatim from the approved design prototype's confirm-via-WhatsApp link.
export function buildConfirmMessage({ name, score, total, tierName }) {
  return `Hi RAVE Finance Labs, I'm ${name} and I just scored ${score}/${total} (${tierName}) on the Money Money Quiz. Send me the detailed solution!`;
}

// Verbatim from the prototype's "Share My Score" text.
export function buildShareMessage({ score, total, tierName }) {
  return `I scored ${score}/${total} on RAVE Finance Labs' Money Money Quiz — ${tierName}. Think you'd do better?`;
}

export function buildWhatsAppLink(message, toNumber = RAVE_WHATSAPP_NUMBER) {
  return `https://wa.me/${toNumber}?text=${encodeURIComponent(message)}`;
}

export function buildShareWhatsAppLink(message) {
  // No fixed recipient — opens WhatsApp's own share/contact picker.
  return `https://wa.me/?text=${encodeURIComponent(message)}`;
}

export { normalizeIndianMobile };
