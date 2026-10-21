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
    "explain-experience",
    "work",
    "Explain your experience",
    "तुमचा अनुभव स्पष्ट सांगा",
    "अनुभव सांगताना किती काळ (for / since), कुठे आणि काय केले ते सांगा. For = कालावधी (for three years), since = सुरुवातीचा बिंदू (since 2021). Present perfect ने चालू अनुभव: I have worked here for three years. Simple past ने संपलेले काम: I worked in Pune from 2018 to 2021.",
    "I have worked … for + period / since + point · I worked … from … to …",
    [
      [
        "I have worked as an accountant for three years.",
        "मी तीन वर्षे लेखापाल म्हणून काम केले आहे.",
      ],
      [
        "I have been with this company since 2021.",
        "मी २०२१ पासून या कंपनीत आहे.",
      ],
      [
        "Before that, I worked in a bank in Pune from 2018 to 2021.",
        "त्याआधी मी २०१८ ते २०२१ दरम्यान पुण्यातील बँकेत काम केले.",
      ],
      [
        "In my last job, I managed a team of five people.",
        "माझ्या मागच्या नोकरीत मी पाच जणांचा संघ सांभाळला.",
      ],
    ],
    "तुमच्या अनुभवाबद्दल (काम, अभ्यास किंवा स्वयंसेवा) चार वाक्ये बोला.",
  ),
  newLesson(
    "strengths-goals",
    "work",
    "Strengths, weaknesses and goals",
    "ताकद, कमकुवत बाजू आणि ध्येय",
    "मुलाखतीत ताकद सांगताना उदाहरण द्या (I am good at … For example, …). कमकुवत बाजू प्रामाणिकपणे सांगा आणि त्यावर काम करत असल्याचे जोडा (I sometimes … but I am working on it by …). ध्येय सांगताना In the next few years, I would like to … वापरा.",
    "I am good at … For example, … · I sometimes …, but I am working on it by … · I would like to …",
    [
      [
        "I am good at planning. For example, I organised a training for forty people.",
        "मी नियोजनात चांगला/चांगली आहे. उदाहरणार्थ, मी चाळीस जणांचे प्रशिक्षण आयोजित केले.",
      ],
      [
        "I sometimes take too long to decide, but I am working on it by setting deadlines.",
        "मी कधी कधी निर्णय घ्यायला जास्त वेळ घेतो, पण मुदत ठरवून त्यावर काम करत आहे.",
      ],
      [
        "In the next few years, I would like to become a team leader.",
        "पुढील काही वर्षांत मला संघनेता व्हायला आवडेल.",
      ],
      [
        "I am willing to learn new skills quickly.",
        "मी नवीन कौशल्ये लवकर शिकायला तयार आहे.",
      ],
    ],
    "तुमची एक ताकद उदाहरणासह, एक कमकुवत बाजू आणि एक ध्येय सांगा.",
  ),
];

