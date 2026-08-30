import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { LangContext, STR } from "./lib/i18n";
import type { Lang } from "./lib/i18n";
import Masthead from "./components/Masthead";
import Keyboard from "./components/Keyboard";
import Deck from "./components/Deck";
import type { RaceResult } from "./components/Deck";
import Stats from "./components/Stats";
import Ticker from "./components/Ticker";
import Fixer from "./components/Fixer";
import Specs from "./components/Specs";
import Footer from "./components/Footer";
import SectionHead from "./components/SectionHead";
import Reveal from "./components/Reveal";
import { CODE_MAP, charFor, pickWord } from "./lib/keyboard";
import type { KeyDef } from "./lib/keyboard";
import { playTick } from "./lib/sound";

type Floater = { ch: string; style: CSSProperties; cls: string };

const float = (ch: string, cls: string, style: CSSProperties): Floater => ({ ch, cls, style });

const FLOATERS: Record<Lang, Floater[]> = {
  ar: [
    float("ض", "text-mint/5", { top: "4%", right: "-3%", fontSize: "24rem", animationDuration: "18s" }),
    float("ش", "text-amber/5", { top: "38%", left: "-4%", fontSize: "20rem", animationDuration: "22s", animationDelay: "-6s" }),
    float("ط", "text-coral/5", { top: "62%", right: "2%", fontSize: "26rem", animationDuration: "26s", animationDelay: "-12s" }),
    float("ظ", "text-mint/5", { top: "8%", left: "16%", fontSize: "14rem", animationDuration: "20s", animationDelay: "-3s" }),
  ],
  fa: [
    float("پ", "text-mint/5", { top: "4%", right: "-3%", fontSize: "24rem", animationDuration: "18s" }),
    float("چ", "text-amber/5", { top: "38%", left: "-4%", fontSize: "20rem", animationDuration: "22s", animationDelay: "-6s" }),
    float("ژ", "text-coral/5", { top: "62%", right: "2%", fontSize: "26rem", animationDuration: "26s", animationDelay: "-12s" }),
    float("گ", "text-mint/5", { top: "8%", left: "16%", fontSize: "14rem", animationDuration: "20s", animationDelay: "-3s" }),
  ],
  en: [
    float("Q", "text-mint/5", { top: "4%", right: "-3%", fontSize: "24rem", animationDuration: "18s" }),
    float("⇧", "text-amber/5", { top: "38%", left: "-4%", fontSize: "20rem", animationDuration: "22s", animationDelay: "-6s" }),
    float("K", "text-coral/5", { top: "62%", right: "2%", fontSize: "26rem", animationDuration: "26s", animationDelay: "-12s" }),
    float("⏎", "text-mint/5", { top: "8%", left: "16%", fontSize: "14rem", animationDuration: "20s", animationDelay: "-3s" }),
  ],
};

