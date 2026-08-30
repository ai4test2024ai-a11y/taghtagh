export type KeyKind = "key" | "fn" | "action" | "modifier" | "space";

export interface KeyDef {
  code: string;
  en: string;
  enShift: string;
  ar: string;
  arShift: string;
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
  extra: Partial<KeyDef> = {},
): KeyDef => ({ code, en, enShift, ar, arShift, w: 1, kind: "key", ...extra });

export const ROWS: KeyDef[][] = [
  [
    k("Backquote", "`", "~", "ذ", "ّ"),
    k("Digit1", "1", "!", "١", "!"),
    k("Digit2", "2", "@", "٢", "@"),
    k("Digit3", "3", "#", "٣", "#"),
    k("Digit4", "4", "$", "٤", "$"),
    k("Digit5", "5", "%", "٥", "%"),
    k("Digit6", "6", "^", "٦", "^"),
    k("Digit7", "7", "&", "٧", "&"),
    k("Digit8", "8", "*", "٨", "*"),
    k("Digit9", "9", "(", "٩", ")"),
    k("Digit0", "0", ")", "٠", "("),
    k("Minus", "-", "_", "ـ", "_"),
    k("Equal", "=", "+", "+", "="),
    k("Backspace", "", "", "", "", { w: 2, label: "⌫ مسح", kind: "action" }),
  ],
  [
    k("Tab", "", "", "", "", { w: 1.5, label: "Tab", kind: "fn" }),
    k("KeyQ", "q", "Q", "ض", "َ"),
    k("KeyW", "w", "W", "ص", "ً"),
    k("KeyE", "e", "E", "ث", "ٌ"),
    k("KeyR", "r", "R", "ق", "ُ"),
    k("KeyT", "t", "T", "ف", "لإ"),
    k("KeyY", "y", "Y", "غ", "إ"),
    k("KeyU", "u", "U", "ع", "‘"),
    k("KeyI", "i", "I", "ه", "÷"),
    k("KeyO", "o", "O", "خ", "×"),
    k("KeyP", "p", "P", "ح", "؛"),
    k("BracketLeft", "[", "{", "ج", "<"),
    k("BracketRight", "]", "}", "د", ">"),
    k("Backslash", "\\", "|", "÷", "|", { w: 1.5 }),
  ],
  [
    k("CapsLock", "", "", "", "", { w: 1.75, label: "Caps ⇪", kind: "fn" }),
    k("KeyA", "a", "A", "ش", "ِ"),
    k("KeyS", "s", "S", "س", "ٍ"),
    k("KeyD", "d", "D", "ي", "]"),
    k("KeyF", "f", "F", "ب", "["),
    k("KeyG", "g", "G", "ل", "لأ"),
    k("KeyH", "h", "H", "ا", "أ"),
    k("KeyJ", "j", "J", "ت", "ـ"),
    k("KeyK", "k", "K", "ن", "،"),
    k("KeyL", "l", "L", "م", "/"),
    k("Semicolon", ";", ":", "ك", ":"),
    k("Quote", "'", '"', "ط", '"'),
    k("Enter", "", "", "", "", { w: 2.25, label: "↵ إدخال", kind: "action" }),
  ],
  [
    k("ShiftLeft", "", "", "", "", { w: 2.25, label: "⇧", kind: "modifier" }),
    k("KeyZ", "z", "Z", "ئ", "آ"),
    k("KeyX", "x", "X", "ء", "’"),
    k("KeyC", "c", "C", "ؤ", "}"),
    k("KeyV", "v", "V", "ر", "{"),
    k("KeyB", "b", "B", "\uFEFB", "لآ"),
    k("KeyN", "n", "N", "ى", "ْ"),
    k("KeyM", "m", "M", "ة", "'"),
    k("Comma", ",", "<", "و", ","),
    k("Period", ".", ">", ".", "."),
    k("Slash", "/", "?", "ظ", "؟"),
    k("ShiftRight", "", "", "", "", { w: 2.75, label: "⇧", kind: "modifier" }),
  ],
  [
    k("ControlLeft", "", "", "", "", { w: 1.5, label: "Ctrl", kind: "fn" }),
    k("MetaLeft", "", "", "", "", { w: 1.25, label: "Win", kind: "fn" }),
    k("AltLeft", "", "", "", "", { w: 1.25, label: "Alt", kind: "fn" }),
    k("Space", " ", " ", " ", " ", { w: 7, kind: "space" }),
    k("AltRight", "", "", "", "", { w: 1.25, label: "Alt", kind: "fn" }),
    k("ContextMenu", "", "", "", "", { w: 1.25, label: "Menu", kind: "fn" }),
    k("ControlRight", "", "", "", "", { w: 1.5, label: "Ctrl", kind: "fn" }),
  ],
];

