import { Logo } from "@/components/brand/Logo";
import { Signature } from "@/components/brand/Signature";
import { Reveal } from "@/components/motion/Reveal";
import { FitText } from "@/components/ui/FitText";
import { site } from "@/content/site";
import { socials } from "@/content/socials";
import { nav, ui } from "@/content/ui";
import { homePath, type Locale } from "@/i18n/config";
import { splitBalanced } from "@/lib/rich-text";
import { LocaleToggle } from "./LocaleToggle";

export function Footer({ locale }: { locale: Locale }) {
  const home = homePath(locale);
  const linkClass = "transition-colors hover:text-accent";

  return (
    <footer className="dark-surface overflow-hidden bg-ink text-bg">
      <div className="container-x pt-20 md:pt-28">
        <div className="grid grid-cols-2 gap-12 md:grid-cols-12">
          <div className="col-span-2 space-y-10 md:col-span-5">
            <Logo title={site.name} className="w-20 text-accent md:w-24" />
            <Signature animate className="w-[min(72vw,360px)] text-bg" />
          </div>

          <nav aria-label={ui.mainNav[locale]} className="md:col-span-3">
            <ul className="space-y-2 text-lg">
              {nav.map((item) => (
                <li key={item.id}>
                  <a href={`${home}#${item.id}`} className={linkClass}>
                    {item.label[locale]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <ul className="space-y-2 text-lg md:col-span-2">
            {socials.map((social) => (
              <li key={social.id}>
                <a
                  href={social.href}
                  target={social.id === "email" ? undefined : "_blank"}
                  rel={social.id === "email" ? undefined : "noreferrer"}
                  className={linkClass}
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="col-span-2 flex flex-wrap items-center justify-between gap-6 md:flex-col md:items-end md:justify-start">
            <LocaleToggle locale={locale} className="rounded-full p-1.5 ring-1 ring-white/15" />
            <a
              href={`${home}#top`}
              className="flex items-center gap-2 label text-muted hover:text-accent"
            >
              {ui.footer.backToTop[locale]} <span aria-hidden>↑</span>
            </a>
          </div>
        </div>

        <Reveal start="top 95%" className="mt-24 md:mt-32">
          <FitText lines={splitBalanced(site.footerPhrase[locale])} className="text-accent" />
        </Reveal>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 py-6 label text-muted sm:flex-row sm:justify-between">
          <p>{site.copyright}</p>
          <p>{ui.footer.builtWith[locale]}</p>
        </div>
      </div>
    </footer>
  );
}
