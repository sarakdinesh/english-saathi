import {
  bld,
  e2m,
  gap,
  lessonKit,
  lis,
  m2e,
  newLesson,
  resp,
  rolePlay,
  und,
  finish,
} from "../author";
import type { Unit, Enrich } from "../types";

export const lessons = [
  newLesson(
    "reasons-examples",
    "fluency",
    "Give reasons and examples",
    "फक्त 'हो' किंवा 'नाही' पुरेसे नाही",
    "उत्तर लांब करण्यासाठी कारण आणि उदाहरण द्या. कारण: because, so, that is why. उदाहरण: for example, such as. 'Because' कारण सांगतो (I stayed home because it rained). 'So' परिणाम सांगतो (It rained, so I stayed home).",
    "answer + because + reason · answer. For example, + example",
    [
      [
        "I like my city because it is friendly.",
        "मला माझे शहर आवडते कारण ते मैत्रीपूर्ण आहे.",
      ],
      [
        "It was raining, so we stayed at home.",
        "पाऊस पडत होता, म्हणून आम्ही घरीच राहिलो.",
      ],
      [
        "I enjoy outdoor activities, such as cycling and walking.",
        "मला सायकल चालवणे आणि चालणे यांसारखे मैदानी उपक्रम आवडतात.",
      ],
      [
        "Many apps help learners. For example, you can practise speaking daily.",
        "अनेक अॅप्स शिकणाऱ्यांना मदत करतात. उदाहरणार्थ, तुम्ही रोज बोलण्याचा सराव करू शकता.",
      ],
    ],
    "'तुम्हाला तुमचे काम/अभ्यास का आवडतो?' याचे दोन कारणे आणि एका उदाहरणासह उत्तर द्या.",
  ),
  newLesson(
    "adding-details",
    "fluency",
    "Add details to your answer",
    "उत्तर स्पष्ट आणि पूर्ण करा",
    "लहान उत्तराला तपशील जोडा: कोण, कुठे, केव्हा, किती वेळा, कसे. रचना: मुख्य उत्तर + एक तपशील + एक कारण किंवा भावना. 'I work in IT.' हे फक्त उत्तर आहे. 'I work in IT, mainly on customer support, and I enjoy helping people.' हे पूर्ण उत्तर आहे.",
    "main answer + detail + reason / feeling",
    [
      [
        "I live in Pune, near the railway station.",
        "मी पुण्यात, रेल्वे स्टेशनजवळ राहतो/राहते.",
      ],
      [
        "I usually study in the evening, after work.",
        "मी सहसा संध्याकाळी, कामानंतर अभ्यास करतो/करते.",
      ],
      [
        "I travel by bus, which takes about forty minutes.",
        "मी बसने प्रवास करतो/करते, ज्याला सुमारे चाळीस मिनिटे लागतात.",
      ],
      [
        "I like cooking, especially on weekends, because I can try new dishes.",
        "मला स्वयंपाक करायला आवडतो, विशेषतः आठवड्याच्या शेवटी, कारण मी नवीन पदार्थ करून पाहू शकतो/शकते.",
      ],
    ],
    "'तुमचा रोजचा दिवस कसा असतो?' याचे तीन तपशीलांसह उत्तर द्या.",
  ),
];

