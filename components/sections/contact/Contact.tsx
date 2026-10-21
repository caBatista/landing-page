import { Magnetic } from "@/components/motion/Magnetic";
import { Reveal } from "@/components/motion/Reveal";
import { RollText } from "@/components/ui/RollText";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { site } from "@/content/site";
import { socials } from "@/content/socials";
import { ui } from "@/content/ui";
import type { Locale } from "@/i18n/config";
import { CopyEmail } from "./CopyEmail";

export function Contact({ locale }: { locale: Locale }) {
  const copy = ui.contact;
  return (
    <section
      id="contact"
      tabIndex={-1}
      aria-labelledby="contact-title"
      className="container-x py-28 defer-render outline-none md:py-40"
    >
      <Reveal className="mb-16 md:mb-24">
        <p data-reveal-fade className="mb-6 label text-muted-strong">
          {copy.eyebrow[locale]}
        </p>
        <SplitHeading
          id="contact-title"
          top={copy.title.top[locale]}
          bottom={copy.title.bottom[locale]}
          className="text-[clamp(5rem,18vw,16rem)]"
          bottomClassName="pl-[0.6em]"
        />
        <p data-reveal-fade className="mt-10 max-w-md text-lg md:text-xl">
          {copy.line[locale]}
        </p>
      </Reveal>

      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <div data-reveal-fade>
            <CopyEmail
              email={site.email}
              label={copy.copy[locale]}
              copied={copy.copied[locale]}
              failed={copy.copyFailed[locale]}
            />
          </div>
        </Reveal>

        <Reveal className="lg:col-span-7">
          <ul className="border-t border-ink/15">
            {socials.map((social) => {
              const external = social.id !== "email";
              return (
                <li key={social.id} data-reveal-fade className="border-b border-ink/15">
                  <a
                    href={social.href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noreferrer" : undefined}
                    className="group relative isolate flex items-center justify-between gap-4 py-5 md:py-7"
                  >
                    <span
                      aria-hidden
                      className="absolute inset-0 -z-10 origin-left scale-x-0 bg-accent transition-transform duration-700 ease-out-expo group-hover:scale-x-100 group-focus-visible:scale-x-100"
                    />
                    <RollText className="display text-[clamp(3rem,8vw,6.5rem)] transition-[padding] duration-700 ease-out-expo group-hover:pl-4">
                      {social.label}
                    </RollText>
                    <span className="flex items-center gap-4 pr-2 md:gap-8">
                      <span className="hidden label text-muted-strong group-hover:text-ink sm:block">
                        {social.handle}
                      </span>
                      <Magnetic strength={0.4}>
                        <span
                          aria-hidden
                          className="grid size-12 place-items-center rounded-full bg-ink text-lg text-bg transition-transform duration-500 ease-out-expo group-hover:rotate-45 md:size-14"
                        >
                          ↗
                        </span>
                      </Magnetic>
                    </span>
                    {external && <span className="sr-only">({ui.projects.newTab[locale]})</span>}
                  </a>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
