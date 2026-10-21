"use client";

import { useRef } from "react";
import { gsap, MOTION, useGSAP } from "@/lib/gsap";

type RevealProps = React.ComponentProps<"div"> & {
  /** ScrollTrigger start, e.g. "top 80%". */
  start?: string;
};

/**
 * Scroll-triggered entrance for its descendants: `[data-reveal-line]` slide up
 * out of their mask, `[data-reveal-fade]` fade up. Simple fades for reduced motion.
 */
export function Reveal({ start = "top 82%", children, ...props }: RevealProps) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const lines = gsap.utils.toArray<HTMLElement>("[data-reveal-line]", root.current);
      const fades = gsap.utils.toArray<HTMLElement>("[data-reveal-fade]", root.current);
      gsap.matchMedia().add(MOTION, ({ conditions }) => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: root.current, start, once: true } });
        const all = [...lines, ...fades];
        if (conditions?.reduce) {
          if (all.length)
            tl.fromTo(all, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6, ease: "none" });
          return;
        }
        if (lines.length)
          tl.fromTo(lines, { yPercent: 110 }, { yPercent: 0, stagger: 0.08, duration: 1.3 });
        if (fades.length)
          tl.fromTo(
            fades,
            { autoAlpha: 0, y: 32 },
            { autoAlpha: 1, y: 0, stagger: 0.08, duration: 1.1 },
            lines.length ? 0.2 : 0,
          );
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} {...props}>
      {children}
    </div>
  );
}
