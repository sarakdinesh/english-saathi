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
    "appointments",
    "conversation",
    "Make and change an appointment",
    "भेटीची वेळ ठरवा आणि बदला",
    "वेळ ठरवण्यासाठी: I would like to make an appointment for … ; Is … available? ; Could we make it …? बदलण्यासाठी: I am afraid I cannot come on …; Could we reschedule to …? वेळ पक्की करताना पुनरावृत्ती करा: So that is Thursday at ten, right?",
    "I would like to book … · Is … available? · Could we reschedule to …?",
    [
      [
        "I would like to make an appointment for Thursday morning.",
        "मला गुरुवारी सकाळची भेटीची वेळ ठरवायची आहे.",
      ],
      ["Is ten o'clock available?", "दहा वाजता वेळ मिळेल का?"],
      [
        "I am afraid I cannot come on Thursday. Could we reschedule to Friday?",
        "मला भीती वाटते मी गुरुवारी येऊ शकणार नाही. आपण शुक्रवारी ठरवू शकतो का?",
      ],
      [
        "So that is Friday at eleven, right?",
        "म्हणजे शुक्रवारी अकरा वाजता, बरोबर?",
      ],
    ],
    "डॉक्टर किंवा सलूनची भेट ठरवा आणि नंतर वेळ बदला.",
  ),
  newLesson(
    "complaints",
    "conversation",
    "Make a polite complaint",
    "नम्रपणे तक्रार करा",
    "तक्रार शांतपणे आणि स्पष्टपणे करा: समस्या सांगा (The … does not work / I received …), काय अपेक्षित होते ते सांगा (I expected …), आणि उपाय मागा (Could you replace it? / I would like a refund). सुरुवातीला क्षमायाचना करा: I am sorry to bother you, but …",
    "I am sorry to bother you, but … · I expected … · Could you … ?",
    [
      [
        "I am sorry to bother you, but the heater does not work.",
        "तुम्हाला त्रास दिल्याबद्दल क्षमस्व, पण हीटर चालत नाही.",
      ],
      [
        "I ordered a blue shirt, but I received a green one.",
        "मी निळा शर्ट मागवला होता, पण मला हिरवा मिळाला.",
      ],
      [
        "I expected it to arrive on Monday.",
        "तो सोमवारी पोहोचेल अशी माझी अपेक्षा होती.",
      ],
      [
        "Could you replace it, or I would like a refund.",
        "तुम्ही तो बदलून द्याल का, किंवा मला पैसे परत हवे आहेत.",
      ],
    ],
    "एखाद्या वस्तूबद्दल तक्रार करा: काय बिघडले, तुम्हाला काय अपेक्षित होते आणि तुम्हाला काय हवे.",
  ),
  newLesson(
    "solve-problems",
    "conversation",
    "Explain a problem and ask for a solution",
    "समस्या सांगा आणि उपाय विचारा",
    "समस्या सोडवण्यासाठी क्रम: समस्या (The problem is …), परिणाम (Because of this, …), तुम्ही काय प्रयत्न केले (I have already tried …) आणि मदत (Could you suggest what I should do?). स्पष्ट, लहान वाक्ये वापरा आणि समोरच्याला उपाय सुचवण्याची संधी द्या.",
    "The problem is … · I have already tried … · What would you suggest?",
    [
      [
        "The problem is that my internet stops every evening.",
        "समस्या अशी आहे की माझे इंटरनेट रोज संध्याकाळी बंद होते.",
      ],
      [
        "Because of this, I cannot join my online class.",
        "यामुळे मी माझ्या ऑनलाइन वर्गात सहभागी होऊ शकत नाही.",
      ],
      [
        "I have already tried restarting the router.",
        "मी राउटर पुन्हा सुरू करून पाहिला आहे.",
      ],
      ["What would you suggest I do?", "तुम्ही मी काय करावे असे सुचवाल?"],
    ],
    "रोजच्या एखाद्या समस्येबद्दल (वाहतूक, इंटरनेट, पाणी) समस्या, परिणाम आणि प्रयत्न सांगा.",
  ),
];

