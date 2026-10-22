// Foundation (Level 0) daily grammar tips and pronunciation challenges.
// Same shapes as the Beginner `mistakes` and `sounds` data. IDs are stable:
// they are stored in saved daily plans.
import type { Mistake, Sound } from "../data/speaking";

export const foundationTips: (Mistake & { id: string })[] = [
  {
    id: "ftip-an",
    wrong: "This is a egg.",
    right: "This is an egg.",
    why: "स्वराच्या आवाजाने सुरू होणाऱ्या शब्दापुढे an येते: an egg, an apple. बाकी शब्दांपुढे a: a pen.",
    say: "दिस इज ॲन एग.",
  },
  {
    id: "ftip-article",
    wrong: "This is pen.",
    right: "This is a pen.",
    why: "एका वस्तूबद्दल बोलताना नामापुढे a किंवा an लावतात: a pen, a book.",
    say: "दिस इज अ पेन.",
  },
  {
    id: "ftip-capital-i",
    wrong: "i am a student.",
    right: "I am a student.",
    why: "'मी' साठी I नेहमी मोठ्या अक्षरात लिहितात. वाक्याची सुरुवातही मोठ्या अक्षराने करतात.",
    say: "आय ॲम अ स्टुडंट.",
  },
  {
    id: "ftip-day-capital",
    wrong: "Today is monday.",
    right: "Today is Monday.",
    why: "वार आणि महिन्यांची नावे नेहमी मोठ्या अक्षराने सुरू करतात: Monday, October.",
    say: "टुडे इज मंडे.",
  },
  {
    id: "ftip-plural",
    wrong: "I have two pen.",
    right: "I have two pens.",
    why: "एकापेक्षा जास्त वस्तू असतील तर नामाला s लावतात: two pens, five books.",
    say: "आय हॅव टू पेन्झ.",
  },
  {
    id: "ftip-many",
    wrong: "How many book do you have?",
    right: "How many books do you have?",
    why: "How many नंतर अनेकवचन येते: How many books?",
    say: "हाउ मेनी बुक्स डू यू हॅव?",
  },
  {
    id: "ftip-my-name",
    wrong: "My name Asha.",
    right: "My name is Asha.",
    why: "इंग्रजी वाक्यात is/am/are हवेच: My name is Asha. मराठीत 'आहे' सहसा सोडतात, इंग्रजीत नाही.",
    say: "माय नेम इज आशा.",
  },
  {
    id: "ftip-it-is",
    wrong: "It a pen.",
    right: "It is a pen.",
    why: "It नंतर is लावा: It is a pen. is शिवाय वाक्य अपूर्ण वाटते.",
    say: "इट इज अ पेन.",
  },
  {
    id: "ftip-years",
    wrong: "I am ten year old.",
    right: "I am ten years old.",
    why: "एकापेक्षा जास्त वर्षे असतील तर years: ten years old. फक्त one year old.",
    say: "आय ॲम टेन इयर्झ ओल्ड.",
  },
  {
    id: "ftip-she",
    wrong: "He is my sister.",
    right: "She is my sister.",
    why: "स्त्रीसाठी She आणि पुरुषासाठी He. sister म्हणजे बहीण, म्हणून She.",
    say: "शी इज माय सिस्टर.",
  },
  {
    id: "ftip-one",
    wrong: "I have a one pen.",
    right: "I have one pen.",
    why: "संख्येबरोबर a लावत नाहीत: one pen. किंवा a pen. दोन्ही एकत्र नाही.",
    say: "आय हॅव वन पेन.",
  },
];

export const foundationSounds: Sound[] = [
  {
    id: "f-short-vowels",
    title: "Short vowels",
    mr: "लहान स्वरांचे आवाज",
    tip: "cat, bed, pig, dog, cup मधले स्वर लहान असतात. cup मधील u चा आवाज 'अ' सारखा आहे, 'उ' सारखा नाही.",
    pairs: [
      { en: "cat", say: "कॅट" },
      { en: "bed", say: "बेड" },
      { en: "pig", say: "पिग" },
      { en: "dog", say: "डॉग" },
      { en: "cup", say: "कप" },
    ],
  },
  {
    id: "f-sh-ch",
    title: "SH and CH",
    mr: "sh आणि ch वेगळे ऐका",
    tip: "sh = 'श्' (ओठ थोडे गोल, हवा सतत). ch = 'च्' (जीभ टाळूला टेकून हवा अचानक सोडा). ship आणि chip वेगळे शब्द आहेत.",
    pairs: [
      { en: "ship", say: "शिप" },
      { en: "chip", say: "चिप" },
      { en: "share", say: "शेअर" },
      { en: "chair", say: "चेअर" },
    ],
  },
  {
    id: "f-blends",
    title: "Two sounds together",
    mr: "जोडलेले आवाज: स्वर न जोडता",
    tip: "star, spoon, school सुरुवातीला स्वर जोडू नका. 'इस्टार' नाही, 'स्टार'. दोन व्यंजने एकापाठोपाठ म्हणा.",
    pairs: [
      { en: "star", say: "स्टार (इस्टार नाही)" },
      { en: "spoon", say: "स्पून (इस्पून नाही)" },
      { en: "school", say: "स्कूल (इस्कूल नाही)" },
      { en: "tree", say: "ट्री" },
    ],
  },
  {
    id: "f-silent",
    title: "Silent letters",
    mr: "न बोललेली अक्षरे",
    tip: "knife, knee, know मध्ये k बोलला जात नाही; शब्द n च्या आवाजाने सुरू होतो. write मध्ये w बोलला जात नाही.",
    pairs: [
      { en: "knife", say: "नाइफ" },
      { en: "knee", say: "नी" },
      { en: "know", say: "नो" },
      { en: "write", say: "राइट" },
    ],
  },
  {
    id: "f-magic-e",
    title: "The silent e",
    mr: "शेवटचा e स्वर लांब करतो",
    tip: "शेवटी न बोलला जाणारा e आधीच्या स्वराचा आवाज लांब करतो. kit (लहान इ) आणि kite (आय) हे वेगळे शब्द आहेत.",
    pairs: [
      { en: "kit", say: "किट (लहान)" },
      { en: "kite", say: "काइट (लांब)" },
      { en: "hop", say: "हॉप (लहान)" },
      { en: "hope", say: "होप (लांब)" },
    ],
  },
  {
    id: "f-b-d",
    title: "B and D",
    mr: "b आणि d वेगळे ओळखा",
    tip: "b मध्ये दोन्ही ओठ मिटून हवा सोडतात. d मध्ये जीभेचे टोक वरच्या दातांच्या मागच्या हिरड्यांना टेकते (जीभ मागे वळवू नका). लिहिताना b चे पोट उजवीकडे आणि d चे डावीकडे असते.",
    pairs: [
      { en: "ball", say: "बॉल" },
      { en: "dog", say: "डॉग" },
      { en: "bed", say: "बेड" },
      { en: "big", say: "बिग" },
    ],
  },
];

// Existing Beginner sounds that are also suitable for Foundation learners.
export const foundationSharedSoundIds = ["w", "th"];
