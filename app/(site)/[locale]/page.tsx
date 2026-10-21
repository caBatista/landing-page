import { SplitHeading } from "@/components/ui/SplitHeading";
import { site } from "@/content/site";
import { getLocale } from "@/i18n/server";

export default async function HomePage() {
  const locale = await getLocale();
  return (
    <section
      id="top"
      tabIndex={-1}
      className="flex min-h-dvh flex-col justify-end container-x pb-16 outline-none"
    >
      <SplitHeading
        as="h1"
        top={site.firstName}
        bottom={site.lastName}
        className="text-[clamp(5rem,24vw,22rem)]"
      />
      <p className="mt-6 text-xl">{site.role[locale]}</p>
    </section>
  );
}
