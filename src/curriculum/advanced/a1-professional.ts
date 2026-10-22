// Level 4 (Advanced) pilot unit: professional communication beyond the
// Intermediate meeting and presentation lessons — softening, negotiating,
// handling objections and formal email. Roughly CEFR B2 targets. Written with
// AI assistance on 22 October 2026; not yet reviewed by a teacher.
import {
  bld,
  e2m,
  finish,
  gap,
  lessonKit,
  lis,
  m2e,
  newLesson,
  resp,
  rolePlay,
  und,
} from "../author";
import type { Enrich, Unit } from "../types";

export const lessons = [
  newLesson(
    "softening",
    "work",
    "Sound polite: softening what you say",
    "थेट न बोलता नम्रपणे सांगा",
    "व्यावसायिक इंग्रजीत थेट 'No' किंवा 'You are wrong' म्हणणे कठोर वाटते. वाक्य सौम्य करण्यासाठी: I'm not sure that …; It might be better to …; Would it be possible to …?; I was wondering if …; slightly / a bit. अर्थ तोच राहतो, फक्त सूर नम्र होतो. मराठीत आपण 'जरा', 'कदाचित', 'शक्य असल्यास' जोडतो तसेच.",
    "I'm not sure that … · It might be better to … · Would it be possible to …? · I was wondering if …",
    [
      [
        "I'm not sure that this plan will work.",
        "ही योजना यशस्वी होईल याची मला खात्री नाही.",
      ],
      [
        "It might be better to wait until Monday.",
        "सोमवारपर्यंत थांबणे कदाचित जास्त चांगले होईल.",
      ],
      [
        "Would it be possible to move the meeting to Thursday?",
        "बैठक गुरुवारी हलवणे शक्य होईल का?",
      ],
      [
        "I was wondering if you could send the report today.",
        "तुम्ही आज रिपोर्ट पाठवू शकाल का, असा विचार करत होतो/होते.",
      ],
    ],
    "सहकाऱ्याला एखादी गोष्ट बदलायला सांगायची आहे (उदा. वेळ, किंमत). थेट न बोलता तीन सौम्य वाक्यांत सांगा.",
  ),
  newLesson(
    "negotiating",
    "work",
    "Negotiate: offers and conditions",
    "वाटाघाटी: प्रस्ताव आणि अटी",
    "वाटाघाटीत आपण अट घालून प्रस्ताव देतो: If you can …, we could …; We could offer … on condition that …; Would you be willing to …?; That's as far as we can go. If + present, will/could हा प्रत्यक्ष शक्य प्रस्ताव; If + past, would हा काल्पनिक प्रस्ताव (If you ordered more, we would reduce the price). 'हो' म्हणण्याआधी काय बदल्यात मिळेल ते स्पष्ट करा.",
    "If you can …, we could … · on condition that … · Would you be willing to …?",
    [
      [
        "If you can pay in advance, we could give you a five percent discount.",
        "तुम्ही आगाऊ पैसे दिल्यास आम्ही पाच टक्के सूट देऊ शकतो.",
      ],
      [
        "We could deliver on Friday on condition that you confirm today.",
        "तुम्ही आज खात्री केल्यास आम्ही शुक्रवारी माल पोहोचवू शकतो.",
      ],
      [
        "Would you be willing to sign a two-year contract?",
        "तुम्ही दोन वर्षांचा करार करायला तयार आहात का?",
      ],
      [
        "I'm afraid that's as far as we can go on price.",
        "माफ करा, किमतीबाबत आम्ही यापेक्षा पुढे जाऊ शकत नाही.",
      ],
    ],
    "तुम्ही पुरवठादार आहात. ग्राहकाला सूट हवी आहे. अट घालून एक प्रस्ताव आणि एक मर्यादा सांगा.",
  ),
  newLesson(
    "objections",
    "work",
    "Handle objections and disagree politely",
    "आक्षेपांना शांतपणे उत्तर द्या",
    "कोणी आक्षेप घेतला तर तीन पायऱ्या: (1) आक्षेप मान्य करा — I see your point / That's a fair concern; (2) तुमची बाजू मांडा — However, … / The thing is, …; (3) उपाय किंवा पुरावा द्या — What if we …? / For example, … . 'You are wrong' ऐवजी I see it slightly differently असे म्हणा.",
    "Acknowledge → However, … → What if we …?",
    [
      [
        "I see your point, but the cheaper option takes twice as long.",
        "तुमचा मुद्दा समजला, पण स्वस्त पर्यायाला दुप्पट वेळ लागतो.",
      ],
      [
        "That's a fair concern. However, the new system will save us time.",
        "ती रास्त काळजी आहे. तरीही नवीन प्रणालीमुळे आपला वेळ वाचेल.",
      ],
      [
        "I see it slightly differently.",
        "मी याकडे थोड्या वेगळ्या दृष्टीने पाहतो/पाहते.",
      ],
      [
        "What if we try it for one month first?",
        "आधी एक महिना प्रयोग करून पाहिला तर?",
      ],
    ],
    "'ऑफिस सकाळी 8 वाजता सुरू करावे' या प्रस्तावाला कोणी विरोध करतो. आक्षेप मान्य करा, तुमची बाजू आणि एक उपाय सांगा.",
  ),
  newLesson(
    "formal-email",
    "work",
    "Write a clear formal email",
    "स्पष्ट औपचारिक ईमेल लिहा",
    "औपचारिक ईमेलचा क्रम: अभिवादन (Dear Ms Patil,), उद्देश (I am writing to …), तपशील (Please find attached … / Could you please …?), शेवट (I look forward to hearing from you.), समारोप (Kind regards, + नाव). नाव माहीत नसेल तर Dear Sir or Madam. 'Hi' आणि छोटी रूपे (I'm, can't) औपचारिक ईमेलमध्ये टाळा.",
    "Dear … · I am writing to … · Please find attached … · I look forward to … · Kind regards",
    [
      [
        "Dear Ms Patil, I am writing to confirm our meeting on Monday.",
        "आदरणीय सुश्री पाटील, सोमवारच्या आपल्या बैठकीची खात्री करण्यासाठी मी हा ईमेल लिहीत आहे.",
      ],
      [
        "Please find attached the updated price list.",
        "सुधारित किंमत यादी सोबत जोडली आहे.",
      ],
      [
        "Could you please confirm the delivery date?",
        "कृपया पोहोचवण्याची तारीख निश्चित कराल का?",
      ],
      [
        "I look forward to hearing from you. Kind regards, Ravi Kulkarni",
        "आपल्या उत्तराची वाट पाहत आहे. शुभेच्छांसह, रवी कुलकर्णी",
      ],
    ],
    "एका कंपनीला ईमेल लिहून बोलून दाखवा: उद्देश, एक विनंती आणि योग्य शेवट.",
  ),
];

