import { Gallery } from "@/components/sections/gallery/Gallery";
import { Hero } from "@/components/sections/hero/Hero";
import { Manifesto } from "@/components/sections/manifesto/Manifesto";
import { OnOffCode } from "@/components/sections/onoff/OnOffCode";
import { getLocale } from "@/i18n/server";

export default async function HomePage() {
  const locale = await getLocale();
  return (
    <>
      <Hero locale={locale} />
      <Manifesto locale={locale} />
      <Gallery locale={locale} />
      <OnOffCode locale={locale} />
    </>
  );
}
