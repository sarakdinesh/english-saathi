import {
  bld,
  e2m,
  gap,
  lessonKit,
  lis,
  m2e,
  resp,
  rolePlay,
  und,
  finish,
} from "../author";
import type { Unit, Enrich } from "../types";

export const kits: Record<string, Enrich> = {
  family: lessonKit(
    "family",
    [
      "I can talk about the people in my family.",
      "मी माझ्या कुटुंबातील लोकांबद्दल बोलू शकतो/शकते.",
    ],
    [
      ["A", "Who is this in the photo?", "फोटोमध्ये हे कोण आहे?"],
      [
        "B",
        "This is my mother. She is a teacher.",
        "ही माझी आई आहे. ती शिक्षिका आहे.",
      ],
      ["A", "And who is he?", "आणि तो कोण आहे?"],
      [
        "B",
        "He is my brother. His name is Amit.",
        "तो माझा भाऊ आहे. त्याचे नाव अमित आहे.",
      ],
    ],
    ["This is my + family word.", "He / She is my … ."],
    [
      gap(
        "This is my ___. (माझी आई)",
        "mother",
        ["father", "brother"],
        "mother म्हणजे आई. father म्हणजे वडील.",
      ),
      e2m(
        "Her sister lives in Mumbai.",
        "तिची बहीण मुंबईत राहते.",
        ["तिचा भाऊ मुंबईत जातो.", "तिची आई मुंबईत काम करते."],
        "Her म्हणजे तिची. sister म्हणजे बहीण.",
      ),
      m2e(
        "हे माझे वडील आहेत.",
        "This is my father.",
        ["This is my brother.", "This are my father."],
        "वडील म्हणजे father. एकासाठी This is वापरा.",
      ),
      resp(
        "Who is that man?",
        "He is my brother.",
        ["She is my sister.", "It is my mother."],
        "पुरुषासाठी He वापरा. तो भाऊ असू शकतो.",
      ),
      lis(
        "This is my grandmother. She lives with us.",
        "ऐका. ती कोणासोबत राहते?",
        "आमच्यासोबत",
        ["शाळेत", "मुंबईत"],
        "She lives with us म्हणजे ती आमच्यासोबत राहते.",
      ),
      bld(
        "ती माझी बहीण आहे.",
        "She is my sister.",
        ["He"],
        "She सोबत is वापरा. sister म्हणजे बहीण.",
      ),
    ],
    rolePlay(
      "",
      "beginner",
      ["कुटुंबाची ओळख", "Introducing family"],
      "तुमचा नवीन मित्र तुमच्या फोटोबद्दल विचारतो.",
      "तुम्ही: मित्र",
      [
        ["o", "Who is this in the photo?", "फोटोमध्ये हे कोण आहे?"],
        [
          "y",
          "ती तुमची आई आहे असे सांगा.",
          "This is my mother.",
          "This is my…",
        ],
        ["o", "Nice. And who is that boy?", "छान. आणि तो मुलगा कोण आहे?"],
        [
          "y",
          "तो तुमचा भाऊ आहे आणि त्याचे नाव सांगा.",
          "He is my brother. His name is Amit.",
          "He is my brother…",
        ],
      ],
    ),
  ),
  numbers: lessonKit(
    "numbers",
    [
      "I can count to twenty and use numbers in sentences.",
      "मी वीसपर्यंत मोजू शकतो/शकते आणि वाक्यांत आकडे वापरू शकतो/शकते.",
    ],
    [
      ["A", "How many students are there?", "किती विद्यार्थी आहेत?"],
      ["B", "There are twelve students.", "बारा विद्यार्थी आहेत."],
      ["A", "How many books do you have?", "तुमच्याकडे किती पुस्तके आहेत?"],
      ["B", "I have five books.", "माझ्याकडे पाच पुस्तके आहेत."],
    ],
    ["There are + number + noun.", "I have + number + noun."],
    [
      und(
        "'seven' म्हणजे कोणता आकडा?",
        "7",
        ["6", "17"],
        "seven म्हणजे सात (7). seventeen म्हणजे 17.",
      ),
      gap(
        "I have two ___. (दोन बहिणी)",
        "sisters",
        ["sister", "sisterness"],
        "दोन किंवा जास्त असल्यास नामाला s लावा: two sisters.",
      ),
      lis(
        "It costs fifteen rupees.",
        "ऐका. किंमत किती आहे?",
        "15 रुपये",
        ["50 रुपये", "5 रुपये"],
        "fifteen म्हणजे 15. fifty म्हणजे 50. शेवटी -teen ऐका.",
      ),
      e2m(
        "There are twelve students.",
        "बारा विद्यार्थी आहेत.",
        ["दहा विद्यार्थी आहेत.", "वीस विद्यार्थी आहेत."],
        "twelve म्हणजे बारा.",
      ),
      m2e(
        "माझ्याकडे पाच पुस्तके आहेत.",
        "I have five books.",
        ["I have five book.", "I am five books."],
        "पाच = five. 'पुस्तके' अनेक असल्याने books.",
      ),
      resp(
        "How many students are there?",
        "There are twelve students.",
        ["I am fine, thank you.", "My name is Asha."],
        "'किती?' या प्रश्नाला संख्या सांगा.",
      ),
    ],
    rolePlay(
      "",
      "beginner",
      ["संख्या सांगा", "Counting things"],
      "तुम्ही दुकानात काही वस्तू मोजून सांगता.",
      "तुम्ही: ग्राहक",
      [
        ["o", "How many pens do you want?", "तुम्हाला किती पेन हवे आहेत?"],
        ["y", "पाच पेन हवे आहेत असे सांगा.", "I want five pens.", "I want…"],
        ["o", "And how many notebooks?", "आणि किती वही?"],
        [
          "y",
          "तीन वह्या हव्या आहेत असे सांगा.",
          "I want three notebooks.",
          "I want three…",
        ],
      ],
    ),
  ),
  "big-numbers": lessonKit(
    "big-numbers",
    [
      "I can say prices, ages and bigger numbers.",
      "मी किंमत, वय आणि मोठे आकडे सांगू शकतो/शकते.",
    ],
    [
      ["A", "How old are you?", "तुमचे वय किती आहे?"],
      ["B", "I am twenty-five years old.", "मी पंचवीस वर्षांचा/ची आहे."],
      ["A", "How much is this bag?", "ही पिशवी किती रुपयांना आहे?"],
      ["B", "It is fifty rupees.", "ती पन्नास रुपयांना आहे."],
    ],
    ["I am + number + years old.", "It is + number + rupees."],
    [
      und(
        "'forty' म्हणजे किती?",
        "40",
        ["14", "4"],
        "forty म्हणजे 40. fourteen म्हणजे 14.",
      ),
      gap(
        "I am twenty-five ___ old.",
        "years",
        ["year", "age"],
        "वय सांगताना years old म्हणतात.",
      ),
      lis(
        "The bus fare is thirty rupees.",
        "ऐका. बसचे भाडे किती आहे?",
        "30 रुपये",
        ["13 रुपये", "300 रुपये"],
        "thirty म्हणजे 30. thirteen म्हणजे 13; दोन्हींमध्ये फरक ऐका.",
      ),
      m2e(
        "मला पन्नास रुपये हवे आहेत.",
        "I need fifty rupees.",
        ["I need fifteen rupees.", "I am fifty rupees."],
        "पन्नास = fifty. fifteen म्हणजे 15.",
      ),
      resp(
        "How old are you?",
        "I am thirty years old.",
        ["I have thirty years.", "It is thirty rupees."],
        "वय सांगताना I am … years old म्हणा.",
      ),
      bld(
        "शंभर लोक आले.",
        "One hundred people came.",
        ["are"],
        "शंभर = one hundred. came म्हणजे आले.",
      ),
    ],
    rolePlay(
      "",
      "beginner",
      ["किंमत विचारणे", "Asking the price"],
      "तुम्ही भाजी बाजारात किंमत विचारता.",
      "तुम्ही: ग्राहक",
      [
        ["y", "किलोची किंमत विचारा.", "How much is one kilo?", "How much is…"],
        ["o", "It is forty rupees.", "ते चाळीस रुपये आहे."],
        [
          "y",
          "दोन किलो हवे आहेत असे सांगा.",
          "I need two kilos, please.",
          "I need two…",
        ],
        ["o", "That is eighty rupees.", "ते ऐंशी रुपये होतात."],
      ],
    ),
  ),
};

