"use client";

import Image from "next/image";
import { useRef } from "react";
import { cn } from "@/lib/cn";
import { afterIdle } from "@/lib/idle";
import { gsap, MOTION, useGSAP } from "@/lib/gsap";
import { onceInView } from "@/lib/in-view";

type ParallaxImageProps = {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  style?: React.CSSProperties;
  /** CSS object-position that decides what survives cropping (see ImageAsset.focal). */
  focal?: string;
  /** Upward drift in percent of the frame while it crosses the viewport. */
  amount?: number;
};

/** Image that wipes in with a clip-path and drifts inside its frame on scroll. */
export function ParallaxImage({
  src,
  alt,
  sizes,
  className,
  style,
  focal,
  amount = 4,
}: ParallaxImageProps) {
  const frame = useRef<HTMLDivElement>(null);

  useGSAP(
    (_, contextSafe) => {
      // Set up at idle time: keeps hydration free of forced layouts.
      const setup = contextSafe!(() => {
        gsap.matchMedia().add(MOTION.ok, () => {
          const img = frame.current!.querySelector("img");
          const wipe = gsap.fromTo(
            frame.current,
            { clipPath: "inset(100% 0% 0% 0%)" },
            { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "expo.inOut", paused: true },
          );
          // Scroll-scrubbed drift only with a precise pointer; on touch it lags behind native scrolling.
          if (window.matchMedia(MOTION.desktop).matches) {
            gsap.fromTo(
              img,
              { yPercent: 0 },
              {
                yPercent: -amount,
                ease: "none",
                scrollTrigger: {
                  trigger: frame.current,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: true,
                },
              },
            );
          }
          return onceInView(frame.current!, () => wipe.play(), 0.12);
        });
      });
      return afterIdle(setup);
    },
    { scope: frame },
  );

  return (
    <div ref={frame} className={cn("relative overflow-hidden", className)} style={style}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        // Zoom from the top edge and only drift upward, so the top of the picture is never cropped by more than `amount`.
        className="object-cover pin:origin-top pin:scale-[1.08]"
        style={{ objectPosition: focal }}
      />
    </div>
  );
}
