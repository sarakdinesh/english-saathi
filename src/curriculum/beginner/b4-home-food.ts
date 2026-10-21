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
    "food-drink",
    "vocabulary",
    "Food and drink",
    "खाणे-पिणे आणि आवड",
    "जेवणाचे शब्द: rice, bread, dal, vegetables, fruit, milk, tea, coffee, water. खाण्यासाठी eat आणि पिण्यासाठी drink वापरा. विचारताना Do you want …? किंवा Would you like …? म्हणा. 'चविष्ट' = tasty, 'तिखट' = spicy.",
    "I eat / drink + food · Do you want + food or + food?",
    [
      [
        "I eat rice and dal for lunch.",
        "मी दुपारच्या जेवणात भात-वरण खातो/खाते.",
      ],
      ["I drink tea in the morning.", "मी सकाळी चहा पितो/पिते."],
      ["Do you want milk or tea?", "तुम्हाला दूध हवे की चहा?"],
      ["This food is very tasty.", "हे जेवण खूप चविष्ट आहे."],
    ],
    "तुमचा नाश्ता, दुपारचे आणि रात्रीचे जेवण काय असते ते सांगा.",
  ),
];

export const kits: Record<string, Enrich> = {
  "home-words": lessonKit(
    "home-words",
    [
      "I can name things at home and say where they are.",
      "मी घरातील वस्तूंची नावे सांगू शकतो/शकते आणि त्या कुठे आहेत ते सांगू शकतो/शकते.",
    ],
    [
      [
        "A",
        "Welcome to our home. This is the kitchen.",
        "आमच्या घरी स्वागत आहे. हे स्वयंपाकघर आहे.",
      ],
      ["B", "It is very clean.", "ते खूप स्वच्छ आहे."],
      [
        "A",
        "Please open the window. It is hot.",
        "कृपया खिडकी उघडा. गरम होत आहे.",
      ],
      ["B", "Sure. Thank you for the tea.", "नक्की. चहाबद्दल धन्यवाद."],
    ],
    ["This is the + room / thing.", "Please open / close the + thing."],
    [
      e2m(
        "Window",
        "खिडकी",
        ["दार", "भिंत"],
        "window म्हणजे खिडकी. दार म्हणजे door.",
      ),
      m2e(
        "स्वयंपाकघर",
        "kitchen",
        ["bedroom", "bathroom"],
        "स्वयंपाकघर म्हणजे kitchen.",
      ),
      gap(
        "Please ___ the window. (उघडा)",
        "open",
        ["close", "wash"],
        "open म्हणजे उघडणे; close म्हणजे बंद करणे.",
      ),
      lis(
        "Please close the door.",
        "ऐका. काय करायला सांगितले?",
        "दार बंद करा",
        ["दार उघडा", "खिडकी उघडा"],
        "close the door म्हणजे दार बंद करा.",
      ),
      resp(
        "Please sit down.",
        "Thank you.",
        ["It is a kitchen.", "I am from Pune."],
        "बसायला सांगितल्यावर Thank you म्हणा.",
      ),
      bld(
        "आम्ही एकत्र जेवतो.",
        "We eat together.",
        ["is"],
        "together म्हणजे एकत्र.",
      ),
    ],
    rolePlay(
      "",
      "beginner",
      ["घरी पाहुणा", "A guest at home"],
      "तुमच्या घरी पाहुणे आले आहेत.",
      "तुम्ही: यजमान",
      [
        [
          "o",
          "Your home is lovely. Where is the kitchen?",
          "तुमचे घर छान आहे. स्वयंपाकघर कुठे आहे?",
        ],
        [
          "y",
          "स्वयंपाकघर तिथे आहे असे सांगा.",
          "The kitchen is there. Please come.",
          "The kitchen is…",
        ],
        ["o", "Thank you. It is very clean.", "धन्यवाद. ते खूप स्वच्छ आहे."],
        [
          "y",
          "आभार माना आणि चहा हवा का ते विचारा.",
          "Thank you. Do you want some tea?",
          "Thank you. Do you want…",
        ],
      ],
    ),
  ),
  "food-drink": lessonKit(
    "food-drink",
    [
      "I can talk about what I eat and drink and offer food.",
      "मी काय खातो/पितो ते सांगू शकतो/शकते आणि कोणाला खाणे-पिणे देऊ शकतो/शकते.",
    ],
    [
      ["A", "Do you want milk or tea?", "तुम्हाला दूध हवे की चहा?"],
      ["B", "I would like tea, please.", "मला चहा हवा आहे, कृपया."],
      ["A", "What do you eat for lunch?", "तुम्ही दुपारच्या जेवणात काय खाता?"],
      [
        "B",
        "I eat rice and dal. It is tasty.",
        "मी भात-वरण खातो/खाते. ते चविष्ट आहे.",
      ],
    ],
    ["I eat / drink + food.", "Do you want + A or + B?"],
    [
      gap(
        "I ___ tea in the morning.",
        "drink",
        ["eat", "see"],
        "चहा पितात म्हणून drink.",
      ),
      gap(
        "I ___ rice and dal for lunch.",
        "eat",
        ["drink", "wear"],
        "भात-वरण खातात म्हणून eat.",
      ),
      e2m(
        "Do you want milk or tea?",
        "तुम्हाला दूध हवे की चहा?",
        ["तुम्ही दूध पिता का?", "तुम्हाला चहा आवडला का?"],
        "milk or tea म्हणजे दूध की चहा; want म्हणजे हवे.",
      ),
      m2e(
        "हे जेवण खूप चविष्ट आहे.",
        "This food is very tasty.",
        ["This food are very tasty.", "This food very is tasty."],
        "food एकवचनी असल्याने is.",
      ),
      resp(
        "Do you want milk or tea?",
        "Tea, please.",
        ["Yes, I am from Pune.", "It is on the table."],
        "दोन पर्यायांपैकी एक निवडा.",
      ),
      lis(
        "I do not eat spicy food.",
        "ऐका. व्यक्ती काय खात नाही?",
        "तिखट जेवण",
        ["गोड जेवण", "भात"],
        "spicy म्हणजे तिखट; do not eat म्हणजे खात नाही.",
      ),
    ],
    rolePlay(
      "",
      "beginner",
      ["चहा आणि जेवण", "Offering food"],
      "तुमचा मित्र तुमच्या घरी आला आहे.",
      "तुम्ही: यजमान",
      [
        [
          "y",
          "मित्राला दूध हवे की चहा ते विचारा.",
          "Do you want milk or tea?",
          "Do you want…",
        ],
        ["o", "Tea, please. It smells good.", "चहा, कृपया. छान वास येतोय."],
        [
          "y",
          "तुम्ही रोज सकाळी चहा पिता असे सांगा.",
          "I drink tea every morning.",
          "I drink…",
        ],
        ["o", "Me too!", "मीसुद्धा!"],
      ],
    ),
  ),
  describe: lessonKit(
    "describe",
    [
      "I can describe things with size, colour and quality.",
      "मी वस्तूंचे आकार, रंग आणि गुणवत्ता सांगू शकतो/शकते.",
    ],
    [
      ["A", "Which bag is yours?", "तुमची पिशवी कोणती?"],
      ["B", "The blue one. It is big and new.", "निळी. ती मोठी आणि नवी आहे."],
      ["A", "Is it heavy?", "ती जड आहे का?"],
      ["B", "No, it is not heavy.", "नाही, ती जड नाही."],
    ],
    ["adjective + noun: a big house", "noun + is + adjective: The tea is hot."],
    [
      gap(
        "The tea is ___. (गरम)",
        "hot",
        ["cold", "new"],
        "hot म्हणजे गरम; cold म्हणजे थंड.",
      ),
      e2m(
        "My bag is blue.",
        "माझी पिशवी निळी आहे.",
        ["माझी पिशवी जड आहे.", "माझी पिशवी नवी आहे."],
        "blue म्हणजे निळा.",
      ),
      m2e(
        "हे मोठे घर आहे.",
        "This is a big house.",
        ["This is big a house.", "This are a big house."],
        "adjective नामाच्या आधी येतो: a big house.",
      ),
      und(
        "'English is not difficult.' याचा अर्थ काय?",
        "इंग्रजी अवघड नाही.",
        ["इंग्रजी अवघड आहे.", "इंग्रजी सोपी आहे का?"],
        "not difficult म्हणजे अवघड नाही.",
      ),
      resp(
        "Is your bag big?",
        "Yes, it is big and blue.",
        ["No, it is Monday.", "At the bus stop."],
        "आकाराबद्दल विचारले तर आकार आणि रंग सांगा.",
      ),
      bld(
        "ती माझी नवी पिशवी आहे.",
        "It is my new bag.",
        ["blue"],
        "my new bag: मालकी आणि वर्णन नामाच्या आधी.",
      ),
    ],
    rolePlay(
      "",
      "beginner",
      ["वस्तू ओळखणे", "Finding your bag"],
      "बस स्टॉपवर तुम्ही हरवलेली पिशवी सांगता.",
      "तुम्ही: प्रवासी",
      [
        ["o", "What does your bag look like?", "तुमची पिशवी कशी दिसते?"],
        [
          "y",
          "तुमची पिशवी निळी आणि मोठी आहे असे सांगा.",
          "It is blue and big.",
          "It is…",
        ],
        ["o", "Is it new?", "ती नवी आहे का?"],
        ["y", "'हो, ती नवी आहे' असे सांगा.", "Yes, it is new.", "Yes, it is…"],
      ],
    ),
  ),
  plurals: lessonKit(
    "plurals",
    [
      "I can talk about one thing and many things.",
      "मी एका वस्तूबद्दल आणि अनेक वस्तूंबद्दल बोलू शकतो/शकते.",
    ],
    [
      ["A", "How many books do you have?", "तुमच्याकडे किती पुस्तके आहेत?"],
      [
        "B",
        "I have one book and two pens.",
        "माझ्याकडे एक पुस्तक आणि दोन पेन आहेत.",
      ],
      ["A", "Are the children outside?", "मुले बाहेर आहेत का?"],
      ["B", "Yes, the children are playing.", "हो, मुले खेळत आहेत."],
    ],
    ["one + noun · two + nouns + s", "man → men · child → children"],
    [
      gap(
        "I have two ___. (पेन)",
        "pens",
        ["pen", "pened"],
        "दोन किंवा जास्त असल्यास pens.",
      ),
      gap(
        "There are three ___. (बस)",
        "buses",
        ["buss", "bus"],
        "s वर संपणाऱ्या शब्दाला es: buses.",
      ),
      gap(
        "The ___ are playing. (मुले)",
        "children",
        ["childs", "childrens"],
        "child चे अनेकवचन children आहे.",
      ),
      und(
        "'Two men are waiting.' मध्ये men म्हणजे काय?",
        "अनेक पुरुष",
        ["एक पुरुष", "एक मुलगा"],
        "man चे अनेकवचन men.",
      ),
      m2e(
        "माझ्याकडे एक पुस्तक आहे.",
        "I have one book.",
        ["I have one books.", "I has one book."],
        "one नंतर एकवचन book.",
      ),
      resp(
        "How many pens do you have?",
        "I have three pens.",
        ["I have three pen.", "I am three pens."],
        "अनेक असल्याने pens.",
      ),
    ],
    rolePlay(
      "",
      "beginner",
      ["वस्तू मोजणे", "At a stationery shop"],
      "तुम्ही वह्या आणि पेन घ्यायला दुकानात आला आहात.",
      "तुम्ही: ग्राहक",
      [
        ["o", "What would you like?", "तुम्हाला काय हवे आहे?"],
        [
          "y",
          "दोन वह्या आणि तीन पेन हवे आहेत असे सांगा.",
          "I want two notebooks and three pens.",
          "I want two…",
        ],
        ["o", "Anything else?", "आणखी काही?"],
        ["y", "'नको, धन्यवाद' असे सांगा.", "No, thank you.", "No…"],
      ],
    ),
  ),
};

