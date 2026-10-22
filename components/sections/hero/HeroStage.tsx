"use client";

import { useRef } from "react";
import { afterIdle } from "@/lib/idle";
import { gsap, MOTION, useGSAP } from "@/lib/gsap";

/**
 * Scroll parallax for the hero. The entrance itself is pure CSS (.hero-rise,
 * .hero-pop, .hero-fade in globals.css) so it plays on time however late
 * hydration lands; this only needs to exist by the first scroll.
 */
export function HeroStage({ children, ...props }: React.ComponentProps<"section">) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    (_, contextSafe) => {
      const parallax = contextSafe!(() => {
        gsap.matchMedia().add(MOTION.desktop, () => {
          const scrub = { trigger: root.current, start: "top top", end: "bottom top", scrub: true };
          gsap.to("[data-hero-name]", { yPercent: 22, ease: "none", scrollTrigger: scrub });
          gsap.to("[data-hero-parallax]", { yPercent: -18, ease: "none", scrollTrigger: scrub });
        });
      });
      return afterIdle(parallax);
    },
    { scope: root },
  );

  return (
    <section ref={root} {...props}>
      {children}
    </section>
  );
}
