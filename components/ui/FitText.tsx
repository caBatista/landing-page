"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

/** Average advance of an uppercase display glyph in em, for the server-side first guess. */
const GLYPH_EM = 0.43;

/** Sizes each line so it spans the full width of the container. */
export function FitText({ lines, className }: { lines: string[]; className?: string }) {
  const root = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = root.current!;
    const fit = () => {
      // Size the mask wrapper (its accent padding is in em), measure the text inside it.
      el.querySelectorAll<HTMLElement>("[data-fit]").forEach((mask) => {
        const text = mask.firstElementChild as HTMLElement;
        mask.style.fontSize = "100px";
        mask.style.fontSize = `${(el.clientWidth / text.scrollWidth) * 100}px`;
      });
    };
    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(el);
    document.fonts.ready.then(fit);
    return () => observer.disconnect();
  }, []);

  return (
    <p ref={root} className={cn("display", className)}>
      {lines.map((line) => (
        <span
          key={line}
          data-fit
          className="mask-line"
          style={{
            fontSize: `calc((100vw - 2 * var(--gutter)) / ${(line.length * GLYPH_EM).toFixed(2)})`,
          }}
        >
          <span data-reveal-line className="block w-max whitespace-nowrap">
            {line}
          </span>
        </span>
      ))}
    </p>
  );
}
