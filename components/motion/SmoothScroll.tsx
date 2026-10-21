"use client";

import Lenis from "lenis";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/use-media-query";

type ScrollApi = {
  /** Scrolls to a section by id and moves focus to it. Targets need tabIndex={-1}. */
  scrollToId: (id: string) => void;
  /** Locks or unlocks page scrolling (menu, dialogs). */
  setLocked: (locked: boolean) => void;
};

const ScrollContext = createContext<ScrollApi | null>(null);

export function useSmoothScroll(): ScrollApi {
  const api = useContext(ScrollContext);
  if (!api) throw new Error("useSmoothScroll must be used inside <SmoothScroll>");
  return api;
}

/** Lenis smooth scrolling driven by GSAP's ticker so ScrollTrigger stays in sync. */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    if (reduced) return;
    const instance = new Lenis({ autoRaf: false, lerp: 0.11 });
    const raf = (time: number) => instance.raf(time * 1000);
    instance.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Lenis is an external system
    setLenis(instance);
    return () => {
      gsap.ticker.remove(raf);
      instance.destroy();
      setLenis(null);
    };
  }, [reduced]);

  const scrollToId = useCallback(
    (id: string) => {
      const target = document.getElementById(id);
      if (!target) return;
      if (lenis) lenis.scrollTo(id === "top" ? 0 : target, { duration: 1.4 });
      else target.scrollIntoView();
      // Move focus with the scroll so keyboard and screen reader users land in the section.
      target.focus({ preventScroll: true });
    },
    [lenis],
  );

  const setLocked = useCallback(
    (locked: boolean) => {
      if (lenis) {
        if (locked) lenis.stop();
        else lenis.start();
      }
      document.documentElement.style.overflow = locked ? "hidden" : "";
    },
    [lenis],
  );

  const api = useMemo(() => ({ scrollToId, setLocked }), [scrollToId, setLocked]);
  return <ScrollContext value={api}>{children}</ScrollContext>;
}