export default function App() {
  /* ------- اللغة ------- */
  const [lang, setLang] = useState<Lang>("fa");
  const t = STR[lang];
  const ctx = useMemo(() => ({ lang, t }), [lang, t]);

  /* ------- حالة اللوحة ------- */
  const [layout, setLayout] = useState<Lang>("fa");
  const [shiftOn, setShiftOn] = useState(false);
  const [capsOn, setCapsOn] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [pressed, setPressed] = useState<Set<string>>(new Set());

  /* ------- الورقة الحرّة ------- */
  const [text, setText] = useState("");
  const [tab, setTab] = useState<"free" | "race">("free");

  /* ------- الإحصاءات ------- */
  const [total, setTotal] = useState(0);
  const [heat, setHeat] = useState<Record<string, number>>({});
  const [kpm, setKpm] = useState(0);
  const stampsRef = useRef<number[]>([]);

  /* ------- السباق ------- */
  const [target, setTarget] = useState(() => pickWord("fa"));
  const [pos, setPos] = useState(0);
  const [marks, setMarks] = useState<("hit" | "miss")[]>([]);
  const [raceStart, setRaceStart] = useState<number | null>(null);
  const [result, setResult] = useState<RaceResult | null>(null);
  const [best, setBest] = useState<RaceResult | null>(null);

  /* تبديل اللغة يبدّل تخطيط الكتابة الافتراضي، اتجاه الصفحة، وخطوطها */
  const changeLang = (l: Lang) => {
    setLang(l);
    setLayout(l);
  };
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "en" ? "ltr" : "rtl";
    document.documentElement.className = `lang-${lang}`;
    document.title = t.doc.title;
  }, [lang, t]);

  /* كلمات السباق تتبع لغة الصفحة */
  useEffect(() => {
    setTarget(pickWord(lang));
    setPos(0);
    setMarks([]);
    setResult(null);
    setRaceStart(null);
    setBest(null);
  }, [lang]);

  /* إيقاع آخر دقيقة */
  useEffect(() => {
    const compute = () => {
      const cutoff = Date.now() - 60_000;
      stampsRef.current = stampsRef.current.filter((ts) => ts > cutoff);
      setKpm(stampsRef.current.length);
    };
    compute();
    const id = window.setInterval(compute, 1000);
    return () => window.clearInterval(id);
  }, []);

  const registerPress = (code: string) => {
    setTotal((v) => v + 1);
    setHeat((h) => ({ ...h, [code]: (h[code] ?? 0) + 1 }));
    stampsRef.current.push(Date.now());
  };

  const feedRace = (def: KeyDef, eventKey?: string) => {
    if (result) return;
    let ch: string;
    if (eventKey && eventKey.length === 1) {
      ch = lang === "en" ? eventKey.toLowerCase() : eventKey;
    } else {
      ch = def.kind === "space" ? " " : charFor(def, false, lang);
    }
    if (ch === " " || !ch) return;
    if (raceStart === null) setRaceStart(Date.now());
    const hit = ch === target[pos];
    const nextMarks: ("hit" | "miss")[] = [...marks, hit ? "hit" : "miss"];
    const nextPos = pos + 1;
    setMarks(nextMarks);
    setPos(nextPos);
    if (nextPos >= target.length) {
      const start = raceStart ?? Date.now();
      const time = Math.max(Date.now() - start, 40);
      const hits = nextMarks.filter((m) => m === "hit").length;
      const res: RaceResult = {
        time,
        acc: Math.round((hits / target.length) * 100),
        cps: +(target.length / (time / 1000)).toFixed(1),
        word: target,
      };
      setResult(res);
      setBest((b) => (!b || res.cps > b.cps ? res : b));
    }
  };

  const nextWord = () => {
    setTarget((prev) => pickWord(lang, prev));
    setPos(0);
    setMarks([]);
    setResult(null);
    setRaceStart(null);
  };

  /** نواة المنطق: ماذا تفعل كل ضغطة */
  const fireKey = (def: KeyDef, physShift: boolean, eventKey?: string) => {
    const shift = physShift || shiftOn;

    if (def.kind === "modifier") {
      setShiftOn((s) => !s);
      playTick("action", soundOn);
      return;
    }
    if (def.code === "CapsLock") {
      setCapsOn((c) => !c);
      playTick("action", soundOn);
      return;
    }
    if (def.code === "Backspace") {
      if (tab === "free") setText((prev) => prev.slice(0, -1));
      playTick("action", soundOn);
      return;
    }
    if (def.code === "Enter") {
      if (tab === "free") setText((prev) => prev + "\n");
      playTick("action", soundOn);
      return;
    }
    if (def.kind === "fn") {
      playTick("action", soundOn);
      return;
    }

    registerPress(def.code);
    if (tab === "race") {
      feedRace(def, eventKey);
      playTick("key", soundOn);
      return;
    }
    const ch = charFor(def, shift, layout);
    setText((prev) => prev + ch);
    playTick(ch === " " ? "space" : "key", soundOn);
  };

  /* لوحة المفاتيح الفعلية */
  useEffect(() => {
    const onDown = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement | null;
      if (el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable)) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      if (e.code === "Escape") {
        setText("");
        return;
      }
      const def = CODE_MAP.get(e.code);
      if (!def) return;
      e.preventDefault();

      setPressed((prev) => {
        if (prev.has(e.code)) return prev;
        const n = new Set(prev);
        n.add(e.code);
        return n;
      });
      if (e.repeat) return;
      fireKey(def, e.shiftKey, e.key);
    };
    const onUp = (e: KeyboardEvent) => {
      setPressed((prev) => {
        if (!prev.has(e.code)) return prev;
        const n = new Set(prev);
        n.delete(e.code);
        return n;
      });
    };
    window.addEventListener("keydown", onDown);
    window.addEventListener("keyup", onUp);
    return () => {
      window.removeEventListener("keydown", onDown);
      window.removeEventListener("keyup", onUp);
    };
  });

  /* نقر الفأرة / اللمس على المفاتيح */
  const pointerDown = (code: string) => {
    setPressed((prev) => {
      if (prev.has(code)) return prev;
      const n = new Set(prev);
      n.add(code);
      return n;
    });
    const def = CODE_MAP.get(code);
    if (def) fireKey(def, false);
  };
  const pointerUp = (code: string) => {
    setPressed((prev) => {
      if (!prev.has(code)) return prev;
      const n = new Set(prev);
      n.delete(code);
      return n;
    });
  };

  return (
    <LangContext.Provider value={ctx}>
      <div className="relative min-h-screen">
        {/* طبقات الخلفية */}
        <div className="fixed inset-0 bg-keygrid pointer-events-none" />
        <div className="fixed inset-0 vignette pointer-events-none" />
        <div className="fixed inset-0 overflow-hidden pointer-events-none hidden md:block" aria-hidden="true">
          {FLOATERS[lang].map((f, i) => (
            <span
              key={`${lang}-${i}`}
              className={`anim-float absolute font-display select-none leading-none ${f.cls}`}
              style={f.style}
            >
              {f.ch}
            </span>
          ))}
        </div>
        <div className="noise-overlay" />

        <div className="relative z-10">
          <Masthead
            lang={lang}
            onLang={changeLang}
            layout={layout}
            onLayout={setLayout}
            soundOn={soundOn}
            onSound={() => setSoundOn((s) => !s)}
          />

          {/* ٠١ — المنضدة */}
          <section className="max-w-6xl mx-auto px-5 md:px-8 pb-16 md:pb-20">
            <Reveal>
              <SectionHead
                num={t.secs.board.num}
                kicker={t.secs.board.kicker}
                title={t.secs.board.title}
              />
            </Reveal>

            <Reveal delay={100}>
              <Keyboard
                pressed={pressed}
                layout={layout}
                shiftOn={shiftOn}
                capsOn={capsOn}
                soundOn={soundOn}
                heat={heat}
                onDown={pointerDown}
                onUp={pointerUp}
              />
            </Reveal>

            <Reveal delay={200} className="mt-8">
              <Deck
                text={text}
                onClear={() => setText("")}
                tab={tab}
                onTab={setTab}
                target={target}
                pos={pos}
                marks={marks}
                result={result}
                best={best}
                onNextWord={nextWord}
              />
            </Reveal>

            <Reveal delay={120} className="mt-10">
              <div className="flex items-baseline justify-between mb-4 gap-4 flex-wrap">
                <h3 className="font-display text-2xl text-bone">{t.secs.stats.title}</h3>
                <span className="font-mono text-[11px] tracking-[0.25em] text-fog">
                  {t.secs.stats.sub}
                </span>
              </div>
              <Stats total={total} kpm={kpm} heat={heat} layout={layout} />
            </Reveal>
          </section>

          <Reveal>
            <Ticker />
          </Reveal>

          <Fixer />
          <Specs />
          <Footer />
        </div>
      </div>
    </LangContext.Provider>
  );
}
