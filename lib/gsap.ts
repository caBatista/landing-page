"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);
gsap.defaults({ ease: "expo.out", duration: 1.1 });
// Mobile browser bars resize the viewport while scrolling; don't recompute every trigger for that.
ScrollTrigger.config({ ignoreMobileResize: true });

/** gsap.matchMedia() conditions shared by every animation. */
export const MOTION = {
  ok: "(prefers-reduced-motion: no-preference)",
  reduce: "(prefers-reduced-motion: reduce)",
  /** Precise pointer + motion allowed: the only case for scroll-driven effects (see the `pin` variant). */
  desktop: "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
} as const;

/** Plugins used by deferred, below-the-fold effects: loaded on demand, not at startup. */
export const plugins = {
  morphSVG: () => import("gsap/MorphSVGPlugin").then((m) => gsap.registerPlugin(m.MorphSVGPlugin)),
  drawSVG: () => import("gsap/DrawSVGPlugin").then((m) => gsap.registerPlugin(m.DrawSVGPlugin)),
};

export { gsap, ScrollTrigger, useGSAP };
