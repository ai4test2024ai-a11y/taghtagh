export default function SectionHead({
  num,
  kicker,
  title,
  tint = "text-mint",
}: {
  num: string;
  kicker: string;
  title: string;
  tint?: string;
}) {
  return (
    <div className="mb-8">
      <div className={`font-mono text-xs tracking-[0.25em] ${tint} flex items-center gap-3`}>
        <span className="inline-block h-px w-10 bg-current opacity-60" />
        <span dir="ltr">
          {num} / {kicker}
        </span>
      </div>
      <h2 className="font-display text-4xl md:text-5xl leading-tight mt-2 text-bone">
        {title}
      </h2>
    </div>
  );
}
