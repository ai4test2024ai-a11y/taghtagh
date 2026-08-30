import { useT } from "../lib/i18n";
import SectionHead from "./SectionHead";
import Reveal from "./Reveal";

export default function Specs() {
  const { t } = useT();

  return (
    <section className="max-w-6xl mx-auto px-5 md:px-8 py-16 md:py-20">
      <Reveal>
        <SectionHead
          num={t.secs.specs.num}
          kicker={t.secs.specs.kicker}
          title={t.secs.specs.title}
        />
      </Reveal>

      <div className="grid lg:grid-cols-12 gap-8 md:gap-12">
        <Reveal className="lg:col-span-5" delay={60}>
          <div className="space-y-5 text-fog leading-relaxed">
            <p className="text-lg text-bone/90">{t.specs.p1}</p>
            <p>{t.specs.p2}</p>
            <p className="text-sm border-s-2 border-mint ps-3">{t.specs.p3}</p>
          </div>
        </Reveal>

        <Reveal className="lg:col-span-7" delay={160}>
          <div className="panel p-6 md:p-8">
            <div className="font-mono text-[11px] tracking-[0.3em] text-amber mb-6" dir="ltr">
              {t.specs.dataLabel}
            </div>
            <dl className="space-y-4">
              {t.specs.rows.map(([term, value]) => (
                <div key={term} className="flex items-baseline text-sm md:text-base group">
                  <dt className="font-semibold text-bone group-hover:text-amber transition-colors shrink-0">
                    {term}
                  </dt>
                  <span className="dotted-leader" />
                  <dd className="text-fog text-left shrink-0 max-w-[55%]">{value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 pt-6 border-t border-dashed border-ink-600 grid sm:grid-cols-3 gap-4">
              {t.specs.cards.map((c, i) => (
                <div key={i}>
                  <div
                    className={`font-display text-4xl ${
                      i === 0 ? "text-amber" : i === 1 ? "text-mint" : "text-coral"
                    }`}
                  >
                    {c.glyph}
                  </div>
                  <div className="text-xs text-fog mt-1 leading-relaxed">{c.text}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
