import type { Locale } from "@/i18n/config";

/** A value written once per language. */
export type Localized<T = string> = Record<Locale, T>;

/** An image in /public. Width and height are the file's intrinsic size. */
export type ImageAsset = {
  src: string;
  width: number;
  height: number;
  alt: Localized;
};
