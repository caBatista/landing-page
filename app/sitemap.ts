import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { homePath, localeTags, locales } from "@/i18n/config";

/** Public pages only. Private tools (/me) and /brand are never listed. */
export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(
    locales.map((locale) => [localeTags[locale], `${site.url}${homePath(locale)}`]),
  );
  return locales.map((locale) => ({
    url: `${site.url}${homePath(locale)}`,
    changeFrequency: "monthly",
    priority: locale === "en" ? 1 : 0.9,
    alternates: { languages },
  }));
}
