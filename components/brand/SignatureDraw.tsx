"use client";

import { useRef } from "react";
import { afterIdle } from "@/lib/idle";
import { gsap, MOTION, plugins, useGSAP } from "@/lib/gsap";
import { onceInView } from "@/lib/in-view";

type SignatureDrawProps = { markup: string; label: string; className?: string };

export function SignatureDraw({ markup, label, className }: SignatureDrawProps) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    (_, contextSafe) => {
      // Set up at idle time: keeps hydration free of forced layouts.
      const setup = contextSafe!(() => {
        const svg = root.current!.querySelector("svg");
        if (!svg) return;
        const shapes = Array.from(svg.querySelectorAll("path, line, polyline, circle, ellipse"));
        const stroked = shapes.length > 0 && getComputedStyle(shapes[0]).stroke !== "none";
        gsap.matchMedia().add(MOTION, ({ conditions }) => {
          let draw: gsap.core.Animation;
          if (conditions?.reduce) {
            draw = gsap.fromTo(
              svg,
              { autoAlpha: 0 },
              { autoAlpha: 1, duration: 0.6, ease: "none" },
            );
          } else if (stroked) {
            draw = gsap.fromTo(
              shapes,
              { drawSVG: "0%" },
              { drawSVG: "100%", duration: 0.9, stagger: 0.22, ease: "power2.inOut" },
            );
          } else {
            draw = gsap.fromTo(
              svg,
              { clipPath: "inset(0% 100% 0% 0%)" },
              { clipPath: "inset(0% 0% 0% 0%)", duration: 1.8, ease: "power2.inOut" },
            );
          }
          draw.pause();
          return onceInView(root.current!, () => draw.play(), 0.15);
        });
      });
      return afterIdle(setup, plugins.drawSVG);
    },
    { scope: root },
  );

  return (
    <div
      ref={root}
      role="img"
      aria-label={label}
      className={className}
      dangerouslySetInnerHTML={{ __html: markup }}
    />
  );
}
