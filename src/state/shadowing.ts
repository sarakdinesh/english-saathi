// Speak-along highlighting: pure helpers, no React.
// Each word with where it starts in the sentence, for highlighting.
export const wordSpans = (text: string) =>
  [...text.matchAll(/\S+/g)].map((m) => ({ word: m[0], start: m.index! }));
// The word being spoken at `charIndex` (from the voice's word events), or -1.
export const wordAt = (spans: { start: number }[], charIndex: number) =>
  charIndex < 0
    ? -1
    : spans.reduce((hit, w, i) => (w.start <= charIndex ? i : hit), -1);
