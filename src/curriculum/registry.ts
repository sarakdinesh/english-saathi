// Every authored unit file is listed here explicitly, in learning order.
// Data only: no imports from the app's state or screens, so content can be
// loaded by both the course data and the validation scripts.
import * as f1 from "./foundation/f1-alphabet";
import * as f2 from "./foundation/f2-phonics";
import * as f3 from "./foundation/f3-patterns";
import * as f4 from "./foundation/f4-first-words";
import * as r0 from "./reading/r0-reading";
import * as b1 from "./beginner/b1-greetings";
import * as b2 from "./beginner/b2-people-numbers";
import * as b3 from "./beginner/b3-time-places";
import * as b4 from "./beginner/b4-home-food";
import * as b5 from "./beginner/b5-pronouns-be";
import * as b6 from "./beginner/b6-patterns";
import * as b7 from "./beginner/b7-questions-negatives";
import * as b8 from "./beginner/b8-routine-now";
import * as b8p from "./beginner/b8p-past-simple";
import * as b9 from "./beginner/b9-past-future";
import * as b10 from "./beginner/b10-situations";
import * as b11 from "./beginner/b11-help-sounds";
import * as i1 from "./intermediate/i1-longer-answers";
import * as i2 from "./intermediate/i2-describing";
import * as i3 from "./intermediate/i3-stories";
import * as i4 from "./intermediate/i4-opinions";
import * as i5 from "./intermediate/i5-workplace";
import * as i6 from "./intermediate/i6-interviews";
import * as i7 from "./intermediate/i7-problems";
import * as i8 from "./intermediate/i8-modals-conditionals";
import * as i9 from "./intermediate/i9-natural-language";
import * as i10 from "./intermediate/i10-presenting";
import type { Enrich, Unit } from "./types";
import type { Lesson } from "../data/course";

type UnitFile = {
  unit: Unit;
  lessons?: Lesson[];
  kits: Record<string, Enrich>;
};
export const unitFiles: UnitFile[] = [
  f1,
  f2,
  f3,
  f4,
  r0,
  b1,
  b2,
  b3,
  b4,
  b5,
  b6,
  b7,
  b8,
  b8p,
  b9,
  b10,
  b11,
  i1,
  i2,
  i3,
  i4,
  i5,
  i6,
  i7,
  i8,
  i9,
  i10,
];
export const curriculumLessons: Lesson[] = unitFiles.flatMap(
  (f) => f.lessons ?? [],
);
