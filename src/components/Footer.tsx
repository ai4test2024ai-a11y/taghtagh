export default function Footer() {
  return (
    <footer className="relative mt-10 border-t border-ink-700">
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-10 flex flex-col md:flex-row items-center gap-4 justify-between">
        <div className="flex items-center gap-3">
          <span className="font-display text-2xl text-bone">طَقْطَقَة</span>
          <span className="text-fog/60 text-sm">— معمل المفاتيح العربية</span>
        </div>
        <p className="text-xs text-fog/70 leading-relaxed text-center">
          اضغط <span className="font-mono text-mint">Esc</span> لتمزيق الصفحة ·
          كل الأصوات مولّدة لحظة الضغطة · اللوحة تستمع حتى وأنت تقرأ هذا السطر
        </p>
        <div className="font-mono text-[11px] text-fog/60" dir="ltr">
          HANDCRAFTED · ١٤٤٧هـ / 2026
        </div>
      </div>
    </footer>
  );
}
