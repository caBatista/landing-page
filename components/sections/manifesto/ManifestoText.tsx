"use client";

import { useRef } from "react";
import { gsap, MOTION, SplitText, useGSAP } from "@/lib/gsap";

/** Paragraph whose words light up one by one as it scrolls through the viewport. */
export function ManifestoText({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const root = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION.ok, () => {
        const split = SplitText.create(root.current, {
          type: "words",
          wordsClass: "manifesto-word",
        });
        gsap.fromTo(
          split.words,
          { opacity: 0.14 },
          {
            opacity: 1,
            stagger: 0.1,
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top 78%",
              end: "bottom 55%",
              scrub: true,
            },
          },
        );
        return () => split.revert();
      });
    },
    { scope: root },
  );

  return (
    <p ref={root} className={className}>
      {children}
    </p>
  );
}
