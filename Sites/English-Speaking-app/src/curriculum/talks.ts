import type { Talk } from "./types";

// Longer speaking tasks (about one to two minutes). Preparation is optional.
export const talks: Talk[] = [
  {
    id: "talk-myself",
    level: "intermediate",
    title: "Introduce yourself in one minute",
    mr: "एका मिनिटात स्वतःची ओळख",
    prompt: "तुमचे नाव, गाव, काम किंवा अभ्यास, छंद आणि पुढील ध्येय सांगा.",
    outline: [
      "नाव आणि गाव",
      "काम किंवा अभ्यास",
      "एक छंद आणि त्याचे कारण",
      "भविष्यातील एक ध्येय",
    ],
    starters: [
      "Let me introduce myself.",
      "I work as… / I study…",
      "In my free time, I…",
      "In the future, I would like to…",
    ],
  },
  {
    id: "talk-place",
    level: "intermediate",
    title: "Describe a place you like",
    mr: "तुमच्या आवडत्या जागेचे वर्णन",
    prompt:
      "एखादे आवडते ठिकाण निवडा आणि ते कसे आहे, तिथे काय करता आणि ते का आवडते ते सांगा.",
    outline: [
      "ठिकाण आणि ते कुठे आहे",
      "ते कसे दिसते",
      "तिथे तुम्ही काय करता",
      "ते तुम्हाला का आवडते",
    ],
    starters: [
      "I would like to talk about…",
      "It is located in…",
      "What I like most is…",
      "That is why I enjoy going there.",
    ],
  },
  {
    id: "talk-experience",
    level: "intermediate",
    title: "Tell about a memorable experience",
    mr: "लक्षात राहिलेला अनुभव",
    prompt:
      "एखादी आठवण निवडा. आधी काय झाले, मग काय झाले आणि शेवटी काय वाटले ते क्रमाने सांगा.",
    outline: [
      "कधी आणि कुठे",
      "सुरुवातीला काय झाले",
      "मग काय झाले",
      "शेवटी तुम्हाला काय वाटले",
    ],
    starters: [
      "A few years ago, I…",
      "At first… then… after that…",
      "Finally, …",
      "I learnt that…",
    ],
  },
  {
    id: "talk-day",
    level: "intermediate",
    title: "Describe your usual day",
    mr: "तुमचा नेहमीचा दिवस",
    prompt:
      "सकाळपासून रात्रीपर्यंत तुमचा दिवस कसा जातो ते वेळ आणि तपशीलांसह सांगा.",
    outline: ["सकाळ", "दुपार", "संध्याकाळ", "तुमचा आवडता भाग आणि कारण"],
    starters: [
      "I usually start my day at…",
      "After that, I…",
      "In the evening, I…",
      "My favourite part of the day is… because…",
    ],
  },
  {
    id: "talk-problem",
    level: "intermediate",
    title: "Explain a problem and a solution",
    mr: "अडचण आणि उपाय",
    prompt:
      "एखादी रोजची अडचण (उदा. वाहतूक, इंटरनेट) सांगा. तिचे परिणाम आणि तुमचे उपाय सांगा.",
    outline: [
      "अडचण काय आहे",
      "त्याचा परिणाम काय होतो",
      "तुम्ही काय प्रयत्न केले",
      "तुमचा सुचवलेला उपाय",
    ],
    starters: [
      "The main problem is…",
      "Because of this, …",
      "To solve it, we could…",
      "I think the best solution is…",
    ],
  },
  {
    id: "talk-opinion",
    level: "intermediate",
    title: "Give your opinion",
    mr: "तुमचे मत मांडा",
    prompt:
      "'मुलांनी मोबाईल वापरावा का?' किंवा तुम्हाला आवडणारा दुसरा विषय निवडा आणि मत कारणांसह सांगा.",
    outline: [
      "तुमचे मत",
      "पहिले कारण आणि उदाहरण",
      "दुसरे कारण",
      "दुसऱ्या बाजूचा एक मुद्दा आणि निष्कर्ष",
    ],
    starters: [
      "In my opinion, …",
      "One reason is that…",
      "On the other hand, …",
      "Overall, I believe…",
    ],
  },
  {
    id: "talk-compare",
    level: "intermediate",
    title: "Compare two options",
    mr: "दोन पर्यायांची तुलना",
    prompt:
      "बस आणि रेल्वे, घर आणि ऑफिसमधून काम, किंवा तुमचे दोन पर्याय निवडा. फायदे-तोटे सांगून निवड स्पष्ट करा.",
    outline: [
      "दोन पर्याय",
      "पहिल्याचे फायदे",
      "दुसऱ्याचे फायदे",
      "तुमची निवड आणि कारण",
    ],
    starters: [
      "There are two options: …",
      "The first is cheaper, but…",
      "Compared with…",
      "I would choose… because…",
    ],
  },
  {
    id: "talk-update",
    level: "intermediate",
    title: "Give a short work update",
    mr: "कामाबद्दल छोटे अपडेट",
    prompt:
      "तुमच्या सध्याच्या कामाबद्दल काय पूर्ण झाले, काय सुरू आहे आणि पुढे काय करायचे ते सांगा.",
    outline: [
      "काय पूर्ण झाले",
      "काय सुरू आहे",
      "कोणती अडचण आहे",
      "पुढील पावले आणि मदत",
    ],
    starters: [
      "Here is a quick update.",
      "I have finished…",
      "I am currently working on…",
      "Next week, I will…",
    ],
  },
];
