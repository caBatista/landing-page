import type { Localized } from "./types";

export type Milestone = {
  year: number;
  title: Localized;
  company: string;
  line: Localized;
  kind: "role" | "award";
};

/** Oldest first. The last entry is highlighted as the current milestone. */
export const timeline: Milestone[] = [
  {
    year: 2020,
    title: { en: "Intern", pt: "Estagiário" },
    company: "Instituto de Pesquisas Eldorado · Dell Technologies",
    // TODO: review the one-liners below; they are drafts in your voice.
    line: {
      en: "First commits on enterprise software, embedded in a Dell Technologies team.",
      pt: "Primeiros commits em software corporativo, alocado em um time da Dell Technologies.",
    },
    kind: "role",
  },
  {
    year: 2021,
    title: { en: "Junior Software Engineer", pt: "Engenheiro de Software Júnior" },
    company: "Eldorado · Dell Technologies",
    line: {
      en: "Owning backend features end to end with Java and Spring Boot.",
      pt: "Entregando features de backend de ponta a ponta com Java e Spring Boot.",
    },
    kind: "role",
  },
  {
    year: 2022,
    title: { en: "Software Engineer", pt: "Engenheiro de Software" },
    company: "Eldorado · Dell Technologies",
    line: {
      en: "Platform work across Rust, WebAssembly and Kubernetes for global products.",
      pt: "Trabalho de plataforma com Rust, WebAssembly e Kubernetes para produtos globais.",
    },
    kind: "role",
  },
  {
    year: 2025,
    title: { en: "Eldorado Excellence Award", pt: "Prêmio de Excelência Eldorado" },
    company: "PEEC 2025",
    line: {
      en: "Recognised for engineering excellence across the institute.",
      pt: "Reconhecido pela excelência em engenharia em todo o instituto.",
    },
    kind: "award",
  },
  {
    year: 2026,
    title: { en: "Software Engineer", pt: "Engenheiro de Software" },
    company: "SAP · Big Data Fabric Services",
    line: {
      en: "Building big data platform services at global scale.",
      pt: "Construindo serviços de plataforma de big data em escala global.",
    },
    kind: "role",
  },
];
