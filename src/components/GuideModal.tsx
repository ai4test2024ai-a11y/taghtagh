import type { ReactNode } from "react";
import Modal from "./Modal";
import { useT } from "../lib/i18n";
import { localDigits } from "../lib/keyboard";

function Section({ h, children }: { h: string; children: ReactNode }) {
  return (
    <section className="mb-8 last:mb-0">
      <h4 className="mb-3 font-display text-xl text-bone sm:text-2xl">{h}</h4>
      {children}
    </section>
  );
}

function Steps({ items }: { items: string[] }) {
  const { lang } = useT();
  return (
    <ol className="space-y-3">
      {items.map((s, i) => (
        <li key={i} className="flex items-start gap-3 leading-relaxed text-fog">
          <span className="keycap keycap-dark flex h-8 w-8 shrink-0 items-center justify-center font-mono text-xs">
            {localDigits(i + 1, lang)}
          </span>
          <span className="pt-1">{s}</span>
        </li>
      ))}
    </ol>
  );
}

export default function GuideModal({ onClose }: { onClose: () => void }) {
  const { t } = useT();
  const g = t.guide;

  return (
    <Modal title={g.title} closeLabel={g.close} onClose={onClose}>
      <p className="mb-7 border-s-2 border-mint ps-3 text-sm leading-relaxed text-fog">
        {g.intro}
      </p>

      <Section h={g.goalH}>
        <p className="leading-loose text-bone/90">{g.goal}</p>
      </Section>

      <Section h={g.howH}>
        <Steps items={g.how} />
      </Section>

      <Section h={g.flowH}>
        <Steps items={g.flow} />
      </Section>

      <Section h={g.resultH}>
        <p className="leading-loose text-bone/90">{g.result}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {g.chips.map((c) => (
            <span
              key={c}
              className="rounded-full border border-amber/50 bg-amber/10 px-3 py-1.5 font-mono text-xs text-amber"
            >
              {c}
            </span>
          ))}
        </div>
        <p className="mt-3 text-sm leading-relaxed text-fog">{g.resultTail}</p>
      </Section>

      <Section h={g.tipsH}>
        <ul className="space-y-2.5">
          {g.tips.map((s, i) => (
            <li key={i} className="flex items-start gap-2.5 leading-relaxed text-fog">
              <span className="mt-1.5 inline-block h-2 w-2 shrink-0 rotate-45 bg-amber" />
              <span>{s}</span>
            </li>
          ))}
        </ul>
      </Section>
    </Modal>
  );
}
