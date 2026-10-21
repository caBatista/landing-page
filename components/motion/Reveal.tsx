"use client";

import { useRef } from "react";
import { afterIdle } from "@/lib/idle";
import { gsap, MOTION, useGSAP } from "@/lib/gsap";
import { onceInView } from "@/lib/in-view";

type RevealProps = React.ComponentProps<"div"> & {
  /** How far above the viewport bottom the entrance starts, as a fraction of its height. */
  offset?: number;
};

/**
 * Scroll-triggered entrance for its descendants: `[data-reveal-line]` slide up
 * out of their mask, `[data-reveal-fade]` fade up. Simple fades for reduced motion.
 */
export function Reveal({ offset = 0.18, children, ...props }: RevealProps) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    (_, contextSafe) => {
      // Set up at idle time: keeps hydration free of extra work.
      const setup = contextSafe!(() => {
        const lines = gsap.utils.toArray<HTMLElement>("[data-reveal-line]", root.current);
        const fades = gsap.utils.toArray<HTMLElement>("[data-reveal-fade]", root.current);
        const all = [...lines, ...fades];
        if (all.length === 0) return;

        gsap.matchMedia().add(MOTION, ({ conditions }) => {
          const tl = gsap.timeline({ paused: true });
          if (conditions?.reduce) {
            tl.fromTo(all, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6, ease: "none" });
          } else {
            if (lines.length)
              tl.fromTo(lines, { yPercent: 110 }, { yPercent: 0, stagger: 0.08, duration: 1.3 });
            if (fades.length)
              tl.fromTo(
                fades,
                { autoAlpha: 0, y: 32 },
                { autoAlpha: 1, y: 0, stagger: 0.08, duration: 1.1, clearProps: "transform" },
                lines.length ? 0.2 : 0,
              );
          }
          return onceInView(root.current!, () => tl.play(), offset);
        });
      });
      return afterIdle(setup);
    },
    { scope: root },
  );

  return (
    <div ref={root} {...props}>
      {children}
    </div>
  );
}
