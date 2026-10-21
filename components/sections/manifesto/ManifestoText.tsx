"use client";

import { useRef } from "react";
import { afterIdle } from "@/lib/idle";
import type { SplitText as SplitTextType } from "gsap/SplitText";
import { gsap, MOTION, useGSAP } from "@/lib/gsap";

/** SplitText is only needed once the manifesto is set up at idle time. */
let SplitText: typeof SplitTextType;
const loadSplitText = () =>
  import("gsap/SplitText").then((m) => {
    SplitText = m.SplitText;
  });

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
    (_, contextSafe) => {
      // Set up at idle time: keeps hydration free of forced layouts.
      const setup = contextSafe!(() => {
        gsap.matchMedia().add(MOTION.ok, () => {
          // Spans keep the <p> valid; aria "none" leaves the text as-is for assistive tech.
          const split = SplitText.create(root.current, {
            type: "words",
            tag: "span",
            aria: "none",
          });
          gsap.fromTo(
            split.words,
            // From --muted (3:1 at this size, AA for large text) to ink.
            { color: "#8a8a8f" },
            {
              color: "#111112",
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
      });
      return afterIdle(setup, loadSplitText);
    },
    { scope: root },
  );

  return (
    <p ref={root} className={className}>
      {children}
    </p>
  );
}
