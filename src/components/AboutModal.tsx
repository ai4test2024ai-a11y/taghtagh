import Modal from "./Modal";
import { useT } from "../lib/i18n";

export default function AboutModal({ onClose }: { onClose: () => void }) {
  const { t } = useT();
  const a = t.about;

  return (
    <Modal title={a.title} closeLabel={a.close} onClose={onClose}>
      <div className="mb-6 flex items-center gap-4">
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-amber/40 bg-amber/15 text-amber">
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m8 6-6 6 6 6M16 6l6 6-6 6" />
          </svg>
        </span>
        <span className="font-mono text-xs leading-relaxed text-fog" dir="ltr">
          {a.tag}
        </span>
      </div>

      <p className="mb-5 leading-loose text-fog">{a.p1}</p>

      <p className="mb-7 text-lg leading-loose text-bone/90">
        {a.p2a}{" "}
        <strong className="whitespace-nowrap font-bold text-amber">{a.p2b}</strong>
        {a.p2c ? ` ${a.p2c}` : ""}
      </p>

      <div className="rounded-xl border border-ink-600 bg-ink-800/70 p-5 sm:p-6">
        <div className="mb-1.5 font-mono text-[11px] tracking-[0.25em] text-fog">
          {a.instructor}
        </div>
        <div className="mb-5 font-display text-2xl text-bone sm:text-3xl">
          {a.instructorName}
        </div>
        <div className="mb-2 font-mono text-[11px] tracking-[0.25em] text-fog">
          {a.phoneLabel}
        </div>
        <a
          href={`tel:${a.phone}`}
          dir="ltr"
          className="keycap keycap-mint inline-flex items-center gap-2 px-5 py-2.5 font-mono text-sm font-semibold tracking-widest"
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          {a.phone}
        </a>
      </div>
    </Modal>
  );
}
