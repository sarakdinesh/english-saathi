// Spoken-English material written for Marathi speakers.
// `say` is an approximate Devanagari pronunciation guide, not a spelling rule:
// it helps a first-time reader find the sounds, then the audio takes over.
export type Phrase = { en: string; mr: string; say: string };
export type Situation = {
  id: string;
  title: string;
  mr: string;
  icon: string;
  tip: string;
  phrases: Phrase[];
};

export const situations: Situation[] = [
  {
    id: "meet",
    title: "Meeting people",
    mr: "ओळख आणि नमस्कार",
    icon: "people-outline",
    tip: "Hello म्हटल्यावर हसा आणि नाव सांगा. छोटे वाक्य, स्पष्ट आवाज.",
    phrases: [
      {
        en: "Hello, how are you?",
        mr: "नमस्कार, तुम्ही कसे आहात?",
        say: "हलो, हाउ आर यू?",
      },
      {
        en: "I am fine, thank you.",
        mr: "मी ठीक आहे, धन्यवाद.",
        say: "आय ॲम फाइन, थॅंक यू.",
      },
      {
        en: "My name is Asha.",
        mr: "माझे नाव आशा आहे.",
        say: "माय नेम इज आशा.",
      },
      {
        en: "Nice to meet you.",
        mr: "तुम्हाला भेटून आनंद झाला.",
        say: "नाइस टू मीट यू.",
      },
      {
        en: "Where are you from?",
        mr: "तुम्ही कुठले आहात?",
        say: "वेअर आर यू फ्रॉम?",
      },
      { en: "See you tomorrow.", mr: "उद्या भेटूया.", say: "सी यू टुमॉरो." },
    ],
  },
  {
    id: "shop",
    title: "Shopping",
    mr: "दुकान आणि बाजार",
    icon: "bag-handle-outline",
    tip: "किंमत विचारायची असेल तर How much? पुरेसे आहे. Please जोडल्यास आवाज नम्र वाटतो.",
    phrases: [
      {
        en: "How much is this?",
        mr: "हे किती रुपयांना आहे?",
        say: "हाउ मच इज दिस?",
      },
      {
        en: "Do you have a smaller size?",
        mr: "तुमच्याकडे लहान माप आहे का?",
        say: "डू यू हॅव अ स्मॉलर साइज?",
      },
      {
        en: "Can I get a discount?",
        mr: "थोडी सूट मिळेल का?",
        say: "कॅन आय गेट अ डिस्काउंट?",
      },
      {
        en: "I will take this one.",
        mr: "मी हे घेतो/घेते.",
        say: "आय विल टेक दिस वन.",
      },
      {
        en: "Can I pay by UPI?",
        mr: "UPI ने पैसे देऊ शकतो/शकते का?",
        say: "कॅन आय पे बाय यू-पी-आय?",
      },
      {
        en: "Could I have a bag, please?",
        mr: "मला एक पिशवी मिळेल का?",
        say: "कुड आय हॅव अ बॅग, प्लीज?",
      },
    ],
  },
  {
    id: "travel",
    title: "Travel & directions",
    mr: "प्रवास आणि रस्ता",
    icon: "bus-outline",
    tip: "रस्ता विचारताना Excuse me ने सुरुवात करा. उत्तर समजले नाही तर 'Slowly, please' म्हणा.",
    phrases: [
      {
        en: "Excuse me, where is the station?",
        mr: "माफ करा, स्टेशन कुठे आहे?",
        say: "एक्सक्यूज मी, वेअर इज द स्टेशन?",
      },
      {
        en: "How far is it from here?",
        mr: "इथून ते किती दूर आहे?",
        say: "हाउ फार इज इट फ्रॉम हिअर?",
      },
      {
        en: "Please stop here.",
        mr: "कृपया इथे थांबवा.",
        say: "प्लीज स्टॉप हिअर.",
      },
      {
        en: "One ticket to Pune, please.",
        mr: "पुण्याचे एक तिकीट द्या.",
        say: "वन तिकिट टू पुणे, प्लीज.",
      },
      {
        en: "Which platform is it?",
        mr: "तो कोणता फलाट आहे?",
        say: "विच प्लॅटफॉर्म इज इट?",
      },
      {
        en: "Turn left at the signal.",
        mr: "सिग्नलला डावीकडे वळा.",
        say: "टर्न लेफ्ट ॲट द सिग्नल.",
      },
    ],
  },
  {
    id: "food",
    title: "Food & restaurant",
    mr: "हॉटेल आणि जेवण",
    icon: "restaurant-outline",
    tip: "ऑर्डर देताना 'I would like…' हे सर्वात सभ्य सूत्र आहे.",
    phrases: [
      {
        en: "A table for two, please.",
        mr: "दोघांसाठी टेबल द्या.",
        say: "अ टेबल फॉर टू, प्लीज.",
      },
      {
        en: "I would like a cup of tea.",
        mr: "मला एक कप चहा हवा आहे.",
        say: "आय वुड लाइक अ कप ऑफ टी.",
      },
      {
        en: "Less spicy, please.",
        mr: "तिखट कमी ठेवा.",
        say: "लेस स्पाइसी, प्लीज.",
      },
      {
        en: "Can we have the bill, please?",
        mr: "बिल मिळेल का?",
        say: "कॅन वी हॅव द बिल, प्लीज?",
      },
      {
        en: "The food is delicious.",
        mr: "जेवण खूप छान आहे.",
        say: "द फूड इज डिलिशस.",
      },
    ],
  },
  {
    id: "work",
    title: "Work & office",
    mr: "ऑफिस आणि काम",
    icon: "briefcase-outline",
    tip: "ऑफिसमध्ये छोटे आणि सरळ वाक्य सर्वात प्रभावी असते. मोठे वाक्य टाळा.",
    phrases: [
      { en: "May I come in?", mr: "मी आत येऊ का?", say: "मे आय कम इन?" },
      {
        en: "Could you repeat that, please?",
        mr: "कृपया पुन्हा सांगाल का?",
        say: "कुड यू रिपीट दॅट, प्लीज?",
      },
      {
        en: "I will send it by evening.",
        mr: "मी ते संध्याकाळपर्यंत पाठवतो/पाठवते.",
        say: "आय विल सेंड इट बाय ईव्हनिंग.",
      },
      {
        en: "I need some more time.",
        mr: "मला थोडा अजून वेळ हवा आहे.",
        say: "आय नीड सम मोअर टाइम.",
      },
      {
        en: "Let me check and tell you.",
        mr: "मी तपासून सांगतो/सांगते.",
        say: "लेट मी चेक अँड टेल यू.",
      },
      {
        en: "Thank you for your help.",
        mr: "तुमच्या मदतीबद्दल धन्यवाद.",
        say: "थॅंक यू फॉर युअर हेल्प.",
      },
    ],
  },
  {
    id: "health",
    title: "Doctor & health",
    mr: "दवाखाना आणि आरोग्य",
    icon: "medkit-outline",
    tip: "त्रास सांगताना 'I have…' वापरा: I have a headache, I have a fever.",
    phrases: [
      {
        en: "I have a headache.",
        mr: "माझे डोके दुखत आहे.",
        say: "आय हॅव अ हेडेक.",
      },
      {
        en: "I have had a fever since yesterday.",
        mr: "कालपासून मला ताप आहे.",
        say: "आय हॅव हॅड अ फीव्हर सिन्स येस्टरडे.",
      },
      {
        en: "How many times a day?",
        mr: "दिवसातून किती वेळा?",
        say: "हाउ मेनी टाइम्स अ डे?",
      },
      { en: "Is it serious?", mr: "हे गंभीर आहे का?", say: "इज इट सिअरियस?" },
    ],
  },
  {
    id: "phone",
    title: "On the phone",
    mr: "फोनवर बोलणे",
    icon: "call-outline",
    tip: "फोनवर चेहरा दिसत नाही, म्हणून हळू आणि स्पष्ट बोला.",
    phrases: [
      {
        en: "Hello, this is Rahul speaking.",
        mr: "हॅलो, मी राहुल बोलतो आहे.",
        say: "हलो, दिस इज राहुल स्पीकिंग.",
      },
      {
        en: "Can I speak to Mr. Patil?",
        mr: "मी श्री. पाटील यांच्याशी बोलू शकतो का?",
        say: "कॅन आय स्पीक टू मिस्टर पाटील?",
      },
      {
        en: "Please call me back.",
        mr: "कृपया मला परत फोन करा.",
        say: "प्लीज कॉल मी बॅक.",
      },
      {
        en: "The line is not clear.",
        mr: "आवाज नीट येत नाही.",
        say: "द लाइन इज नॉट क्लिअर.",
      },
    ],
  },
  {
    id: "help",
    title: "When you are stuck",
    mr: "अडचणीत वापरायचे वाक्य",
    icon: "help-buoy-outline",
    tip: "समजले नाही तर घाबरू नका. हे सहा वाक्य तुम्हाला कोणत्याही संवादात वाचवतात.",
    phrases: [
      {
        en: "Sorry, I did not understand.",
        mr: "माफ करा, मला समजले नाही.",
        say: "सॉरी, आय डिड नॉट अंडरस्टँड.",
      },
      {
        en: "Could you speak slowly, please?",
        mr: "कृपया हळू बोलाल का?",
        say: "कुड यू स्पीक स्लोली, प्लीज?",
      },
      {
        en: "What does this mean?",
        mr: "याचा अर्थ काय?",
        say: "व्हॉट डझ दिस मीन?",
      },
      {
        en: "How do you say this in English?",
        mr: "हे इंग्रजीत कसे म्हणतात?",
        say: "हाउ डू यू से दिस इन इंग्लिश?",
      },
      {
        en: "Let me think for a moment.",
        mr: "मला क्षणभर विचार करू द्या.",
        say: "लेट मी थिंक फॉर अ मोमेंट.",
      },
      {
        en: "I am still learning English.",
        mr: "मी अजून इंग्रजी शिकत आहे.",
        say: "आय ॲम स्टिल लर्निंग इंग्लिश.",
      },
    ],
  },
  // Everyday Maharashtra scenes.
  {
    id: "bus",
    title: "ST bus and local train",
    mr: "एसटी बस आणि लोकल",
    icon: "bus-outline",
    tip: "गाडी कुठे जाते ते आधी विचारा. ठिकाणाचे नाव हळू आणि स्पष्ट सांगा.",
    phrases: [
      { en: "Does this bus go to Kolhapur?", mr: "ही बस कोल्हापूरला जाते का?", say: "डझ दिस बस गो टू कोल्हापूर?" },
      { en: "One ticket to Nashik, please.", mr: "नाशिकचे एक तिकीट द्या.", say: "वन टिकिट टू नाशिक, प्लीज." },
      { en: "Which platform is the train to Dadar?", mr: "दादरची गाडी कोणत्या फलाटावर आहे?", say: "विच प्लॅटफॉर्म इज द ट्रेन टू दादर?" },
      { en: "Please tell me when we reach Swargate.", mr: "स्वारगेट आले की मला सांगा.", say: "प्लीज टेल मी वेन वी रीच स्वारगेट." },
      { en: "Is this seat free?", mr: "ही जागा रिकामी आहे का?", say: "इज दिस सीट फ्री?" },
      { en: "How long does the bus take?", mr: "बसला किती वेळ लागतो?", say: "हाउ लॉंग डझ द बस टेक?" },
    ],
  },
  {
    id: "kirana",
    title: "Kirana shop",
    mr: "किराणा दुकान",
    icon: "storefront-outline",
    tip: "वजन आणि संख्या आधी सांगा: one kilo, two packets. शेवटी Thank you म्हणा.",
    phrases: [
      { en: "Please give me one kilo of sugar.", mr: "मला एक किलो साखर द्या.", say: "प्लीज गिव्ह मी वन किलो ऑफ शुगर." },
      { en: "Do you have toned milk?", mr: "तुमच्याकडे टोन्ड दूध आहे का?", say: "डू यू हॅव टोन्ड मिल्क?" },
      { en: "Can I pay by UPI?", mr: "मी UPI ने पैसे देऊ शकतो/शकते का?", say: "कॅन आय पे बाय यू-पी-आय?" },
      { en: "Please add it to my monthly bill.", mr: "हे माझ्या महिन्याच्या बिलात लिहा.", say: "प्लीज ॲड इट टू माय मंथली बिल." },
      { en: "Is this rice new or old?", mr: "हा तांदूळ नवा आहे की जुना?", say: "इज दिस राइस न्यू ऑर ओल्ड?" },
      { en: "Please give me a bag.", mr: "मला एक पिशवी द्या.", say: "प्लीज गिव्ह मी अ बॅग." },
    ],
  },
  {
    id: "bank",
    title: "Bank and forms",
    mr: "बँक आणि अर्ज",
    icon: "business-outline",
    tip: "काय काम आहे ते पहिल्या वाक्यात सांगा: I want to … . समजले नाही तर पुन्हा विचारा.",
    phrases: [
      { en: "I want to open a savings account.", mr: "मला बचत खाते उघडायचे आहे.", say: "आय वॉन्ट टू ओपन अ सेव्हिंग्ज अकाउंट." },
      { en: "Which form should I fill?", mr: "मी कोणता अर्ज भरू?", say: "विच फॉर्म शुड आय फिल?" },
      { en: "Could you help me fill this form?", mr: "हा अर्ज भरायला मदत कराल का?", say: "कुड यू हेल्प मी फिल दिस फॉर्म?" },
      { en: "I want to update my mobile number.", mr: "मला माझा मोबाइल नंबर बदलायचा आहे.", say: "आय वॉन्ट टू अपडेट माय मोबाइल नंबर." },
      { en: "Where should I sign?", mr: "मी कुठे सही करू?", say: "वेअर शुड आय साइन?" },
      { en: "When will I get my ATM card?", mr: "माझे एटीएम कार्ड कधी मिळेल?", say: "वेन विल आय गेट माय ए-टी-एम कार्ड?" },
    ],
  },
  {
    id: "college",
    title: "College and viva",
    mr: "कॉलेज आणि तोंडी परीक्षा",
    icon: "school-outline",
    tip: "आत जाण्याआधी परवानगी मागा. उत्तर येत नसेल तर प्रामाणिकपणे सांगा आणि प्रयत्न करा.",
    phrases: [
      { en: "May I come in, sir?", mr: "सर, मी आत येऊ का?", say: "मे आय कम इन, सर?" },
      { en: "Sorry, I am late.", mr: "माफ करा, मला उशीर झाला.", say: "सॉरी, आय ॲम लेट." },
      { en: "Could you explain this again, please?", mr: "हे पुन्हा समजावून सांगाल का?", say: "कुड यू एक्सप्लेन दिस अगेन, प्लीज?" },
      { en: "When is the last date for the fees?", mr: "फी भरायची शेवटची तारीख कधी आहे?", say: "वेन इज द लास्ट डेट फॉर द फीज?" },
      { en: "My project is on solar energy.", mr: "माझा प्रकल्प सौरऊर्जेवर आहे.", say: "माय प्रोजेक्ट इज ऑन सोलर एनर्जी." },
      { en: "I am not sure, but I think the answer is …", mr: "मला खात्री नाही, पण मला वाटते उत्तर … आहे.", say: "आय ॲम नॉट शुअर, बट आय थिंक द आन्सर इज …" },
    ],
  },
  {
    id: "school",
    title: "Parent-teacher meeting",
    mr: "पालक-शिक्षक भेट",
    icon: "happy-outline",
    tip: "आधी तुमची ओळख सांगा (कोणाचे पालक). मग एक-दोन ठोस प्रश्न विचारा.",
    phrases: [
      { en: "I am Riya's mother.", mr: "मी रियाची आई आहे.", say: "आय ॲम रियाज मदर." },
      { en: "How is my son doing in English?", mr: "माझा मुलगा इंग्रजीत कसा आहे?", say: "हाउ इज माय सन डूइंग इन इंग्लिश?" },
      { en: "What can we do at home to help?", mr: "घरी आम्ही कशी मदत करू शकतो?", say: "वॉट कॅन वी डू ॲट होम टू हेल्प?" },
      { en: "She finds maths difficult.", mr: "तिला गणित अवघड वाटते.", say: "शी फाइंड्स मॅथ्स डिफिकल्ट." },
      { en: "Is there any homework for the holidays?", mr: "सुट्टीसाठी काही गृहपाठ आहे का?", say: "इज देअर एनी होमवर्क फॉर द हॉलिडेज?" },
      { en: "Thank you for your time.", mr: "वेळ दिल्याबद्दल धन्यवाद.", say: "थॅंक यू फॉर युअर टाइम." },
    ],
  },
];

