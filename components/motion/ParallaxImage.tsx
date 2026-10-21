"use client";

import Image from "next/image";
import { useRef } from "react";
import { cn } from "@/lib/cn";
import { gsap, MOTION, useGSAP } from "@/lib/gsap";

type ParallaxImageProps = {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  /** Vertical drift in percent of the frame while it crosses the viewport. */
  amount?: number;
};

/** Image that wipes in with a clip-path and drifts inside its frame on scroll. */
export function ParallaxImage({ src, alt, sizes, className, amount = 10 }: ParallaxImageProps) {
  const frame = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION.ok, () => {
        const img = frame.current!.querySelector("img");
        gsap.fromTo(
          frame.current,
          { clipPath: "inset(100% 0% 0% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.4,
            ease: "expo.inOut",
            scrollTrigger: { trigger: frame.current, start: "top 88%", once: true },
          },
        );
        gsap.fromTo(
          img,
          { yPercent: -amount },
          {
            yPercent: amount,
            ease: "none",
            scrollTrigger: {
              trigger: frame.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });
    },
    { scope: frame },
  );

  return (
    <div ref={frame} className={cn("relative overflow-hidden", className)}>
      <Image src={src} alt={alt} fill sizes={sizes} className="scale-[1.25] object-cover" />
    </div>
  );
}
