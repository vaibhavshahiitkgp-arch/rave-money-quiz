export const TIERS = [
  { name: "Money Curious", min: 0, max: 5 },
  { name: "Money Aware", min: 6, max: 10 },
  { name: "Money Confident", min: 11, max: 15 },
  { name: "Money Expert", min: 16, max: 19 },
  { name: "Money Master", min: 20, max: 20 },
];

// Exact table applies when there are 20 questions (the real quiz).
// Placeholder/dev question sets of a different length fall back to
// proportional percentage bands using the same cut points.
export function getTier(score, total) {
  if (total === 20) {
    const tier = TIERS.find((t) => score >= t.min && score <= t.max);
    return tier ?? TIERS[0];
  }

  const pct = (score / total) * 100;
  if (pct >= 100) return TIERS[4];
  if (pct >= 76) return TIERS[3];
  if (pct >= 51) return TIERS[2];
  if (pct >= 26) return TIERS[1];
  return TIERS[0];
}
