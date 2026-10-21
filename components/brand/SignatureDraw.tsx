"use client";

import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { useRef } from "react";
import { gsap, MOTION, useGSAP } from "@/lib/gsap";

gsap.registerPlugin(DrawSVGPlugin);

type SignatureDrawProps = { markup: string; label: string; className?: string };

export function SignatureDraw({ markup, label, className }: SignatureDrawProps) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const svg = root.current!.querySelector("svg");
      if (!svg) return;
      const shapes = Array.from(svg.querySelectorAll("path, line, polyline, circle, ellipse"));
      const stroked = shapes.length > 0 && getComputedStyle(shapes[0]).stroke !== "none";
      const trigger = { trigger: root.current, start: "top 85%", once: true };

      gsap.matchMedia().add(MOTION, ({ conditions }) => {
        if (conditions?.reduce) {
          gsap.from(svg, { autoAlpha: 0, duration: 0.6, ease: "none", scrollTrigger: trigger });
        } else if (stroked) {
          gsap.from(shapes, {
            drawSVG: 0,
            duration: 1.1,
            stagger: 0.28,
            ease: "power2.inOut",
            scrollTrigger: trigger,
          });
        } else {
          gsap.fromTo(
            svg,
            { clipPath: "inset(0% 100% 0% 0%)" },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 1.8,
              ease: "power2.inOut",
              scrollTrigger: trigger,
            },
          );
        }
      });
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
