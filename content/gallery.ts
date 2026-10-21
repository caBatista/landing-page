import type { ImageAsset, Localized } from "./types";

export type GalleryItem =
  | { type: "photo"; image: ImageAsset; place: string; year: number }
  | { type: "quote"; text: Localized };

/**
 * The horizontal gallery, in order. Any number of photos works; drop a quote
 * between photos every two or three to keep the rhythm.
 * TODO: replace the placeholder photos (files in /public/images/gallery) and captions.
 */
export const gallery: GalleryItem[] = [
  {
    type: "photo",
    image: {
      src: "/images/gallery/01.jpg",
      width: 1200,
      height: 1500,
      alt: { en: "TODO: describe photo 1", pt: "TODO: descrever foto 1" },
    },
    place: "Porto Alegre",
    year: 2026,
  },
  {
    type: "photo",
    image: {
      src: "/images/gallery/02.jpg",
      width: 1600,
      height: 1067,
      alt: { en: "TODO: describe photo 2", pt: "TODO: descrever foto 2" },
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
      src: "/images/gallery/03.jpg",
      width: 1200,
      height: 1500,
      alt: { en: "TODO: describe photo 3", pt: "TODO: descrever foto 3" },
    },
    place: "Porto Alegre",
    year: 2025,
  },
  {
    type: "photo",
    image: {
      src: "/images/gallery/04.jpg",
      width: 1600,
      height: 1067,
      alt: { en: "TODO: describe photo 4", pt: "TODO: descrever foto 4" },
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
