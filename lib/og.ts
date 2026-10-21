import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { monograms, monogramSvg } from "@/components/brand/monogram";
import { site } from "@/content/site";

/** The chosen monogram as an <img> source for next/og, scaled to a height. */
export function monogramImage(fill: string, height: number) {
  const { width: w, height: h } = monograms[site.logo];
  const svg = monogramSvg(site.logo, fill);
  return {
    src: `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`,
    width: Math.round((w / h) * height),
    height,
  };
}

/** Brand fonts as TTF for next/og (it cannot read woff2). */
export async function ogFonts() {
  const dir = join(process.cwd(), "assets/fonts");
  const [display, mono] = await Promise.all([
    readFile(join(dir, "BigShoulders-Black.ttf")),
    readFile(join(dir, "GeistMono-Medium.ttf")),
  ]);
  return [
    { name: "Display", data: display, weight: 900 as const, style: "normal" as const },
    { name: "Mono", data: mono, weight: 500 as const, style: "normal" as const },
  ];
}
