"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { cn } from "@/lib/cn";
import { onIntro } from "@/lib/intro";
import { useReducedMotion } from "@/lib/use-media-query";

const MonogramCanvas = dynamic(() => import("./MonogramCanvas"), { ssr: false });

function hasWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

/**
 * The hero's 3D CB. The flat SVG shows first; the WebGL scene loads after the
 * intro when the browser is idle (desktop) or on the first touch/scroll
 * (mobile, keeping the initial load light), then cross-fades in. Reduced
 * motion or no WebGL keeps the static SVG.
 */
export function HeroMonogram({ className }: { className?: string }) {
  const root = useRef<HTMLDivElement>(null);
  const input = useRef({ x: 0, y: 0 });
  const reduced = useReducedMotion();
  const [load, setLoad] = useState(false);
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(true);

  // Decide when (and whether) to load the scene.
  useEffect(() => {
    // Read the query directly: the hook reports false until after hydration.
    if (reduced || matchMedia("(prefers-reduced-motion: reduce)").matches || !hasWebGL()) return;
    const start = () => setLoad(true);
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (coarse) {
      const events = ["touchstart", "scroll", "pointerdown"] as const;
      const once = () => {
        events.forEach((e) => window.removeEventListener(e, once));
        start();
      };
      events.forEach((e) => window.addEventListener(e, once, { passive: true }));
      return () => events.forEach((e) => window.removeEventListener(e, once));
    }
    let idle = 0;
    const stop = onIntro(() => {
      idle = window.requestIdleCallback
        ? window.requestIdleCallback(start, { timeout: 2500 })
        : window.setTimeout(start, 1200);
    });
    return () => {
      stop();
      if (window.cancelIdleCallback) window.cancelIdleCallback(idle);
      else window.clearTimeout(idle);
    };
  }, [reduced]);

  // Feed pointer (desktop), scroll and device tilt (touch) into the scene.
  useEffect(() => {
    if (!load) return;
    const onPointer = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      input.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      input.current.y = (event.clientY / window.innerHeight) * 2 - 1;
    };
    const onScroll = () => {
      if (window.matchMedia("(pointer: fine)").matches) return;
      const progress = Math.min(window.scrollY / window.innerHeight, 1);
      input.current.x = progress * 1.6 - 0.2;
    };
    const onTilt = (event: DeviceOrientationEvent) => {
      if (event.gamma === null || event.beta === null) return;
      input.current.x = Math.max(-1, Math.min(1, event.gamma / 30));
      input.current.y = Math.max(-1, Math.min(1, (event.beta - 45) / 30));
    };
    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    // iOS needs a permission prompt for tilt; there, scroll drives the motion instead.
    window.addEventListener("deviceorientation", onTilt, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("deviceorientation", onTilt);
    };
  }, [load]);

  // Stop rendering while the hero is off screen.
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(root.current!);
    return () => observer.disconnect();
  }, []);

  const showCanvas = load && !reduced;

  return (
    <div ref={root} className={cn("relative", className)}>
      <Logo
        className={cn(
          "absolute inset-[16%] text-accent drop-shadow-[0_24px_40px_rgba(224,138,0,0.35)] transition-opacity duration-700",
          ready && showCanvas && "opacity-0",
        )}
      />
      {showCanvas && (
        <div
          className={cn(
            "absolute inset-0 transition-opacity duration-1000",
            ready ? "opacity-100" : "opacity-0",
          )}
        >
          <MonogramCanvas input={input} active={visible} onReady={() => setReady(true)} />
        </div>
      )}
    </div>
  );
}
