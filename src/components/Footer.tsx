import { useT } from "../lib/i18n";

export default function Footer() {
  const { t } = useT();

  return (
    <footer className="relative mt-10 border-t border-ink-700">
      <div className="safe-bottom max-w-6xl mx-auto px-5 md:px-8 pt-10 flex flex-col md:flex-row items-center gap-4 justify-between">
        <div className="flex items-center gap-3">
          <span className="font-display text-2xl text-bone">{t.mast.brand}</span>
          <span className="text-fog/60 text-sm">{t.footer.tagline}</span>
        </div>
        <p className="text-xs text-fog/70 leading-relaxed text-center">{t.footer.hint}</p>
        <div className="font-mono text-[11px] text-fog/60" dir="ltr">
          {t.footer.year}
        </div>
      </div>
    </footer>
  );
}
