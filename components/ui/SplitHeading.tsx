import { cn } from "@/lib/cn";

type SplitHeadingProps = {
  top: string;
  bottom: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
  /** Classes for the second line, e.g. an indent or accent colour. */
  bottomClassName?: string;
};

/** Huge two-line display heading ("ON / CODE"). Lines are masked for reveal animations. */
export function SplitHeading({
  top,
  bottom,
  as: Tag = "h2",
  className,
  bottomClassName,
}: SplitHeadingProps) {
  return (
    <Tag className={cn("display", className)}>
      <span className="mask-line">
        <span data-reveal-line className="block">
          {top}
        </span>
      </span>
      <span className="mask-line">
        <span data-reveal-line className={cn("block", bottomClassName)}>
          {bottom}
        </span>
      </span>
    </Tag>
  );
}