export const unit: Unit = {
  id: "b4",
  path: "beginner",
  title: "घर, खाणे आणि वस्तू",
  en: "Home, food and things",
  outcome: [
    "I can name things, describe them and talk about food.",
    "मी वस्तूंची नावे सांगू शकतो/शकते, त्यांचे वर्णन करू शकतो/शकते आणि खाण्याबद्दल बोलू शकतो/शकते.",
  ],
  lessons: ["home-words", "food-drink", "describe", "plurals"],
  checkpoint: {
    scenario: [
      "You are at a friend's house for lunch.",
      "तुम्ही मित्राच्या घरी जेवायला गेला आहात.",
    ],
    ex: finish("b4", "cp", [
      resp(
        "Would you like some more rice?",
        "Yes, please. It is very tasty.",
        ["No, it is blue.", "I am at the table."],
        "नम्रपणे हो म्हणा आणि जेवणाची स्तुती करा.",
      ),
      gap(
        "These vegetables ___ fresh.",
        "are",
        ["is", "am"],
        "vegetables अनेकवचनी असल्याने are.",
      ),
      lis(
        "I have two sisters and three brothers.",
        "ऐका. भाऊ किती आहेत?",
        "तीन",
        ["दोन", "पाच"],
        "three brothers म्हणजे तीन भाऊ.",
      ),
      bld("मी भात खातो.", "I eat rice.", ["is"], "खाण्यासाठी eat वापरा."),
    ]),
    speak: "मित्राच्या घरी जेवताना जेवणाची स्तुती करा आणि थोडा भात मागा.",
  },
};
