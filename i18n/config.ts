export const locales = ["en", "pt"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

/** BCP 47 tags used for `<html lang>`, hreflang and Intl formatting. */
export const localeTags: Record<Locale, string> = { en: "en", pt: "pt-BR" };

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Public URL of the home page in a locale (English lives at the root). */
export function homePath(locale: Locale): string {
  return locale === defaultLocale ? "/" : `/${locale}`;
}
