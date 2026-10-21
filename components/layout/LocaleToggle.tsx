import { homePath, localeTags, locales, type Locale } from "@/i18n/config";
import { ui } from "@/content/ui";
import { cn } from "@/lib/cn";

type LocaleToggleProps = { locale: Locale; className?: string };

/** EN/PT switch. Plain links so the whole document (and <html lang>) reloads in the new locale. */
export function LocaleToggle({ locale, className }: LocaleToggleProps) {
  return (
    <nav aria-label={ui.language[locale]} className={className}>
      <ul className="flex items-center gap-0.5">
        {locales.map((target) => {
          const current = target === locale;
          return (
            <li key={target}>
              <a
                href={homePath(target)}
                hrefLang={localeTags[target]}
                lang={localeTags[target]}
                aria-current={current ? "true" : undefined}
                aria-label={ui.languageNames[target][target]}
                className={cn(
                  "grid h-8 min-w-9 place-items-center rounded-full px-2 label transition-colors",
                  current ? "bg-accent text-ink" : "hover:text-accent",
                )}
              >
                {target.toUpperCase()}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
