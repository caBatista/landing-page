"use client";

import { useRef } from "react";
import { afterIdle } from "@/lib/idle";
import { introDelay } from "@/lib/intro";
import { gsap, MOTION, useGSAP } from "@/lib/gsap";

/**
 * Hero choreography: masked name lines rise, the monogram scales in and the
 * details fade up as the preloader leaves; then a light scroll parallax.
 */
export function HeroStage({ children, ...props }: React.ComponentProps<"section">) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    (_, contextSafe) => {
      const delay = introDelay();
      // Scroll parallax is not needed until the first scroll: set it up at idle time.
      const parallax = contextSafe!(() => {
        gsap.matchMedia().add(MOTION.ok, () => {
          const scrub = { trigger: root.current, start: "top top", end: "bottom top", scrub: true };
          gsap.to("[data-hero-name]", { yPercent: 22, ease: "none", scrollTrigger: scrub });
          gsap.to("[data-hero-parallax]", { yPercent: -18, ease: "none", scrollTrigger: scrub });
        });
      });
      const cancelParallax = afterIdle(parallax);

      gsap.matchMedia().add(MOTION, ({ conditions }) => {
        // Hydrated long after the preloader left (slow device): the hero has been
        // on screen already, so leave it be rather than hide and replay it.
        if (delay === null) {
          gsap.set("[data-hero-intro]", { visibility: "inherit" });
          return;
        }

        // Explicit fromTo: end states must not depend on whatever inline styles exist at setup.
        const tl = gsap.timeline({ paused: true });
        if (conditions?.reduce) {
          tl.fromTo(
            "[data-hero-intro]",
            { autoAlpha: 0 },
            { autoAlpha: 1, duration: 0.6, ease: "none" },
          );
        } else {
          tl.fromTo(
            "[data-hero-line]",
            { yPercent: 110 },
            { yPercent: 0, stagger: 0.09, duration: 1.5 },
          )
            .fromTo(
              "[data-hero-logo]",
              { scale: 0.7, rotate: -6, autoAlpha: 0 },
              { scale: 1, rotate: 0, autoAlpha: 1, duration: 1.8 },
              0.1,
            )
            .fromTo(
              "[data-hero-fade]",
              { autoAlpha: 0, y: 24 },
              { autoAlpha: 1, y: 0, stagger: 0.1, duration: 1.2 },
              0.35,
            );
        }
        // Repeat visits hide intro elements with CSS until this point (no flash before hydration).
        gsap.set("[data-hero-intro]", { visibility: "inherit" });
        const timer = window.setTimeout(() => tl.play(), delay);
        return () => window.clearTimeout(timer);
      });
      return cancelParallax;
    },
    { scope: root },
  );

  return (
    <section ref={root} {...props}>
      {children}
    </section>
  );
}
