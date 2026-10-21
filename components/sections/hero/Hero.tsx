import { Blob } from "@/components/brand/Blob";
import { HeroMonogram } from "@/components/three/HeroMonogram";
import { site } from "@/content/site";
import { ui } from "@/content/ui";
import type { Locale } from "@/i18n/config";
import { HeroStage } from "./HeroStage";
import { NextRace } from "./NextRace";

export function Hero({ locale }: { locale: Locale }) {
  const race = site.nextRace;
  return (
    <HeroStage
      id="top"
      tabIndex={-1}
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-svh flex-col overflow-clip container-x pt-24 pb-6 outline-none md:pb-8"
    >
      <div aria-hidden className="absolute inset-0 -z-10">
        <div data-hero-parallax className="absolute -bottom-[8%] -left-[14%] w-[min(62vw,760px)]">
          <Blob seed={3} className="w-full" />
        </div>
        <div data-hero-parallax className="absolute top-[14%] right-[38%] hidden w-[9vw] md:block">
          <Blob seed={7} speed={5} className="w-full" />
        </div>
      </div>

      <div className="flex min-h-11 flex-wrap items-center justify-between gap-3">
        <p
          className="hero-fade label text-muted-strong"
          style={{ "--i": 0 } as React.CSSProperties}
        >
          {site.location[locale]}
        </p>
        {race && (
          <div className="hero-fade" style={{ "--i": 1 } as React.CSSProperties}>
            <NextRace
              label={ui.hero.nextRace[locale]}
              name={race.name[locale]}
              date={race.date}
              locale={locale}
            />
          </div>
        )}
      </div>

      <div className="hero-pop pointer-events-none absolute top-[19%] left-1/2 w-[min(84vw,440px)] -translate-x-1/2 md:top-[12%] md:right-[3%] md:left-auto md:w-[min(44vw,600px)] md:translate-x-0">
        <HeroMonogram className="aspect-square w-full" />
      </div>

      <div data-hero-name className="relative mt-auto">
        <h1 id="hero-title" className="display text-[clamp(4.75rem,min(31vw,40svh),30rem)]">
          <span className="mask-line">
            <span className="hero-rise block" style={{ "--i": 0 } as React.CSSProperties}>
              {site.firstName}
            </span>
          </span>
          <span className="mask-line">
            <span className="hero-rise block" style={{ "--i": 1 } as React.CSSProperties}>
              {site.lastName}
            </span>
          </span>
        </h1>
        <div className="mt-5 flex flex-wrap items-end justify-between gap-4 md:mt-7">
          <p
            className="hero-fade text-xl font-medium md:text-3xl"
            style={{ "--i": 2 } as React.CSSProperties}
          >
            {site.role[locale]}
            <span className="mt-1 block text-base font-normal md:text-lg">{site.team[locale]}</span>
          </p>
          <p
            aria-hidden
            className="hero-fade flex items-center gap-2 label text-muted-strong"
            style={{ "--i": 3 } as React.CSSProperties}
          >
            {ui.hero.scroll[locale]}
            <span className="inline-block animate-bounce">↓</span>
          </p>
        </div>
      </div>
    </HeroStage>
  );
}
