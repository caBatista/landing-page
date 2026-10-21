"use client";

import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { useId, useRef } from "react";
import { gsap, MOTION, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { blobShapes } from "./blob-shapes";

gsap.registerPlugin(MorphSVGPlugin);

type BlobProps = {
  seed: number;
  className?: string;
  /** Seconds per morph step. Slow by design. */
  speed?: number;
};

/** Amber organic shape that slowly morphs and drifts. Pauses off screen; static for reduced motion. */
export function Blob({ seed, className, speed = 7 }: BlobProps) {
  const root = useRef<SVGSVGElement>(null);
  const gradient = useId();
  const shapes = blobShapes(seed);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION.ok, () => {
        const path = root.current!.querySelector("path")!;
        const tl = gsap.timeline({ repeat: -1, defaults: { duration: speed, ease: "sine.inOut" } });
        [...shapes.slice(1), shapes[0]].forEach((shape) => tl.to(path, { morphSVG: shape }));
        const drift = gsap.to(root.current, {
          rotation: 40,
          xPercent: 6,
          yPercent: -5,
          duration: speed * 2.5,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
        ScrollTrigger.create({
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          onToggle: ({ isActive }) => {
            tl.paused(!isActive);
            drift.paused(!isActive);
          },
        });
      });
    },
    { scope: root },
  );

  return (
    <svg ref={root} viewBox="-100 -100 200 200" aria-hidden className={className}>
      <defs>
        <radialGradient id={gradient} cx="35%" cy="30%" r="80%">
          <stop offset="0" stopColor="var(--accent)" />
          <stop offset="1" stopColor="var(--accent-deep)" />
        </radialGradient>
      </defs>
      <path d={shapes[0]} fill={`url(#${gradient})`} />
    </svg>
  );
}
