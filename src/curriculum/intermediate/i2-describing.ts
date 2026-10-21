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
    "describe-person",
    "fluency",
    "Describe a person",
    "व्यक्तीचे वर्णन करा",
    "व्यक्तीचे वर्णन करताना दिसणे (tall, slim, short hair), स्वभाव (kind, friendly, hard-working) आणि ती काय करते ते सांगा. रचना: He / She is + adjective; has + वैशिष्ट्य; is good at + noun / verb-ing; looks + adjective (दिसते).",
    "is + adjective · has + feature · is good at + noun / verb-ing · looks + adjective",
    [
      [
        "My manager is tall and very friendly.",
        "माझे व्यवस्थापक उंच आणि खूप मैत्रीपूर्ण आहेत.",
      ],
      [
        "She has short black hair and a warm smile.",
        "तिचे केस लहान काळे आहेत आणि हसू उबदार आहे.",
      ],
      ["He is good at solving problems.", "तो समस्या सोडवण्यात चांगला आहे."],
      [
        "She looks tired today because she worked late.",
        "आज ती थकलेली दिसते कारण तिने उशिरापर्यंत काम केले.",
      ],
    ],
    "तुमच्या आवडत्या व्यक्तीचे वर्णन करा: दिसणे, स्वभाव आणि ती कशात चांगली आहे.",
  ),
  newLesson(
    "describe-place",
    "fluency",
    "Describe a place",
    "ठिकाणाचे वर्णन करा",
    "ठिकाणाचे वर्णन करताना कुठे आहे, कसे आहे, कशासाठी प्रसिद्ध आहे आणि तिथे काय करता येते ते सांगा. उपयुक्त रचना: It is a … town in …; It is famous for …; There is / are …; You can … there; The best thing about it is …",
    "It is a(n) + adjective + place in … · famous for … · You can …",
    [
      [
        "Satara is a quiet town in western Maharashtra.",
        "सातारा हे पश्चिम महाराष्ट्रातील शांत शहर आहे.",
      ],
      [
        "It is famous for its forts and the Kaas plateau.",
        "ते आपले किल्ले आणि कास पठारासाठी प्रसिद्ध आहे.",
      ],
      [
        "You can walk up to the fort early in the morning.",
        "तुम्ही पहाटे किल्ल्यावर चालत जाऊ शकता.",
      ],
      [
        "The best thing about it is the fresh air.",
        "तिथली सर्वात चांगली गोष्ट म्हणजे शुद्ध हवा.",
      ],
    ],
    "तुमच्या शहराचे किंवा गावाचे चार वाक्यांत वर्णन करा.",
  ),
  newLesson(
    "describe-experience",
    "fluency",
    "Describe an experience",
    "एखादा अनुभव सांगा",
    "अनुभव सांगताना कधी आणि कुठे झाले, काय झाले, तुम्हाला कसे वाटले आणि तुम्ही काय शिकलात ते सांगा. भावनांसाठी: excited / nervous / proud (मला वाटले) आणि exciting / tiring / surprising (गोष्ट कशी होती). -ed शब्द व्यक्तीच्या भावना सांगतात; -ing शब्द गोष्टीबद्दल सांगतात.",
    "When + what happened → I felt + -ed → It was + -ing → I learnt that …",
    [
      [
        "Last year I visited Goa with my family.",
        "गेल्या वर्षी मी कुटुंबासोबत गोव्याला गेलो/गेले.",
      ],
      ["The trip was exciting but tiring.", "ती सहल रोमांचक पण थकवणारी होती."],
      [
        "I felt nervous before the exam, but I was proud afterwards.",
        "परीक्षेआधी मला भीती वाटली, पण नंतर अभिमान वाटला.",
      ],
      [
        "I learnt that good preparation helps.",
        "मी शिकलो/शिकले की चांगली तयारी उपयोगी पडते.",
      ],
    ],
    "तुमच्या लक्षात राहिलेल्या एका अनुभवाबद्दल सहा वाक्ये बोला.",
  ),
];

