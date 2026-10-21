import { site } from "@/content/site";
import { socials } from "@/content/socials";
import { localeTags, type Locale } from "@/i18n/config";

/** schema.org Person for search engines. */
export function PersonJsonLd({ locale }: { locale: Locale }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    givenName: site.firstName,
    familyName: site.lastName,
    url: site.url,
    image: `${site.url}/opengraph-image`,
    email: `mailto:${site.email}`,
    jobTitle: site.role[locale].split(" @ ")[0],
    worksFor: { "@type": "Organization", name: "SAP", url: "https://www.sap.com" },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Porto Alegre",
      addressRegion: "RS",
      addressCountry: "BR",
    },
    knowsAbout: ["Java", "Spring Boot", "Rust", "WebAssembly", "Kubernetes", "Big data platforms"],
    sameAs: socials.filter((s) => s.id !== "email").map((s) => s.href),
    inLanguage: localeTags[locale],
  };
  return (
    <script
      type="application/ld+json"
      // Escape "<" so content can never close the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
