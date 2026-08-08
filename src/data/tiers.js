// Verbatim from the approved design prototype (Claude Design handoff).
export const TIERS = [
  { max: 5, name: "Money Curious", ribbon: "oklch(70% 0.01 85)", shadow: "oklch(58% 0.01 85)", message: "You're just getting started — and starting is the hardest part. Everything from here is upside." },
  { max: 10, name: "Money Aware", ribbon: "oklch(58% 0.14 45)", shadow: "oklch(48% 0.13 45)", message: "You've got a real foundation. A little more, and the rest starts clicking into place." },
  { max: 15, name: "Money Confident", ribbon: "oklch(45% 0.1 150)", shadow: "oklch(38% 0.09 150)", message: "You clearly know your way around money decisions. Most people don't get this far." },
  { max: 19, name: "Money Expert", ribbon: "oklch(35% 0.1 150)", shadow: "oklch(28% 0.09 150)", message: "That's an excellent score — you understand money better than most adults ever will." },
  { max: 20, name: "Money Master", ribbon: "oklch(72% 0.15 85)", shadow: "oklch(60% 0.13 85)", message: "A perfect score. You understand money better than most professionals we meet." },
];

export function getTier(score, total) {
  if (total === 20) {
    return TIERS.find((t) => score <= t.max) ?? TIERS[TIERS.length - 1];
  }
  // Proportional fallback for non-standard question counts (dev/placeholder sets).
  const pct = (score / total) * 100;
  const scaled = TIERS.map((t) => ({ ...t, max: Math.round((t.max / 20) * 100) }));
  return scaled.find((t) => pct <= t.max) ?? scaled[scaled.length - 1];
}

export function mascotMouth(tierName) {
  return tierName === "Money Curious" ? "neutral" : "smile";
}

export function isMasterTier(tierName) {
  return tierName === "Money Master";
}
