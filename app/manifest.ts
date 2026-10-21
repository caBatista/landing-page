import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: "CB",
    description: site.seo.description.en,
    start_url: "/",
    display: "browser",
    background_color: "#f4f2ec",
    theme_color: "#111112",
    icons: [
      { src: "/icon", type: "image/svg+xml", sizes: "any" },
      { src: "/apple-icon", type: "image/png", sizes: "180x180" },
    ],
  };
}