export const kits: Record<string, Enrich> = {
  "doctor-visit": lessonKit(
    "doctor-visit",
    [
      "I can describe symptoms and book a medical appointment.",
      "मी लक्षणे सांगू शकतो/शकते आणि वैद्यकीय भेटीची वेळ ठरवू शकतो/शकते.",
    ],
    [
      ["A", "Good morning. How can I help you?", "सुप्रभात. मी कशी मदत करू?"],
      [
        "B",
        "I am not feeling well. I have had a headache since morning.",
        "मला बरे वाटत नाही. सकाळपासून माझे डोके दुखत आहे.",
      ],
      ["A", "I see. Do you have a fever?", "समजले. तुम्हाला ताप आहे का?"],
      [
        "B",
        "Yes, a little. I would like to book an appointment. Could you write that down, please?",
        "हो, थोडा. मला भेटीची वेळ ठरवायची आहे. कृपया ते लिहून द्याल का?",
      ],
    ],
    [
      "I have had … since / for …",
      "I would like to book an appointment.",
      "Could you write that down?",
    ],
    [
      gap(
        "I have had a headache ___ morning.",
        "since",
        ["for", "from"],
        "सुरुवातीच्या बिंदूसाठी since.",
      ),
      gap(
        "I have had a fever ___ two days.",
        "for",
        ["since", "at"],
        "कालावधीसाठी for.",
      ),
      e2m(
        "I am not feeling well.",
        "मला बरे वाटत नाही.",
        ["मला भूक लागली आहे.", "मी तयार आहे."],
        "not feeling well म्हणजे बरे वाटत नाही.",
      ),
      resp(
        "What seems to be the problem?",
        "I have had a sore throat for three days.",
        ["I am sore three days.", "Throat is for."],
        "लक्षण आणि काळ सांगा.",
      ),
      m2e(
        "मला भेटीची वेळ ठरवायची आहे.",
        "I would like to book an appointment.",
        ["I would like to booking an appointment.", "I like book appointment."],
        "would like to + मूळ क्रियापद.",
      ),
      lis(
        "I have had a cough since Sunday, and I feel tired.",
        "ऐका. खोकला कधीपासून आहे?",
        "रविवारपासून",
        ["सोमवारपासून", "तीन दिवस"],
        "since Sunday म्हणजे रविवारपासून.",
      ),
    ],
    rolePlay(
      "",
      "intermediate",
      ["दवाखान्यात", "At the clinic"],
      "तुम्हाला ताप आणि डोकेदुखी आहे.",
      "तुम्ही: रुग्ण",
      [
        [
          "o",
          "Good morning. What seems to be the problem?",
          "सुप्रभात. काय अडचण आहे?",
        ],
        [
          "y",
          "लक्षणे आणि ती कधीपासून आहेत ते सांगा.",
          "I have had a fever and a headache since yesterday morning.",
          "I have had… since…",
        ],
        ["o", "Have you taken any medicine?", "तुम्ही काही औषध घेतले का?"],
        [
          "y",
          "उत्तर द्या आणि विचारा की हे गंभीर आहे का.",
          "Yes, I took a tablet, but it did not help. Is it serious?",
          "Yes, I took… Is it…",
        ],
        [
          "o",
          "Not serious, but please rest.",
          "गंभीर नाही, पण विश्रांती घ्या.",
        ],
        [
          "y",
          "आभार माना आणि औषध किती वेळा घ्यायचे ते विचारा.",
          "Thank you, doctor. How often should I take the medicine?",
          "Thank you. How often…",
        ],
      ],
    ),
  ),
  appointments: lessonKit(
    "appointments",
    [
      "I can book and change an appointment.",
      "मी भेटीची वेळ ठरवू आणि बदलू शकतो/शकते.",
    ],
    [
      [
        "A",
        "Hello, I would like to make an appointment for Thursday morning.",
        "नमस्कार, मला गुरुवारी सकाळची भेटीची वेळ ठरवायची आहे.",
      ],
      [
        "B",
        "Is ten o'clock available? — Yes, that is fine.",
        "दहा वाजता चालेल का? — हो, चालेल.",
      ],
      [
        "A",
        "Actually, I am afraid I cannot come on Thursday. Could we reschedule to Friday?",
        "खरं तर, मी गुरुवारी येऊ शकणार नाही. आपण शुक्रवारी ठरवू शकतो का?",
      ],
      [
        "B",
        "Of course. So that is Friday at eleven, right?",
        "नक्कीच. म्हणजे शुक्रवारी अकरा वाजता, बरोबर?",
      ],
    ],
    [
      "I would like to make an appointment for …",
      "Is … available? · Could we reschedule to …?",
      "So that is … , right?",
    ],
    [
      und(
        "'reschedule' म्हणजे काय?",
        "वेळ बदलणे",
        ["वेळ रद्द करणे", "लवकर येणे"],
        "reschedule म्हणजे ठरलेली वेळ बदलणे.",
      ),
      gap(
        "I would like to make an appointment ___ Thursday.",
        "for",
        ["at", "in"],
        "make an appointment for + दिवस.",
      ),
      gap(
        "Is ten o'clock ___?",
        "available",
        ["avail", "availing"],
        "वेळ उपलब्ध आहे का: available.",
      ),
      resp(
        "Could we reschedule to Friday?",
        "Of course. Friday at eleven is fine.",
        ["Of course. Friday at eleven is finely.", "No, Friday I did."],
        "बदल मान्य करून वेळ पक्की करा.",
      ),
      e2m(
        "I am afraid I cannot come on Thursday.",
        "मला भीती वाटते मी गुरुवारी येऊ शकणार नाही.",
        ["मी गुरुवारी नक्की येईन.", "मी गुरुवारी आलो."],
        "I am afraid I cannot… म्हणजे दुर्दैवाने मी येऊ शकत नाही.",
      ),
      lis(
        "So that is Friday at eleven. Please arrive ten minutes early.",
        "ऐका. आधी किती वेळ पोहोचायचे?",
        "दहा मिनिटे",
        ["अकरा मिनिटे", "एक तास"],
        "ten minutes early म्हणजे दहा मिनिटे आधी.",
      ),
    ],
    rolePlay(
      "",
      "intermediate",
      ["भेटीची वेळ ठरवणे", "Booking an appointment"],
      "तुम्ही दवाखान्यात फोन करून भेट ठरवता.",
      "तुम्ही: रुग्ण",
      [
        [
          "o",
          "Good morning, City Clinic. How can I help you?",
          "सुप्रभात, सिटी क्लिनिक. मी कशी मदत करू?",
        ],
        [
          "y",
          "भेटीची वेळ ठरवायची आहे असे सांगा आणि दिवस सांगा.",
          "I would like to make an appointment for Thursday morning.",
          "I would like to make an appointment for…",
        ],
        ["o", "Is ten o'clock available?", "दहा वाजता चालेल का?"],
        [
          "y",
          "नको असेल तर पर्याय विचारा.",
          "I am afraid ten does not suit me. Could we make it eleven?",
          "I am afraid… Could we make it…",
        ],
        ["o", "Yes. Eleven on Thursday.", "हो. गुरुवारी अकरा."],
        [
          "y",
          "वेळ पुन्हा सांगून खात्री करा आणि आभार माना.",
          "So that is Thursday at eleven, right? Thank you.",
          "So that is… right?",
        ],
      ],
      true,
    ),
  ),
  complaints: lessonKit(
    "complaints",
    [
      "I can make a polite complaint and ask for a solution.",
      "मी नम्रपणे तक्रार करू शकतो/शकते आणि उपाय मागू शकतो/शकते.",
    ],
    [
      [
        "A",
        "I am sorry to bother you, but the heater does not work.",
        "तुम्हाला त्रास दिल्याबद्दल क्षमस्व, पण हीटर चालत नाही.",
      ],
      [
        "B",
        "I am sorry about that. Since when?",
        "त्याबद्दल क्षमस्व. कधीपासून?",
      ],
      [
        "A",
        "Since last night. I expected a working one when I booked.",
        "काल रात्रीपासून. बुक करताना मला चालणारा अपेक्षित होता.",
      ],
      [
        "B",
        "We will send someone today. Is that all right?",
        "आम्ही आजच कोणालातरी पाठवू. चालेल का?",
      ],
    ],
    [
      "I am sorry to bother you, but …",
      "I expected … · It does not work",
      "Could you replace it? · I would like a refund.",
    ],
    [
      und(
        "तक्रारीची नम्र सुरुवात कोणती?",
        "I am sorry to bother you, but …",
        ["This is your fault.", "Fix it now."],
        "नम्र सुरुवात तक्रार सहज स्वीकारायला मदत करते.",
      ),
      gap(
        "I ordered a blue shirt, ___ I received a green one.",
        "but",
        ["so", "because"],
        "विरोध दाखवण्यासाठी but.",
      ),
      gap(
        "Could you ___ it with a new one?",
        "replace",
        ["replaces", "replacing"],
        "Could you नंतर मूळ रूप.",
      ),
      e2m(
        "I would like a refund.",
        "मला पैसे परत हवे आहेत.",
        ["मला बदली वस्तू हवी आहे.", "मला पावती हवी आहे."],
        "refund म्हणजे पैसे परत.",
      ),
      resp(
        "I am sorry about the problem. What can I do for you?",
        "Could you replace it, or I would like a refund.",
        ["I replace refund.", "Sorry about yes."],
        "तुम्हाला काय हवे ते स्पष्ट सांगा.",
      ),
      lis(
        "The delivery was supposed to arrive on Monday, but it is Wednesday now.",
        "ऐका. समस्या काय आहे?",
        "वितरणाला उशीर झाला आहे",
        ["वस्तू तुटली आहे", "किंमत जास्त आहे"],
        "was supposed to arrive on Monday, but it is Wednesday म्हणजे उशीर.",
      ),
    ],
    rolePlay(
      "",
      "intermediate",
      ["वस्तूबद्दल तक्रार", "Returning a faulty item"],
      "तुम्ही खरेदी केलेला हेडफोन चालत नाही.",
      "तुम्ही: ग्राहक",
      [
        ["o", "Hello. How can I help you?", "नमस्कार. मी कशी मदत करू?"],
        [
          "y",
          "नम्रपणे तक्रार सुरू करा आणि समस्या सांगा.",
          "I am sorry to bother you, but these headphones do not work.",
          "I am sorry to bother you, but…",
        ],
        ["o", "When did you buy them?", "तुम्ही ते कधी घेतले?"],
        [
          "y",
          "कधी घेतले आणि काय अपेक्षा होती ते सांगा.",
          "I bought them last week. I expected them to work properly.",
          "I bought them… I expected…",
        ],
        [
          "o",
          "I understand. What would you like us to do?",
          "समजले. तुम्हाला आम्ही काय करावे असे वाटते?",
        ],
        [
          "y",
          "उपाय मागा.",
          "Could you replace them, or I would like a refund.",
          "Could you replace them,…",
        ],
      ],
    ),
  ),
  "solve-problems": lessonKit(
    "solve-problems",
    [
      "I can explain a problem and ask for advice.",
      "मी समस्या समजावून सांगू शकतो/शकते आणि सल्ला मागू शकतो/शकते.",
    ],
    [
      ["A", "What seems to be the problem?", "काय अडचण आहे?"],
      [
        "B",
        "The problem is that my internet stops every evening, so I cannot join my class.",
        "समस्या अशी आहे की माझे इंटरनेट रोज संध्याकाळी बंद होते, म्हणून मी वर्गात सहभागी होऊ शकत नाही.",
      ],
      [
        "A",
        "Have you tried restarting the router?",
        "तुम्ही राउटर पुन्हा सुरू करून पाहिला का?",
      ],
      [
        "B",
        "Yes, I have already tried that. What would you suggest?",
        "हो, ते मी आधीच करून पाहिले आहे. तुम्ही काय सुचवाल?",
      ],
    ],
    [
      "The problem is that …",
      "Because of this, … · I have already tried …",
      "What would you suggest?",
    ],
    [
      und(
        "समस्या सांगण्याची योग्य सुरुवात कोणती?",
        "The problem is that my internet stops every evening.",
        ["Internet problem stops me every.", "I have internet stops."],
        "The problem is that + पूर्ण वाक्य.",
      ),
      gap(
        "I ___ already tried restarting it.",
        "have",
        ["am", "will"],
        "आधीच करून पाहिले आहे: have already tried.",
      ),
      gap(
        "Because ___ this, I cannot join my class.",
        "of",
        ["from", "on"],
        "because of + नाम.",
      ),
      resp(
        "Have you tried restarting the router?",
        "Yes, I have already tried that. What would you suggest?",
        ["Yes, I tried that I suggest.", "No, router tries."],
        "आधी काय केले ते सांगून सल्ला मागा.",
      ),
      e2m(
        "What would you suggest?",
        "तुम्ही काय सुचवाल?",
        ["तुम्ही कुठे जाल?", "तुम्हाला काय हवे?"],
        "suggest म्हणजे सुचवणे.",
      ),
      lis(
        "My water supply stops in the morning, so I cannot cook. I have already called the office.",
        "ऐका. व्यक्तीने आधीच काय केले?",
        "ऑफिसला फोन केला",
        ["टँकर मागवला", "नवे घर शोधले"],
        "already called the office म्हणजे आधीच ऑफिसला फोन केला.",
      ),
    ],
    rolePlay(
      "",
      "intermediate",
      ["समस्या समजावणे", "Explaining a problem"],
      "तुम्ही इंटरनेट कंपनीला फोन करता.",
      "तुम्ही: ग्राहक",
      [
        [
          "o",
          "Customer care. How can I help you?",
          "ग्राहक सेवा. मी कशी मदत करू?",
        ],
        [
          "y",
          "समस्या आणि तिचा परिणाम सांगा.",
          "The problem is that my internet stops every evening, so I cannot join my class.",
          "The problem is that…, so I cannot…",
        ],
        [
          "o",
          "Have you tried restarting the router?",
          "तुम्ही राउटर पुन्हा सुरू केला का?",
        ],
        [
          "y",
          "आधी काय केले ते सांगा आणि मदत मागा.",
          "Yes, I have already tried that. What would you suggest?",
          "Yes, I have already tried… What would you suggest?",
        ],
        [
          "o",
          "We can send a technician tomorrow.",
          "आम्ही उद्या तंत्रज्ञ पाठवू शकतो.",
        ],
        [
          "y",
          "वेळ विचारा.",
          "Thank you. What time will the technician come?",
          "Thank you. What time…",
        ],
      ],
      true,
    ),
  ),
};

