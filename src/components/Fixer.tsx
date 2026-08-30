import { useMemo, useState } from "react";
import { autoConvert } from "../lib/keyboard";
import SectionHead from "./SectionHead";
import Reveal from "./Reveal";

const SAMPLES = [
  { label: "شيفرة الزائر الغامضة", text: "ئشنث ش لشئث" },
  { label: "رسالة عالقة بالعربية", text: "فثسف فثسف" },
  { label: "تحية كُتبت بالإنجليزية", text: "lvpfh" },
];

export default function Fixer() {
  const [input, setInput] = useState(SAMPLES[0].text);
  const [copied, setCopied] = useState(false);

  const { output, dir } = useMemo(() => autoConvert(input), [input]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      /* لا بأس */
    }
  };

  return (
    <section className="max-w-6xl mx-auto px-5 md:px-8 py-16 md:py-24">
      <Reveal>
        <SectionHead
          num="٠٢"
          kicker="LAYOUT DECODER"
          title="مصحّح التخطيط المقلوب"
          tint="text-amber"
        />
      </Reveal>

      <div className="grid lg:grid-cols-12 gap-6 items-start">
        <Reveal className="lg:col-span-7" delay={80}>
          <div className="panel p-6 md:p-7">
            <p className="text-fog leading-relaxed mb-6 text-sm md:text-base">
              يحدث للجميع: تكتب جملة كاملة ثم تكتشف أن اللوحة كانت على التخطيط
              الخطأ، فتنقلب «مرحبا» إلى <span dir="ltr" className="font-mono text-coral">lvpfh</span>.
              كل حرف يجلس فوق مفتاح فيزيائي واحد يحمل حرفين — عربيًا وإنجليزيًا —
              وهذه الأداة تعيد كل حرف إلى مفتاحه ثم تقرأ الحرف الآخر.
              الاتجاه يُكتشف وحده: حروف عربية تدخل، لاتينية تخرج، والعكس صحيح.
            </p>

            <label className="block font-mono text-[11px] tracking-[0.25em] text-fog mb-2">
              النص المشفوش
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={3}
              dir="auto"
              placeholder="الصق هنا ما كُتب بالتخطيط الخاطئ…"
              className="w-full bg-ink-950 border border-ink-600 rounded-lg p-4 text-lg text-bone placeholder:text-fog/40 focus:border-mint focus:outline-none resize-y leading-relaxed"
            />

            <div className="flex items-center gap-3 my-4 flex-wrap">
              <span className="font-mono text-[11px] px-3 py-1.5 rounded-full border border-amber/50 text-amber bg-amber/10">
                الاتجاه المكتشف: <span dir="ltr">{dir}</span>
              </span>
              <span className="text-xs text-fog/70">
                {dir === "ar→en"
                  ? "وجدنا حروفًا عربية — نُرجعها إلى مفاتيحها اللاتينية"
                  : "حروف لاتينية — نُرجعها إلى مفاتيحها العربية"}
              </span>
            </div>

            <label className="block font-mono text-[11px] tracking-[0.25em] text-fog mb-2">
              النص المُفكّك
            </label>
            <div
              dir="auto"
              className="w-full min-h-[76px] bg-ink-800 border border-mint/40 rounded-lg p-4 text-lg text-mint leading-relaxed break-words"
            >
              {output || <span className="text-fog/40">…</span>}
            </div>

            <div className="flex items-center gap-3 mt-5 flex-wrap">
              <button onClick={copy} className="keycap px-6 py-2 text-sm font-semibold">
                {copied ? "✓ نُسخ" : "نسخ الناتج"}
              </button>
              <button
                onClick={() => setInput(output)}
                className="keycap keycap-dark px-6 py-2 text-sm font-semibold"
                disabled={!output}
              >
                ⟲ قلب الاتجاه
              </button>
              <button
                onClick={() => setInput("")}
                className="text-sm text-fog hover:text-coral transition-colors underline underline-offset-4"
              >
                إفراغ
              </button>
            </div>
          </div>
        </Reveal>

        <Reveal className="lg:col-span-5" delay={180}>
          <div className="panel p-6 md:p-7 relative overflow-hidden">
            <div className="absolute -right-8 -bottom-8 w-40 h-40 rounded-full bg-amber/10 blur-3xl" />
            <div className="font-mono text-[11px] tracking-[0.25em] text-amber mb-4">
              جرّب هذه العينات
            </div>
            <div className="space-y-3">
              {SAMPLES.map((s) => (
                <button
                  key={s.text}
                  onClick={() => setInput(s.text)}
                  className={`w-full text-right rounded-lg border p-4 transition-all duration-200 group ${
                    input === s.text
                      ? "border-amber bg-amber/10 shadow-[0_0_0_1px_rgba(242,169,59,0.3)]"
                      : "border-ink-600 bg-ink-800/60 hover:border-fog/60 hover:-translate-y-0.5"
                  }`}
                >
                  <div className="text-xs text-fog mb-1.5 flex items-center justify-between">
                    <span>{s.label}</span>
                    <span className="text-amber opacity-0 group-hover:opacity-100 transition-opacity">
                      ← جرّبها
                    </span>
                  </div>
                  <div dir="auto" className="font-mono text-base text-bone">
                    {s.text}
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-6 pt-5 border-t border-dashed border-ink-600">
              <div className="font-mono text-[11px] tracking-[0.25em] text-fog mb-3">
                خريطة بعض المفاتيح
              </div>
              <div className="grid grid-cols-4 gap-2" dir="ltr">
                {[
                  ["ش", "A"], ["س", "S"], ["ي", "D"], ["ب", "F"],
                  ["ل", "G"], ["ا", "H"], ["ت", "J"], ["ن", "K"],
                  ["م", "L"], ["ئ", "Z"], ["ث", "E"], ["ظ", "/"],
                ].map(([ar, en]) => (
                  <div
                    key={en}
                    className="rounded-md border border-ink-600 bg-ink-950 px-2 py-1.5 flex items-center justify-between font-mono text-xs"
                  >
                    <span className="text-mint font-display text-base leading-none">{ar}</span>
                    <span className="text-fog/70">{en}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
