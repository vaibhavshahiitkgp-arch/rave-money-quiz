// UI chrome copy in all three languages — everything that isn't quiz
// question content (that lives in questions.en/hi/gu.js). Brand names and
// proper nouns (RAVE Finance Labs, Apna Sapna Money Money, Investing as a
// Life Skill) are kept in English/as written across all languages, matching
// how bilingual Indian branding usually treats a fixed brand/show/product
// name. Everything else is translated.
//
// These hi/gu strings are Claude's own translation, not reviewed by a
// native speaker the way the question content was — worth a skim before
// a big public push, though the register matches the quiz content's tone.

export const STRINGS = {
  en: {
    brand: {
      name: "RAVE FINANCE LABS",
      tagline: "from the makers of Apna Sapna Money Money",
    },
    landing: {
      titlePrefix: "The ",
      titleHighlight: "“Money Money”",
      titleSuffix: " Quiz",
      subtitle: "Not a test. No score shared. Just a mirror on what you already know about money.",
      chooseLanguage: "Choose your language",
      comingSoon: " (soon)",
      start: "START",
      questionsCount: (n) => `${n} questions • ~7 min`,
    },
    instructions: {
      title: "Before we start",
      rules: [
        "Plain multiple-choice. No calculator needed.",
        "Don't Google it, don't ask an AI — this is meant to reflect what you already know, not what you can look up.",
        "Nobody is grading this, and no score is shared with anyone else. It's just for you.",
        "You can move back and forth between questions and change your answers, right up until you submit.",
      ],
      begin: "Begin Quiz",
    },
    quiz: {
      questionOf: (i, total) => `Question ${i} of ${total}`,
      prev: "‹ Prev",
      next: "Next",
      reviewSubmit: "Review & Submit",
    },
    review: {
      title: "Just a couple left",
      body: "You can leave these blank if you'd like — but here's what's still unanswered, in case you want to go back.",
      submitAnyway: "Submit Anyway",
      qLabel: (n) => `Q${n}`,
    },
    postSubmit: {
      title: "Nice work — you finished!",
      subtitle: "Let's see how you did.",
      seeScore: "See My Score",
    },
    score: {
      yourResult: "Your Result",
      continue: "Continue",
    },
    solutionGate: {
      title: "Get your results",
      body: "We'll use this only to send you the solution and occasional updates from RAVE Finance Labs.",
      nameLabel: "Your name",
      namePlaceholder: "e.g. Priya Shah",
      whatsappLabel: "WhatsApp number",
      whatsappPlaceholder: "10-digit mobile number",
      submit: "Get My Results",
      errorName: "Please enter your name.",
      errorPhone: "Please enter a valid 10-digit mobile number.",
      back: "‹ Back",
    },
    whatsappConfirm: {
      title: "One tap to confirm",
      body: "Tap below to send yourself a quick WhatsApp message — that's how we confirm it's really you.",
      confirmBtn: "Confirm via WhatsApp",
      continueBtn: "Continue to My Results",
    },
    solution: {
      title: "Your Detailed Solution",
      subtitle: "Tap a question to see the explanation.",
      question: (n) => `Question ${n}`,
      yourAnswer: "Your answer:",
      correctAnswer: "Correct answer:",
      notAnswered: "Not answered",
      nextTitle: "Want to do more?",
      shareBtn: "Share your score",
      courseBtn: "Explore the course",
      back: "‹ Back",
    },
    share: {
      challenge: "Think you'd do better? Take the quiz.",
      shareBtn: "Share My Score",
      copied: "Copied!",
      shareWhatsapp: "Share via WhatsApp",
      back: "‹ Back",
    },
    course: {
      title: "Want to learn more about investing and finance?",
      subtitle: "Learn from an expert.",
      courseDesc: "A 12-week course by RAVE Finance Labs.",
      bullets: [
        "Weeks 1–3: Money mindset & budgeting foundations",
        "Weeks 4–6: Saving, insurance & protecting what you build",
        "Weeks 7–9: Stocks, mutual funds & how markets actually work",
        "Weeks 10–12: Building your own long-term investing plan",
      ],
      knowMore: "Know More",
      back: "‹ Back",
    },
  },

  hi: {
    brand: {
      name: "RAVE FINANCE LABS",
      tagline: "अपना सपना मनी मनी बनाने वालों की तरफ से",
    },
    landing: {
      titlePrefix: "",
      titleHighlight: "मनी मनी",
      titleSuffix: " क्विज़",
      subtitle: "यह कोई परीक्षा नहीं है। कोई स्कोर किसी के साथ साझा नहीं होता। यह बस एक आईना है, जो दिखाता है कि आप पैसों के बारे में पहले से कितना जानते हैं।",
      chooseLanguage: "अपनी भाषा चुनें",
      comingSoon: " (जल्द ही)",
      start: "शुरू करें",
      questionsCount: (n) => `${n} सवाल • ~7 मिनट`,
    },
    instructions: {
      title: "शुरू करने से पहले",
      rules: [
        "सीधे बहुविकल्पीय सवाल हैं। कैलकुलेटर की ज़रूरत नहीं।",
        "इसे गूगल मत कीजिए, किसी AI से मत पूछिए — यह दिखाने के लिए है कि आप पहले से क्या जानते हैं, न कि आप क्या खोज सकते हैं।",
        "कोई इसे जाँच नहीं रहा, और आपका स्कोर किसी और के साथ साझा नहीं होगा। यह सिर्फ आपके लिए है।",
        "आप सवालों के बीच आगे-पीछे जा सकते हैं और सबमिट करने तक अपने जवाब बदल सकते हैं।",
      ],
      begin: "क्विज़ शुरू करें",
    },
    quiz: {
      questionOf: (i, total) => `सवाल ${i} / ${total}`,
      prev: "‹ पिछला",
      next: "अगला",
      reviewSubmit: "समीक्षा करें और सबमिट करें",
    },
    review: {
      title: "बस कुछ सवाल बाकी हैं",
      body: "अगर चाहें तो इन्हें खाली छोड़ सकते हैं — लेकिन अगर आप वापस जाना चाहें, तो यहाँ बताया गया है कि क्या अभी भी अनुत्तरित है।",
      submitAnyway: "फिर भी सबमिट करें",
      qLabel: (n) => `Q${n}`,
    },
    postSubmit: {
      title: "बहुत बढ़िया — आपने पूरा कर लिया!",
      subtitle: "चलिए देखते हैं आपने कैसा किया।",
      seeScore: "मेरा स्कोर देखें",
    },
    score: {
      yourResult: "आपका परिणाम",
      continue: "आगे बढ़ें",
    },
    solutionGate: {
      title: "अपना परिणाम पाएं",
      body: "हम इसका इस्तेमाल सिर्फ आपको समाधान भेजने और RAVE Finance Labs की कभी-कभार होने वाली अपडेट्स के लिए करेंगे।",
      nameLabel: "आपका नाम",
      namePlaceholder: "उदाहरण: प्रिया शाह",
      whatsappLabel: "व्हाट्सएप नंबर",
      whatsappPlaceholder: "10 अंकों का मोबाइल नंबर",
      submit: "मेरा परिणाम पाएं",
      errorName: "कृपया अपना नाम लिखें।",
      errorPhone: "कृपया सही 10 अंकों का मोबाइल नंबर डालें।",
      back: "‹ पीछे",
    },
    whatsappConfirm: {
      title: "एक टैप में पुष्टि करें",
      body: "नीचे टैप करके खुद को एक छोटा-सा व्हाट्सएप मैसेज भेजें — इसी तरह हम पक्का करते हैं कि यह सच में आप ही हैं।",
      confirmBtn: "व्हाट्सएप से पुष्टि करें",
      continueBtn: "मेरे परिणाम पर जाएं",
    },
    solution: {
      title: "आपका पूरा समाधान",
      subtitle: "व्याख्या देखने के लिए किसी सवाल पर टैप करें।",
      question: (n) => `सवाल ${n}`,
      yourAnswer: "आपका जवाब:",
      correctAnswer: "सही जवाब:",
      notAnswered: "जवाब नहीं दिया",
      nextTitle: "और कुछ करना चाहेंगे?",
      shareBtn: "अपना स्कोर शेयर करें",
      courseBtn: "कोर्स के बारे में जानें",
      back: "‹ पीछे",
    },
    share: {
      challenge: "लगता है आप बेहतर कर सकते हैं? क्विज़ लीजिए।",
      shareBtn: "मेरा स्कोर शेयर करें",
      copied: "कॉपी हो गया!",
      shareWhatsapp: "व्हाट्सएप पर शेयर करें",
      back: "‹ पीछे",
    },
    course: {
      title: "निवेश और पैसों के बारे में और जानना चाहते हैं?",
      subtitle: "एक विशेषज्ञ से सीखिए।",
      courseDesc: "RAVE Finance Labs का 12-हफ्ते का कोर्स।",
      bullets: [
        "सप्ताह 1–3: पैसों को लेकर सोच और बजट की बुनियाद",
        "सप्ताह 4–6: बचत, बीमा और जो बनाया है उसकी सुरक्षा",
        "सप्ताह 7–9: शेयर, म्यूचुअल फंड और बाज़ार असल में कैसे काम करता है",
        "सप्ताह 10–12: अपनी खुद की लंबी अवधि की निवेश योजना बनाना",
      ],
      knowMore: "और जानें",
      back: "‹ पीछे",
    },
  },

  gu: {
    brand: {
      name: "RAVE FINANCE LABS",
      tagline: "અપના સપના મની મની બનાવનારાઓ તરફથી",
    },
    landing: {
      titlePrefix: "",
      titleHighlight: "મની મની",
      titleSuffix: " ક્વિઝ",
      subtitle: "આ કોઈ પરીક્ષા નથી. કોઈ સ્કોર કોઈની સાથે શેર થતો નથી. આ તો બસ એક અરીસો છે, જે બતાવે છે કે તમે પૈસા વિશે પહેલેથી કેટલું જાણો છો.",
      chooseLanguage: "તમારી ભાષા પસંદ કરો",
      comingSoon: " (જલ્દી આવશે)",
      start: "શરૂ કરો",
      questionsCount: (n) => `${n} પ્રશ્નો • ~7 મિનિટ`,
    },
    instructions: {
      title: "શરૂ કરતા પહેલાં",
      rules: [
        "સીધા બહુવિકલ્પ પ્રશ્નો છે. કેલ્ક્યુલેટરની જરૂર નથી.",
        "આને ગૂગલ ન કરો, કોઈ AI ને ન પૂછો — આ બતાવવા માટે છે કે તમે પહેલેથી શું જાણો છો, નહીં કે તમે શું શોધી શકો છો.",
        "કોઈ આને તપાસી નથી રહ્યું, અને તમારો સ્કોર બીજા કોઈની સાથે શેર થશે નહીં. આ ફક્ત તમારા માટે છે.",
        "તમે પ્રશ્નો વચ્ચે આગળ-પાછળ જઈ શકો છો અને સબમિટ કરો ત્યાં સુધી તમારા જવાબો બદલી શકો છો.",
      ],
      begin: "ક્વિઝ શરૂ કરો",
    },
    quiz: {
      questionOf: (i, total) => `પ્રશ્ન ${i} / ${total}`,
      prev: "‹ પાછળ",
      next: "આગળ",
      reviewSubmit: "સમીક્ષા કરો અને સબમિટ કરો",
    },
    review: {
      title: "બસ થોડા પ્રશ્નો બાકી છે",
      body: "જો ઇચ્છો તો આને ખાલી છોડી શકો છો — પણ જો તમે પાછા જવા માંગતા હો, તો અહીં બતાવ્યું છે કે શું હજુ પણ જવાબ વગરનું છે.",
      submitAnyway: "તો પણ સબમિટ કરો",
      qLabel: (n) => `Q${n}`,
    },
    postSubmit: {
      title: "ખૂબ સરસ — તમે પૂરું કરી લીધું!",
      subtitle: "ચાલો જોઈએ તમે કેવું કર્યું.",
      seeScore: "મારો સ્કોર જુઓ",
    },
    score: {
      yourResult: "તમારું પરિણામ",
      continue: "આગળ વધો",
    },
    solutionGate: {
      title: "તમારું પરિણામ મેળવો",
      body: "અમે આનો ઉપયોગ ફક્ત તમને સોલ્યુશન મોકલવા અને RAVE Finance Labsના ક્યારેક આવતા અપડેટ્સ માટે જ કરીશું.",
      nameLabel: "તમારું નામ",
      namePlaceholder: "ઉદાહરણ: પ્રિયા શાહ",
      whatsappLabel: "વોટ્સએપ નંબર",
      whatsappPlaceholder: "10 અંકનો મોબાઇલ નંબર",
      submit: "મારું પરિણામ મેળવો",
      errorName: "કૃપા કરી તમારું નામ લખો.",
      errorPhone: "કૃપા કરી માન્ય 10 અંકનો મોબાઇલ નંબર નાખો.",
      back: "‹ પાછળ",
    },
    whatsappConfirm: {
      title: "એક ટેપમાં પુષ્ટિ કરો",
      body: "નીચે ટેપ કરીને તમારી જાતને એક નાનો વોટ્સએપ મેસેજ મોકલો — આ રીતે અમે ખાતરી કરીએ છીએ કે આ ખરેખર તમે જ છો.",
      confirmBtn: "વોટ્સએપ દ્વારા પુષ્ટિ કરો",
      continueBtn: "મારા પરિણામ પર જાઓ",
    },
    solution: {
      title: "તમારો સંપૂર્ણ ઉકેલ",
      subtitle: "સમજૂતી જોવા માટે કોઈ પ્રશ્ન પર ટેપ કરો.",
      question: (n) => `પ્રશ્ન ${n}`,
      yourAnswer: "તમારો જવાબ:",
      correctAnswer: "સાચો જવાબ:",
      notAnswered: "જવાબ આપ્યો નથી",
      nextTitle: "વધુ કંઈક કરવા માંગો છો?",
      shareBtn: "તમારો સ્કોર શેર કરો",
      courseBtn: "કોર્સ વિશે જાણો",
      back: "‹ પાછળ",
    },
    share: {
      challenge: "લાગે છે તમે વધારે સારું કરી શકો? ક્વિઝ લો.",
      shareBtn: "મારો સ્કોર શેર કરો",
      copied: "કૉપિ થઈ ગયું!",
      shareWhatsapp: "વોટ્સએપ પર શેર કરો",
      back: "‹ પાછળ",
    },
    course: {
      title: "રોકાણ અને પૈસા વિશે વધુ જાણવા માંગો છો?",
      subtitle: "એક નિષ્ણાત પાસેથી શીખો.",
      courseDesc: "RAVE Finance Labsનો 12-અઠવાડિયાનો કોર્સ.",
      bullets: [
        "અઠવાડિયું 1–3: પૈસા વિશેની વિચારસરણી અને બજેટનો પાયો",
        "અઠવાડિયું 4–6: બચત, વીમો અને તમે જે બનાવ્યું છે તેનું રક્ષણ",
        "અઠવાડિયું 7–9: શેર, મ્યુચ્યુઅલ ફંડ અને બજાર ખરેખર કેવી રીતે કામ કરે છે",
        "અઠવાડિયું 10–12: તમારી પોતાની લાંબા ગાળાની રોકાણ યોજના બનાવવી",
      ],
      knowMore: "વધુ જાણો",
      back: "‹ પાછળ",
    },
  },
};

export function getStrings(language) {
  return STRINGS[language] || STRINGS.en;
}
