import { site, type LogoVariant } from "@/content/site";
import { monograms } from "./monogram";

type LogoProps = {
  variant?: LogoVariant;
  /** Accessible name. Omit when the logo sits next to visible text that names it. */
  title?: string;
  className?: string;
};

/** The CB monogram, filled with currentColor. */
export function Logo({ variant = site.logo, title, className }: LogoProps) {
  const m = monograms[variant];
  return (
    <svg
      viewBox={m.viewBox}
      className={className}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <g transform={m.transform}>
        <path fill="currentColor" fillRule="evenodd" d={m.d} />
      </g>
    </svg>
  );
}
