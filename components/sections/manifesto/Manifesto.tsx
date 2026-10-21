import { Signature } from "@/components/brand/Signature";
import { site } from "@/content/site";
import { ui } from "@/content/ui";
import type { Locale } from "@/i18n/config";
import { parseBold } from "@/lib/rich-text";
import { ManifestoText } from "./ManifestoText";

export function Manifesto({ locale }: { locale: Locale }) {
  return (
    <section aria-labelledby="manifesto-title" className="container-x py-28 md:py-44">
      <h2 id="manifesto-title" className="mb-10 label text-muted-strong md:mb-14">
        {ui.manifesto.eyebrow[locale]}
      </h2>
      <ManifestoText className="max-w-[24ch] text-[clamp(2rem,5.4vw,5.25rem)] leading-[1.04] font-medium tracking-[-0.03em] text-balance">
        {parseBold(site.manifesto[locale]).map((segment, index) =>
          segment.bold ? (
            <strong
              key={index}
              className="bg-[linear-gradient(var(--accent),var(--accent))] box-decoration-clone bg-[length:100%_0.32em] bg-bottom-left bg-no-repeat font-semibold"
            >
              {segment.text}
            </strong>
          ) : (
            segment.text
          ),
        )}
      </ManifestoText>
      <div className="mt-14 flex justify-end md:mt-20">
        <Signature animate className="w-[min(78vw,440px)] text-ink" />
      </div>
    </section>
  );
}
