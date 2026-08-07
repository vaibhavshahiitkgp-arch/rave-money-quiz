import { normalizeIndianMobile } from "./validate";

// RAVE Finance Labs' own WhatsApp number — confirmed current by the owner.
export const RAVE_WHATSAPP_NUMBER = "919933883570";
export const RAVE_EMAIL = "ravefinancelabs@gmail.com";

export function buildLeadMessage({ name, score, total, tierName, weakTopics }) {
  const lines = [
    `Hi RAVE Finance Labs, I just took the Money Money Quiz!`,
    `Name: ${name}`,
    `Score: ${score}/${total} (${tierName})`,
  ];
  if (weakTopics?.length) {
    lines.push(`Topics I'd like to understand better: ${weakTopics.join(", ")}`);
  }
  lines.push(`Please send me the detailed solutions.`);
  return lines.join("\n");
}

export function buildWhatsAppLink(message, toNumber = RAVE_WHATSAPP_NUMBER) {
  return `https://wa.me/${toNumber}?text=${encodeURIComponent(message)}`;
}

export function buildShareWhatsAppLink(message) {
  // No fixed recipient — opens WhatsApp's own share/contact picker.
  return `https://wa.me/?text=${encodeURIComponent(message)}`;
}

export function buildShareEmailLink({ subject, body }) {
  return `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export { normalizeIndianMobile };