export const kits: Record<string, Enrich> = {
  connectors: lessonKit(
    "connectors",
    [
      "I can join ideas with and, but and because.",
      "मी and, but आणि because वापरून कल्पना जोडू शकतो/शकते.",
    ],
    [
      ["A", "Do you like your new job?", "तुम्हाला तुमची नवीन नोकरी आवडते का?"],
      ["B", "Yes, but it is tiring.", "हो, पण ती थकवणारी आहे."],
      ["A", "Why is it tiring?", "ती थकवणारी का आहे?"],
      [
        "B",
        "Because I start early and finish late.",
        "कारण मी लवकर सुरू करतो/करते आणि उशिरा संपवतो/संपवते.",
      ],
    ],
    [
      "idea + and + idea",
      "idea + but + different idea",
      "idea + because + reason",
    ],
    [
      gap(
        "I am tired, ___ I am happy.",
        "but",
        ["and", "because"],
        "दोन विरुद्ध गोष्टी जोडण्यासाठी but वापरा.",
      ),
      gap(
        "I am learning English ___ I want a better job.",
        "because",
        ["but", "or"],
        "कारण सांगण्यासाठी because वापरा.",
      ),
      e2m(
        "I stayed home because it rained.",
        "पाऊस पडला म्हणून मी घरी राहिलो/राहिले.",
        ["मी घरी राहिलो आणि पाऊस थांबला.", "मी घरी राहिलो पण पाऊस पडला नाही."],
        "because नंतर कारण येते.",
      ),
      resp(
        "Why are you learning English?",
        "Because I want to speak with confidence.",
        ["But I am from Pune.", "And you are welcome."],
        "'का?' या प्रश्नाला Because ने सुरू होणारे कारण द्या.",
      ),
      bld(
        "मला चहा आवडतो पण कॉफी नाही.",
        "I like tea but not coffee.",
        ["and"],
        "एक आवड आणि एक नावड सांगताना but वापरा.",
      ),
    ],
    rolePlay(
      "",
      "intermediate",
      ["कारण सांगणे", "Giving a reason"],
      "तुमचा मित्र विचारतो की तुम्ही इंग्रजी का शिकत आहात.",
      "तुम्ही: मित्र",
      [
        ["o", "Why are you learning English?", "तुम्ही इंग्रजी का शिकत आहात?"],
        [
          "y",
          "because वापरून एक कारण सांगा.",
          "I am learning English because I want a better job.",
          "Because I want…",
        ],
        ["o", "That is great. Is it difficult?", "छान. ते अवघड आहे का?"],
        [
          "y",
          "but वापरून तुमचा अनुभव सांगा.",
          "It is difficult, but I practise every day.",
          "It is difficult, but…",
        ],
      ],
    ),
  ),
  "reasons-examples": lessonKit(
    "reasons-examples",
    [
      "I can give a reason and an example in my answer.",
      "मी माझ्या उत्तरात कारण आणि उदाहरण देऊ शकतो/शकते.",
    ],
    [
      [
        "A",
        "Do you enjoy working from home?",
        "तुम्हाला घरून काम करायला आवडते का?",
      ],
      [
        "B",
        "Yes, because I save travel time.",
        "हो, कारण माझा प्रवासाचा वेळ वाचतो.",
      ],
      ["A", "Can you give an example?", "तुम्ही उदाहरण देऊ शकता का?"],
      [
        "B",
        "Sure. For example, I can start work at nine instead of leaving home at seven.",
        "नक्की. उदाहरणार्थ, मी सात वाजता घर सोडण्याऐवजी नऊ वाजता काम सुरू करू शकतो/शकते.",
      ],
    ],
    ["…, because …", "…, so …", "For example, … / such as …"],
    [
      gap(
        "It was raining, ___ we stayed at home.",
        "so",
        ["because", "such as"],
        "आधी कारण आणि मग परिणाम सांगायचा असेल तर so वापरा.",
      ),
      gap(
        "I stayed at home ___ it was raining.",
        "because",
        ["so", "for example"],
        "because नंतर कारण येते.",
      ),
      und(
        "'I enjoy sports, such as cricket and football.' मध्ये such as काय करते?",
        "उदाहरणे देते",
        ["कारण सांगते", "प्रश्न विचारते"],
        "such as नंतर उदाहरणे येतात.",
      ),
      resp(
        "Why do you like your city?",
        "Because people are friendly. For example, neighbours always help.",
        ["Yes, I am a student.", "I like to go home."],
        "कारण आणि उदाहरण दोन्ही असलेले उत्तर पूर्ण वाटते.",
      ),
      lis(
        "I took a taxi because it was late.",
        "ऐका. व्यक्तीने टॅक्सी का घेतली?",
        "उशीर झाला होता",
        ["टॅक्सी स्वस्त होती", "पाऊस पडत होता"],
        "because नंतर कारण ऐका: it was late.",
      ),
      bld(
        "पाऊस पडत होता म्हणून आम्ही घरी राहिलो.",
        [
          "It was raining so we stayed home.",
          "It was raining, so we stayed home.",
        ],
        ["because"],
        "परिणाम सांगताना so वापरा.",
      ),
    ],
    rolePlay(
      "",
      "intermediate",
      ["कारण आणि उदाहरण", "A reason and an example"],
      "तुमचा सहकारी घरून काम करण्याबद्दल तुमचे मत विचारतो.",
      "तुम्ही: सहकारी",
      [
        [
          "o",
          "Do you prefer working from home or from the office?",
          "तुम्हाला घरून काम करायला आवडते की ऑफिसमधून?",
        ],
        [
          "y",
          "तुमची पसंती कारणासह सांगा.",
          "I prefer the office because I can discuss ideas quickly.",
          "I prefer… because…",
        ],
        ["o", "Can you give an example?", "तुम्ही उदाहरण देऊ शकाल का?"],
        [
          "y",
          "for example वापरून एक उदाहरण द्या.",
          "For example, we can solve a problem in five minutes.",
          "For example…",
        ],
      ],
    ),
  ),
  "adding-details": lessonKit(
    "adding-details",
    [
      "I can make my answer clearer by adding details.",
      "मी तपशील जोडून माझे उत्तर अधिक स्पष्ट करू शकतो/शकते.",
    ],
    [
      ["A", "Where do you live?", "तुम्ही कुठे राहता?"],
      [
        "B",
        "I live in Pune, near the railway station.",
        "मी पुण्यात, रेल्वे स्टेशनजवळ राहतो/राहते.",
      ],
      ["A", "How do you go to work?", "तुम्ही कामावर कसे जाता?"],
      [
        "B",
        "By bus. It takes about forty minutes, but I read on the way.",
        "बसने. सुमारे चाळीस मिनिटे लागतात, पण मी वाटेत वाचतो/वाचते.",
      ],
    ],
    [
      "main answer + detail",
      "main answer + detail + reason",
      "It takes about … minutes.",
    ],
    [
      und(
        "कोणते उत्तर अधिक पूर्ण आहे?",
        "I live in Pune, near the station.",
        ["Pune.", "Yes."],
        "ठिकाणाबरोबर तपशील दिल्यास उत्तर स्पष्ट होते.",
      ),
      gap(
        "It ___ about forty minutes to reach my office.",
        "takes",
        ["take", "taking"],
        "It नंतर takes येते.",
      ),
      e2m(
        "I usually study in the evening, after work.",
        "मी सहसा संध्याकाळी, कामानंतर अभ्यास करतो/करते.",
        ["मी सकाळी कामावर जातो/जाते.", "मी कधीच अभ्यास करत नाही."],
        "after work म्हणजे कामानंतर.",
      ),
      resp(
        "How do you go to work?",
        "By bus. It takes about forty minutes.",
        ["Bus.", "Yes, I go."],
        "प्रवासाचे साधन आणि वेळ सांगितल्यास उत्तर पूर्ण होते.",
      ),
      m2e(
        "मी पुण्यात राहतो, स्टेशनजवळ.",
        "I live in Pune, near the station.",
        ["I am live Pune near station.", "I lives in Pune near the station."],
        "I live आणि तपशील near the station.",
      ),
      bld(
        "मला स्वयंपाक आवडतो कारण मी नवीन पदार्थ करून पाहू शकतो.",
        "I like cooking because I can try new dishes.",
        ["is"],
        "आवड + because + कारण अशी रचना.",
      ),
    ],
    rolePlay(
      "",
      "intermediate",
      ["तपशीलवार उत्तर", "A detailed answer"],
      "एक नवीन सहकारी तुमच्याबद्दल विचारत आहे.",
      "तुम्ही: सहकारी",
      [
        ["o", "Where do you live?", "तुम्ही कुठे राहता?"],
        [
          "y",
          "ठिकाण आणि जवळची खूण सांगा.",
          "I live in Pune, near the station.",
          "I live in…",
        ],
        ["o", "How do you come to the office?", "तुम्ही ऑफिसला कसे येता?"],
        [
          "y",
          "साधन आणि लागणारा वेळ सांगा.",
          "By bus. It takes about forty minutes.",
          "By… It takes…",
        ],
        [
          "o",
          "That is a long journey. How do you spend the time?",
          "तो मोठा प्रवास आहे. तुम्ही वेळ कसा घालवता?",
        ],
        [
          "y",
          "एक तपशील आणि कारण द्या.",
          "I read or listen to English podcasts, so the time is useful.",
          "I read… so…",
        ],
      ],
    ),
  ),
};

