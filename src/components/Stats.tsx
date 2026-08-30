import { CODE_MAP, toArabicDigits } from "../lib/keyboard";

interface Props {
  total: number;
  kpm: number;
  heat: Record<string, number>;
}

export default function Stats({ total, kpm, heat }: Props) {
  const entries = Object.entries(heat).sort((a, b) => b[1] - a[1]);
  const top = entries.slice(0, 5);
  const maxCount = top.length ? top[0][1] : 1;

  const letterOf = (code: string): string => {
    const def = CODE_MAP.get(code);
    if (!def) return "؟";
    return def.kind === "space" ? "␣" : def.ar || def.en;
  };

  return (
    <div className="panel p-6 md:p-8">
      <div className="grid grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
        <div className="lg:col-span-3">
          <div className="font-mono text-[11px] tracking-[0.25em] text-fog mb-2">
            مجموع الضغطات
          </div>
          <div className="font-mono text-5xl md:text-6xl font-semibold text-bone tabular-nums" dir="ltr">
            {total.toLocaleString("en-US")}
          </div>
          <div className="text-xs text-fog/70 mt-1">
            بالعربية: {toArabicDigits(total)} ضغطة
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="font-mono text-[11px] tracking-[0.25em] text-fog mb-2">
            إيقاع آخر دقيقة
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-5xl md:text-6xl font-semibold text-mint tabular-nums" dir="ltr">
              {kpm}
            </span>
            <span className="text-sm text-fog">ضغطة/د</span>
          </div>
          <div className="mt-3 flex gap-[3px] items-end h-6" dir="ltr">
            {Array.from({ length: 20 }).map((_, i) => (
              <span
                key={i}
                className="w-1.5 rounded-sm bg-mint/70 transition-all duration-300"
                style={{ height: `${Math.max(12, Math.min(100, (kpm / 300) * 100 + ((i * 37) % 23)))}%`, opacity: 0.25 + (i / 20) * 0.75 }}
              />
            ))}
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="font-mono text-[11px] tracking-[0.25em] text-fog mb-2">
            الأكثر بلاءً
          </div>
          {top.length ? (
            <div className="flex items-center gap-3">
              <span className="keycap keycap-amber w-14 h-14 flex items-center justify-center font-display text-3xl">
                {letterOf(top[0][0])}
              </span>
              <span className="font-mono text-sm text-fog" dir="ltr">
                ×{top[0][1]}
              </span>
            </div>
          ) : (
            <span className="text-fog/60 text-sm">لم يُضغط بعد</span>
          )}
        </div>

        <div className="lg:col-span-4 col-span-2">
          <div className="font-mono text-[11px] tracking-[0.25em] text-fog mb-3">
            الخمسة الأوائل
          </div>
          {top.length ? (
            <div className="space-y-2">
              {top.map(([code, count]) => (
                <div key={code} className="flex items-center gap-3">
                  <span className="font-display text-xl text-bone w-6 text-center">
                    {letterOf(code)}
                  </span>
                  <div className="flex-1 h-3 rounded-full bg-ink-700 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-l from-amber to-coral transition-all duration-500"
                      style={{ width: `${(count / maxCount) * 100}%` }}
                    />
                  </div>
                  <span className="font-mono text-[11px] text-fog w-8 text-left" dir="ltr">
                    {count}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-fog/60 text-sm leading-relaxed">
              اكتب شيئًا في الأعلى وستشتعل الأشرطة هنا — كل ضغطة تُسجَّل.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
