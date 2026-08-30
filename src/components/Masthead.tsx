import { useScramble } from "../lib/hooks";
import type { LayoutName } from "../lib/keyboard";

interface Props {
  layout: LayoutName;
  onLayout: (l: LayoutName) => void;
  soundOn: boolean;
  onSound: () => void;
}

export default function Masthead({ layout, onLayout, soundOn, onSound }: Props) {
  const title = useScramble("طَقْطَقَة");

  return (
    <header className="relative max-w-6xl mx-auto px-5 md:px-8 pt-8 md:pt-12">
      {/* شريط اللوحة العلوي */}
      <div className="flex items-center gap-4 font-mono text-[11px] tracking-[0.3em] text-fog">
        <span className="h-px flex-1 bg-ink-600" />
        <span dir="ltr">ARABIC KEYBOARD LAB · MODEL ط-٨٨</span>
        <span className="h-px flex-1 bg-ink-600" />
      </div>

      <div className="grid md:grid-cols-12 gap-8 md:gap-10 items-end mt-10 md:mt-14 pb-10">
        {/* الاسم — يتفكك ويلتئم */}
        <div className="md:col-span-8">
          <p className="font-mono text-mint text-xs md:text-sm tracking-[0.2em] mb-4">
            لوحة مفاتيح حيّة — تكتب، تُصوّت، تُحرّر الرسائل المقلوبة
          </p>
          <h1
            className="font-display text-[4.6rem] leading-[1.15] md:text-[8rem] md:leading-[1.12] text-bone drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
            aria-label="طَقْطَقَة"
          >
            {title}
            <span className="text-coral">.</span>
          </h1>
          <p className="mt-5 max-w-xl text-fog leading-relaxed text-base md:text-lg">
            كل مفتاح هنا يعمل فعلًا: اضغط بلوحتك الحقيقية أو انقر المفاتيح،
            واسمع الطقطقة، وراقب أي الحروف تبلي مفاتيحها أكثر من غيرها.
            وفي الأسفل، أداة تفكّ شيفرة من كتب رسالته بالتخطيط الخاطئ.
          </p>
        </div>

        {/* لوحة التحكم الصغيرة */}
        <div className="md:col-span-4">
          <div className="panel p-5 relative overflow-hidden">
            <div className="absolute -left-6 -top-6 w-24 h-24 rounded-full bg-mint/10 blur-2xl" />
            <div className="flex items-center justify-between mb-5">
              <span className="font-mono text-[11px] tracking-[0.25em] text-fog">
                حالة اللوحة
              </span>
              <span className="flex items-center gap-2 text-mint text-sm font-semibold">
                <span className="w-2.5 h-2.5 rounded-full bg-mint led-on" />
                جاهزة
              </span>
            </div>

            <div className="mb-5">
              <div className="text-xs text-fog mb-2">تخطيط الكتابة</div>
              <div className="flex gap-2" dir="ltr">
                <button
                  onClick={() => onLayout("ar")}
                  className={`keycap ${layout === "ar" ? "keycap-mint is-down" : "keycap-dark"} px-5 py-2 font-display text-xl leading-none`}
                  aria-pressed={layout === "ar"}
                >
                  عربي
                </button>
                <button
                  onClick={() => onLayout("en")}
                  className={`keycap ${layout === "en" ? "keycap-mint is-down" : "keycap-dark"} px-5 py-2 font-mono text-sm font-semibold`}
                  aria-pressed={layout === "en"}
                >
                  EN
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-fog mb-1">طقطقة الصوت</div>
                <div className="font-mono text-[11px] text-fog/70" dir="ltr">
                  WebAudio · square wave
                </div>
              </div>
              <button
                onClick={onSound}
                role="switch"
                aria-checked={soundOn}
                className={`relative w-16 h-8 rounded-full border transition-colors duration-200 ${
                  soundOn
                    ? "bg-amber/90 border-amber-deep"
                    : "bg-ink-700 border-ink-600"
                }`}
              >
                <span
                  className={`absolute top-1 w-6 h-6 rounded-full bg-bone shadow-md transition-all duration-200 ${
                    soundOn ? "left-1" : "left-9"
                  }`}
                />
              </button>
            </div>
          </div>

          <p className="mt-4 text-xs text-fog/80 leading-relaxed border-r-2 border-amber pr-3">
            تلميح: مفتاح <span className="text-amber">⇧</span> يُثبت حالة
            الهمزات والتشكيل — انقره ثم جرّب <span className="font-display text-bone text-base">ض</span>.
          </p>
        </div>
      </div>
    </header>
  );
}