export type Sound = {
  id: string;
  title: string;
  mr: string;
  tip: string;
  pairs: { en: string; say: string }[];
};

// Sounds where Marathi speakers commonly need a little extra attention.
export const sounds: Sound[] = [
  {
    id: "w",
    title: "V and W",
    mr: "V आणि W वेगळे ऐका",
    tip: "V मध्ये वरचे दात खालच्या ओठाला लागतात. W मध्ये ओठ गोल होतात आणि दात लागत नाहीत. 'वाईन' आणि 'वाइन' इंग्रजीत वेगळे शब्द आहेत.",
    pairs: [
      { en: "very", say: "व्हेरी (दात-ओठ)" },
      { en: "water", say: "वॉटर (ओठ गोल)" },
      { en: "wine", say: "वाइन (ओठ गोल)" },
      { en: "vine", say: "व्हाइन (दात-ओठ)" },
    ],
  },
  {
    id: "th",
    title: "TH sound",
    mr: "TH चा आवाज",
    tip: "जीभेचे टोक वरच्या आणि खालच्या दातांमध्ये हलके ठेवा. 'थ' किंवा 'द' असे बोलू नका; हवा जिभेवरून बाहेर येऊ द्या.",
    pairs: [
      { en: "think", say: "थिंक (हवेचा आवाज)" },
      { en: "three", say: "थ्री" },
      { en: "this", say: "दिस (आवाजासह)" },
      { en: "mother", say: "मदर" },
    ],
  },
  {
    id: "s",
    title: "Words starting with S",
    mr: "S ने सुरू होणारे शब्द",
    tip: "School ला 'इस्कूल' आणि station ला 'इस्टेशन' म्हणण्याची सवय असते. S च्या आधी 'इ' जोडू नका; S वर थेट सुरुवात करा.",
    pairs: [
      { en: "school", say: "स्कूल (इस्कूल नाही)" },
      { en: "station", say: "स्टेशन" },
      { en: "speak", say: "स्पीक" },
      { en: "student", say: "स्टुडंट" },
    ],
  },
  {
    id: "vowel",
    title: "Short and long vowels",
    mr: "ह्रस्व आणि दीर्घ स्वर",
    tip: "इंग्रजीत स्वराची लांबी अर्थ बदलते. Ship मधील 'इ' लहान, sheep मधील 'ई' लांब असतो.",
    pairs: [
      { en: "ship", say: "शिप (लहान इ)" },
      { en: "sheep", say: "शीप (लांब ई)" },
      { en: "full", say: "फुल (लहान उ)" },
      { en: "fool", say: "फूल (लांब ऊ)" },
    ],
  },
  {
    id: "stress",
    title: "Word stress",
    mr: "शब्दावरचा जोर",
    tip: "इंग्रजी शब्दात एका भागावर जास्त जोर असतो. मराठीत प्रत्येक अक्षर सारखे बोलले जाते. जोराचा भाग मोठ्या अक्षरात आहे.",
    pairs: [
      { en: "TEA-cher", say: "टी-चर" },
      { en: "to-MOR-row", say: "टु-मॉ-रो" },
      { en: "com-FOR-ta-ble", say: "कम्-फर-ट-बल" },
      { en: "ho-TEL", say: "हो-टेल" },
    ],
  },
  {
    id: "ending",
    title: "Clear word endings",
    mr: "शब्दाचा शेवट स्पष्ट बोला",
    tip: "Past tense मध्ये -ed चा आवाज येणे आवश्यक आहे. Worked म्हणजे 'वर्क्ट', 'वर्कड' नाही. शेवटचे t, d, s गाळू नका.",
    pairs: [
      { en: "worked", say: "वर्क्ट" },
      { en: "played", say: "प्लेड" },
      { en: "wanted", say: "वॉन्टिड" },
      { en: "books", say: "बुक्स" },
    ],
  },
];

