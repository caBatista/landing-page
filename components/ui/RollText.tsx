import { cn } from "@/lib/cn";

/** Text that rolls up to a copy of itself when its `group` ancestor is hovered or focused. */
export function RollText({ children, className }: { children: string; className?: string }) {
  const roll =
    "block transition-transform duration-500 ease-out-expo group-hover:-translate-y-full group-focus-visible:-translate-y-full";
  return (
    // The roomier line box keeps the hidden copy's glyphs from peeking out under tight display leading.
    <span className={cn("relative block overflow-hidden leading-[1.08]!", className)}>
      <span className={roll}>{children}</span>
      <span aria-hidden className={cn("absolute inset-0 translate-y-full", roll)}>
        {children}
      </span>
    </span>
  );
}
