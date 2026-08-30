import { useState } from "react";
import { SCRAMBLE_GLYPHS, useScramble } from "../lib/hooks";
import { useT } from "../lib/i18n";
import AboutModal from "./AboutModal";
import GuideModal from "./GuideModal";
import type { Lang } from "../lib/i18n";
import type { LayoutName } from "../lib/keyboard";

interface Props {
  lang: Lang;
  onLang: (l: Lang) => void;
  layout: LayoutName;
  onLayout: (l: LayoutName) => void;
  soundOn: boolean;
  onSound: () => void;
}

const LANGS: { id: Lang; label: string; mono?: boolean }[] = [
  { id: "ar", label: "عربي" },
  { id: "fa", label: "فارسی" },
  { id: "en", label: "EN", mono: true },
];

const LAYOUTS: { id: LayoutName; label: string; mono?: boolean }[] = [
  { id: "ar", label: "عربي" },
  { id: "fa", label: "فارسی" },
  { id: "en", label: "EN", mono: true },
];

export default function Masthead({
  lang,
  onLang,
  layout,
  onLayout,
  soundOn,
  onSound,
}: Props) {
  const { t } = useT();
  const title = useScramble(t.mast.brand, SCRAMBLE_GLYPHS[lang]);
  const [modal, setModal] = useState<null | "about" | "guide">(null);

  return (
    <header className="relative max-w-6xl mx-auto px-5 md:px-8 pt-8 md:pt-12">
      {/* شريط اللوحة العلوي */}
      <div className="flex items-center gap-2 sm:gap-4 font-mono text-[9px] sm:text-[11px] tracking-[0.15em] sm:tracking-[0.3em] text-fog">
        <span className="h-px flex-1 bg-ink-600" />
        <span dir="ltr">{t.mast.topbar}</span>
        <span className="h-px flex-1 bg-ink-600" />
      </div>

      <div className="grid md:grid-cols-12 gap-8 md:gap-10 items-end mt-10 md:mt-14 pb-10">
        {/* الاسم — يتفكك ويلتئم */}
        <div className="md:col-span-8">
          <p className="font-mono text-mint text-xs md:text-sm tracking-[0.2em] mb-4">
            {t.mast.kicker}
          </p>
          <h1
            className="font-display text-[clamp(2.8rem,15vw,4.6rem)] leading-[1.15] md:text-[clamp(4.5rem,10vw,8rem)] md:leading-[1.12] text-bone drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
            aria-label={t.mast.brand}
          >
            {title}
            <span className="text-coral">.</span>
          </h1>
          <p className="mt-5 max-w-xl text-fog leading-relaxed text-base md:text-lg">
            {t.mast.lead}
          </p>
        </div>

        {/* لوحة التحكم الصغيرة */}
        <div className="md:col-span-4">
          <div className="panel p-5 relative overflow-hidden">
            <div className="absolute -left-6 -top-6 w-24 h-24 rounded-full bg-mint/10 blur-2xl" />
            <div className="flex items-center justify-between mb-5">
              <span className="font-mono text-[11px] tracking-[0.25em] text-fog">
                {t.mast.statusLabel}
              </span>
              <span className="flex items-center gap-2 text-mint text-sm font-semibold">
                <span className="w-2.5 h-2.5 rounded-full bg-mint led-on" />
                {t.mast.ready}
              </span>
            </div>

            {/* لغة الصفحة */}
            <div className="mb-4">
              <div className="text-xs text-fog mb-2">{t.mast.langLabel}</div>
              <div className="flex gap-2" dir="ltr">
                {LANGS.map((l) => (
                  <button
                    key={l.id}
                    onClick={() => onLang(l.id)}
                    className={`keycap ${lang === l.id ? "keycap-amber is-down" : "keycap-dark"} px-4 py-1.5 leading-none ${
                      l.mono ? "font-mono text-sm font-semibold" : "font-display text-lg"
                    }`}
                    aria-pressed={lang === l.id}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>

            {/* تخطيط الكتابة */}
            <div className="mb-5">
              <div className="text-xs text-fog mb-2">{t.mast.layoutLabel}</div>
              <div className="flex gap-2" dir="ltr">
                {LAYOUTS.map((l) => (
                  <button
                    key={l.id}
                    onClick={() => onLayout(l.id)}
                    className={`keycap ${layout === l.id ? "keycap-mint is-down" : "keycap-dark"} px-4 py-2 leading-none ${
                      l.mono ? "font-mono text-sm font-semibold" : "font-display text-xl"
                    }`}
                    aria-pressed={layout === l.id}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-fog mb-1">{t.mast.soundLabel}</div>
                <div className="font-mono text-[11px] text-fog/70" dir="ltr">
                  {t.mast.soundSub}
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

            <div className="mt-5 flex gap-2 border-t border-dashed border-ink-600 pt-5">
            <button
              type="button"
              onClick={() => setModal("guide")}
              className="keycap keycap-amber flex-1 px-2 py-2.5 text-[11px] font-semibold sm:text-sm"
            >
              {t.guide.btn}
            </button>
            <button
              type="button"
              onClick={() => setModal("about")}
              className="keycap flex-1 px-2 py-2.5 text-[11px] font-semibold sm:text-sm"
            >
              {t.about.btn}
            </button>
          </div>
        </div>

        <p className="mt-4 text-xs text-fog/80 leading-relaxed border-s-2 border-amber ps-3">
            {t.mast.hintA} <span className="text-amber">⇧</span> {t.mast.hintB}{" "}
            <span className="font-display text-bone text-base">{t.mast.hintKey}</span>
            {t.mast.hintC}
          </p>
        </div>
      </div>

      {modal === "about" && <AboutModal onClose={() => setModal(null)} />}
      {modal === "guide" && <GuideModal onClose={() => setModal(null)} />}
    </header>
  );
}
