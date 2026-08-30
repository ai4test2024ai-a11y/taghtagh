export type KeyKind = "key" | "fn" | "action" | "modifier" | "space";

export interface KeyDef {
  code: string;
  en: string;
  enShift: string;
  ar: string;
  arShift: string;
  fa: string;
  faShift: string;
  w: number;
  label?: string;
  kind: KeyKind;
}

const k = (
  code: string,
  en: string,
  enShift: string,
  ar: string,
  arShift: string,
  fa: string,
  faShift: string,
  extra: Partial<KeyDef> = {},
): KeyDef => ({
  code,
  en,
  enShift,
  ar,
  arShift,
  fa,
  faShift,
  w: 1,
  kind: "key",
  ...extra,
});

/**
 * الصفوف الثلاثة للحروف واحدة في التخطيطين العربي والفارسي
 * (ISIRI 9147) إلا في مواضع معروفة: چ بدل د، گ بدل ط، پ روی M،
 * وژ فوق Shift+C — ونصف‌فاصله فوق Shift+Space.
 */
export const ROWS: KeyDef[][] = [
  [
    k("Backquote", "`", "~", "ذ", "ّ", "ـ", "÷"),
    k("Digit1", "1", "!", "١", "!", "۱", "!"),
    k("Digit2", "2", "@", "٢", "@", "۲", "@"),
    k("Digit3", "3", "#", "٣", "#", "۳", "#"),
    k("Digit4", "4", "$", "٤", "$", "۴", "$"),
    k("Digit5", "5", "%", "٥", "٪", "۵", "٪"),
    k("Digit6", "6", "^", "٦", "^", "۶", "^"),
    k("Digit7", "7", "&", "٧", "&", "۷", "&"),
    k("Digit8", "8", "*", "٨", "*", "۸", "*"),
    k("Digit9", "9", "(", "٩", ")", "۹", ")"),
    k("Digit0", "0", ")", "٠", "(", "۰", "("),
    k("Minus", "-", "_", "ـ", "_", "-", "_"),
    k("Equal", "=", "+", "+", "=", "=", "+"),
    k("Backspace", "", "", "", "", "", "", { w: 2, label: "⌫", kind: "action" }),
  ],
  [
    k("Tab", "", "", "", "", "", "", { w: 1.5, label: "Tab", kind: "fn" }),
    k("KeyQ", "q", "Q", "ض", "َ", "ض", "ْ"),
    k("KeyW", "w", "W", "ص", "ً", "ص", "ٌ"),
    k("KeyE", "e", "E", "ث", "ٌ", "ث", "ٍ"),
    k("KeyR", "r", "R", "ق", "ُ", "ق", "ً"),
    k("KeyT", "t", "T", "ف", "لإ", "ف", "ُ"),
    k("KeyY", "y", "Y", "غ", "إ", "غ", "ِ"),
    k("KeyU", "u", "U", "ع", "‘", "ع", "َ"),
    k("KeyI", "i", "I", "ه", "÷", "ه", "ّ"),
    k("KeyO", "o", "O", "خ", "×", "خ", "]"),
    k("KeyP", "p", "P", "ح", "؛", "ح", "["),
    k("BracketLeft", "[", "{", "ج", "<", "ج", "}"),
    k("BracketRight", "]", "}", "د", ">", "چ", "{"),
    k("Backslash", "\\", "|", "÷", "|", "\\", "|", { w: 1.5 }),
  ],
  [
    k("CapsLock", "", "", "", "", "", "", { w: 1.75, label: "Caps ⇪", kind: "fn" }),
    k("KeyA", "a", "A", "ش", "ِ", "ش", "ؤ"),
    k("KeyS", "s", "S", "س", "ٍ", "س", "ئ"),
    k("KeyD", "d", "D", "ي", "]", "ی", "ي"),
    k("KeyF", "f", "F", "ب", "[", "ب", "إ"),
    k("KeyG", "g", "G", "ل", "لأ", "ل", "أ"),
    k("KeyH", "h", "H", "ا", "أ", "ا", "آ"),
    k("KeyJ", "j", "J", "ت", "ـ", "ت", "،"),
    k("KeyK", "k", "K", "ن", "،", "ن", "؛"),
    k("KeyL", "l", "L", "م", "/", "م", ":"),
    k("Semicolon", ";", ":", "ك", ":", "ک", "«"),
    k("Quote", "'", '"', "ط", '"', "گ", "»"),
    k("Enter", "", "", "", "", "", "", { w: 2.25, label: "↵", kind: "action" }),
  ],
  [
    k("ShiftLeft", "", "", "", "", "", "", { w: 2.25, label: "⇧", kind: "modifier" }),
    k("KeyZ", "z", "Z", "ئ", "آ", "ظ", "ك"),
    k("KeyX", "x", "X", "ء", "’", "ط", "ٓ"),
    k("KeyC", "c", "C", "ؤ", "}", "ز", "ژ"),
    k("KeyV", "v", "V", "ر", "{", "ر", "ٰ"),
    k("KeyB", "b", "B", "\uFEFB", "لآ", "ذ", "ٔ"),
    k("KeyN", "n", "N", "ى", "ْ", "د", "\u200C"),
    k("KeyM", "m", "M", "ة", "'", "پ", "."),
    k("Comma", ",", "<", "و", ",", "و", "،"),
    k("Period", ".", ">", ".", ">", ".", ">"),
    k("Slash", "/", "?", "ظ", "؟", "/", "؟"),
    k("ShiftRight", "", "", "", "", "", "", { w: 2.75, label: "⇧", kind: "modifier" }),
  ],
  [
    k("ControlLeft", "", "", "", "", "", "", { w: 1.5, label: "Ctrl", kind: "fn" }),
    k("MetaLeft", "", "", "", "", "", "", { w: 1.25, label: "Win", kind: "fn" }),
    k("AltLeft", "", "", "", "", "", "", { w: 1.25, label: "Alt", kind: "fn" }),
    k("Space", " ", " ", " ", " ", " ", "\u200C", { w: 7, kind: "space" }),
    k("AltRight", "", "", "", "", "", "", { w: 1.25, label: "Alt", kind: "fn" }),
    k("ContextMenu", "", "", "", "", "", "", { w: 1.25, label: "Menu", kind: "fn" }),
    k("ControlRight", "", "", "", "", "", "", { w: 1.5, label: "Ctrl", kind: "fn" }),
  ],
];

