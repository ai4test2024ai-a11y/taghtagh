import { BOARD_ORDER } from "../lib/keyboard";

const ITEMS = [...BOARD_ORDER, "طَقْطَقَة", ...BOARD_ORDER.split("").reverse(), "مِفْتاح", "حَرْف"];

function Row() {
  return (
    <div className="flex items-center shrink-0">
      {ITEMS.map((item, i) => (
        <span key={i} className="flex items-center">
          <span className="px-5 font-display text-2xl md:text-3xl leading-none whitespace-nowrap">
            {item}
          </span>
          <span className="inline-block w-2 h-2 rotate-45 bg-current opacity-50" />
        </span>
      ))}
    </div>
  );
}

export default function Ticker() {
  return (
    <div className="marquee relative overflow-hidden py-1 -mx-2" aria-hidden="true">
      <div
        dir="ltr"
        className="-rotate-1 scale-[1.02] bg-amber text-ink-950 border-y-4 border-ink-950 shadow-[0_10px_40px_-10px_rgba(242,169,59,0.35)]"
      >
        <div className="marquee-track py-2.5">
          <Row />
          <Row />
        </div>
      </div>
    </div>
  );
}
