// Display labels for question `topic` keys — used to personalize the course
// pitch with the specific areas someone actually got wrong. Not shown
// anywhere else in the UI (the quiz/solution screens never surface raw
// topic keys), so this is a small, standalone translation table rather
// than part of strings.js.

const TOPIC_LABELS = {
  "Bonds & Lending": { en: "Bonds & Lending", hi: "बॉन्ड और उधार", gu: "બૉન્ડ અને ધિરાણ" },
  "Gold & Jewellery": { en: "Gold & Jewellery", hi: "सोना और गहने", gu: "સોનું અને દાગીના" },
  "Stock Market Basics": { en: "Stock Market Basics", hi: "शेयर बाज़ार की बुनियाद", gu: "શેરબજારનો પાયો" },
  "Diversification": { en: "Diversification", hi: "विविधीकरण", gu: "વૈવિધ્યીકરણ" },
  "Investment Horizon": { en: "Investment Horizon", hi: "निवेश की समयसीमा", gu: "રોકાણનો સમયગાળો" },
  "Time Value of Money": { en: "Time Value of Money", hi: "पैसे की समय-कीमत", gu: "પૈસાની સમય-કિંમત" },
  "Credit Cards": { en: "Credit Cards", hi: "क्रेडिट कार्ड", gu: "ક્રેડિટ કાર્ડ" },
  "Dividends & Reinvestment": { en: "Dividends & Reinvestment", hi: "डिविडेंड और पुनर्निवेश", gu: "ડિવિડન્ડ અને પુનઃરોકાણ" },
  "Insurance": { en: "Insurance", hi: "बीमा", gu: "વીમો" },
  "Net Worth": { en: "Net Worth", hi: "नेट वर्थ", gu: "નેટ વર્થ" },
  "Budgeting": { en: "Budgeting", hi: "बजट बनाना", gu: "બજેટ બનાવવું" },
  "Mutual Funds (NAV)": { en: "Mutual Funds (NAV)", hi: "म्यूचुअल फंड (NAV)", gu: "મ્યુચ્યુઅલ ફંડ (NAV)" },
  "Compounding": { en: "Compounding", hi: "चक्रवृद्धि", gu: "ચક્રવૃદ્ધિ" },
  "Market Risk": { en: "Market Risk", hi: "बाज़ार जोखिम", gu: "બજાર જોખમ" },
  "Digital Payments & Fraud": { en: "Digital Payments & Fraud", hi: "डिजिटल पेमेंट और धोखाधड़ी", gu: "ડિજિટલ પેમેન્ટ અને છેતરપિંડી" },
  "Real Estate": { en: "Real Estate", hi: "रियल एस्टेट", gu: "રિયલ એસ્ટેટ" },
  "Loans & Guarantors": { en: "Loans & Guarantors", hi: "लोन और गारंटर", gu: "લોન અને ગેરેન્ટર" },
  "Credit Score": { en: "Credit Score", hi: "क्रेडिट स्कोर", gu: "ક્રેડિટ સ્કોર" },
};

const AND_WORD = { en: "and", hi: "और", gu: "અને" };

export function translateTopic(topicKey, language) {
  const entry = TOPIC_LABELS[topicKey];
  if (!entry) return topicKey;
  return entry[language] || entry.en;
}

// ["A","B","C"] -> "A, B and C" (or localized equivalent)
export function joinTopicsWithAnd(topicKeys, language) {
  const items = topicKeys.map((k) => translateTopic(k, language));
  const and = AND_WORD[language] || AND_WORD.en;
  if (items.length === 0) return "";
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} ${and} ${items[1]}`;
  return `${items.slice(0, -1).join(", ")} ${and} ${items[items.length - 1]}`;
}
