import { useEffect, useState } from "react";

export const SCRAMBLE_GLYPHS = {
  ar: "ضصثقفغعهخحجدةشسيبلاتنمكطئءؤرىظذ٭",
  fa: "ضصثقفغعهخحجچشسیبلاتنمکگظطزرذدپ٭",
  en: "QWERTYUIOPASDFGHJKLZXCVBNM#*%&",
} as const;

/** عنوان يتفكك إلى حروف عشوائية ثم يلتئم — مع احترام تفضيل تقليل الحركة */
export function useScramble(text: string, glyphs: string): string {
  const [out, setOut] = useState(text);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOut(text);
      return;
    }
    const build = (revealed: number): string => {
      let s = "";
      for (let i = 0; i < text.length; i++) {
        if (text[i] === " ") {
          s += " ";
          continue;
        }
        s +=
          i < revealed
            ? text[i]
            : glyphs[Math.floor(Math.random() * glyphs.length)];
      }
      return s;
    };

    let frame = 0;
    const total = 16;
    setOut(build(0));
    const id = window.setInterval(() => {
      frame++;
      setOut(build(Math.floor((frame / total) * text.length)));
      if (frame >= total) {
        setOut(text);
        window.clearInterval(id);
      }
    }, 55);
    return () => window.clearInterval(id);
  }, [text]);

  return out;
}