export const unit: Unit = {
  id: "i7",
  path: "intermediate",
  title: "भेटी, तक्रारी आणि समस्या",
  en: "Appointments, complaints and solving everyday problems",
  outcome: [
    "I can book an appointment, complain politely and explain a problem.",
    "मी भेट ठरवू शकतो/शकते, नम्रपणे तक्रार करू शकतो/शकते आणि समस्या समजावून सांगू शकतो/शकते.",
  ],
  lessons: ["doctor-visit", "appointments", "complaints", "solve-problems"],
  checkpoint: {
    scenario: [
      "Your gas cylinder was delivered late and you need a new delivery time.",
      "तुमचा गॅस सिलेंडर उशिरा आला आणि तुम्हाला नवीन वेळ हवी आहे.",
    ],
    ex: finish("i7", "cp", [
      resp(
        "We are sorry. When would you like the next delivery?",
        "I would like it on Monday morning, if that is possible.",
        ["Monday I would deliver.", "I like Monday sorry."],
        "नम्रपणे वेळ सांगा.",
      ),
      gap(
        "I am sorry to ___ you, but the delivery was late.",
        "bother",
        ["bothers", "bothering"],
        "to नंतर मूळ रूप.",
      ),
      gap(
        "I expected it ___ arrive on Friday.",
        "to",
        ["for", "at"],
        "expect something to + क्रियापद.",
      ),
      und(
        "तक्रारीत कोणते वाक्य उपाय मागते?",
        "Could you send a replacement today?",
        ["The delivery was late.", "I am sorry to bother you."],
        "Could you…? उपाय मागते.",
      ),
    ]),
    speak: "उशिरा आलेल्या वितरणाबद्दल नम्रपणे तक्रार करा आणि नवीन वेळ मागा.",
  },
};
