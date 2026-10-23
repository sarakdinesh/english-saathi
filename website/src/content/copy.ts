export const brand = {
  en: "English Boluya",
  mr: "इंग्लिश बोलूया",
  full: "English Boluya · इंग्लिश बोलूया",
  tagline: "आपल्या भाषेत शिकूया, इंग्रजीत बोलूया!",
} as const;

export const nav = {
  how: { mr: "कसे शिकाल", en: "How it works", href: "/#how" },
  why: { mr: "का Boluya", en: "Why us", href: "/#why" },
  paths: { mr: "मार्ग", en: "Paths", href: "/#paths" },
  getApp: { mr: "ॲप मिळवा", en: "Get the app", href: "/#get-app" },
  privacy: { mr: "गोपनीयता", en: "Privacy", href: "/privacy" },
  terms: { mr: "अटी", en: "Terms", href: "/terms" },
} as const;

export const hero = {
  supportMr: "मराठीतून इंग्रजी बोलायला शिका. रोज छोटे टप्पे, इंटरनेटशिवाय सराव.",
  supportEn: "Learn spoken English through Marathi. Short daily steps, works offline.",
  playReady: { mr: "Google Play वर मिळवा", en: "Get it on Google Play" },
  playSoon: { mr: "लवकरच Google Play वर", en: "Coming to Google Play" },
  waitlist: { mr: "वेटलिस्टला सामील व्हा", en: "Join the waitlist" },
} as const;

export const stages = [
  { mr: "लक्ष्य आणि संवाद", en: "Outcome & conversation" },
  { mr: "अर्थ आणि सूत्र", en: "Meaning & pattern" },
  { mr: "ऐका आणि म्हणा", en: "Listen & say" },
  { mr: "सराव", en: "Exercises" },
  { mr: "तुमचे बोलणे", en: "Your speaking" },
  { mr: "संवाद सराव", en: "Role-play" },
  { mr: "उजळणी", en: "Recap" },
] as const;

export const features = [
  {
    titleMr: "आधी मराठीत समजा",
    titleEn: "Marathi-first explanations",
    bodyMr: "प्रत्येक गोष्ट आधी मराठीत समजावली जाते, मग इंग्रजी ऐकायचे, म्हणायचे आणि वापरायचे.",
    bodyEn: "Everything is explained in Marathi first, then you listen, say, and use English.",
  },
  {
    titleMr: "इंटरनेटशिवाय",
    titleEn: "Fully offline",
    bodyMr: "सर्व धडे फोनवरच. लॉग-इन नाही, जाहिराती नाहीत. प्रगती फक्त तुमच्या डिव्हाइसवर.",
    bodyEn: "All lessons on your phone. No login, no ads. Progress stays on your device.",
  },
  {
    titleMr: "बोलण्याचा सराव",
    titleEn: "Speaking practice",
    bodyMr: "ऐका (हळूही), मोठ्याने म्हणा, हवे तर रेकॉर्ड करा. शब्द ओळख फोनवरच चालते.",
    bodyEn: "Listen (including slow), speak aloud, optionally record. Word check stays on-device.",
  },
  {
    titleMr: "गोपनीयता आधी",
    titleEn: "Privacy by design",
    bodyMr: "खाते नाही, analytics नाही. मायक्रोफोन फक्त तुम्ही निवडल्यावर. रेकॉर्डिंग अपलोड होत नाही.",
    bodyEn: "No accounts, no analytics. Mic only when you choose. Recordings are never uploaded.",
  },
] as const;

export const paths = [
  {
    titleMr: "पाया",
    titleEn: "Foundation",
    bodyMr: "अक्षरे, आवाज, संख्या, दिवस आणि रोजची सुरुवात.",
    bodyEn: "Letters, sounds, numbers, days, and everyday beginnings.",
  },
  {
    titleMr: "सुरुवात",
    titleEn: "Beginner",
    bodyMr: "अभिवादन ते खरेदी, दिशा आणि मदत मागणे — आत्मविश्वासाने बोलण्याची पायाभूत रचना.",
    bodyEn: "From greetings to shopping, directions, and asking for help.",
  },
  {
    titleMr: "मध्यम",
    titleEn: "Intermediate",
    bodyMr: "लांब उत्तरे, कथा, मत, कामाचे संवाद आणि सादरीकरण.",
    bodyEn: "Longer answers, stories, opinions, workplace talk, and presenting.",
  },
  {
    titleMr: "व्यावसायिक",
    titleEn: "Professional",
    bodyMr: "प्रायोगिक पूर्वावलोकन — अधिक सामग्री लवकरच.",
    bodyEn: "Preview path — more content coming soon.",
    note: true,
  },
] as const;

export const getApp = {
  titleMr: "ॲप मिळवा",
  titleEn: "Get English Boluya",
  bodyMr: "Android साठी तयार. Play वर उपलब्ध झाल्यावर लगेच डाउनलोड करा — किंवा वेटलिस्टवर नाव टाका.",
  bodyEn: "Built for Android. Download when it lands on Play — or join the waitlist now.",
  formName: { mr: "नाव (ऐच्छिक)", en: "Name (optional)" },
  formEmail: { mr: "ईमेल", en: "Email" },
  formSubmit: { mr: "वेटलिस्टवर जोडा", en: "Join waitlist" },
  formSending: { mr: "पाठवत आहे…", en: "Sending…" },
  formSuccess: {
    mr: "धन्यवाद! आम्ही लवकरच संपर्क करू.",
    en: "Thanks! We’ll be in touch soon.",
  },
  formError: {
    mr: "काही चुकले. कृपया पुन्हा प्रयत्न करा किंवा ईमेल पाठवा.",
    en: "Something went wrong. Please try again or email us.",
  },
  honestyMr:
    "टीप: हे ॲप प्रमाणपत्र देत नाही आणि ठराविक वेळेत अस्खलित होण्याचे आश्वासन देत नाही. रोज थोडा सराव हाच खरा मार्ग आहे.",
  honestyEn:
    "Note: This app does not issue certificates or promise fluency on a fixed timeline. A little practice every day is the real path.",
} as const;

export const footer = {
  tagline: brand.tagline,
  rights: "© English Boluya. All rights reserved.",
  contact: "Contact",
} as const;

export const notFound = {
  titleMr: "पृष्ठ सापडले नाही",
  titleEn: "Page not found",
  bodyMr: "हे पृष्ठ उपलब्ध नाही. मुख्य पृष्ठावर परत जा.",
  bodyEn: "This page isn’t available. Head back home.",
  home: { mr: "मुख्य पृष्ठ", en: "Home" },
} as const;
