import { cn } from "@/lib/cn";

type ExternalLinkProps = {
  href: string;
  children: React.ReactNode;
  /** Screen-reader hint, e.g. "opens in a new tab". */
  newTabLabel: string;
  className?: string;
};

/** Link that opens in a new tab, with an arrow and an accessible hint. */
export function ExternalLink({ href, children, newTabLabel, className }: ExternalLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={cn("group/link inline-flex items-center gap-2", className)}
    >
      <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-bottom-left bg-no-repeat transition-[background-size] duration-500 ease-out-expo group-hover/link:bg-[length:100%_1px]">
        {children}
      </span>
      <span
        aria-hidden
        className="transition-transform duration-500 ease-out-expo group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
      >
        ↗
      </span>
      <span className="sr-only">({newTabLabel})</span>
    </a>
  );
}