export const CODE_MAP: Map<string, KeyDef> = new Map(
  ROWS.flat().map((def) => [def.code, def]),
);

/** ترتيب الحروف كما تجلس على اللوحة — لشريط الحروف المتحرك */
export const BOARD_ORDER =
  "ضصثقفغعهخحجدةشسيبلاتنمكطئءؤرىةوظ٭";

export type LayoutName = "ar" | "en";

export function charFor(def: KeyDef, shift: boolean, layout: LayoutName): string {
  if (def.kind === "space") return " ";
  if (layout === "ar") return shift ? def.arShift : def.ar;
  return shift ? def.enShift : def.en;
}

/* ------------------------------------------------- */
/*  مصحّح التخطيط المقلوب: نفس المفتاح الفيزيائي،    */
/*  حرفان مختلفان — عربي وإنجليزي                    */
/* ------------------------------------------------- */

const EN_KEYS = "`1234567890-=qwertyuiop[]\\asdfghjkl;'zxcvbnm,./".split("");
const AR_KEYS = [
  "ذ", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩", "٠", "ـ", "+",
  "ض", "ص", "ث", "ق", "ف", "غ", "ع", "ه", "خ", "ح", "ج", "د", "÷",
  "ش", "س", "ي", "ب", "ل", "ا", "ت", "ن", "م", "ك", "ط",
  "ئ", "ء", "ؤ", "ر", "\uFEFB", "ى", "ة", "و", ".", "ظ",
];

const arToEn = new Map<string, string>();
const enToAr = new Map<string, string>();
AR_KEYS.forEach((arCh, i) => {
  arToEn.set(arCh, EN_KEYS[i]);
  enToAr.set(EN_KEYS[i], arCh);
});

const ARABIC_RE = /[\u0600-\u06FF\uFE70-\uFEFF]/;

export type FixDirection = "ar→en" | "en→ar";

export function convertLayout(input: string, dir: FixDirection): string {
  const map = dir === "ar→en" ? arToEn : enToAr;
  let out = "";
  for (const raw of input) {
    const ch = dir === "en→ar" ? raw.toLowerCase() : raw;
    out += map.get(ch) ?? raw;
  }
  return out;
}

export function autoConvert(input: string): { output: string; dir: FixDirection } {
  const dir: FixDirection = ARABIC_RE.test(input) ? "ar→en" : "en→ar";
  return { output: convertLayout(input, dir), dir };
}

/* ------------------------------------------------- */
/*  كلمات سباق الكتابة                                */
/* ------------------------------------------------- */

export const RACE_WORDS = [
  "شمس", "قمر", "كتاب", "قهوة", "سلام", "نور", "حرف", "لوحة",
  "مفتاح", "ضوء", "طاقة", "غيمة", "بحر", "قلم", "ليل", "نجم",
  "سماء", "دفتر", "حديقة", "رسالة", "مطر", "ورد", "صوت", "ظل",
];

export const pickWord = (prev?: string): string => {
  let w = prev;
  while (w === prev) {
    w = RACE_WORDS[Math.floor(Math.random() * RACE_WORDS.length)];
  }
  return w as string;
};

/** أرقام هندية للعرض */
export const toArabicDigits = (n: number | string): string =>
  String(n).replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[Number(d)]);