export const unit: Unit = {
  id: "b2",
  path: "beginner",
  title: "कुटुंब आणि आकडे",
  en: "People and numbers",
  outcome: [
    "I can talk about my family and use numbers, ages and prices.",
    "मी माझ्या कुटुंबाबद्दल बोलू शकतो/शकते आणि आकडे, वय आणि किंमत सांगू शकतो/शकते.",
  ],
  lessons: ["family", "numbers", "big-numbers"],
  checkpoint: {
    scenario: [
      "At a birthday party, a guest asks about you and your relatives.",
      "वाढदिवसाच्या पार्टीत एक पाहुणा तुमच्याबद्दल आणि नातेवाईकांबद्दल विचारतो.",
    ],
    ex: finish("b2", "cp", [
      resp(
        "Is that your grandfather?",
        "Yes, he is my grandfather. He is seventy years old.",
        ["Yes, she is my mother.", "No, it is fifty rupees."],
        "प्रश्न आजोबांबद्दल आहे; उत्तरात he आणि वय योग्य आहे.",
      ),
      gap(
        "My sister is ___ years old. (अठरा)",
        "eighteen",
        ["eight", "eighty"],
        "eighteen म्हणजे 18. eight 8 आणि eighty 80.",
      ),
      lis(
        "There are fourteen guests at the party.",
        "ऐका. पार्टीत किती पाहुणे आहेत?",
        "14",
        ["40", "4"],
        "fourteen म्हणजे 14. शेवटी -teen ऐका.",
      ),
      bld(
        "तो माझा भाऊ आहे.",
        "He is my brother.",
        ["She"],
        "He सोबत is; भाऊ = brother.",
      ),
    ]),
    speak: "तुमच्या कुटुंबातील तीन जणांची नावे, नाते आणि वय इंग्रजीत सांगा.",
  },
};