export const unit: Unit = {
  id: "i1",
  path: "intermediate",
  title: "लांब आणि स्पष्ट उत्तरे",
  en: "Longer answers: reasons, examples and details",
  outcome: [
    "I can give a clear answer with a reason, an example and a detail.",
    "मी कारण, उदाहरण आणि तपशीलासह स्पष्ट उत्तर देऊ शकतो/शकते.",
  ],
  lessons: ["connectors", "reasons-examples", "adding-details"],
  checkpoint: {
    scenario: [
      "A friend asks why you chose your hobby.",
      "तुमचा मित्र तुमचा छंद तुम्ही का निवडला ते विचारतो.",
    ],
    ex: finish("i1", "cp", [
      und(
        "कोणते उत्तर सर्वात पूर्ण आहे?",
        "I love photography because I can show beautiful places. For example, I took pictures of Sinhagad last month.",
        ["Photography.", "Yes, I love it."],
        "कारण आणि उदाहरण असलेले उत्तर पूर्ण वाटते.",
      ),
      gap(
        "I practise daily, ___ my speaking is improving.",
        "so",
        ["because", "such as"],
        "प्रयत्न आणि परिणाम जोडण्यासाठी so वापरा.",
      ),
      resp(
        "Why did you choose cycling?",
        "Because it keeps me fit, and it is cheap.",
        ["I choose cycle yes.", "At Sunday morning."],
        "कारणे because ने सुरू करा आणि and ने जोडा.",
      ),
      bld(
        "मला फिरायला आवडते, उदाहरणार्थ किल्ले पाहायला.",
        [
          "I like travelling, for example visiting forts.",
          "I like travelling, for example, visiting forts.",
        ],
        ["so"],
        "for example नंतर उदाहरण येते.",
      ),
    ]),
    speak:
      "तुमचा एक छंद सांगा: त्याचे एक कारण, एक उदाहरण आणि एक तपशील द्या (सुमारे ३० सेकंद).",
  },
};
