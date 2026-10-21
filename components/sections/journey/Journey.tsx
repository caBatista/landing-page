import { Reveal } from "@/components/motion/Reveal";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { timeline } from "@/content/timeline";
import { ui } from "@/content/ui";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/cn";

/**
 * Career track: a line with one stop per milestone, vertical on small screens
 * and horizontal from lg. The latest milestone is the highlighted "now" card.
 */
export function Journey({ locale }: { locale: Locale }) {
  const copy = ui.journey;
  const last = timeline.length - 1;

  return (
    <section
      id="journey"
      tabIndex={-1}
      aria-labelledby="journey-title"
      className="container-x py-28 outline-none md:py-40"
    >
      <Reveal className="mb-16 md:mb-24">
        <p data-reveal-fade className="mb-6 label text-muted-strong">
          {copy.eyebrow[locale]} · {timeline[0].year}—{timeline[last].year}
        </p>
        <SplitHeading
          id="journey-title"
          top={copy.title.top[locale]}
          bottom={copy.title.bottom[locale]}
          className="text-[clamp(5rem,16vw,14rem)]"
          bottomClassName="pl-[0.6em]"
        />
      </Reveal>

      <Reveal start="top 85%">
        <ol className="relative grid gap-6 pl-8 lg:grid-cols-5 lg:gap-4 lg:pt-12 lg:pl-0">
          {/* The track */}
          <span
            aria-hidden
            className="absolute top-2 bottom-2 left-[5px] w-0.5 bg-ink/15 lg:top-[5px] lg:right-0 lg:bottom-auto lg:left-0 lg:h-0.5 lg:w-auto"
          />
          {timeline.map((milestone, index) => {
            const current = index === last;
            return (
              <li key={`${milestone.year}-${index}`} data-reveal-fade className="relative">
                <span
                  aria-hidden
                  className={cn(
                    "absolute top-8 -left-8 size-3 rounded-full border-2 border-bg lg:-top-12 lg:left-0",
                    current ? "bg-accent-deep ring-4 ring-accent/40" : "bg-ink",
                  )}
                />
                <article
                  className={cn(
                    "group flex h-full flex-col gap-4 rounded-2xl p-6 transition-[translate,background-color] duration-500 ease-out-expo hover:-translate-y-1.5",
                    current ? "bg-accent text-ink" : "bg-ink/[0.04] hover:bg-ink/[0.08]",
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <p
                      className={cn(
                        "display text-[clamp(4rem,7vw,6.5rem)] transition-colors duration-500",
                        !current &&
                          "text-transparent [-webkit-text-stroke:1.5px_var(--ink)] group-hover:text-ink",
                      )}
                    >
                      <time dateTime={String(milestone.year)}>{milestone.year}</time>
                    </p>
                    {current && (
                      <span className="rounded-full bg-ink px-2.5 py-1 label text-accent">
                        {copy.now[locale]}
                      </span>
                    )}
                    {milestone.kind === "award" && (
                      <span aria-hidden className="text-2xl leading-none">
                        ★
                      </span>
                    )}
                  </div>
                  <div className="mt-auto space-y-2">
                    <h3 className="text-xl leading-tight font-semibold">
                      {milestone.title[locale]}
                    </h3>
                    <p className={cn("label", current ? "text-ink" : "text-muted-strong")}>
                      {milestone.company}
                    </p>
                    <p className="pt-2 leading-snug">{milestone.line[locale]}</p>
                  </div>
                </article>
              </li>
            );
          })}
        </ol>
      </Reveal>
    </section>
  );
}
