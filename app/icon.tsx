import { monogramSvg } from "@/components/brand/monogram";
import { site } from "@/content/site";

export const contentType = "image/svg+xml";

/** SVG favicon: the chosen monogram in amber on an ink tile. */
export default function Icon() {
  return new Response(monogramSvg(site.logo, "#F4B400", "#111112"), {
    headers: { "Content-Type": contentType },
  });
}
