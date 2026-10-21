import type { Localized } from "./types";

/** Logo variants drawn in components/brand/monogram.ts. Compare them at /brand. */
export type LogoVariant = "sprint" | "angular" | "plate";

export type NextRace = {
  name: Localized;
  /** Race day as YYYY-MM-DD (Porto Alegre time). The widget hides itself after this day. */
  date: string;
};

export const site = {
  url: "https://caiobatista.dev",
  name: "Caio Batista",
  firstName: "Caio",
  lastName: "Batista",
  email: "caiobatista034@gmail.com",

  /** TODO: pick your favourite at /brand and set it here. Updates logo, favicon and OG image. */
  logo: "sprint" as LogoVariant,

  role: {
    en: "Software Engineer @ SAP",
    pt: "Engenheiro de Software @ SAP",
  } satisfies Localized,

  team: {
    en: "Big Data Fabric Services",
    pt: "Big Data Fabric Services",
  } satisfies Localized,

  location: {
    en: "Porto Alegre, Brazil",
    pt: "Porto Alegre, Brasil",
  } satisfies Localized,

  seo: {
    title: {
      en: "Caio Batista — Software Engineer",
      pt: "Caio Batista — Engenheiro de Software",
    },
    description: {
      en: "Caio Batista is a software engineer at SAP building big data platform services. Backend systems, Java, Rust and Kubernetes on the keyboard; running, sim racing and volleyball off it.",
      pt: "Caio Batista é engenheiro de software na SAP, construindo serviços de plataforma de big data. Sistemas backend, Java, Rust e Kubernetes no teclado; corrida, sim racing e vôlei fora dele.",
    },
  } satisfies Record<string, Localized>,

  /** Shown in the hero. Set to `null` to hide it. */
  nextRace: {
    name: { en: "TODO: next race name", pt: "TODO: nome da próxima corrida" },
    date: "2026-12-31", // TODO: real race date
  } as NextRace | null,

  preloaderLabel: {
    en: "Loading Batista…",
    pt: "Carregando Batista…",
  } satisfies Localized,

  /** `**word**` renders bold. */
  manifesto: {
    en: "I build **backend systems** that don't fail **when it matters**. Six years shipping **enterprise software** at global scale — now building **big data platform services** at SAP. Off the keyboard, I'm chasing **personal records** on the road, the court and the sim rig.",
    pt: "Eu construo **sistemas backend** que não falham **quando mais importa**. Seis anos entregando **software corporativo** em escala global — agora construindo **serviços de plataforma de big data** na SAP. Longe do teclado, estou atrás de **recordes pessoais** na rua, na quadra e no simulador.",
  } satisfies Localized,

  /**
   * The huge closing line in the footer. TODO: choose one. Alternatives:
   *  - "No downtime. No DNF."          / "Sem downtime. Sem DNF."
   *  - "Built to last. Built to race." / "Feito pra durar. Feito pra correr."
   *  - "Ship it. Then go faster."      / "Faz o deploy. Depois acelera."
   *  - "Zero downtime. Full throttle." / "Zero downtime. Pé no fundo."
   */
  footerPhrase: {
    en: "Always chasing the next PR.",
    pt: "Sempre atrás do próximo PR.",
  } satisfies Localized,

  copyright: "© 2026 Caio Batista",
};
