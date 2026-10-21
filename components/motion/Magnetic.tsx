"use client";

import { useRef } from "react";
import { cn } from "@/lib/cn";
import { gsap, MOTION, useGSAP } from "@/lib/gsap";

type MagneticProps = {
  children: React.ReactNode;
  /** Fraction of the pointer offset the content follows. */
  strength?: number;
  className?: string;
};

/** Pulls its content toward the pointer on hover. Fine pointers only, off for reduced motion. */
export function Magnetic({ children, strength = 0.3, className }: MagneticProps) {
  const zone = useRef<HTMLSpanElement>(null);
  const inner = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(`${MOTION.ok} and (pointer: fine)`, () => {
      const el = zone.current!;
      const toX = gsap.quickTo(inner.current, "x", { duration: 0.8, ease: "elastic.out(1, 0.4)" });
      const toY = gsap.quickTo(inner.current, "y", { duration: 0.8, ease: "elastic.out(1, 0.4)" });
      const move = (event: PointerEvent) => {
        const rect = el.getBoundingClientRect();
        toX((event.clientX - rect.left - rect.width / 2) * strength);
        toY((event.clientY - rect.top - rect.height / 2) * strength);
      };
      const leave = () => {
        toX(0);
        toY(0);
      };
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", leave);
      return () => {
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerleave", leave);
      };
    });
    return () => mm.revert();
  });

  return (
    <span ref={zone} className={cn("inline-block", className)}>
      <span ref={inner} className="block will-change-transform">
        {children}
      </span>
    </span>
  );
}
