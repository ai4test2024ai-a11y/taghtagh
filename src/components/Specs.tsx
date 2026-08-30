import SectionHead from "./SectionHead";
import Reveal from "./Reveal";

const ROWS: [string, string][] = [
  ["التخطيط", "عربي قياسي ١٠١ فوق جسد QWERTY"],
  ["عدد المفاتيح", "٤٦ حرفًا ورمزًا + مفاتيح التحكّم"],
  ["حرف الظاء «ظ»", "ساكن وحيدًا في مفتاح / — لا شبيه له لاتينيًا"],
  ["مفتاح Z", "يحمل الهمزة على ياء «ئ» بدلًا من Z"],
  ["التطويلة «ـ»", "مختبئة خلف مفتاح - لتمديد الحروف"],
  ["الصف الرئيسي", "يتلو ترتيب الضاد: ش س ي ب ل ا ت ن م"],
  ["الأرقام", "هندية المظهر ٠-٩ بلا مفتاح Shift"],
];

export default function Specs() {
  return (
    <section className="max-w-6xl mx-auto px-5 md:px-8 py-16 md:py-20">
      <Reveal>
        <SectionHead num="٠٣" kicker="SPEC SHEET" title="بطاقة مواصفات اللوحة" />
      </Reveal>

      <div className="grid lg:grid-cols-12 gap-8 md:gap-12">
        <Reveal className="lg:col-span-5" delay={60}>
          <div className="space-y-5 text-fog leading-relaxed">
            <p className="text-lg text-bone/90">
              اللوحة العربية تحتفظ بهيكل QWERTY الفيزيائي، لكنها تُسكن الصف
              الرئيسي بترتيبٍ يبدأ من الضاد — ولهذا يبدأ ترتيب الحروف في
              القواميس الرقمية بـ«ض ص ث ق ف» لا بالألف.
            </p>
            <p>
              وحين تكتب رسالتك واللوحة على التخطيط الخطأ، لا تختفي الكلمات بل
              تتنكّر: كل حرف يستعير جارَه الفيزيائي. لهذا تبدو الرسائل المقلوبة
              كطلاسم — وهي ليست كذلك. إنها خريطة واحدة تقرأ من طرفيها، وهي
              بالضبط الفكرة التي يقوم عليها المصحّح في الأعلى.
            </p>
            <p className="text-sm border-r-2 border-mint pr-3">
              جرّب بنفسك: اكتب اسمك هنا ثم بدّل التخطيط من لوحة التحكم في أعلى
              الصفحة وراقب المفاتيح وهي تغيّر جلودها.
            </p>
          </div>
        </Reveal>

        <Reveal className="lg:col-span-7" delay={160}>
          <div className="panel p-6 md:p-8">
            <div className="font-mono text-[11px] tracking-[0.3em] text-amber mb-6" dir="ltr">
              ط-٨٨ · TECHNICAL DATA
            </div>
            <dl className="space-y-4">
              {ROWS.map(([term, value]) => (
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
              <div>
                <div className="font-display text-4xl text-amber">ض</div>
                <div className="text-xs text-fog mt-1 leading-relaxed">
                  أول حروف الترتيب اللوحي — منها يبدأ «ضاد»
                </div>
              </div>
              <div>
                <div className="font-display text-4xl text-mint">ﻻ</div>
                <div className="text-xs text-fog mt-1 leading-relaxed">
                  لام-ألف: المفتاح الوحيد الذي يطبع حرفين بلمسة
                </div>
              </div>
              <div>
                <div className="font-display text-4xl text-coral">؟</div>
                <div className="text-xs text-fog mt-1 leading-relaxed">
                  علامة الاستفهام العربية تختبئ فوق Shift + ظ
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
