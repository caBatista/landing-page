import { Hero } from "@/components/sections/hero/Hero";
import { getLocale } from "@/i18n/server";

export default async function HomePage() {
  const locale = await getLocale();
  return (
    <>
      <Hero locale={locale} />
    </>
  );
}
