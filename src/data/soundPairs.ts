// Minimal pairs: two words that differ by one sound Marathi speakers often
// mix up. Used by the "which word did you hear?" game.
export type SoundGroup = {
  id: string;
  title: string;
  mr: string;
  tip: string;
  pairs: [string, string][];
};

export const soundGroups: SoundGroup[] = [
  {
    id: "v-w",
    title: "V / W",
    mr: "व्ह / व",
    tip: "V: वरचे दात खालच्या ओठावर. W: ओठ गोल करा, दात लावू नका.",
    pairs: [["vest", "west"], ["vine", "wine"], ["vet", "wet"], ["verse", "worse"]],
  },
  {
    id: "s-sh",
    title: "S / SH",
    mr: "स / श",
    tip: "S: जीभ दातांजवळ, पातळ हवा. SH: ओठ थोडे पुढे, 'श' सारखा जाड आवाज.",
    pairs: [["sip", "ship"], ["see", "she"], ["sort", "short"], ["save", "shave"]],
  },
  {
    id: "a-e",
    title: "A / E",
    mr: "ॲ / ए",
    tip: "bad मध्ये तोंड जास्त उघडा (ॲ). bed मध्ये तोंड कमी उघडा (ए).",
    pairs: [["bad", "bed"], ["man", "men"], ["pan", "pen"], ["sat", "set"]],
  },
  {
    id: "i-ee",
    title: "I / EE",
    mr: "इ / ई",
    tip: "ship मधला 'इ' लहान आणि सैल. sheep मधला 'ई' लांब आणि ओठ ताणलेले.",
    pairs: [["ship", "sheep"], ["bit", "beat"], ["sit", "seat"], ["fill", "feel"]],
  },
  {
    id: "p-f",
    title: "P / F",
    mr: "प / फ",
    tip: "P: दोन्ही ओठ बंद करून सोडा. F: वरचे दात खालच्या ओठावर, हवा सोडा — 'फ' (ph) नाही.",
    pairs: [["pan", "fan"], ["pool", "fool"], ["pin", "fin"], ["pact", "fact"]],
  },
  {
    id: "th-t",
    title: "TH / T",
    mr: "थ / ट",
    tip: "TH: जिभेचे टोक दातांमध्ये, हवा सोडा. T: जीभ दातांच्या मागे.",
    pairs: [["thin", "tin"], ["three", "tree"], ["thank", "tank"], ["thought", "taught"]],
  },
];
