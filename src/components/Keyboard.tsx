import { ROWS } from "../lib/keyboard";
import type { KeyDef, LayoutName } from "../lib/keyboard";
import { useT } from "../lib/i18n";

const UNIT = 46;
const GAP = 6;
const widthOf = (w: number) => w * UNIT + (w - 1) * GAP;

interface Props {
  pressed: Set<string>;
  layout: LayoutName;
  shiftOn: boolean;
  capsOn: boolean;
  soundOn: boolean;
  heat: Record<string, number>;
  onDown: (code: string) => void;
  onUp: (code: string) => void;
}

function capClass(def: KeyDef, shiftOn: boolean): string {
  if (def.kind === "modifier") return shiftOn ? "keycap keycap-mint" : "keycap keycap-dark";
  if (def.code === "Backspace") return "keycap keycap-coral";
  if (def.code === "Enter") return "keycap keycap-amber";
  if (def.kind === "fn") return "keycap keycap-dark";
  return "keycap";
}

function KeycapView({
  def,
  isDown,
  layout,
  shiftOn,
  heatOpacity,
  label,
  keyWord,
  onDown,
  onUp,
}: {
  def: KeyDef;
  isDown: boolean;
  layout: LayoutName;
  shiftOn: boolean;
  heatOpacity: number;
  label: string;
  keyWord: string;
  onDown: () => void;
  onUp: () => void;
}) {
  const hasLegend = def.kind === "key";
  const primary = hasLegend
    ? layout === "ar"
      ? shiftOn
        ? def.arShift
        : def.ar
      : layout === "fa"
        ? shiftOn
          ? def.faShift
          : def.fa
        : shiftOn
          ? def.enShift
          : def.en
    : label;
  const secondary = hasLegend
    ? layout === "en"
      ? shiftOn
        ? def.arShift
        : def.ar
      : shiftOn
        ? def.enShift
        : def.en
    : undefined;

  return (
    <button
      type="button"
      tabIndex={-1}
      aria-label={`${keyWord} ${def.ar || def.fa || def.en}`}
      className={`${capClass(def, shiftOn)} ${isDown ? "is-down" : ""} h-[46px] shrink-0 overflow-hidden`}
      style={{ width: widthOf(def.w) }}
      onPointerDown={(e) => {
        e.preventDefault();
        (e.currentTarget as HTMLButtonElement).setPointerCapture?.(e.pointerId);
        onDown();
      }}
      onPointerUp={onUp}
      onPointerCancel={onUp}
      onContextMenu={(e) => e.preventDefault()}
    >
      {/* أثر الاستخدام — كلما كثر الضغط، برز الاصفرار */}
      {hasLegend && heatOpacity > 0 && (
        <span
          className="absolute inset-0 rounded-[inherit] bg-amber pointer-events-none transition-opacity duration-500"
          style={{ opacity: heatOpacity }}
        />
      )}
      <span className="relative z-10 flex items-center justify-center w-full h-full">
        {hasLegend ? (
          <>
            <span className="font-body font-semibold text-lg leading-none translate-y-[1px]">
              {primary}
            </span>
            <span className="absolute top-1 left-1.5 font-mono text-[9px] opacity-55">
              {secondary}
            </span>
          </>
        ) : (
          <span
            className={`${
              def.kind === "fn" || def.kind === "modifier"
                ? "font-mono text-[11px] tracking-wider"
                : "font-body font-semibold text-sm"
            } leading-none`}
          >
            {primary}
          </span>
        )}
      </span>
    </button>
  );
}

export default function Keyboard({
  pressed,
  layout,
  shiftOn,
  capsOn,
  soundOn,
  heat,
  onDown,
  onUp,
}: Props) {
  const { t } = useT();
  const maxHeat = Math.max(1, ...Object.values(heat));
  const layoutName =
    layout === "ar" ? t.kb.layoutAr : layout === "fa" ? t.kb.layoutFa : t.kb.layoutEn;
  const labelOf = (def: KeyDef): string =>
    def.code === "Backspace" ? t.kb.back : def.code === "Enter" ? t.kb.enter : (def.label ?? "");

  return (
    <div className="overflow-x-auto pb-2 -mx-1 px-1">
      <div dir="ltr" className="chassis relative min-w-[830px] px-5 pt-4 pb-6">
        {/* براغٍ في الزوايا */}
        <span className="screw top-2.5 right-2.5" />
        <span className="screw top-2.5 left-2.5" />
        <span className="screw bottom-2.5 right-2.5" />
        <span className="screw bottom-2.5 left-2.5" />

        {/* شريط الحالة فوق الصفوف */}
        <div className="flex items-center justify-between px-2 pb-3">
          <div className="font-mono text-[10px] tracking-[0.3em] text-fog/80">
            {t.mast.brand} <span className="text-amber">{t.kb.model}</span> · {layoutName}
          </div>
          <div className="flex items-center gap-4 font-mono text-[10px] text-fog/80" dir="ltr">
            <span className="flex items-center gap-1.5">
              <span className={`w-1.5 h-1.5 rounded-full ${shiftOn ? "bg-mint led-on" : "bg-ink-600"}`} />
              SHIFT
            </span>
            <span className="flex items-center gap-1.5">
              <span className={`w-1.5 h-1.5 rounded-full ${capsOn ? "bg-amber led-on" : "bg-ink-600"}`} />
              CAPS
            </span>
            <span className="flex items-center gap-1.5">
              <span className={`w-1.5 h-1.5 rounded-full ${soundOn ? "bg-coral led-on" : "bg-ink-600"}`} />
              SND
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-[6px] select-none">
          {ROWS.map((row, ri) => (
            <div key={ri} className="flex gap-[6px] justify-center">
              {row.map((def) => (
                <KeycapView
                  key={def.code}
                  def={def}
                  isDown={pressed.has(def.code)}
                  layout={layout}
                  shiftOn={shiftOn}
                  label={labelOf(def)}
                  keyWord={t.kb.keyWord}
                  heatOpacity={
                    def.kind === "key" && heat[def.code]
                      ? Math.min(0.75, (heat[def.code] / maxHeat) * 0.75)
                      : 0
                  }
                  onDown={() => onDown(def.code)}
                  onUp={() => onUp(def.code)}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
