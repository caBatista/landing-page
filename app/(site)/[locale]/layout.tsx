import type { Metadata, Viewport } from "next";
import "@/app/globals.css";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Preloader } from "@/components/layout/Preloader";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { site } from "@/content/site";
import { ui } from "@/content/ui";
import { homePath, localeTags, locales } from "@/i18n/config";
import { getLocale } from "@/i18n/server";
import { fontVariables } from "@/lib/fonts";
import { visitedScript } from "@/lib/intro";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return {
    metadataBase: new URL(site.url),
    title: { default: site.seo.title[locale], template: `%s — ${site.name}` },
    description: site.seo.description[locale],
    alternates: {
      canonical: homePath(locale),
      languages: Object.fromEntries([
        ...locales.map((l) => [localeTags[l], homePath(l)]),
        ["x-default", "/"],
      ]),
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#f4f2ec",
};

export default async function SiteLayout({ children }: LayoutProps<"/[locale]">) {
  const locale = await getLocale();
  return (
    // The inline script may add data-visited to <html> before hydration.
    <html lang={localeTags[locale]} className={fontVariables} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: visitedScript }} />
      </head>
      <body>
        <Preloader label={site.preloaderLabel[locale]} />
        <a
          href="#main"
          className="sr-only z-50 rounded-full bg-accent px-4 py-3 label text-ink focus:not-sr-only focus:fixed focus:top-4 focus:left-1/2 focus:-translate-x-1/2"
        >
          {ui.skipToContent[locale]}
        </a>
        <SmoothScroll>
          <Header locale={locale} />
          <main id="main" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <Footer locale={locale} />
        </SmoothScroll>
      </body>
    </html>
  );
}
