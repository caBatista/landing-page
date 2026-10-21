import { Contact } from "@/components/sections/contact/Contact";
import { Gallery } from "@/components/sections/gallery/Gallery";
import { Hero } from "@/components/sections/hero/Hero";
import { Journey } from "@/components/sections/journey/Journey";
import { Manifesto } from "@/components/sections/manifesto/Manifesto";
import { OffCode } from "@/components/sections/offcode/OffCode";
import { OnOffCode } from "@/components/sections/onoff/OnOffCode";
import { Projects } from "@/components/sections/projects/Projects";
import { getLocale } from "@/i18n/server";

export default async function HomePage() {
  const locale = await getLocale();
  return (
    <>
      <Hero locale={locale} />
      <Manifesto locale={locale} />
      <Gallery locale={locale} />
      <OnOffCode locale={locale} />
      <Projects locale={locale} />
      <Journey locale={locale} />
      <OffCode locale={locale} />
      <Contact locale={locale} />
    </>
  );
}
