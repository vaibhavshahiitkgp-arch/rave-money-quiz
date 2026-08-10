// Tier names/ribbon colors verbatim from the approved design prototype
// (kept in English across all languages, as a fixed brand element — like a
// badge name). Tier messages are translated per language.
export const TIERS = [
  {
    max: 5,
    name: "Money Curious",
    ribbon: "oklch(70% 0.01 85)",
    shadow: "oklch(58% 0.01 85)",
    messages: {
      en: "You're just getting started — and starting is the hardest part. Everything from here is upside.",
      hi: "आप अभी शुरुआत कर रहे हैं — और शुरुआत करना ही सबसे मुश्किल हिस्सा है। यहाँ से आगे सब कुछ फायदे का ही है।",
      gu: "તમે હમણાં જ શરૂઆત કરી રહ્યા છો — અને શરૂઆત કરવી એ જ સૌથી અઘરો ભાગ છે. અહીંથી આગળ બધું ફાયદાનું જ છે.",
    },
  },
  {
    max: 10,
    name: "Money Aware",
    ribbon: "oklch(58% 0.14 45)",
    shadow: "oklch(48% 0.13 45)",
    messages: {
      en: "You've got a real foundation. A little more, and the rest starts clicking into place.",
      hi: "आपकी बुनियाद अच्छी है। थोड़ा और, और बाकी सब अपने आप समझ में आने लगेगा।",
      gu: "તમારો પાયો સારો છે. થોડું વધારે, અને બાકીનું બધું આપોઆપ સમજાવા લાગશે.",
    },
  },
  {
    max: 15,
    name: "Money Confident",
    ribbon: "oklch(45% 0.1 150)",
    shadow: "oklch(38% 0.09 150)",
    messages: {
      en: "You clearly know your way around money decisions. Most people don't get this far.",
      hi: "आप पैसों से जुड़े फैसलों को अच्छी तरह समझते हैं। ज़्यादातर लोग यहाँ तक नहीं पहुँच पाते।",
      gu: "તમે પૈસા સંબંધિત નિર્ણયો સારી રીતે સમજો છો. મોટાભાગના લોકો અહીં સુધી પહોંચતા નથી.",
    },
  },
  {
    max: 19,
    name: "Money Expert",
    ribbon: "oklch(35% 0.1 150)",
    shadow: "oklch(28% 0.09 150)",
    messages: {
      en: "That's an excellent score — you understand money better than most adults ever will.",
      hi: "यह एक शानदार स्कोर है — आप पैसों को ज़्यादातर बड़ों से बेहतर समझते हैं।",
      gu: "આ એક ઉત્તમ સ્કોર છે — તમે પૈસાને મોટાભાગના પુખ્ત વયના લોકો કરતાં વધારે સારી રીતે સમજો છો.",
    },
  },
  {
    max: 20,
    name: "Money Master",
    ribbon: "oklch(72% 0.15 85)",
    shadow: "oklch(60% 0.13 85)",
    messages: {
      en: "A perfect score. You understand money better than most professionals we meet.",
      hi: "पूरे अंक। आप पैसों को हमसे मिलने वाले ज़्यादातर पेशेवरों से भी बेहतर समझते हैं।",
      gu: "સંપૂર્ણ સ્કોર. તમે પૈસાને અમને મળતા મોટાભાગના વ્યાવસાયિકો કરતાં પણ વધારે સારી રીતે સમજો છો.",
    },
  },
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

export function getTierMessage(tier, language) {
  return tier.messages[language] || tier.messages.en;
}

export function mascotMouth(tierName) {
  return tierName === "Money Curious" ? "neutral" : "smile";
}

export function isMasterTier(tierName) {
  return tierName === "Money Master";
}
