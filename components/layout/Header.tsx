"use client";

import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { Magnetic } from "@/components/motion/Magnetic";
import { useSmoothScroll } from "@/components/motion/SmoothScroll";
import { ui } from "@/content/ui";
import { homePath, type Locale } from "@/i18n/config";
import { cn } from "@/lib/cn";
import { LocaleToggle } from "./LocaleToggle";
import { MenuOverlay } from "./MenuOverlay";

const MENU_ID = "site-menu";

/** Fixed header: hides while scrolling down, comes back on scroll up. */
export function Header({ locale }: { locale: Locale }) {
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastY = useRef(0);
  const { scrollToId } = useSmoothScroll();
  const home = homePath(locale);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const y = window.scrollY;
        // iOS rubber-banding reports positions past either end: ignore them so the bounce doesn't flip the header.
        if (y < 0 || y > document.documentElement.scrollHeight - window.innerHeight) return;
        const delta = y - lastY.current;
        if (Math.abs(delta) > 8) setHidden(delta > 0 && y > 120);
        lastY.current = y;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const chip = "bg-ink text-bg ring-1 ring-white/10";

  return (
    <>
      <header
        className={cn(
          "pointer-events-none fixed inset-x-0 top-0 z-40 flex items-center justify-between container-x pt-4 transition-transform duration-700 ease-out-expo",
          hidden && !menuOpen && "-translate-y-[calc(100%+1rem)]",
        )}
        onFocusCapture={() => setHidden(false)}
      >
        <a
          href={home}
          onClick={(event) => {
            if (window.location.pathname !== home) return;
            event.preventDefault();
            scrollToId("top");
          }}
          aria-label={ui.home[locale]}
          className={cn("pointer-events-auto grid size-11 place-items-center rounded-xl", chip)}
        >
          <Logo className="w-7 text-accent" />
        </a>

        <div className="pointer-events-auto flex items-center gap-2">
          <LocaleToggle locale={locale} className={cn("rounded-full p-1", chip)} />
          <Magnetic>
            <button
              type="button"
              aria-haspopup="dialog"
              aria-expanded={menuOpen}
              aria-controls={MENU_ID}
              onClick={() => setMenuOpen(true)}
              className={cn(
                "flex h-11 items-center gap-3 rounded-full px-5 label transition-colors hover:bg-accent hover:text-ink",
                chip,
              )}
            >
              {ui.menu[locale]}
              <span aria-hidden className="flex w-4 flex-col gap-1">
                <span className="h-0.5 bg-current" />
                <span className="h-0.5 w-2/3 bg-current" />
              </span>
            </button>
          </Magnetic>
        </div>
      </header>
      {/* Outside <header>: the dialog would inherit its pointer-events: none. */}
      <MenuOverlay
        id={MENU_ID}
        locale={locale}
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
      />
    </>
  );
}
