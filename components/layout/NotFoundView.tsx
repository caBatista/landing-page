import { SplitHeading } from "@/components/ui/SplitHeading";
import { ui } from "@/content/ui";
import { homePath, type Locale } from "@/i18n/config";

export function NotFoundView({ locale }: { locale: Locale }) {
  const copy = ui.notFound;
  return (
    <section className="flex min-h-dvh flex-col justify-center gap-8 container-x py-32">
      <p className="label text-muted-strong">404</p>
      <SplitHeading
        as="h1"
        top={copy.title.top[locale]}
        bottom={copy.title.bottom[locale]}
        className="text-[clamp(5rem,22vw,18rem)]"
        bottomClassName="pl-[0.4em]"
      />
      <p className="max-w-md text-lg">{copy.line[locale]}</p>
      <a
        href={homePath(locale)}
        className="inline-flex h-12 w-fit items-center rounded-full bg-ink px-6 label text-bg transition-colors hover:bg-accent hover:text-ink"
      >
        {copy.cta[locale]} →
      </a>
    </section>
  );
}
