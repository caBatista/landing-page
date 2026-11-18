import { monogramSvg } from "@/components/brand/monogram";
import { site } from "@/content/site";
import { colors } from "@/lib/colors";

export const contentType = "image/svg+xml";

/** SVG favicon: the chosen monogram in the accent colour on an ink tile. */
export default function Icon() {
  return new Response(monogramSvg(site.logo, colors.accent, colors.ink), {
    headers: { "Content-Type": contentType },
  });
}