export const kits: Record<string, Enrich> = {
  interview: lessonKit(
    "interview",
    [
      "I can introduce myself and answer basic interview questions.",
      "मी स्वतःची ओळख करून देऊ शकतो/शकते आणि मुलाखतीतील साधे प्रश्न सोडवू शकतो/शकते.",
    ],
    [
      [
        "A",
        "Thank you for coming. Please tell me about yourself.",
        "आल्याबद्दल धन्यवाद. कृपया तुमच्याबद्दल सांगा.",
      ],
      [
        "B",
        "Thank you for this opportunity. I have completed my graduation and I enjoy working with a team.",
        "या संधीबद्दल धन्यवाद. मी पदवी पूर्ण केली आहे आणि मला संघासोबत काम करायला आवडते.",
      ],
      ["A", "Why do you want this job?", "तुम्हाला ही नोकरी का हवी आहे?"],
      [
        "B",
        "I am willing to learn, and I would like to grow in this field.",
        "मी शिकायला तयार आहे आणि मला या क्षेत्रात पुढे जायचे आहे.",
      ],
    ],
    [
      "Thank you for this opportunity.",
      "I have completed … · I enjoy … · I am willing to …",
    ],
    [
      und(
        "मुलाखतीची नम्र सुरुवात कोणती?",
        "Thank you for this opportunity.",
        ["Give me the job.", "I am here now yes."],
        "संधीबद्दल आभार मानणे सभ्य आहे.",
      ),
      gap(
        "I ___ completed my graduation.",
        "have",
        ["am", "do"],
        "पूर्ण झालेल्या गोष्टीसाठी have completed.",
      ),
      gap(
        "I enjoy ___ with a team.",
        "working",
        ["work", "to works"],
        "enjoy नंतर verb-ing.",
      ),
      e2m(
        "I am willing to learn.",
        "मी शिकायला तयार आहे.",
        ["मी शिकवायला तयार नाही.", "मला शिकायला वेळ नाही."],
        "willing to म्हणजे तयार असणे.",
      ),
      resp(
        "Why do you want this job?",
        "I am willing to learn, and I would like to grow in this field.",
        ["I want job because want.", "Because yes job."],
        "कारण आणि ध्येय स्पष्ट सांगा.",
      ),
      lis(
        "I have completed my graduation and I enjoy working with a team.",
        "ऐका. व्यक्तीला कशात आनंद मिळतो?",
        "संघासोबत काम करण्यात",
        ["एकटे काम करण्यात", "प्रवास करण्यात"],
        "enjoy working with a team म्हणजे संघासोबत काम करणे आवडते.",
      ),
    ],
    rolePlay(
      "",
      "intermediate",
      ["मुलाखत", "A job interview"],
      "तुम्ही नोकरीसाठी मुलाखत देत आहात.",
      "तुम्ही: उमेदवार",
      [
        [
          "o",
          "Thank you for coming. Please tell me about yourself.",
          "आल्याबद्दल धन्यवाद. कृपया तुमच्याबद्दल सांगा.",
        ],
        [
          "y",
          "आभार माना आणि तुमचे शिक्षण आणि एक आवड सांगा.",
          "Thank you for this opportunity. I have completed my graduation and I enjoy working with a team.",
          "Thank you for this opportunity. I have…",
        ],
        ["o", "Why do you want this job?", "तुम्हाला ही नोकरी का हवी आहे?"],
        [
          "y",
          "कारण आणि तुमची तयारी सांगा.",
          "I want to learn new skills, and I am willing to work hard.",
          "I want to… and I am willing to…",
        ],
        [
          "o",
          "Do you have any questions for us?",
          "तुम्हाला आम्हाला काही प्रश्न आहेत का?",
        ],
        [
          "y",
          "एक प्रश्न विचारा (प्रशिक्षण किंवा कामाबद्दल).",
          "Yes. Could you tell me about the training for new employees?",
          "Yes. Could you tell me about…",
        ],
      ],
      true,
    ),
  ),
  "explain-experience": lessonKit(
    "explain-experience",
    [
      "I can explain my work experience clearly.",
      "मी माझा कामाचा अनुभव स्पष्टपणे सांगू शकतो/शकते.",
    ],
    [
      [
        "A",
        "Can you tell me about your experience?",
        "तुम्ही तुमच्या अनुभवाबद्दल सांगाल का?",
      ],
      [
        "B",
        "I have worked as an accountant for three years. I have been with this company since 2021.",
        "मी तीन वर्षे लेखापाल म्हणून काम केले आहे. मी २०२१ पासून या कंपनीत आहे.",
      ],
      ["A", "And before that?", "आणि त्याआधी?"],
      [
        "B",
        "I worked in a bank in Pune from 2018 to 2021. I managed a team of five.",
        "मी २०१८ ते २०२१ दरम्यान पुण्यातील बँकेत काम केले. मी पाच जणांचा संघ सांभाळला.",
      ],
    ],
    [
      "I have worked … for + period",
      "I have been … since + point",
      "I worked … from … to …",
    ],
    [
      gap(
        "I have worked here ___ three years.",
        "for",
        ["since", "from"],
        "कालावधीसाठी for.",
      ),
      gap(
        "I have been here ___ 2021.",
        "since",
        ["for", "from"],
        "सुरुवातीच्या बिंदूसाठी since.",
      ),
      und(
        "'I worked in Pune from 2018 to 2021.' मध्ये कोणता काळ वापरला आहे?",
        "Simple past (संपलेला काळ)",
        ["Present perfect", "Future"],
        "ठरावीक संपलेल्या काळासाठी simple past.",
      ),
      e2m(
        "I managed a team of five people.",
        "मी पाच जणांचा संघ सांभाळला.",
        ["मी पाच वर्षे काम केले.", "मला पाच जणांनी मदत केली."],
        "managed a team म्हणजे संघ सांभाळला.",
      ),
      resp(
        "How long have you worked here?",
        "I have worked here for three years.",
        ["I worked here since three years.", "I am work here three years."],
        "कालावधी सांगताना for + period.",
      ),
      m2e(
        "मी दोन वर्षे या कंपनीत काम केले आहे.",
        "I have worked for this company for two years.",
        [
          "I worked for this company since two years.",
          "I have work for this company for two years.",
        ],
        "दोन वर्षे काम केले आहे = have worked + for two years.",
      ),
    ],
    rolePlay(
      "",
      "intermediate",
      ["अनुभव सांगणे", "Explaining your experience"],
      "मुलाखतकार तुमच्या अनुभवाबद्दल विचारतो.",
      "तुम्ही: उमेदवार",
      [
        [
          "o",
          "How long have you worked as an accountant?",
          "तुम्ही लेखापाल म्हणून किती काळ काम केले आहे?",
        ],
        [
          "y",
          "कालावधी सांगा आणि कुठे ते सांगा.",
          "I have worked as an accountant for three years, mostly in a bank.",
          "I have worked as … for…",
        ],
        [
          "o",
          "What did you do in your last job?",
          "तुम्ही मागच्या नोकरीत काय केले?",
        ],
        [
          "y",
          "एक जबाबदारी आणि एक यश सांगा.",
          "I managed a team of five and I reduced errors by twenty percent.",
          "I managed… and I…",
        ],
        ["o", "Why did you leave?", "तुम्ही का सोडले?"],
        [
          "y",
          "सकारात्मक कारण सांगा आणि प्रश्न विचारा.",
          "I wanted more responsibility. What opportunities are there in this role?",
          "I wanted… What opportunities…",
        ],
      ],
    ),
  ),
  "strengths-goals": lessonKit(
    "strengths-goals",
    [
      "I can talk about my strengths, weaknesses and goals with examples.",
      "मी उदाहरणांसह माझी ताकद, कमकुवत बाजू आणि ध्येय सांगू शकतो/शकते.",
    ],
    [
      ["A", "What are your strengths?", "तुमची ताकद काय आहे?"],
      [
        "B",
        "I am good at planning. For example, I organised a training for forty people.",
        "मी नियोजनात चांगला/चांगली आहे. उदाहरणार्थ, मी चाळीस जणांचे प्रशिक्षण आयोजित केले.",
      ],
      ["A", "And a weakness?", "आणि कमकुवत बाजू?"],
      [
        "B",
        "I sometimes take too long to decide, but I am working on it by setting deadlines.",
        "मी कधी कधी निर्णयाला खूप वेळ घेतो, पण मुदत ठरवून त्यावर काम करत आहे.",
      ],
    ],
    [
      "I am good at … For example, …",
      "I sometimes …, but I am working on it by …",
      "I would like to …",
    ],
    [
      gap(
        "I am good ___ planning.",
        "at",
        ["in", "on"],
        "एखाद्या गोष्टीत चांगले असणे = good at + noun / verb-ing.",
      ),
      und(
        "कमकुवत बाजू सांगण्याचा सर्वोत्तम मार्ग कोणता?",
        "I sometimes take too long, but I am working on it.",
        ["I have no weakness.", "I am bad."],
        "प्रामाणिकपणा आणि सुधारणेचा प्रयत्न दाखवा.",
      ),
      gap(
        "In the next few years, I ___ like to become a team leader.",
        "would",
        ["will", "am"],
        "ध्येयासाठी would like to.",
      ),
      e2m(
        "For example, I organised a training for forty people.",
        "उदाहरणार्थ, मी चाळीस जणांचे प्रशिक्षण आयोजित केले.",
        ["मी चाळीस वर्षे काम केले.", "मला प्रशिक्षण मिळाले नाही."],
        "For example म्हणजे उदाहरणार्थ.",
      ),
      resp(
        "What are your goals?",
        "I would like to become a team leader in the next few years.",
        ["I will goal.", "My goal am a leader."],
        "ध्येय would like to ने सांगा.",
      ),
      lis(
        "I am good at learning quickly. For example, I learnt a new software in two days.",
        "ऐका. उदाहरण काय आहे?",
        "दोन दिवसांत नवे सॉफ्टवेअर शिकले",
        ["दोन आठवडे प्रशिक्षण", "नवीन नोकरी"],
        "learnt a new software in two days हे उदाहरण आहे.",
      ),
    ],
    rolePlay(
      "",
      "intermediate",
      ["ताकद आणि ध्येय", "Strengths and goals"],
      "मुलाखतीतील पुढचे प्रश्न.",
      "तुम्ही: उमेदवार",
      [
        [
          "o",
          "What is your biggest strength?",
          "तुमची सर्वात मोठी ताकद कोणती?",
        ],
        [
          "y",
          "ताकद आणि एक उदाहरण सांगा.",
          "I am good at planning. For example, I organised a training for forty people.",
          "I am good at… For example,…",
        ],
        ["o", "And what is a weakness?", "आणि कमकुवत बाजू काय?"],
        [
          "y",
          "प्रामाणिक कमकुवत बाजू आणि सुधारणा सांगा.",
          "I sometimes take too long to decide, but I am setting deadlines to improve.",
          "I sometimes…, but I am…",
        ],
        [
          "o",
          "Where do you see yourself in five years?",
          "पाच वर्षांनी तुम्ही स्वतःला कुठे पाहता?",
        ],
        [
          "y",
          "ध्येय सांगा आणि कंपनीबद्दल एक प्रश्न विचारा.",
          "I would like to become a team leader. Could you tell me about growth opportunities here?",
          "I would like to… Could you tell me…",
        ],
      ],
    ),
  ),
};

