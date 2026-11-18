import Image from "next/image";
import { Blob } from "@/components/brand/Blob";
import type { Project } from "@/content/projects";
import type { Locale } from "@/i18n/config";

const SWAP =
  "touch-swap transition-[clip-path,scale] duration-[900ms] ease-out-expo [clip-path:inset(100%_0_0_0)] group-hover:[clip-path:inset(0)] group-focus-within:[clip-path:inset(0)] motion-reduce:opacity-0 motion-reduce:[clip-path:none] motion-reduce:group-focus-within:opacity-100 motion-reduce:group-hover:opacity-100";

/**
 * Card media with the hover swap: the alternate screenshot wipes up over the
 * base one while the card is hovered or focused.
 */
export function ProjectMedia({ project, locale }: { project: Project; locale: Locale }) {
  const { base, hover, frame } = project.image;

  if (frame === "phone") {
    return (
      <div className="relative isolate grid aspect-[16/11] place-items-center overflow-hidden rounded-2xl bg-ink-soft">
        <Blob seed={11} className="absolute -right-[12%] -bottom-[30%] -z-10 w-[70%]" />
        <div className="relative aspect-[9/19.5] h-[86%] overflow-hidden rounded-[1.6rem] border-[6px] border-ink bg-ink shadow-2xl transition-transform duration-700 ease-out-expo group-hover:-translate-y-2 group-hover:-rotate-2">
          <Image
            src={base.src}
            alt={base.alt[locale]}
            fill
            sizes="(max-width: 768px) 40vw, 18vw"
            className="object-cover"
          />
          <Image
            src={hover.src}
            alt={hover.alt[locale]}
            fill
            sizes="(max-width: 768px) 40vw, 18vw"
            className={`object-cover ${SWAP}`}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl bg-ink-soft p-2 pt-0">
      <div aria-hidden className="flex h-7 items-center gap-1.5 px-2">
        <span className="size-2 rounded-full bg-white/20" />
        <span className="size-2 rounded-full bg-white/20" />
        <span className="size-2 rounded-full bg-accent" />
      </div>
      <div className="relative aspect-[16/10] overflow-hidden rounded-lg">
        <Image
          src={base.src}
          alt={base.alt[locale]}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-[scale] duration-[900ms] ease-out-expo group-hover:scale-[1.03]"
        />
        <Image
          src={hover.src}
          alt={hover.alt[locale]}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className={`object-cover ${SWAP}`}
        />
      </div>
    </div>
  );
}
