import type { ImageAsset, Localized } from "./types";

export type GalleryItem =
  | { type: "photo"; image: ImageAsset; place: string; year: number }
  | { type: "quote"; text: Localized };

/**
 * The horizontal gallery, in order. Any number of photos works; drop a quote
 * between photos every two or three to keep the rhythm.
 */
export const gallery: GalleryItem[] = [
  {
    type: "photo",
    image: {
      src: "/images/gallery/01.jpeg",
      width: 1280,
      height: 853,
      alt: { en: "Graduation Photo", pt: "Foto da Graduação" },
    },
    place: "Porto Alegre",
    year: 2026,
  },
  {
    type: "photo",
    image: {
      src: "/images/gallery/02.jpeg",
      width: 960,
      height: 1280,
      alt: { en: "Personal Photo", pt: "Foto Pessoal" },
    },
    place: "Porto Alegre",
    year: 2026,
  },
  {
    type: "quote",
    text: {
      en: "Pace is a decision you make every single kilometer.",
      pt: "Ritmo é uma decisão que você toma a cada quilômetro.",
    },
  },
  {
    type: "photo",
    image: {
      src: "/images/gallery/03.jpeg",
      width: 853,
      height: 1280,
      alt: { en: "Maceió International Marathon", pt: "Maratona Internacional de Maceió" },
    },
    place: "Porto Alegre",
    year: 2025,
  },
  {
    type: "photo",
    image: {
      src: "/images/gallery/04.jpeg",
      width: 960,
      height: 1280,
      alt: { en: "Family Photo", pt: "Foto de Família" },
    },
    place: "Porto Alegre",
    year: 2025,
  },
  {
    type: "quote",
    text: {
      en: "Same rule on the court and in production: call the ball early.",
      pt: "Mesma regra na quadra e em produção: chame a bola cedo.",
    },
  },
];
