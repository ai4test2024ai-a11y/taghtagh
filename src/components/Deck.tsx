import { useState } from "react";
import { toArabicDigits } from "../lib/keyboard";

export interface RaceResult {
  time: number;
  acc: number;
  cps: number;
  word: string;
}

interface Props {
  text: string;
  onClear: () => void;
  tab: "free" | "race";
  onTab: (t: "free" | "race") => void;
  target: string;
  pos: number;
  marks: ("hit" | "miss")[];
  result: RaceResult | null;
  best: RaceResult | null;
  onNextWord: () => void;
}

export default function Deck({
  text,
  onClear,
  tab,
  onTab,
  target,
  pos,
  marks,
  result,
  best,
  onNextWord,
}: Props) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard غير متاح — لا بأس */
    }
  };

  const letters = text.replace(/\n/g, "").length;

  return (
    <div>
      {/* شريط التبويبات */}
      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <button
          onClick={() => onTab("free")}
          className={`keycap ${tab === "free" ? "keycap-mint is-down" : "keycap-dark"} px-6 py-2.5 font-body font-semibold text-sm`}
          aria-pressed={tab === "free"}
        >
          الورقة الحرّة
        </button>
        <button
          onClick={() => onTab("race")}
          className={`keycap ${tab === "race" ? "keycap-mint is-down" : "keycap-dark"} px-6 py-2.5 font-body font-semibold text-sm`}
          aria-pressed={tab === "race"}
        >
          سباق الكلمات
        </button>
        <span className="text-xs text-fog/80 font-mono mr-auto" dir="rtl">
          {tab === "free" ? "كل ما تكتبه يُطبع على الورقة" : "التحدي يجري بالعربية دائمًا"}
        </span>
      </div>

      {tab === "free" ? (
        <div className="paper rounded-xl p-6 md:p-8 relative">
          {/* ثقب الورقة */}
          <span className="absolute top-4 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-ink-950/15 border border-ink-950/10" />
          <div
            dir="auto"
            className="min-h-[130px] text-2xl md:text-[1.7rem] leading-[1.9] whitespace-pre-wrap break-words font-medium"
            aria-live="polite"
          >
            {text ? (
              text
            ) : (
              <span className="text-ink-950/35">
                الصفحة تنتظر… اضغط أي مفتاح على اللوحة.
              </span>
            )}
            <span className="cursor-blink inline-block w-[0.6em] h-[1.1em] bg-mint align-[-0.15em] mr-0.5 border border-ink-900/40" />
          </div>

          <div className="mt-6 pt-4 border-t border-dashed border-ink-950/20 flex items-center gap-3 flex-wrap">
            <span className="font-mono text-xs text-ink-950/60">
              {toArabicDigits(letters)} حرفًا · {toArabicDigits(text.split("\n").length)} سطرًا
            </span>
            <span className="mr-auto" />
            <button
              onClick={copy}
              className="keycap px-5 py-1.5 text-sm font-semibold"
            >
              {copied ? "✓ نُسخ" : "نسخ"}
            </button>
            <button
              onClick={onClear}
              className="keycap keycap-coral px-5 py-1.5 text-sm font-semibold"
            >
              تمزيق الصفحة
            </button>
          </div>
        </div>
      ) : (
        <div className="paper rounded-xl p-6 md:p-10 relative overflow-hidden">
          <div className="text-center">
            <div className="font-mono text-[11px] tracking-[0.25em] text-ink-950/50 mb-4">
              الكلمة التالية — اكتبها حرفًا حرفًا
            </div>
            <div
              className="font-display text-5xl md:text-7xl leading-tight tracking-wide"
              dir="rtl"
            >
              {target.split("").map((ch, i) => (
                <span
                  key={`${ch}-${i}-${marks[i] ?? "wait"}`}
                  className={`inline-block mx-[2px] ${marks[i] === "hit" ? "letter-pop" : ""} ${
                    marks[i] === "miss"
                      ? "text-coral line-through decoration-4"
                      : marks[i] === "hit"
                        ? "text-mint"
                        : i === pos
                          ? "text-ink-900 border-b-4 border-amber"
                          : "text-ink-950/30"
                  }`}
                >
                  {ch}
                </span>
              ))}
            </div>

            {/* شريط التقدم */}
            <div className="mt-8 max-w-md mx-auto h-2 rounded-full bg-ink-950/15 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-l from-mint to-amber transition-all duration-200"
                style={{ width: `${(pos / target.length) * 100}%` }}
              />
            </div>

            {/* النتيجة */}
            <div className="mt-8 min-h-[96px] flex items-center justify-center">
              {result ? (
                <div className="relative w-full max-w-lg flex items-center justify-center gap-6 md:gap-10 flex-wrap py-2">
                  <span className="stamp-in absolute -top-7 left-2 md:left-8 font-display text-3xl md:text-4xl text-coral border-4 border-coral rounded-lg px-4 py-1 select-none">
                    أُنجزت!
                  </span>
                  <div className="text-center">
                    <div className="font-mono text-3xl font-semibold text-ink-900" dir="ltr">
                      {(result.time / 1000).toFixed(2)}s
                    </div>
                    <div className="text-xs text-ink-950/55 mt-1">الزمن</div>
                  </div>
                  <div className="text-center">
                    <div className="font-mono text-3xl font-semibold text-ink-900" dir="ltr">
                      {result.acc}%
                    </div>
                    <div className="text-xs text-ink-950/55 mt-1">الدقّة</div>
                  </div>
                  <div className="text-center">
                    <div className="font-mono text-3xl font-semibold text-ink-900" dir="ltr">
                      {result.cps}
                    </div>
                    <div className="text-xs text-ink-950/55 mt-1">حرف/ثانية</div>
                  </div>
                  <button
                    onClick={onNextWord}
                    className="keycap keycap-amber px-6 py-2.5 font-body font-semibold text-sm"
                  >
                    كلمة جديدة ↻
                  </button>
                </div>
              ) : (
                <p className="text-ink-950/50 text-sm">
                  {pos === 0
                    ? "اضغط أول حرف لتبدأ عدّاد الزمن…"
                    : `أصبت حتى الآن ${toArabicDigits(marks.filter((m) => m === "hit").length)} من ${toArabicDigits(pos)}`}
                </p>
              )}
            </div>

            {best && !result && (
              <p className="text-xs text-ink-950/50 font-mono">
                أفضل نتيجة: «{best.word}» بسرعة <span dir="ltr">{best.cps}</span> حرف/ث وبدقّة{" "}
                <span dir="ltr">{best.acc}%</span>
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
