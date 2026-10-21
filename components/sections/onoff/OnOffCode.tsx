import { Reveal } from "@/components/motion/Reveal";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { ui } from "@/content/ui";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/cn";

type Half = {
  copy: (typeof ui.onOff)["on"];
  target: string;
  dark: boolean;
};

export function OnOffCode({ locale }: { locale: Locale }) {
  const halves: Half[] = [
    { copy: ui.onOff.on, target: "on-code", dark: false },
    { copy: ui.onOff.off, target: "off-code", dark: true },
  ];

  return (
    <section
      aria-label={`${ui.onOff.on.top} / ${ui.onOff.off.top} Code`}
      className="grid md:grid-cols-2"
    >
      {halves.map(({ copy, target, dark }) => (
        <a
          key={target}
          href={`#${target}`}
          className={cn(
            "group relative isolate flex min-h-[64svh] flex-col justify-between gap-16 overflow-hidden px-gutter py-14 md:min-h-svh md:py-20",
            dark ? "dark-surface bg-ink text-bg" : "bg-bg text-ink",
          )}
        >
          {/* Fill that rises on hover */}
          <span
            aria-hidden
            className={cn(
              "absolute inset-0 -z-10 origin-bottom scale-y-0 transition-transform duration-700 ease-out-expo group-hover:scale-y-100 motion-reduce:scale-y-100 motion-reduce:opacity-0 motion-reduce:group-hover:opacity-100",
              dark ? "bg-ink-soft" : "bg-accent",
            )}
          />
          <Reveal>
            <SplitHeading
              top={copy.top}
              bottom={copy.bottom}
              className="text-[clamp(7rem,22vw,19rem)] md:text-[clamp(6rem,15vw,17rem)]"
              bottomClassName={cn(
                "pl-[0.45em] transition-transform duration-700 ease-out-expo group-hover:translate-x-[0.12em]",
                dark && "text-accent",
              )}
            />
          </Reveal>
          <Reveal className="flex items-end justify-between gap-6">
            <p data-reveal-fade className="max-w-xs text-lg md:text-xl">
              {copy.line[locale]}
            </p>
            <span
              data-reveal-fade
              className={cn(
                "grid size-16 shrink-0 place-items-center rounded-full text-2xl transition-[rotate,background-color,color] duration-500 ease-out-expo group-hover:-rotate-45 md:size-20",
                dark
                  ? "bg-accent text-ink"
                  : "bg-ink text-bg group-hover:bg-ink group-hover:text-accent",
              )}
            >
              <span className="sr-only">{copy.cta[locale]}</span>
              <span aria-hidden>↓</span>
            </span>
          </Reveal>
        </a>
      ))}
    </section>
  );
}
