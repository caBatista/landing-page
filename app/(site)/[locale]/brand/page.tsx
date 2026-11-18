import type { Metadata } from "next";
import { Logo } from "@/components/brand/Logo";
import { Signature } from "@/components/brand/Signature";
import { logoVariantNames, logoVariants, monogramSvg } from "@/components/brand/monogram";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Brand",
  robots: { index: false, follow: false },
};

const FAVICON_SIZES = [16, 24, 32, 48, 64];

const swatches = [
  ["--bg", "#F4F2EC", "bg-bg text-ink"],
  ["--ink", "#111112", "bg-ink text-bg"],
  ["--ink-soft", "#2A2A2D", "bg-ink-soft text-bg"],
  ["--muted", "#8A8A8F", "bg-muted text-ink"],
  ["--muted-strong", "#5F5F64", "bg-muted-strong text-bg"],
  ["--accent", "#F4B400", "bg-accent text-ink"],
  ["--accent-deep", "#E08A00", "bg-accent-deep text-ink"],
] as const;

/** Hidden page for choosing the logo. Not linked, not indexed. */
export default function BrandPage() {
  return (
    <div className="space-y-24 container-x pt-32 pb-24">
      <header className="max-w-2xl space-y-4">
        <p className="label text-muted-strong">Brand · internal</p>
        <h1 className="display text-[clamp(4rem,14vw,10rem)]">CB marks</h1>
        <p className="text-lg">
          Three monogram directions, each on light and dark, large and at favicon sizes. Set your
          pick in <code className="font-mono text-base">content/site.ts → logo</code>; the header,
          favicon, Apple touch icon and Open Graph image all follow. Current:{" "}
          <strong>{logoVariantNames[site.logo]}</strong>.
        </p>
      </header>

      {logoVariants.map((variant) => {
        const favicon = `data:image/svg+xml;utf8,${encodeURIComponent(monogramSvg(variant, "#F4B400", "#111112"))}`;
        return (
          <section key={variant} aria-labelledby={`logo-${variant}`} className="space-y-6">
            <h2 id={`logo-${variant}`} className="label">
              {logoVariantNames[variant]}
              {variant === site.logo && (
                <span className="ml-3 rounded-full bg-accent px-2 py-1 text-ink">In use</span>
              )}
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="grid aspect-[16/10] place-items-center rounded-3xl border border-ink/10 bg-bg">
                <Logo
                  variant={variant}
                  title={`CB, ${variant}, on light`}
                  className="w-1/2 text-ink"
                />
              </div>
              <div className="grid aspect-[16/10] place-items-center rounded-3xl bg-ink">
                <Logo
                  variant={variant}
                  title={`CB, ${variant}, on dark`}
                  className="w-1/2 text-accent"
                />
              </div>
            </div>
            <div className="flex flex-wrap items-end gap-8 rounded-3xl border border-ink/10 p-6">
              {FAVICON_SIZES.map((size) => (
                <figure key={size} className="flex flex-col items-center gap-2">
                  {/* eslint-disable-next-line @next/next/no-img-element -- exact favicon render, no optimisation wanted */}
                  <img
                    src={favicon}
                    width={size}
                    height={size}
                    alt={`${variant} favicon at ${size}px`}
                  />
                  <figcaption className="label text-muted-strong">{size}px</figcaption>
                </figure>
              ))}
              <div className="flex items-center gap-3">
                <Logo variant={variant} className="h-6 text-ink" />
                <span className="grid size-11 place-items-center rounded-xl bg-ink">
                  <Logo variant={variant} className="w-7 text-accent" />
                </span>
                <span className="label text-muted-strong">24px inline · header chip</span>
              </div>
            </div>
          </section>
        );
      })}

      <section aria-labelledby="signature" className="space-y-6">
        <h2 id="signature" className="label">
          Signature · /public/brand/signature.svg (placeholder)
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-ink/10 p-10">
            <Signature className="w-full text-ink" />
          </div>
          <div className="rounded-3xl bg-ink p-10">
            <Signature className="w-full text-accent" />
          </div>
        </div>
      </section>

      <section aria-labelledby="colors" className="space-y-6">
        <h2 id="colors" className="label">
          Colour tokens
        </h2>
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
          {swatches.map(([token, hex, classes]) => (
            <li
              key={token}
              className={`flex aspect-square flex-col justify-end rounded-2xl p-4 ring-1 ring-ink/10 ${classes}`}
            >
              <span className="label">{token}</span>
              <span className="font-mono text-sm">{hex}</span>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="type" className="space-y-6">
        <h2 id="type" className="label">
          Type
        </h2>
        <p className="display text-[clamp(4rem,12vw,9rem)]">Big Shoulders</p>
        <p className="max-w-2xl text-2xl">Geist for body copy and interface text.</p>
        <p className="label">Geist Mono · labels · Porto Alegre, 2026</p>
      </section>
    </div>
  );
}