export type Guide = { title: string; mr: string; icon: string; body: string };

// A simple daily routine for learners who have no one to practise with.
export const routine: Guide[] = [
  {
    title: "Listen",
    mr: "ऐका",
    icon: "ear-outline",
    body: "एक वाक्य दोन वेळा ऐका. एकदा सामान्य गतीने आणि एकदा हळू.",
  },
  {
    title: "Repeat",
    mr: "म्हणा",
    icon: "repeat-outline",
    body: "लगेच तसेच म्हणा. आवाज, चढउतार आणि थांबे यांची नक्कल करा.",
  },
  {
    title: "Record",
    mr: "रेकॉर्ड करा",
    icon: "mic-outline",
    body: "स्वतःचा आवाज रेकॉर्ड करा आणि मूळ आवाजाशी तुलना करा.",
  },
  {
    title: "Use",
    mr: "वापरा",
    icon: "chatbubble-ellipses-outline",
    body: "आजच कोणाशीतरी हेच वाक्य वापरा. घरी, ऑफिसमध्ये किंवा आरशासमोर.",
  },
];

export const phraseKey = (situation: string, en: string) =>
  `phrase:${situation}:${en}`;
export const phraseKeys = situations.flatMap((x) =>
  x.phrases.map((p) => phraseKey(x.id, p.en)),
);
// Speaking-drill cards use stable review IDs: say-<situation>-<index>.
export const drillCards = situations.flatMap((x) =>
  x.phrases.map((p, i) => ({ id: `say-${x.id}-${i}`, situation: x.id, ...p })),
);

