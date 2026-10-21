import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
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

const ogLocales = { en: "en_US", pt: "pt_BR" } as const;

/** app/opengraph-image.tsx; referenced explicitly because it sits outside this root layout. */
const ogImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${site.name}, ${site.role.en}`,
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const title = site.seo.title[locale];
  const description = site.seo.description[locale];
  return {
    metadataBase: new URL(site.url),
    title: { default: title, template: `%s — ${site.name}` },
    description,
    applicationName: site.name,
    authors: [{ name: site.name, url: site.url }],
    alternates: {
      canonical: homePath(locale),
      languages: Object.fromEntries([
        ...locales.map((l) => [localeTags[l], homePath(l)]),
        ["x-default", "/"],
      ]),
    },
    openGraph: {
      type: "profile",
      firstName: site.firstName,
      lastName: site.lastName,
      url: homePath(locale),
      siteName: site.name,
      title,
      description,
      locale: ogLocales[locale],
      alternateLocale: locales.filter((l) => l !== locale).map((l) => ogLocales[l]),
      images: [ogImage],
    },
    twitter: { card: "summary_large_image", title, description, images: [ogImage] },
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
          {/* Suspense boundaries split hydration into short tasks (see page.tsx). */}
          <Suspense>
            <Header locale={locale} />
          </Suspense>
          <main id="main" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <Suspense>
            <Footer locale={locale} />
          </Suspense>
        </SmoothScroll>
      </body>
    </html>
  );
}
