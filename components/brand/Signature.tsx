import { readFileSync } from "node:fs";
import { join } from "node:path";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { SignatureDraw } from "./SignatureDraw";

/**
 * The signature is a single swappable file. Monoline (stroked) artwork draws
 * itself stroke by stroke; filled artwork (e.g. a vectorised photo) wipes in.
 * Use currentColor for strokes/fills so it follows the surrounding text colour.
 */
const markup = readFileSync(join(process.cwd(), "public/brand/signature.svg"), "utf8")
  .replace(/<\?xml[\s\S]*?\?>/, "")
  .replace(/<!--[\s\S]*?-->/g, "")
  .trim();

type SignatureProps = { className?: string; animate?: boolean };

export function Signature({ className, animate = false }: SignatureProps) {
  const label = `${site.name} signature`;
  const classes = cn("[&_svg]:block [&_svg]:h-auto [&_svg]:w-full", className);
  if (animate) return <SignatureDraw markup={markup} label={label} className={classes} />;
  return (
    <div
      role="img"
      aria-label={label}
      className={classes}
      dangerouslySetInnerHTML={{ __html: markup }}
    />
  );
}
