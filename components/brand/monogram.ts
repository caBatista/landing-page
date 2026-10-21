import type { LogoVariant } from "@/content/site";

/**
 * CB monogram geometry. Letters are drawn upright on a 100-unit cap height and
 * slanted forward 12° by the transform. Every variant is a single even-odd
 * path, so the same data feeds the inline SVG, favicon, OG image and the 3D
 * extrusion.
 */
export type MonogramShape = {
  viewBox: string;
  width: number;
  height: number;
  transform: string;
  d: string;
};

const SLANT = 12;
const TAN = Math.tan((SLANT * Math.PI) / 180);

/** Slants a box spanning x ≥ -left, -top ≤ y ≤ bottom and moves it back into positive space. */
const slant = (left: number, top: number, bottom: number) =>
  `translate(${(left + bottom * TAN).toFixed(2)} ${top}) skewX(-${SLANT})`;

/** B counters for the rounded letters. */
const ROUND_COUNTERS =
  "M88 22H95.5A8.5 8.5 0 0 1 95.5 39H88Z M88 61H95.5A8.5 8.5 0 0 1 95.5 78H88Z";

/** Rounded C and B sharing one baseline, a ligature in the spirit of a racing number. */
const SPRINT =
  "M58 0H30A30 30 0 0 0 0 30V70A30 30 0 0 0 30 100H99A25 25 0 0 0 99 50A25 25 0 0 0 99 0H66V78H32A10 10 0 0 1 22 68V32A10 10 0 0 1 32 22H58Z " +
  ROUND_COUNTERS;

/** Chamfered, angular letters like a race-number stencil. */
const ANGULAR =
  "M58 0H18L0 18V82L18 100H58V78H26L22 74V26L26 22H58Z " +
  "M66 0H110L124 14V36L114 50L124 64V86L110 100H66Z " +
  "M88 22H100L102 24V37L100 39H88Z M88 61H100L102 63V76L100 78H88Z";

/** Rounded letters knocked out of a slanted number plate. */
const PLATE =
  "M-4 -18H128A22 22 0 0 1 150 4V96A22 22 0 0 1 128 118H-4A22 22 0 0 1 -26 96V4A22 22 0 0 1 -4 -18Z " +
  SPRINT;

function shape(d: string, box: { left: number; right: number; top: number; bottom: number }) {
  const height = box.top + box.bottom;
  const width = Math.ceil(box.left + box.right + height * TAN);
  return {
    viewBox: `0 0 ${width} ${height}`,
    width,
    height,
    transform: slant(box.left, box.top, box.bottom),
    d,
  };
}

const LETTERS = { left: 0, right: 124, top: 0, bottom: 100 };

export const monograms: Record<LogoVariant, MonogramShape> = {
  sprint: shape(SPRINT, LETTERS),
  angular: shape(ANGULAR, LETTERS),
  plate: shape(PLATE, { left: 26, right: 150, top: 18, bottom: 118 }),
};

export const logoVariants = Object.keys(monograms) as LogoVariant[];

export const logoVariantNames: Record<LogoVariant, string> = {
  sprint: "01 — Sprint",
  angular: "02 — Angular",
  plate: "03 — Plate",
};

/** Standalone SVG markup, for favicons and image generation. */
export function monogramSvg(variant: LogoVariant, fill: string, background?: string): string {
  const m = monograms[variant];
  const pad = background ? Math.round(m.height * 0.3) : 0;
  const [vx, vy, vw, vh] = m.viewBox.split(" ").map(Number);
  const size = Math.max(vw, vh) + pad * 2;
  const ox = vx - (size - vw) / 2;
  const oy = vy - (size - vh) / 2;
  const bg = background
    ? `<rect x="${ox}" y="${oy}" width="${size}" height="${size}" rx="${size * 0.22}" fill="${background}"/>`
    : "";
  const viewBox = background ? `${ox} ${oy} ${size} ${size}` : m.viewBox;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}">${bg}<g transform="${m.transform}"><path fill="${fill}" fill-rule="evenodd" d="${m.d}"/></g></svg>`;
}