export type Mistake = {
  wrong: string;
  right: string;
  why: string;
  say: string;
};

// Typical patterns that come from translating Marathi word by word.
export const mistakes: Mistake[] = [
  {
    wrong: "I am having a pen.",
    right: "I have a pen.",
    why: "माझ्याकडे आहे = have. 'am having' वापरत नाही.",
    say: "आय हॅव अ पेन.",
  },
  {
    wrong: "Where you are going?",
    right: "Where are you going?",
    why: "प्रश्नात is/am/are आधी येते, मग subject.",
    say: "वेअर आर यू गोइंग?",
  },
  {
    wrong: "I am knowing him.",
    right: "I know him.",
    why: "know, like, want सारखी क्रियापदे साध्या रूपात वापरतात.",
    say: "आय नो हिम.",
  },
  {
    wrong: "Myself Rahul.",
    right: "I am Rahul. / My name is Rahul.",
    why: "'मी राहुल' = I am Rahul. Myself शब्दाने वाक्य सुरू करत नाहीत.",
    say: "आय ॲम राहुल.",
  },
  {
    wrong: "What is your good name?",
    right: "What is your name?",
    why: "'शुभनाम' चे भाषांतर good name करू नका. फक्त name पुरेसे आहे.",
    say: "व्हॉट इज युअर नेम?",
  },
  {
    wrong: "He don't like tea.",
    right: "He doesn't like tea.",
    why: "he/she/it सोबत doesn't वापरा.",
    say: "ही डझन्ट लाइक टी.",
  },
  {
    wrong: "She is knowing English.",
    right: "She knows English.",
    why: "know ला -ing लावत नाहीत. he/she सोबत knows.",
    say: "शी नोज इंग्लिश.",
  },
  {
    wrong: "I am going to home.",
    right: "I am going home.",
    why: "home च्या आधी to लागत नाही.",
    say: "आय ॲम गोइंग होम.",
  },
  {
    wrong: "I will come tomorrow morning only.",
    right: "I will come tomorrow morning.",
    why: "मराठीतील 'च' साठी 'only' जोडू नका. नैसर्गिक वाक्यात ते गरजेचे नाही.",
    say: "आय विल कम टुमॉरो मॉर्निंग.",
  },
  {
    wrong: "Please do one thing.",
    right: "Could you help me, please?",
    why: "'एक काम करा' असे शब्दशः म्हणू नका. विनंती Could you… ने करा.",
    say: "कुड यू हेल्प मी, प्लीज?",
  },
  {
    wrong: "I have a doubt.",
    right: "I have a question.",
    why: "मराठीत 'शंका' = doubt असे वाटते, पण इंग्रजीत प्रश्न विचारताना question म्हणतात.",
    say: "आय हॅव अ क्वेश्चन.",
  },
  {
    wrong: "What you want?",
    right: "What do you want?",
    why: "प्रश्नासाठी do/does लागते.",
    say: "व्हॉट डू यू वॉन्ट?",
  },
  {
    wrong: "I am agree with you.",
    right: "I agree with you.",
    why: "agree स्वतःच क्रियापद आहे. am लागत नाही.",
    say: "आय अग्री विथ यू.",
  },
  {
    wrong: "Open the light.",
    right: "Turn on the light.",
    why: "मराठीत 'दिवा लाव'. इंग्रजीत light साठी turn on / turn off.",
    say: "टर्न ऑन द लाइट.",
  },
  {
    wrong: "Give me one tea.",
    right: "Could I have a cup of tea, please?",
    why: "'Give me' थोडे कठोर वाटते. Could I have… सभ्य आहे.",
    say: "कुड आय हॅव अ कप ऑफ टी, प्लीज?",
  },
  {
    wrong: "My age is 25 years.",
    right: "I am 25 years old.",
    why: "वय सांगताना I am … years old म्हणा.",
    say: "आय ॲम ट्वेंटी-फाइव्ह इअर्स ओल्ड.",
  },
  {
    wrong: "I am coming from Pune.",
    right: "I am from Pune.",
    why: "तुम्ही कुठले आहात हे सांगताना I am from….",
    say: "आय ॲम फ्रॉम पुणे.",
  },
  {
    wrong: "Yesterday I am going to market.",
    right: "Yesterday I went to the market.",
    why: "भूतकाळ सांगताना went वापरा. market च्या आधी the.",
    say: "येस्टरडे आय वेंट टू द मार्केट.",
  },
  {
    wrong: "Can you able to help me?",
    right: "Can you help me?",
    why: "can आणि able to एकत्र वापरू नका.",
    say: "कॅन यू हेल्प मी?",
  },
  {
    wrong: "I have no money with me.",
    right: "I do not have any money with me.",
    why: "बोलताना do not have any अधिक नैसर्गिक वाटते.",
    say: "आय डू नॉट हॅव एनी मनी विथ मी.",
  },
  {
    wrong: "Do the needful.",
    right: "Please take care of it.",
    why: "'Do the needful' जुने आणि भारतीय इंग्रजीतील वाक्य आहे. आता Please take care of it किंवा Please handle this म्हणा.",
    say: "प्लीज टेक केअर ऑफ इट.",
  },
];