export const kits: Record<string, Enrich> = {
  "describe-person": lessonKit(
    "describe-person",
    [
      "I can describe a person's appearance, character and skills.",
      "मी एखाद्या व्यक्तीचे दिसणे, स्वभाव आणि कौशल्ये यांचे वर्णन करू शकतो/शकते.",
    ],
    [
      ["A", "Who is your new manager?", "तुमचे नवीन व्यवस्थापक कोण आहेत?"],
      [
        "B",
        "Her name is Meera. She is tall, with short black hair.",
        "तिचे नाव मीरा आहे. ती उंच आहे आणि तिचे केस लहान काळे आहेत.",
      ],
      ["A", "What is she like?", "ती कशी आहे?"],
      [
        "B",
        "She is friendly and very good at solving problems.",
        "ती मैत्रीपूर्ण आहे आणि समस्या सोडवण्यात खूप चांगली आहे.",
      ],
    ],
    [
      "She is + adjective, with + feature",
      "She is good at + noun / verb-ing",
      "What is she like?",
    ],
    [
      und(
        "'What is she like?' मध्ये like चा अर्थ काय?",
        "ती कशी आहे (स्वभाव/वर्णन)",
        ["तिला काय आवडते", "ती कुठे जाते"],
        "What is she like? म्हणजे ती कशी आहे.",
      ),
      gap(
        "He is good ___ solving problems.",
        "at",
        ["in", "on"],
        "एखाद्या गोष्टीत चांगले असणे = good at + noun / verb-ing.",
      ),
      gap(
        "She ___ tired today. (थकलेली दिसते)",
        "looks",
        ["looks like", "see"],
        "looks + adjective म्हणजे दिसते.",
      ),
      e2m(
        "She has a warm smile.",
        "तिचे हसू उबदार आहे.",
        ["तिला हसायला आवडत नाही.", "ती खूप हसते."],
        "warm smile म्हणजे उबदार हसू.",
      ),
      resp(
        "What is your friend like?",
        "He is kind and hard-working.",
        ["He likes cricket.", "He is from Pune."],
        "What is … like? ला स्वभावाने उत्तर द्या.",
      ),
      m2e(
        "तो खूप मदत करणारा आहे आणि विनोदी आहे.",
        "He is very helpful and funny.",
        ["He helps very and funny.", "He has helpful and funny."],
        "स्वभाव सांगताना is + adjective वापरा: helpful (मदत करणारा), funny (विनोदी).",
      ),
    ],
    rolePlay(
      "",
      "intermediate",
      ["व्यक्तीचे वर्णन", "Describing someone"],
      "नवीन सहकारी तुमच्या मित्राबद्दल विचारतो.",
      "तुम्ही: मित्र",
      [
        [
          "o",
          "Who is that tall man with the glasses?",
          "चष्मा घातलेला तो उंच माणूस कोण आहे?",
        ],
        [
          "y",
          "तो तुमचा मित्र आहे असे सांगा आणि तो काय करतो ते सांगा.",
          "He is my friend Amit. He works in IT.",
          "He is my friend…",
        ],
        ["o", "What is he like?", "तो कसा आहे?"],
        [
          "y",
          "त्याचा स्वभाव सांगा आणि तो कशात चांगला आहे ते सांगा.",
          "He is friendly and he is good at explaining things.",
          "He is… and good at…",
        ],
        [
          "o",
          "Sounds great. Can you introduce me?",
          "छान वाटतो. तुम्ही माझी ओळख करून द्याल का?",
        ],
        [
          "y",
          "हो म्हणा आणि त्यालाही तेच विचारा: तो कसा आहे? किंवा 'तुम्हाला भेटायला आवडेल का?'.",
          "Of course. Would you like to meet him now?",
          "Of course. Would you like to…",
        ],
      ],
    ),
  ),
  "describe-place": lessonKit(
    "describe-place",
    [
      "I can describe a place and say why it is special.",
      "मी एखाद्या ठिकाणाचे वर्णन करू शकतो/शकते आणि ते खास का आहे ते सांगू शकतो/शकते.",
    ],
    [
      ["A", "Where are you from?", "तुम्ही कुठले आहात?"],
      [
        "B",
        "I am from Satara. It is a quiet town in western Maharashtra.",
        "मी साताऱ्याचा/ची आहे. ते पश्चिम महाराष्ट्रातील शांत शहर आहे.",
      ],
      ["A", "What is it famous for?", "ते कशासाठी प्रसिद्ध आहे?"],
      [
        "B",
        "It is famous for its forts. The best thing is the fresh air.",
        "ते आपल्या किल्ल्यांसाठी प्रसिद्ध आहे. सर्वात चांगली गोष्ट म्हणजे शुद्ध हवा.",
      ],
    ],
    [
      "It is a … town in …",
      "It is famous for …",
      "You can … there.",
      "The best thing about it is …",
    ],
    [
      gap(
        "Satara is famous ___ its forts.",
        "for",
        ["at", "of"],
        "famous for + गोष्ट.",
      ),
      gap(
        "You ___ walk up to the fort in the morning.",
        "can",
        ["are", "does"],
        "शक्यतेसाठी can.",
      ),
      und(
        "'quiet town' म्हणजे काय?",
        "शांत शहर",
        ["मोठे शहर", "गर्दीचे शहर"],
        "quiet म्हणजे शांत.",
      ),
      e2m(
        "The best thing about it is the fresh air.",
        "तिथली सर्वात चांगली गोष्ट म्हणजे शुद्ध हवा.",
        ["तिथली हवा खराब आहे.", "तिथे हवा नाही."],
        "the best thing म्हणजे सर्वात चांगली गोष्ट.",
      ),
      resp(
        "What is your city famous for?",
        "It is famous for its markets and food.",
        ["It is a famous.", "It is for famous markets."],
        "famous for + कारण.",
      ),
      lis(
        "My village is small, but it has a beautiful lake.",
        "ऐका. गावात काय खास आहे?",
        "सुंदर तलाव",
        ["मोठे शहर", "बाजार"],
        "beautiful lake म्हणजे सुंदर तलाव.",
      ),
    ],
    rolePlay(
      "",
      "intermediate",
      ["तुमचे शहर", "Talking about your town"],
      "नवीन सहकारी तुमच्या गावाबद्दल विचारतो.",
      "तुम्ही: सहकारी",
      [
        ["o", "Where are you from?", "तुम्ही कुठले आहात?"],
        [
          "y",
          "तुमचे गाव आणि ते कसे आहे ते सांगा.",
          "I am from Satara. It is a quiet town in western Maharashtra.",
          "I am from… It is a…",
        ],
        ["o", "What is it famous for?", "ते कशासाठी प्रसिद्ध आहे?"],
        [
          "y",
          "कारण आणि एक गोष्ट सांगा जी करता येते.",
          "It is famous for its forts. You can walk up to them early in the morning.",
          "It is famous for… You can…",
        ],
        ["o", "That sounds lovely.", "छान वाटते."],
        [
          "y",
          "त्यालाही विचारा त्याचे गाव कोणते.",
          "What about you? Where are you from?",
          "What about you…",
        ],
      ],
    ),
  ),
  "present-perfect": lessonKit(
    "present-perfect",
    [
      "I can talk about experiences and results up to now.",
      "आतापर्यंतचे अनुभव आणि परिणाम मी सांगू शकतो/शकते.",
    ],
    [
      ["A", "Have you ever visited Goa?", "तुम्ही कधी गोव्याला गेला आहात का?"],
      [
        "B",
        "Yes, I have. I visited it last year.",
        "हो. मी गेल्या वर्षी तिथे गेलो होतो/गेले होते.",
      ],
      ["A", "Have you finished your report?", "तुमचा अहवाल पूर्ण झाला आहे का?"],
      [
        "B",
        "Not yet. I have finished the first part.",
        "अजून नाही. पहिला भाग पूर्ण केला आहे.",
      ],
    ],
    ["have / has + past participle", "Have you ever …? · I have never …"],
    [
      gap(
        "I ___ finished my work.",
        "have",
        ["has", "am"],
        "I सोबत have + finished.",
      ),
      gap("She ___ lost her keys.", "has", ["have", "is"], "she सोबत has."),
      und(
        "कोणते वाक्य योग्य आहे?",
        "I visited Goa last year.",
        ["I have visited Goa last year.", "I am visited Goa last year."],
        "last year सारखी ठरावीक वेळ असेल तर simple past (visited).",
      ),
      e2m(
        "Have you eaten?",
        "तुमचे जेवण झाले आहे का?",
        ["तुम्ही जेवण कराल का?", "तुम्ही काय खाता?"],
        "Have you eaten? म्हणजे जेवण झाले का.",
      ),
      resp(
        "Have you ever been to Mumbai?",
        "Yes, I have. I went there in 2020.",
        ["Yes, I am Mumbai.", "Yes, I have went."],
        "Have you ever…? ला Yes, I have. आणि तपशील भूतकाळात.",
      ),
      m2e(
        "तिच्या चाव्या हरवल्या आहेत.",
        "She has lost her keys.",
        ["She have lost her keys.", "She is lost her keys."],
        "she सोबत has + lost.",
      ),
    ],
    rolePlay(
      "",
      "intermediate",
      ["अनुभवांबद्दल गप्पा", "Sharing experiences"],
      "तुम्ही सहकाऱ्यासोबत प्रवासाबद्दल गप्पा मारता.",
      "तुम्ही: सहकारी",
      [
        [
          "o",
          "Have you ever travelled abroad?",
          "तुम्ही कधी परदेश प्रवास केला आहे का?",
        ],
        [
          "y",
          "तुमचे उत्तर सांगा (हो/नाही) आणि एक तपशील द्या.",
          "No, I have not, but I have visited many states in India.",
          "No, I have not, but I have…",
        ],
        [
          "o",
          "Which one did you like the most?",
          "तुम्हाला कोणते सर्वात जास्त आवडले?",
        ],
        [
          "y",
          "ठिकाण सांगा, कधी गेलात ते सांगा आणि कारण द्या.",
          "I liked Kerala the most. I went there in 2022 because I love nature.",
          "I liked… I went there in…",
        ],
        ["o", "Nice.", "छान."],
        [
          "y",
          "त्याला विचारा: तुम्ही कुठे गेला आहात?",
          "Where have you been?",
          "Where have you…",
        ],
      ],
    ),
  ),
  "describe-experience": lessonKit(
    "describe-experience",
    [
      "I can describe an experience and how I felt.",
      "मी एखादा अनुभव आणि मला कसे वाटले ते सांगू शकतो/शकते.",
    ],
    [
      ["A", "How was your trip to Goa?", "गोव्याची सहल कशी झाली?"],
      [
        "B",
        "It was exciting but tiring. I felt excited, then exhausted.",
        "ती रोमांचक पण थकवणारी होती. आधी उत्साही, मग खूप थकलो/थकले.",
      ],
      ["A", "What was the best part?", "सर्वात चांगला भाग कोणता?"],
      [
        "B",
        "The beach at sunrise. I learnt that early mornings can be beautiful.",
        "सूर्योदयाचा समुद्रकिनारा. मी शिकलो/शिकले की पहाटे सुंदर असू शकते.",
      ],
    ],
    [
      "It was + exciting / tiring (गोष्ट)",
      "I felt + excited / nervous / proud (मला)",
      "I learnt that …",
    ],
    [
      gap(
        "The trip was ___. (रोमांचक)",
        "exciting",
        ["excited", "excite"],
        "गोष्टीबद्दल -ing शब्द: exciting.",
      ),
      gap(
        "I felt ___ before the exam. (भीती वाटली)",
        "nervous",
        ["nervously", "nerve"],
        "भावनेसाठी adjective nervous.",
      ),
      und(
        "'I was excited' आणि 'It was exciting' यातील फरक काय?",
        "excited = मला कसे वाटले; exciting = गोष्ट कशी होती",
        ["दोन्हीचा अर्थ सारखाच", "excited म्हणजे थकलेला"],
        "-ed भावना, -ing गोष्टीचे वर्णन.",
      ),
      e2m(
        "I learnt that good preparation helps.",
        "मी शिकलो/शिकले की चांगली तयारी उपयोगी पडते.",
        ["मी तयारी केली नाही.", "मला तयारी आवडत नाही."],
        "learnt that… म्हणजे … शिकलो.",
      ),
      resp(
        "How was your trip?",
        "It was exciting but tiring.",
        ["It is tiring trip.", "I was exciting."],
        "सहल कशी होती त्यासाठी It was + adjective.",
      ),
      lis(
        "Last year I visited Goa. It was tiring, but I felt proud because I planned everything.",
        "ऐका. व्यक्तीला अभिमान का वाटला?",
        "तिने/त्याने सर्व काही नियोजित केले",
        ["सहल स्वस्त होती", "सहल लहान होती"],
        "because I planned everything म्हणजे सर्व नियोजन स्वतः केले.",
      ),
    ],
    rolePlay(
      "",
      "intermediate",
      ["अनुभव सांगणे", "Telling an experience"],
      "मित्र तुमच्या सहलीबद्दल विचारतो.",
      "तुम्ही: मित्र",
      [
        [
          "o",
          "How was your trip last weekend?",
          "गेल्या आठवड्याच्या शेवटची सहल कशी होती?",
        ],
        [
          "y",
          "सहल कशी होती आणि तुम्हाला कसे वाटले ते सांगा.",
          "It was exciting but tiring. I felt happy and exhausted.",
          "It was… I felt…",
        ],
        ["o", "What was the best part?", "सर्वात चांगला भाग कोणता?"],
        [
          "y",
          "सर्वात चांगला भाग सांगा आणि कारण द्या.",
          "The best part was the sunrise, because it was really peaceful.",
          "The best part was…",
        ],
        ["o", "Did you learn anything?", "तुम्ही काही शिकलात का?"],
        [
          "y",
          "एक शिकवण सांगा आणि त्यालाही विचारा.",
          "I learnt that planning helps. Have you ever done a trip like that?",
          "I learnt that… Have you ever…",
        ],
      ],
    ),
  ),
};

