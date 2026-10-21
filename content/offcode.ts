import type { ImageAsset, Localized } from "./types";

export type RaceResult = {
  race: string;
  /** Kilometers. Personal bests are computed per distance. */
  distanceKm: number;
  /** Finish time as "mm:ss" or "h:mm:ss". */
  time: string;
  /** YYYY-MM */
  date: string;
};

export type OffCodeBlock = {
  title: Localized;
  text: Localized;
  image: ImageAsset;
};

/** Newest first. */
export const races: RaceResult[] = [
  { race: "Corrida da Longevidade", distanceKm: 5, time: "25:24", date: "2026-09" },
  { race: "Corrida do Inter", distanceKm: 10, time: "55:08", date: "2026-08" },
  { race: "Maratona Internacional de Maceió", distanceKm: 5, time: "26:22", date: "2026-07" },
  { race: "POA Night Run", distanceKm: 5, time: "55:37", date: "2026-03" },
];

export const running = {
  title: { en: "Running", pt: "Corrida" },
  text: {
    en: "Road races around Porto Alegre, one personal record at a time.",
    pt: "Corridas de rua por Porto Alegre, um recorde pessoal de cada vez.",
  },
} satisfies Omit<OffCodeBlock, "image">;

export const simRacing: OffCodeBlock = {
  title: { en: "Sim racing", pt: "Sim racing" },
  text: {
    en: "Same obsession, different cockpit: braking points, telemetry and one more lap to find a tenth.",
    pt: "Mesma obsessão, outro cockpit: pontos de frenagem, telemetria e mais uma volta atrás de um décimo.",
  },
  image: {
    src: "/images/offcode/_RRP3158.jpg",
    width: 3240,
    height: 2160,
    alt: { en: "Go-Karting Photo", pt: "Foto de Kart" },
  },
};

export const volleyball: OffCodeBlock = {
  title: { en: "Volleyball", pt: "Vôlei" },
  text: {
    en: "Fast reads, clean rotations and loud communication. The team sport that taught me how good systems talk to each other.",
    pt: "Leitura rápida, rodízio limpo e muita comunicação. O esporte coletivo que me ensinou como bons sistemas conversam.",
  },
  image: {
    src: "/images/offcode/volley-alt.jpeg",
    width: 849,
    height: 735,
    alt: { en: "Volleyball Photo", pt: "Foto de Vôlei" },
    focal: "50% 0%",
  },
};
