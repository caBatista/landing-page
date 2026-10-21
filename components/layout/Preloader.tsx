"use client";

import { useRef, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { finishIntro, isRepeatVisit } from "@/lib/intro";
import { gsap, MOTION, useGSAP } from "@/lib/gsap";

/** First-visit branded preloader (≤1.5s). Hidden before paint on repeat visits. */
export function Preloader({ label }: { label: string }) {
  const root = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useGSAP(
    () => {
      if (isRepeatVisit()) {
        finishIntro();
        setDone(true);
        return;
      }
      const counter = root.current!.querySelector<HTMLElement>("[data-counter]")!;
      const progress = { value: 0 };
      const render = () =>
        (counter.textContent = String(Math.round(progress.value)).padStart(3, "0"));
      const complete = () => {
        finishIntro();
        setDone(true);
      };

      gsap.matchMedia().add(MOTION, ({ conditions }) => {
        if (conditions?.reduce) {
          gsap
            .timeline({ onComplete: complete })
            .to(progress, { value: 100, duration: 0.3, ease: "none", onUpdate: render })
            .to(root.current, { autoAlpha: 0, duration: 0.3, ease: "none" });
          return;
        }
        gsap
          .timeline({ onComplete: complete })
          .from("[data-logo]", { yPercent: 60, clipPath: "inset(100% 0% 0% 0%)", duration: 0.7 }, 0)
          .from("[data-label]", { autoAlpha: 0, y: 10, duration: 0.5 }, 0.1)
          .to(progress, { value: 100, duration: 1, ease: "power2.inOut", onUpdate: render }, 0)
          .to("[data-logo]", { scale: 0.85, autoAlpha: 0, duration: 0.3, ease: "power2.in" }, 0.95)
          .to(root.current, { yPercent: -100, duration: 0.5, ease: "expo.inOut" }, 1);
      });
    },
    { scope: root },
  );

  if (done) return null;

  return (
    <div
      ref={root}
      aria-hidden
      className="preloader dark-surface fixed inset-0 z-[60] flex flex-col bg-ink text-bg"
    >
      <div className="grid flex-1 place-items-center">
        <span data-logo className="block w-24 text-accent sm:w-32">
          <Logo className="w-full" />
        </span>
      </div>
      <div className="flex items-end justify-between container-x pb-6">
        <p data-label className="label text-muted">
          {label}
        </p>
        <p data-counter className="display text-[clamp(4rem,14vw,10rem)] text-bg tabular-nums">
          000
        </p>
      </div>
    </div>
  );
}
