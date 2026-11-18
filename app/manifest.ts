import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { colors } from "@/lib/colors";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: "CB",
    description: site.seo.description.en,
    start_url: "/",
    display: "browser",
    background_color: colors.bg,
    theme_color: colors.ink,
    icons: [
      { src: "/icon", type: "image/svg+xml", sizes: "any" },
      { src: "/apple-icon", type: "image/png", sizes: "180x180" },
    ],
  };
}