export const kits: Record<string, Enrich> = {
  softening: lessonKit(
    "softening",
    [
      "I can disagree, refuse or ask for changes politely at work.",
      "मी कामावर नम्रपणे असहमती दाखवू शकतो/शकते, नकार देऊ शकतो/शकते किंवा बदल मागू शकतो/शकते.",
    ],
    [
      ["A", "Can we finish the whole project by Friday?", "आपण संपूर्ण प्रकल्प शुक्रवारपर्यंत पूर्ण करू शकतो का?"],
      [
        "B",
        "I'm not sure that's realistic. It might be better to finish the first part by Friday.",
        "ते शक्य होईल याची मला खात्री नाही. शुक्रवारपर्यंत पहिला भाग पूर्ण करणे कदाचित चांगले होईल.",
      ],
      ["A", "Hmm. What about the rest?", "हं. उरलेल्या भागाचे काय?"],
      [
        "B",
        "Would it be possible to deliver it next Wednesday?",
        "उरलेला भाग पुढच्या बुधवारी देणे शक्य होईल का?",
      ],
    ],
    [
      "I'm not sure that + sentence",
      "It might be better to + verb",
      "Would it be possible to + verb?",
      "I was wondering if you could + verb",
    ],
    [
      und(
        "बैठकीत सर्वात नम्र असहमती कोणती?",
        "I'm not sure that will work.",
        ["That is wrong.", "No. Bad idea."],
        "I'm not sure that … ने असहमती सौम्य होते. 'That is wrong' आणि 'Bad idea' कामाच्या ठिकाणी कठोर वाटतात.",
      ),
      gap(
        "It might be ___ to wait until Monday.",
        "better",
        ["good", "best"],
        "दोन पर्यायांची तुलना करून सुचवताना It might be better to … . best तीन किंवा अधिकांतून एकासाठी असते.",
      ),
      gap(
        "Would it be ___ to move the meeting?",
        "possible",
        ["possibly", "possibility"],
        "Would it be possible to + क्रियापद हा नम्र विनंतीचा साचा. possibly क्रियाविशेषण आहे, इथे विशेषण हवे.",
      ),
      resp(
        "Can you work this Saturday?",
        "I'm afraid I can't this Saturday. Would next Saturday be possible?",
        ["No. I don't want.", "Saturday is not my problem."],
        "नकार देताना I'm afraid … ने सुरुवात करा आणि पर्याय सुचवा. थेट 'No' उद्धट वाटते.",
      ),
      m2e(
        "तुम्ही किंमत थोडी कमी करू शकाल का, असा विचार करत होतो.",
        "I was wondering if you could reduce the price slightly.",
        ["I was wondering you reduce the price slightly.", "I wonder you could reducing the price."],
        "I was wondering if you could + मूळ क्रियापद. if सुटले किंवा -ing वापरले तर रचना चुकते.",
      ),
      lis(
        "It might be better to send the samples first and discuss the price later.",
        "ऐका. वक्ता आधी काय करायला सुचवतो?",
        "नमुने पाठवणे",
        ["किंमत ठरवणे", "बैठक रद्द करणे"],
        "send the samples first म्हणजे आधी नमुने पाठवा; किंमत नंतर (later).",
      ),
    ],
    rolePlay(
      "",
      "advanced",
      ["नम्रपणे बदल मागणे", "Asking for a change politely"],
      "तुमचे व्यवस्थापक उद्या सकाळी अहवाल मागतात, पण तुम्हाला आणखी एक दिवस हवा आहे.",
      "तुम्ही: टीम सदस्य",
      [
        ["o", "I need the full report tomorrow morning.", "मला उद्या सकाळी पूर्ण अहवाल हवा आहे."],
        [
          "y",
          "नम्रपणे शंका व्यक्त करा.",
          "I'm not sure that's possible. Some of the figures are still missing.",
          "I'm not sure that…",
        ],
        ["o", "So what do you suggest?", "मग तुम्ही काय सुचवता?"],
        [
          "y",
          "एक दिवस जास्त मागा.",
          "Would it be possible to send it on Thursday instead?",
          "Would it be possible to…?",
        ],
        ["o", "Thursday is fine, but send me a summary tomorrow.", "गुरुवार चालेल, पण उद्या मला सारांश पाठवा."],
        ["y", "मान्य करा.", "Of course. I'll send you a short summary tomorrow.", "Of course. I'll…"],
      ],
    ),
  ),
  negotiating: lessonKit(
    "negotiating",
    [
      "I can make an offer with a condition and say what my limit is.",
      "मी अट घालून प्रस्ताव देऊ शकतो/शकते आणि माझी मर्यादा सांगू शकतो/शकते.",
    ],
    [
      ["A", "Your price is too high for us.", "तुमची किंमत आम्हाला खूप जास्त आहे."],
      [
        "B",
        "If you can order two hundred units, we could reduce it by five percent.",
        "तुम्ही दोनशे नग मागवल्यास आम्ही किंमत पाच टक्क्यांनी कमी करू शकतो.",
      ],
      ["A", "Could you go to ten percent?", "दहा टक्क्यांपर्यंत जाऊ शकाल का?"],
      [
        "B",
        "I'm afraid that's as far as we can go, but we could deliver free of charge.",
        "माफ करा, आम्ही यापेक्षा पुढे जाऊ शकत नाही, पण आम्ही मोफत पोहोचवू शकतो.",
      ],
    ],
    [
      "If you can + verb, we could + verb",
      "We could … on condition that …",
      "Would you be willing to + verb?",
      "That's as far as we can go.",
    ],
    [
      gap(
        "If you can pay in advance, we ___ give you a discount.",
        "could",
        ["can to", "would to"],
        "प्रस्तावात If you can …, we could … . could नंतर थेट मूळ क्रियापद येते — मध्ये to नाही.",
      ),
      gap(
        "We will deliver on Friday on ___ that you confirm today.",
        "condition",
        ["conditional", "conditions"],
        "on condition that = '… या अटीवर'. हा ठरलेला वाक्प्रचार आहे; conditional विशेषण आहे.",
      ),
      und(
        "'That's as far as we can go.' याचा अर्थ काय?",
        "आम्ही यापेक्षा जास्त सूट देऊ शकत नाही",
        ["आम्ही खूप दूर प्रवास करू", "आम्ही आणखी चर्चा करू"],
        "वाटाघाटीत as far as we can go म्हणजे आमची शेवटची मर्यादा. अंतराशी याचा संबंध नाही.",
      ),
      resp(
        "Would you be willing to sign a two-year contract?",
        "Yes, if you could lower the monthly fee.",
        ["Yes, I am willing sign.", "Two years is a contract."],
        "होकार देताना बदल्यात अट घाला: Yes, if you could … . 'willing sign' मध्ये to सुटले आहे.",
      ),
      e2m(
        "If you ordered more, we would reduce the price.",
        "तुम्ही जास्त मागवलेत तर आम्ही किंमत कमी करू.",
        ["तुम्ही जास्त मागवले, म्हणून किंमत कमी झाली.", "आम्ही किंमत कधीही कमी करत नाही."],
        "If + भूतकाळी रूप (ordered), would + क्रियापद ही काल्पनिक अट आहे: 'असे केलेत तर …'. मागणी आधीच झाली आहे, असे हे वाक्य सांगत नाही.",
      ),
      bld(
        "तुम्ही आज खात्री केल्यास आम्ही शुक्रवारी पोहोचवू शकतो.",
        "We could deliver on Friday if you confirm today.",
        ["will", "confirmed"],
        "क्रम: प्रस्ताव (We could deliver on Friday) + अट (if you confirm today). अट वर्तमानकाळात: confirm.",
      ),
    ],
    rolePlay(
      "",
      "advanced",
      ["किंमतीची वाटाघाटी", "Negotiating a price"],
      "एक ग्राहक तुमच्या कंपनीकडून ऑफिस खुर्च्या घेऊ इच्छितो पण किंमत कमी हवी आहे.",
      "तुम्ही: विक्री अधिकारी",
      [
        ["o", "We like your chairs, but the price is too high.", "आम्हाला तुमच्या खुर्च्या आवडल्या, पण किंमत खूप जास्त आहे."],
        [
          "y",
          "अट घालून सूट द्या.",
          "If you can order fifty chairs, we could give you a seven percent discount.",
          "If you can…, we could…",
        ],
        ["o", "Can you make it fifteen percent?", "पंधरा टक्के करू शकाल का?"],
        [
          "y",
          "मर्यादा सांगा आणि दुसरे काहीतरी देऊ करा.",
          "I'm afraid that's as far as we can go, but we could include free delivery.",
          "I'm afraid that's as far as… but we could…",
        ],
        ["o", "Free delivery and ten percent?", "मोफत पोहोचवणे आणि दहा टक्के?"],
        [
          "y",
          "अटीवर मान्य करा.",
          "We could agree to that on condition that you pay within thirty days.",
          "on condition that…",
        ],
      ],
    ),
  ),
  objections: lessonKit(
    "objections",
    [
      "I can respond to an objection calmly: acknowledge it, explain my view and offer a solution.",
      "मी आक्षेपाला शांतपणे उत्तर देऊ शकतो/शकते: तो मान्य करून, माझी बाजू सांगून आणि उपाय सुचवून.",
    ],
    [
      ["A", "Online training won't work. People won't pay attention.", "ऑनलाइन प्रशिक्षण चालणार नाही. लोक लक्ष देणार नाहीत."],
      [
        "B",
        "That's a fair concern. However, short sessions keep people focused.",
        "ती रास्त काळजी आहे. तरीही छोट्या सत्रांमुळे लोकांचे लक्ष टिकते.",
      ],
      ["A", "I'm still not convinced.", "मला अजूनही पटलेले नाही."],
      [
        "B",
        "What if we try it with one team for a month and then decide?",
        "एका टीमसोबत एक महिना प्रयोग करून मग ठरवले तर?",
      ],
    ],
    [
      "I see your point, but …",
      "That's a fair concern. However, …",
      "I see it slightly differently.",
      "What if we + verb?",
    ],
    [
      und(
        "आक्षेपाला उत्तर देण्याची पहिली पायरी कोणती?",
        "आक्षेप मान्य करणे",
        ["लगेच विरोध करणे", "विषय बदलणे"],
        "आधी समोरच्याचा मुद्दा मान्य केला (I see your point) की तो तुमचे ऐकायला तयार होतो. लगेच विरोध केल्यास वाद वाढतो.",
      ),
      gap(
        "That's a fair concern. ___, the new system saves time.",
        "However",
        ["Because", "So"],
        "However = तरीही; मान्य केलेल्या मुद्द्यानंतर दुसरी बाजू मांडते. because कारणासाठी आणि so परिणामासाठी.",
      ),
      gap(
        "What ___ we try it for one month?",
        "if",
        ["about", "when"],
        "What if we + क्रियापद? म्हणजे '… केले तर?' असा उपाय सुचवणे. What about नंतर नाम किंवा -ing येते (What about trying…).",
      ),
      resp(
        "Your plan is too expensive.",
        "I see your point, but it will save us money within a year.",
        ["You are wrong about money.", "Expensive is not important."],
        "मुद्दा मान्य करा (I see your point) आणि मग पुराव्यासह तुमची बाजू सांगा. 'You are wrong' उद्धट वाटते.",
      ),
      m2e(
        "मी याकडे थोड्या वेगळ्या दृष्टीने पाहतो.",
        "I see it slightly differently.",
        ["I see it slightly different.", "I am seeing it a little different way."],
        "क्रियापदाचे वर्णन करताना क्रियाविशेषण differently (different विशेषण आहे). slightly ने असहमती सौम्य होते.",
      ),
      lis(
        "I understand the risk. However, if we wait, our competitors will launch first.",
        "ऐका. वक्ता थांबायला का तयार नाही?",
        "स्पर्धक आधी उत्पादन आणतील",
        ["धोका काहीच नाही", "पैसे संपले आहेत"],
        "However नंतर वक्त्याची खरी बाजू येते: थांबलो तर competitors आधी launch करतील.",
      ),
    ],
    rolePlay(
      "",
      "advanced",
      ["प्रस्तावावरील आक्षेप", "Answering an objection"],
      "तुम्ही नवीन हजेरी ॲप सुचवले आहे. एक सहकारी त्याला विरोध करतो.",
      "तुम्ही: प्रस्ताव मांडणारे",
      [
        ["o", "I don't think a new app is a good idea. Staff won't use it.", "नवीन ॲप चांगली कल्पना वाटत नाही. कर्मचारी ते वापरणार नाहीत."],
        [
          "y",
          "आक्षेप मान्य करा आणि तुमची बाजू सांगा.",
          "That's a fair concern. However, the app takes only ten seconds a day.",
          "That's a fair concern. However,…",
        ],
        ["o", "People don't like change.", "लोकांना बदल आवडत नाही."],
        [
          "y",
          "उपाय सुचवा.",
          "What if we try it with one department for a month first?",
          "What if we…?",
        ],
        ["o", "Fine. One month, then we review it.", "ठीक आहे. एक महिना, मग आढावा घेऊ."],
        ["y", "आभार माना आणि पुढची पायरी सांगा.", "Thank you. I'll share the results at the end of the month.", "Thank you. I'll…"],
      ],
    ),
  ),
  "formal-email": lessonKit(
    "formal-email",
    [
      "I can write and read a short formal email with the right opening, purpose and ending.",
      "मी योग्य सुरुवात, उद्देश आणि शेवट असलेला छोटा औपचारिक ईमेल लिहू आणि वाचू शकतो/शकते.",
    ],
    [
      ["A", "Dear Mr Shah, I am writing to ask about your training courses.", "आदरणीय श्री. शाह, आपल्या प्रशिक्षण अभ्यासक्रमांबद्दल विचारण्यासाठी मी लिहीत आहे."],
      ["A", "Could you please send me the fees and dates?", "कृपया शुल्क आणि तारखा पाठवाल का?"],
      [
        "B",
        "Dear Ms Joshi, thank you for your email. Please find attached our course list.",
        "आदरणीय सुश्री जोशी, आपल्या ईमेलबद्दल धन्यवाद. आमची अभ्यासक्रम यादी सोबत जोडली आहे.",
      ],
      [
        "B",
        "I look forward to hearing from you. Kind regards, Amit Shah",
        "आपल्या उत्तराची वाट पाहत आहे. शुभेच्छांसह, अमित शाह",
      ],
    ],
    [
      "Dear Mr/Ms + surname, · Dear Sir or Madam,",
      "I am writing to + verb",
      "Please find attached …",
      "I look forward to hearing from you. · Kind regards,",
    ],
    [
      und(
        "प्राप्तकर्त्याचे नाव माहीत नसेल तर ईमेलची सुरुवात कशी कराल?",
        "Dear Sir or Madam,",
        ["Hi friend,", "Hello everybody!"],
        "औपचारिक ईमेलमध्ये नाव माहीत नसल्यास Dear Sir or Madam. Hi/Hello मित्रांसाठी किंवा अनौपचारिक संदेशांसाठी.",
      ),
      gap(
        "I am writing ___ confirm our meeting on Monday.",
        "to",
        ["for", "that"],
        "उद्देश सांगताना I am writing to + मूळ क्रियापद. for नंतर नाम येते (I am writing for information — कमी नैसर्गिक).",
      ),
      gap(
        "I look forward to ___ from you.",
        "hearing",
        ["hear", "heard"],
        "look forward to मधील to नंतर -ing रूप येते: hearing. हा नेहमीचा अपवाद लक्षात ठेवा.",
      ),
      e2m(
        "Please find attached the invoice.",
        "बिल सोबत जोडले आहे.",
        ["कृपया बिल शोधून काढा.", "बिल अजून तयार नाही."],
        "Please find attached हा ईमेलमधील ठरलेला वाक्प्रचार: 'सोबत जोडले आहे'. find चा शब्दशः 'शोधा' असा अर्थ इथे नाही.",
      ),
      bld(
        "कृपया पोहोचवण्याची तारीख निश्चित कराल का?",
        "Could you please confirm the delivery date?",
        ["confirming", "can"],
        "नम्र विनंती: Could you please + मूळ क्रियापद + वस्तू? confirming इथे चालत नाही.",
      ),
      und(
        "औपचारिक ईमेलचा योग्य शेवट कोणता?",
        "Kind regards, Neha Desai",
        ["Bye bye, Neha", "Ok thanks Neha :)"],
        "औपचारिक ईमेलचा समारोप Kind regards, + पूर्ण नाव. Bye bye आणि smiley अनौपचारिक आहेत.",
      ),
    ],
    rolePlay(
      "",
      "advanced",
      ["ईमेल मोठ्याने तयार करणे", "Drafting an email aloud"],
      "तुमचे व्यवस्थापक तुम्हाला पुरवठादाराला ईमेल कसा लिहायचा ते बोलून दाखवायला सांगतात.",
      "तुम्ही: कर्मचारी",
      [
        ["o", "How will you start the email to Mr Rao?", "श्री. राव यांना ईमेलची सुरुवात कशी कराल?"],
        ["y", "अभिवादन आणि उद्देश सांगा.", "Dear Mr Rao, I am writing to ask about our order.", "Dear Mr…, I am writing to…"],
        ["o", "Good. What do you need from him?", "छान. तुम्हाला त्यांच्याकडून काय हवे आहे?"],
        [
          "y",
          "नम्र विनंती करा.",
          "Could you please confirm the delivery date for order 245?",
          "Could you please…?",
        ],
        ["o", "And how will you finish?", "आणि शेवट कसा कराल?"],
        [
          "y",
          "औपचारिक शेवट सांगा.",
          "I look forward to hearing from you. Kind regards, and then my full name.",
          "I look forward to… Kind regards,…",
        ],
      ],
    ),
  ),
};

