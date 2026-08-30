/** طَقْطَقَة صوتية خفيفة عبر WebAudio — بلا ملفات خارجية */

let ctx: AudioContext | null = null;

type TickKind = "key" | "action" | "space";

export function playTick(kind: TickKind, enabled: boolean): void {
  if (!enabled) return;
  try {
    const AC: typeof AudioContext | undefined =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) return;
    ctx = ctx ?? new AC();
    if (ctx.state === "suspended") void ctx.resume();

    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    const base =
      kind === "key" ? 1500 + Math.random() * 800 : kind === "space" ? 620 : 940;
    const dur = kind === "key" ? 0.045 : 0.075;

    osc.type = "square";
    osc.frequency.setValueAtTime(base, t);
    osc.frequency.exponentialRampToValueAtTime(base * 0.6, t + dur);

    gain.gain.setValueAtTime(kind === "key" ? 0.045 : 0.055, t);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);

    osc.connect(gain).connect(ctx.destination);
    osc.start(t);
    osc.stop(t + dur + 0.01);
  } catch {
    /* الصوت رفاهية — لا يكسر شيئًا */
  }
}
