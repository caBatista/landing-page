import { Suspense } from "react";
import { PersonJsonLd } from "@/components/layout/PersonJsonLd";
import { Contact } from "@/components/sections/contact/Contact";
import { Gallery } from "@/components/sections/gallery/Gallery";
import { Hero } from "@/components/sections/hero/Hero";
import { Journey } from "@/components/sections/journey/Journey";
import { Manifesto } from "@/components/sections/manifesto/Manifesto";
import { OffCode } from "@/components/sections/offcode/OffCode";
import { OnOffCode } from "@/components/sections/onoff/OnOffCode";
import { Projects } from "@/components/sections/projects/Projects";
import { getLocale } from "@/i18n/server";

const sections = [Manifesto, Gallery, OnOffCode, Projects, Journey, OffCode, Contact];

export default async function HomePage() {
  const locale = await getLocale();
  return (
    <>
      <PersonJsonLd locale={locale} />
      <Suspense>
        <Hero locale={locale} />
      </Suspense>
      {/* Separate boundaries let React hydrate each section in its own short task. */}
      {sections.map((Section) => (
        <Suspense key={Section.name}>
          <Section locale={locale} />
        </Suspense>
      ))}
    </>
  );
}
