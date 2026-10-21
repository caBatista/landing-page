import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { Reveal } from "@/components/motion/Reveal";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { running, simRacing, volleyball, type OffCodeBlock } from "@/content/offcode";
import { ui } from "@/content/ui";
import type { Locale } from "@/i18n/config";
import { ResultsBoard } from "./ResultsBoard";

/** Frames follow the photo's own shape (between square-ish and 3:2), so little is cropped. */
const frameRatio = ({ width, height }: OffCodeBlock["image"]) =>
  Math.min(1.5, Math.max(1.15, width / height));

function Block({ block, index, locale }: { block: OffCodeBlock; index: number; locale: Locale }) {
  return (
    <Reveal className="space-y-6">
      <ParallaxImage
        src={block.image.src}
        alt={block.image.alt[locale]}
        focal={block.image.focal}
        sizes="(max-width: 768px) 100vw, 50vw"
        className="rounded-2xl bg-ink-soft"
        style={{ aspectRatio: frameRatio(block.image) }}
      />
      <div className="flex items-baseline justify-between gap-4 border-t border-white/10 pt-5">
        <h3 className="display text-[clamp(3rem,6vw,5rem)]">
          <span className="mask-line">
            <span data-reveal-line className="block">
              {block.title[locale]}
            </span>
          </span>
        </h3>
        <span className="label text-muted">{String(index).padStart(2, "0")}</span>
      </div>
      <p data-reveal-fade className="max-w-[44ch] text-lg leading-snug text-bg/85">
        {block.text[locale]}
      </p>
    </Reveal>
  );
}

export function OffCode({ locale }: { locale: Locale }) {
  const copy = ui.offCode;
  return (
    <section
      id="off-code"
      tabIndex={-1}
      aria-labelledby="offcode-title"
      className="dark-surface bg-ink container-x py-28 text-bg outline-none md:py-40"
    >
      <Reveal className="mb-16 md:mb-24">
        <p data-reveal-fade className="mb-6 label text-muted">
          {copy.eyebrow[locale]}
        </p>
        <SplitHeading
          id="offcode-title"
          top={copy.title.top[locale]}
          bottom={copy.title.bottom[locale]}
          className="text-[clamp(5rem,16vw,14rem)]"
          bottomClassName="pl-[0.6em] text-accent"
        />
      </Reveal>

      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="space-y-6 lg:col-span-4">
          <div className="flex items-baseline justify-between gap-4 border-t border-white/10 pt-5">
            <h3 className="display text-[clamp(3rem,6vw,5rem)]">
              <span className="mask-line">
                <span data-reveal-line className="block">
                  {running.title[locale]}
                </span>
              </span>
            </h3>
            <span className="label text-muted">01</span>
          </div>
          <p data-reveal-fade className="max-w-[36ch] text-lg leading-snug text-bg/85">
            {running.text[locale]}
          </p>
        </Reveal>
        <Reveal className="lg:col-span-8" offset={0.15}>
          <div data-reveal-fade>
            <ResultsBoard locale={locale} />
          </div>
        </Reveal>
      </div>

      <div className="mt-24 grid gap-16 md:mt-32 md:grid-cols-2 md:gap-10 lg:gap-16">
        <Block block={simRacing} index={2} locale={locale} />
        <div className="md:mt-40">
          <Block block={volleyball} index={3} locale={locale} />
        </div>
      </div>
    </section>
  );
}