export const CODE_MAP: Map<string, KeyDef> = new Map(
  ROWS.flat().map((def) => [def.code, def]),
);

/* ------------------------------------------------- */
/*  ترتيب الحروف كما تجلس على اللوحة — لشريط الحروف  */
/* ------------------------------------------------- */

export const BOARD_ORDER_AR = "ضصثقفغعهخحجدةشسيبلاتنمكطئءؤرىةوظ٭";
export const BOARD_ORDER_FA = "ضصثقفغعهخحجچشسیبلاتنمکگظطزرذدپو٭";

export type LangScript = "ar" | "fa";
export const boardOrder = (lang: LangScript): string =>
  lang === "fa" ? BOARD_ORDER_FA : BOARD_ORDER_AR;

export type LayoutName = "ar" | "en" | "fa";

export function charFor(def: KeyDef, shift: boolean, layout: LayoutName): string {
  if (def.kind === "space") return shift && layout === "fa" ? "\u200C" : " ";
  if (layout === "ar") return shift ? def.arShift : def.ar;
  if (layout === "fa") return shift ? def.faShift : def.fa;
  return shift ? def.enShift : def.en;
}

/* ------------------------------------------------- */
/*  مصحّح التخطيط المقلوب: نفس المفتاح الفيزيائي،    */
/*  حرفان مختلفان — محلي وإنجليزي                    */
/* ------------------------------------------------- */

const SCRIPT_RE = /[\u0600-\u06FF\uFE70-\uFEFF]/;

function buildPair(lang: LangScript) {
  const toEn = new Map<string, string>();
  const fromEn = new Map<string, string>();
  for (const def of ROWS.flat()) {
    if (def.kind === "space" || !def.en) continue;
    const main = lang === "ar" ? def.ar : def.fa;
    const shifted = lang === "ar" ? def.arShift : def.faShift;
    if (main) {
      toEn.set(main, def.en);
      fromEn.set(def.en.toLowerCase(), main);
    }
    if (shifted && def.enShift) {
      toEn.set(shifted, def.enShift);
      fromEn.set(def.enShift.toLowerCase(), shifted);
    }
  }
  return { toEn, fromEn };
}

const PAIRS: Record<LangScript, ReturnType<typeof buildPair>> = {
  ar: buildPair("ar"),
  fa: buildPair("fa"),
};

export type FixDirection = "local→en" | "en→local";

export function convertLayout(
  input: string,
  dir: FixDirection,
  lang: LangScript,
): string {
  const pair = PAIRS[lang];
  const map = dir === "local→en" ? pair.toEn : pair.fromEn;
  let out = "";
  for (const raw of input) {
    const ch = dir === "en→local" ? raw.toLowerCase() : raw;
    out += map.get(ch) ?? raw;
  }
  return out;
}

export function autoConvert(
  input: string,
  lang: LangScript,
): { output: string; dir: FixDirection } {
  const dir: FixDirection = SCRIPT_RE.test(input) ? "local→en" : "en→local";
  return { output: convertLayout(input, dir, lang), dir };
}

/** أي حرف في النص ينتمي إلى الكتابة العربية/الفارسية؟ */
export const isScriptChar = (ch: string): boolean => SCRIPT_RE.test(ch);

/* ------------------------------------------------- */
/*  كلمات سباق الكتابة                                */
/* ------------------------------------------------- */

export const RACE_WORDS: Record<LangScript, string[]> = {
  ar: [
    "شمس", "قمر", "كتاب", "قهوة", "سلام", "نور", "حرف", "لوحة",
    "مفتاح", "ضوء", "طاقة", "غيمة", "بحر", "قلم", "ليل", "نجم",
    "سماء", "دفتر", "حديقة", "رسالة", "مطر", "ورد", "صوت", "ظل",
  ],
  fa: [
    "سلام", "تهران", "کتاب", "خورشید", "باران", "دانشگاه", "شعر", "موسیقی",
    "آزادی", "نوروز", "بهار", "ستاره", "خیابان", "قهرمان", "دریا", "آسمان",
    "پنجره", "کوه", "آینه", "دوست", "شب", "ماه", "کلید", "صدا",
  ],
};

export const pickWord = (lang: LangScript, prev?: string): string => {
  const list = RACE_WORDS[lang];
  let w = prev;
  while (w === prev) {
    w = list[Math.floor(Math.random() * list.length)];
  }
  return w as string;
};

/** أرقام محلية للعرض — هندية عربية أو فارسية */
export const localDigits = (n: number | string, lang: LangScript): string =>
  String(n).replace(
    /\d/g,
    (d) => (lang === "fa" ? "۰۱۲۳۴۵۶۷۸۹" : "٠١٢٣٤٥٦٧٨٩")[Number(d)],
  );

export const toArabicDigits = (n: number | string): string =>
  localDigits(n, "ar");
