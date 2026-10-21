import type { Localized } from "./types";

export type NavItem = {
  /** Section id on the home page. */
  id: "top" | "on-code" | "off-code" | "journey" | "contact";
  label: Localized;
  /** Photo revealed next to the link in the fullscreen menu. */
  image: string;
};

export const nav: NavItem[] = [
  { id: "top", label: { en: "Home", pt: "Início" }, image: "/images/gallery/01.jpg" },
  {
    id: "on-code",
    label: { en: "On Code", pt: "On Code" },
    image: "/images/projects/home-sweet-home.jpg",
  },
  {
    id: "off-code",
    label: { en: "Off Code", pt: "Off Code" },
    image: "/images/gallery/02.jpg",
  },
  { id: "journey", label: { en: "Journey", pt: "Trajetória" }, image: "/images/gallery/03.jpg" },
  { id: "contact", label: { en: "Contact", pt: "Contato" }, image: "/images/gallery/04.jpg" },
];

/** Interface copy. Section content lives in the other files in /content. */
export const ui = {
  skipToContent: { en: "Skip to content", pt: "Pular para o conteúdo" },
  home: { en: "Caio Batista, home", pt: "Caio Batista, início" },
  menu: { en: "Menu", pt: "Menu" },
  close: { en: "Close", pt: "Fechar" },
  mainNav: { en: "Main", pt: "Principal" },
  language: { en: "Language", pt: "Idioma" },
  languageNames: { en: { en: "English", pt: "Inglês" }, pt: { en: "Portuguese", pt: "Português" } },

  hero: {
    nextRace: { en: "Next race", pt: "Próxima corrida" },
    scroll: { en: "Scroll", pt: "Role" },
  },

  manifesto: {
    eyebrow: { en: "About", pt: "Sobre" },
  },

  gallery: {
    title: { en: "Moments off the keyboard", pt: "Momentos longe do teclado" },
  },

  onOff: {
    on: {
      top: "On",
      bottom: "Code",
      line: {
        en: "Projects, career and the systems I've built.",
        pt: "Projetos, carreira e os sistemas que construí.",
      },
      cta: { en: "See the work", pt: "Ver os projetos" },
    },
    off: {
      top: "Off",
      bottom: "Code",
      line: {
        en: "Running, sim racing and volleyball.",
        pt: "Corrida, sim racing e vôlei.",
      },
      cta: { en: "Off the keyboard", pt: "Longe do teclado" },
    },
  },

  projects: {
    eyebrow: { en: "On code", pt: "On code" },
    title: { top: { en: "Selected", pt: "Projetos" }, bottom: { en: "work", pt: "escolhidos" } },
    details: { en: "Details", pt: "Detalhes" },
    features: { en: "Key features", pt: "Principais funcionalidades" },
    stack: { en: "Stack", pt: "Stack" },
    links: {
      live: { en: "Live site", pt: "Site no ar" },
      repo: { en: "GitHub", pt: "GitHub" },
      backend: { en: "Backend repo", pt: "Repo backend" },
      frontend: { en: "Frontend repo", pt: "Repo frontend" },
    },
    newTab: { en: "opens in a new tab", pt: "abre em nova aba" },
  },

  journey: {
    eyebrow: { en: "On code", pt: "On code" },
    title: { top: { en: "The", pt: "A" }, bottom: { en: "journey", pt: "trajetória" } },
    now: { en: "Now", pt: "Agora" },
  },

  offCode: {
    eyebrow: { en: "Off code", pt: "Off code" },
    title: { top: { en: "Off the", pt: "Longe do" }, bottom: { en: "keyboard", pt: "teclado" } },
    results: { en: "Results", pt: "Resultados" },
    personalBest: { en: "Personal best", pt: "Recorde pessoal" },
    columns: {
      race: { en: "Race", pt: "Prova" },
      distance: { en: "Dist.", pt: "Dist." },
      time: { en: "Time", pt: "Tempo" },
      pace: { en: "Pace", pt: "Pace" },
      date: { en: "Date", pt: "Data" },
    },
    perKm: { en: "/km", pt: "/km" },
  },

  contact: {
    eyebrow: { en: "Contact", pt: "Contato" },
    title: { top: { en: "Let's", pt: "Bora" }, bottom: { en: "talk", pt: "conversar" } },
    line: {
      en: "Systems, races or a side project worth building. My inbox is open.",
      pt: "Sistemas, corridas ou um projeto paralelo que valha a pena. Meu email está aberto.",
    },
    copy: { en: "Copy my email", pt: "Copiar meu email" },
    copied: { en: "Email copied to clipboard", pt: "Email copiado" },
    copyFailed: {
      en: "Couldn't copy. Opening your mail app.",
      pt: "Não deu para copiar. Abrindo seu app de email.",
    },
  },

  footer: {
    backToTop: { en: "Back to top", pt: "Voltar ao topo" },
    builtWith: {
      en: "Designed and built in Porto Alegre.",
      pt: "Projetado e construído em Porto Alegre.",
    },
  },

  notFound: {
    title: { top: { en: "Wrong", pt: "Curva" }, bottom: { en: "turn", pt: "errada" } },
    line: {
      en: "This page doesn't exist. Let's get you back on track.",
      pt: "Esta página não existe. Vamos voltar para a pista.",
    },
    cta: { en: "Back home", pt: "Voltar ao início" },
  },
};
