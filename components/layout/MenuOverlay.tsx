"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { useSmoothScroll } from "@/components/motion/SmoothScroll";
import { site } from "@/content/site";
import { socials } from "@/content/socials";
import { nav, ui } from "@/content/ui";
import { homePath, type Locale } from "@/i18n/config";
import { cn } from "@/lib/cn";
import { trapTab } from "@/lib/focus";
import { gsap, MOTION, useGSAP } from "@/lib/gsap";

type MenuOverlayProps = {
  id: string;
  locale: Locale;
  open: boolean;
  onClose: () => void;
};

/**
 * Fullscreen menu on a native modal <dialog>: the browser traps focus, makes the
 * page inert and restores focus on close. GSAP only handles the choreography.
 */
export function MenuOverlay({ id, locale, open, onClose }: MenuOverlayProps) {
  const dialog = useRef<HTMLDialogElement>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const pendingTarget = useRef<string | null>(null);
  const isOpen = useRef(open);
  const { scrollToId, setLocked } = useSmoothScroll();
  const [active, setActive] = useState(0);
  // The menu's contents (and its photos) are only rendered once it is first opened.
  const [hasOpened, setHasOpened] = useState(open);
  if (open && !hasOpened) setHasOpened(true);
  const home = homePath(locale);

  useGSAP(
    () => {
      if (!hasOpened) return;
      gsap.matchMedia().add(MOTION, ({ conditions }) => {
        const tl = gsap.timeline({ paused: true });
        if (conditions?.reduce) {
          tl.fromTo("[data-menu-panel]", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 });
        } else {
          tl.fromTo(
            "[data-menu-panel]",
            { clipPath: "inset(0% 0% 100% 0%)" },
            { clipPath: "inset(0% 0% 0% 0%)", duration: 0.9, ease: "expo.inOut" },
          )
            .from("[data-menu-link]", { yPercent: 110, stagger: 0.06, duration: 1 }, "-=0.4")
            .from(
              "[data-menu-fade]",
              { autoAlpha: 0, y: 16, stagger: 0.06, duration: 0.8 },
              "<0.2",
            );
        }
        timeline.current = tl;
      });
    },
    { scope: dialog, dependencies: [hasOpened] },
  );

  useEffect(() => {
    const el = dialog.current;
    const tl = timeline.current;
    isOpen.current = open;
    if (!el || !tl) return;

    if (open) {
      if (!el.open) el.showModal();
      closeButton.current?.focus();
      setLocked(true);
      tl.timeScale(1).play();
      return;
    }
    if (!el.open) return;
    tl.timeScale(1.8)
      .reverse()
      .then(() => {
        if (isOpen.current) return; // reopened mid-animation
        el.close();
        setLocked(false);
        if (pendingTarget.current) scrollToId(pendingTarget.current);
        pendingTarget.current = null;
      });
  }, [open, scrollToId, setLocked]);

  const go = (event: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    // On another page the link navigates normally to the home page section.
    if (window.location.pathname !== home) return;
    event.preventDefault();
    pendingTarget.current = target;
    onClose();
  };

  return (
    <dialog
      ref={dialog}
      id={id}
      aria-label={ui.menu[locale]}
      onKeyDown={trapTab}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      className="dark-surface m-0 h-dvh max-h-none w-full max-w-none bg-transparent p-0 text-bg backdrop:bg-transparent"
    >
      {hasOpened && (
        <div
          data-menu-panel
          data-lenis-prevent
          className="flex min-h-full flex-col overflow-y-auto bg-ink container-x pt-4 pb-8"
        >
          <div className="flex items-center justify-between">
            <a
              href={`${home}#top`}
              onClick={(event) => go(event, "top")}
              className="grid size-11 place-items-center rounded-xl bg-ink-soft text-accent"
              aria-label={ui.home[locale]}
            >
              <Logo className="w-7" />
            </a>
            <button
              ref={closeButton}
              type="button"
              onClick={onClose}
              className="flex h-11 items-center gap-3 rounded-full bg-accent px-5 label text-ink transition-colors hover:bg-accent-deep"
            >
              {ui.close[locale]}
              <span aria-hidden className="relative block size-3">
                <span className="absolute top-1/2 left-0 h-0.5 w-3 -translate-y-1/2 rotate-45 bg-current" />
                <span className="absolute top-1/2 left-0 h-0.5 w-3 -translate-y-1/2 -rotate-45 bg-current" />
              </span>
            </button>
          </div>

          <div className="flex flex-1 items-center gap-12 py-12">
            <nav aria-label={ui.mainNav[locale]} className="flex-1">
              <ol>
                {nav.map((item, index) => (
                  <li key={item.id}>
                    <a
                      href={`${home}#${item.id}`}
                      onClick={(event) => go(event, item.id)}
                      onPointerEnter={() => setActive(index)}
                      onFocus={() => setActive(index)}
                      className="group flex items-start gap-4 py-1"
                    >
                      <span data-menu-fade className="mt-[0.6em] w-6 label text-muted">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="mask-line">
                        <span data-menu-link className="block">
                          <span className="block display text-[clamp(3.5rem,14.5vw,9.5rem)] transition-[color,translate] duration-500 ease-out-expo group-hover:translate-x-3 group-hover:text-accent group-focus-visible:text-accent">
                            {item.label[locale]}
                          </span>
                        </span>
                      </span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            <div
              aria-hidden
              data-menu-fade
              className="relative hidden aspect-[4/5] w-[min(26vw,380px)] overflow-hidden rounded-2xl bg-ink-soft lg:block"
            >
              {nav.map((item, index) => (
                <Image
                  key={item.id}
                  src={item.image}
                  alt=""
                  fill
                  sizes="380px"
                  className={cn(
                    "object-cover transition-[clip-path,scale] duration-700 ease-out-expo",
                    index === active
                      ? "scale-100 [clip-path:inset(0_0_0_0)]"
                      : "scale-110 [clip-path:inset(100%_0_0_0)]",
                  )}
                />
              ))}
            </div>
          </div>

          <div
            data-menu-fade
            className="flex flex-col gap-6 border-t border-white/10 pt-6 sm:flex-row sm:items-end sm:justify-between"
          >
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {socials
                .filter((social) => social.id !== "email")
                .map((social) => (
                  <li key={social.id}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className="label text-bg transition-colors hover:text-accent"
                    >
                      {social.label}
                    </a>
                  </li>
                ))}
            </ul>
            <a
              href={`mailto:${site.email}`}
              className="text-lg break-all text-bg transition-colors hover:text-accent sm:text-xl"
            >
              {site.email}
            </a>
          </div>
        </div>
      )}
    </dialog>
  );
}
