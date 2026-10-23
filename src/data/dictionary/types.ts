// One category of the daily-life word list. `raw` holds "English|मराठी" lines.
export type WordGroup = { id: string; mr: string; en: string; raw: string };
export type Word = { en: string; mr: string; cat: string };