export const unit: Unit = {
  id: "i2",
  path: "intermediate",
  title: "व्यक्ती, ठिकाणे आणि अनुभव",
  en: "Describing people, places and experiences",
  outcome: [
    "I can describe a person, a place and an experience in detail.",
    "मी एखादी व्यक्ती, ठिकाण आणि अनुभव तपशीलवार सांगू शकतो/शकते.",
  ],
  lessons: [
    "describe-person",
    "describe-place",
    "present-perfect",
    "describe-experience",
  ],
  checkpoint: {
    scenario: [
      "At a family dinner, a relative asks about your colleague, your city and your last trip.",
      "कौटुंबिक जेवणात एक नातेवाईक तुमचा सहकारी, तुमचे शहर आणि तुमची शेवटची सहल याबद्दल विचारतो.",
    ],
    ex: finish("i2", "cp", [
      resp(
        "What is your colleague Ravi like?",
        "He is calm and good at explaining difficult things.",
        ["He is tall in the office yes.", "He likes Ravi."],
        "'कसा आहे?' या प्रश्नाला स्वभाव सांगा.",
      ),
      gap(
        "Pune is famous ___ its colleges and food.",
        "for",
        ["by", "to"],
        "famous for + कारण.",
      ),
      und(
        "'I felt proud' मध्ये proud काय सांगते?",
        "माझी भावना",
        ["गोष्टीचा गुण", "ठिकाणाचे नाव"],
        "proud म्हणजे अभिमान; ही भावना आहे.",
      ),
      gap(
        "I ___ never been to Rajasthan.",
        "have",
        ["has", "did"],
        "never सोबत have + been.",
      ),
      bld(
        "ती सहल थकवणारी पण छान होती.",
        "The trip was tiring but wonderful.",
        ["tired"],
        "गोष्टीचे वर्णन: tiring.",
      ),
    ]),
    speak:
      "तुमचा आवडता सहकारी, तुमचे शहर आणि तुमची लक्षात राहिलेली सहल प्रत्येकी दोन वाक्यांत सांगा.",
  },
};
