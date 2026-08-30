import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
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
import type { KeyDef, LayoutName } from "./lib/keyboard";
import { playTick } from "./lib/sound";

const FLOATERS: { ch: string; style: CSSProperties; cls: string }[] = [
  { ch: "ض", cls: "text-mint/5", style: { top: "4%", right: "-3%", fontSize: "24rem", animationDuration: "18s" } },
  { ch: "ش", cls: "text-amber/5", style: { top: "38%", left: "-4%", fontSize: "20rem", animationDuration: "22s", animationDelay: "-6s" } },
  { ch: "ط", cls: "text-coral/5", style: { top: "62%", right: "2%", fontSize: "26rem", animationDuration: "26s", animationDelay: "-12s" } },
  { ch: "ظ", cls: "text-mint/5", style: { top: "8%", left: "16%", fontSize: "14rem", animationDuration: "20s", animationDelay: "-3s" } },
];

export default function App() {
  /* ------- حالة اللوحة ------- */
  const [layout, setLayout] = useState<LayoutName>("ar");
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
  const [target, setTarget] = useState(() => pickWord());
  const [pos, setPos] = useState(0);
  const [marks, setMarks] = useState<("hit" | "miss")[]>([]);
  const [raceStart, setRaceStart] = useState<number | null>(null);
  const [result, setResult] = useState<RaceResult | null>(null);
  const [best, setBest] = useState<RaceResult | null>(null);

  /* إيقاع آخر دقيقة */
  useEffect(() => {
    const compute = () => {
      const cutoff = Date.now() - 60_000;
      stampsRef.current = stampsRef.current.filter((t) => t > cutoff);
      setKpm(stampsRef.current.length);
    };
    compute();
    const id = window.setInterval(compute, 1000);
    return () => window.clearInterval(id);
  }, []);

  const registerPress = (code: string) => {
    setTotal((t) => t + 1);
    setHeat((h) => ({ ...h, [code]: (h[code] ?? 0) + 1 }));
    stampsRef.current.push(Date.now());
  };

  const feedRace = (def: KeyDef) => {
    if (result) return;
    const ch = def.kind === "space" ? " " : charFor(def, false, "ar");
    if (ch === " ") return;
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
    setTarget((t) => pickWord(t));
    setPos(0);
    setMarks([]);
    setResult(null);
    setRaceStart(null);
  };

  /** نواة المنطق: ماذا تفعل كل ضغطة */
  const fireKey = (def: KeyDef, physShift: boolean) => {
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
      if (tab === "free") setText((t) => t.slice(0, -1));
      playTick("action", soundOn);
      return;
    }
    if (def.code === "Enter") {
      if (tab === "free") setText((t) => t + "\n");
      playTick("action", soundOn);
      return;
    }
    if (def.kind === "fn") {
      playTick("action", soundOn);
      return;
    }

    registerPress(def.code);
    if (tab === "race") {
      feedRace(def);
      playTick("key", soundOn);
      return;
    }
    setText((t) => t + charFor(def, shift, layout));
    playTick(charFor(def, shift, layout) === " " ? "space" : "key", soundOn);
  };

  /* لوحة المفاتيح الفعلية */
  useEffect(() => {
    const onDown = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
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
      fireKey(def, e.shiftKey);
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
    <div className="relative min-h-screen">
      {/* طبقات الخلفية */}
      <div className="fixed inset-0 bg-keygrid pointer-events-none" />
      <div className="fixed inset-0 vignette pointer-events-none" />
      <div className="fixed inset-0 overflow-hidden pointer-events-none hidden md:block" aria-hidden="true">
        {FLOATERS.map((f, i) => (
          <span
            key={i}
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
          layout={layout}
          onLayout={setLayout}
          soundOn={soundOn}
          onSound={() => setSoundOn((s) => !s)}
        />

        {/* ٠١ — المنضدة */}
        <section className="max-w-6xl mx-auto px-5 md:px-8 pb-16 md:pb-20">
          <Reveal>
            <SectionHead num="٠١" kicker="THE DECK" title="المنضدة — اكتب عليها الآن" />
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
            <div className="flex items-baseline justify-between mb-4">
              <h3 className="font-display text-2xl text-bone">عدادات اللوحة</h3>
              <span className="font-mono text-[11px] tracking-[0.25em] text-fog">
                تُحدَّث مع كل ضغطة
              </span>
            </div>
            <Stats total={total} kpm={kpm} heat={heat} />
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
  );
}
