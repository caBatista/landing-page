"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { Magnetic } from "@/components/motion/Magnetic";

type CopyEmailProps = {
  email: string;
  label: string;
  copied: string;
  failed: string;
};

/** "Let's talk" button: copies the email and confirms with a toast; falls back to mailto. */
const subscribe = () => () => {};

export function CopyEmail({ email, label, copied, failed }: CopyEmailProps) {
  const [message, setMessage] = useState("");
  const timer = useRef(0);
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = async () => {
    let text = copied;
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      text = failed;
      window.location.href = `mailto:${email}`;
    }
    setMessage(text);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setMessage(""), 2600);
  };

  return (
    <>
      <Magnetic strength={0.2}>
        <button
          type="button"
          onClick={copy}
          className="group flex flex-col items-start gap-6 rounded-[2rem] bg-ink p-8 text-left text-bg transition-colors duration-500 hover:bg-accent hover:text-ink sm:p-10"
        >
          <span className="flex items-center gap-3 label">
            <span
              aria-hidden
              className="size-2 rounded-full bg-accent transition-colors group-hover:bg-ink"
            />
            {label}
          </span>
          <span className="text-[clamp(1.1rem,2.2vw,1.9rem)] leading-tight font-medium [overflow-wrap:anywhere]">
            {email}
          </span>
        </button>
      </Magnetic>
      {/* Portalled: a transformed ancestor would otherwise trap position: fixed. */}
      {mounted &&
        createPortal(
          <div
            role="status"
            aria-live="polite"
            className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center px-4"
          >
            {message && (
              <p className="toast flex items-center gap-3 rounded-full bg-ink px-5 py-3.5 label text-bg shadow-xl ring-1 ring-white/10">
                <span aria-hidden className="text-accent">
                  ✓
                </span>
                {message}
              </p>
            )}
          </div>,
          document.body,
        )}
    </>
  );
}
