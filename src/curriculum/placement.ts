// Optional starting-level check. It only recommends where to begin; it is not
// a certified proficiency assessment. Placement IDs are not added to revision.
import { bld, gap, lis, und, finish } from "./author";
import type { Ex, PathId } from "./types";

export const placementQuestions: Ex[] = finish("place", "q", [
  lis(
    "My name is Priya. I am from Nagpur.",
    "ऐका. ती कुठली आहे?",
    "Nagpur",
    ["Pune", "Nashik"],
    "from नंतर गावाचे नाव ऐकू येते: Nagpur.",
  ),
  lis(
    "Could you tell me where the bus stop is?",
    "ऐका. व्यक्ती काय विचारते?",
    "बस स्टॉप कुठे आहे",
    ["बस कधी येते", "तिकीट किती आहे"],
    "where the bus stop is म्हणजे बस स्टॉप कुठे आहे.",
  ),
  lis(
    "I would have called you, but my phone battery died.",
    "ऐका. फोन का केला नाही?",
    "फोनची बॅटरी संपली",
    ["वेळ नव्हता", "नंबर माहीत नव्हता"],
    "but नंतर कारण: phone battery died.",
  ),
  und(
    "“Breakfast” म्हणजे काय?",
    "सकाळचा नाश्ता",
    ["रात्रीचे जेवण", "दुपारचा चहा"],
    "Breakfast म्हणजे सकाळचा नाश्ता.",
  ),
  und(
    "“Appointment” म्हणजे काय?",
    "ठरलेली भेट",
    ["पावती", "प्रवास"],
    "Appointment म्हणजे डॉक्टर किंवा कार्यालयात ठरलेली भेट.",
  ),
  und(
    "“Reluctant” म्हणजे काय?",
    "इच्छा नसलेला/कचरणारा",
    ["खूप उत्साही", "खूप थकलेला"],
    "Reluctant म्हणजे एखादी गोष्ट करायला तयार नसणे.",
  ),
  gap("She ___ a teacher.", "is", ["am", "are"], "She सोबत is वापरतात."),
  gap(
    "Yesterday I ___ to the market.",
    "went",
    ["go", "going"],
    "Yesterday म्हणजे भूतकाळ; go चे भूतकाळी रूप went.",
  ),
  gap(
    "If I ___ more time, I would learn another language.",
    "had",
    ["have", "will have"],
    "काल्पनिक परिस्थितीसाठी if + had आणि would वापरतात.",
  ),
]);

// Step 1 of the starting check: letters and sounds. Answering these poorly
// recommends the Foundation path. Scored separately from the nine questions.
export const foundationQuestions: Ex[] = finish("place", "f", [
  lis(
    "B",
    "ऐका. कोणते अक्षर ऐकले?",
    "B",
    ["K", "S"],
    "'बी' हे B अक्षराचे नाव आहे.",
  ),
  und(
    "sun शब्दाचा पहिला आवाज कोणता?",
    "s",
    ["n", "u"],
    "sun मध्ये पहिला आवाज s आहे: 'स्'.",
  ),
  und(
    "b – e – d जोडल्यावर कोणता शब्द बनतो?",
    "bed",
    ["bad", "bud"],
    "b, e, d जोडल्यावर bed बनतो.",
  ),
]);

export const speakingChecks = [
  "मी माझे नाव, गाव आणि काम इंग्रजीत सांगू शकतो/शकते.",
  "मी दुकानात किंवा हॉटेलमध्ये साधे प्रश्न विचारू शकतो/शकते.",
  "मी एखादी घटना किंवा माझे मत सुमारे एक मिनिट इंग्रजीत सांगू शकतो/शकते.",
];

// The recommended starting unit. Unit IDs are validated by the content tests.
export function recommend(
  score: number,
  speak: number,
  foundation?: number,
): { path: PathId; unit: string } {
  if (foundation !== undefined) {
    if (foundation <= 1) return { path: "foundation", unit: "f1" };
    if (foundation === 2) return { path: "foundation", unit: "f2" };
    if (score <= 2) return { path: "foundation", unit: "f4" };
  }
  if (score <= 3) return { path: "beginner", unit: "b1" };
  if (score <= 5) return { path: "beginner", unit: "b5" };
  if (score <= 7) return { path: "beginner", unit: "b9" };
  return speak >= 2
    ? { path: "intermediate", unit: "i1" }
    : { path: "beginner", unit: "b10" };
}
void bld;