export const unit: Unit = {
  id: "a1",
  path: "advanced",
  title: "व्यावसायिक संवाद: सौम्य भाषा, वाटाघाटी आणि ईमेल",
  en: "Professional communication: softening, negotiating and email",
  outcome: [
    "I can disagree politely, negotiate with conditions, handle objections and write a formal email.",
    "मी नम्रपणे असहमती दाखवू शकतो/शकते, अटींसह वाटाघाटी करू शकतो/शकते, आक्षेप हाताळू शकतो/शकते आणि औपचारिक ईमेल लिहू शकतो/शकते.",
  ],
  lessons: ["softening", "negotiating", "objections", "formal-email"],
  checkpoint: {
    scenario: [
      "A client wants a lower price and an earlier delivery. You reply in a meeting and then by email.",
      "एका ग्राहकाला कमी किंमत आणि लवकर डिलिव्हरी हवी आहे. तुम्ही बैठकीत आणि नंतर ईमेलने उत्तर देता.",
    ],
    ex: finish("a1", "cp", [
      resp(
        "We need the goods two weeks earlier.",
        "I'm not sure that's possible, but we could send half of the order early.",
        ["No, impossible. Goodbye.", "Earlier is two weeks, yes."],
        "सौम्य शंका (I'm not sure …) आणि लगेच पर्याय (we could …): ग्राहक नाराज न होता चर्चा पुढे जाते.",
      ),
      gap(
        "If you ___ pay half now, we could deliver earlier.",
        "can",
        ["could to", "will to"],
        "अटीचा प्रस्ताव: If you can + क्रियापद, we could … . can/could नंतर to येत नाही.",
      ),
      und(
        "ग्राहक म्हणतो 'Your competitor is cheaper.' सर्वात चांगले उत्तर कोणते?",
        "I see your point. However, our price includes installation and support.",
        ["Then buy from them.", "Our competitor is bad."],
        "आक्षेप मान्य करा, मग तुमच्या किमतीत काय अधिक मिळते ते सांगा. प्रतिस्पर्ध्यावर टीका किंवा उद्धट उत्तर टाळा.",
      ),
      lis(
        "Dear Mr Kale, I am writing to confirm the new delivery date of the fifth of March. Kind regards, Priya",
        "ऐका. ईमेलचा उद्देश काय आहे?",
        "नवीन डिलिव्हरी तारीख निश्चित करणे",
        ["बैठक रद्द करणे", "किंमत वाढवणे"],
        "I am writing to confirm the new delivery date — उद्देश नेहमी 'I am writing to' नंतर येतो.",
      ),
    ]),
    speak:
      "ग्राहकाला एका मिनिटात उत्तर द्या: त्यांची मागणी मान्य करा, अट घालून एक प्रस्ताव द्या आणि ईमेलने पुष्टी करण्याचे सांगा.",
  },
};