export const unit: Unit = {
  id: "i6",
  path: "intermediate",
  title: "मुलाखत आणि अनुभव",
  en: "Interviews and explaining experience",
  outcome: [
    "I can answer common interview questions about my experience, strengths and goals.",
    "मी माझ्या अनुभव, ताकद आणि ध्येयाबद्दलचे सामान्य मुलाखत-प्रश्न सोडवू शकतो/शकते.",
  ],
  lessons: ["interview", "explain-experience", "strengths-goals"],
  checkpoint: {
    scenario: [
      "You are talking to a mentor who is preparing you for a new job in a different company.",
      "वेगळ्या कंपनीतील नवीन नोकरीसाठी एक मार्गदर्शक तुम्हाला तयार करत आहे.",
    ],
    ex: finish("i6", "cp", [
      resp(
        "Why should we hire you?",
        "I have two years of experience and I learn quickly. For example, I learnt a new tool in a week.",
        ["I should am hired.", "Because I want hire."],
        "अनुभव आणि उदाहरण द्या.",
      ),
      gap(
        "I have been in this field ___ 2022.",
        "since",
        ["for", "from"],
        "सुरुवातीच्या बिंदूसाठी since.",
      ),
      gap(
        "I have worked here ___ two years.",
        "for",
        ["since", "at"],
        "कालावधीसाठी for.",
      ),
      bld(
        "मला संघनेता व्हायला आवडेल.",
        "I would like to become a team leader.",
        ["will"],
        "ध्येयासाठी would like to.",
      ),
    ]),
    speak:
      "तुमच्या नवीन नोकरीच्या मुलाखतीसाठी तुमची ओळख, एक ताकद उदाहरणासह आणि एक ध्येय सुमारे एक मिनिटात सांगा.",
  },
};
