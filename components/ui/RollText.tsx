import { cn } from "@/lib/cn";

const MOVE = "transition-transform duration-500 ease-out-expo";

/**
 * Text that rolls up to a copy of itself when its `group` ancestor is hovered
 * or focused: the original leaves through the top while the copy enters from below.
 */
export function RollText({ children, className }: { children: string; className?: string }) {
  return (
    // The roomier line box keeps the hidden copy's glyphs from peeking out under tight display leading.
    <span className={cn("relative block overflow-hidden leading-[1.08]!", className)}>
      <span
        className={cn(
          "block group-hover:-translate-y-full group-focus-visible:-translate-y-full motion-reduce:group-hover:translate-y-0 motion-reduce:group-hover:opacity-0 motion-reduce:group-focus-visible:translate-y-0 motion-reduce:group-focus-visible:opacity-0",
          MOVE,
        )}
      >
        {children}
      </span>
      <span
        aria-hidden
        className={cn(
          "absolute inset-0 translate-y-full group-hover:translate-y-0 group-focus-visible:translate-y-0 motion-reduce:translate-y-0 motion-reduce:opacity-0 motion-reduce:group-hover:opacity-100 motion-reduce:group-focus-visible:opacity-100",
          MOVE,
        )}
      >
        {children}
      </span>
    </span>
  );
}
