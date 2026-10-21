"use client";

import { useRef } from "react";
import { useSmoothScroll } from "@/components/motion/SmoothScroll";

type ProjectDetailsProps = {
  triggerLabel: string;
  closeLabel: string;
  title: string;
  children: React.ReactNode;
};

/** "Details" button and the modal <dialog> with a project's full write-up. */
export function ProjectDetails({ triggerLabel, closeLabel, title, children }: ProjectDetailsProps) {
  const dialog = useRef<HTMLDialogElement>(null);
  const { setLocked } = useSmoothScroll();

  const open = () => {
    dialog.current?.showModal();
    setLocked(true);
  };

  return (
    <>
      <button
        type="button"
        onClick={open}
        aria-haspopup="dialog"
        className="inline-flex h-10 items-center gap-2 rounded-full bg-ink px-4 label text-bg transition-colors hover:bg-accent hover:text-ink"
      >
        {triggerLabel} <span aria-hidden>+</span>
      </button>
      <dialog
        ref={dialog}
        aria-label={title}
        onClose={() => setLocked(false)}
        onClick={(event) => {
          // Clicks on the backdrop land on the dialog element itself.
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
        className="project-dialog m-auto max-h-[90dvh] w-[min(100%-2rem,52rem)] max-w-none overflow-hidden rounded-3xl bg-bg p-0 text-ink backdrop:bg-ink/70 backdrop:backdrop-blur-sm"
      >
        <div data-lenis-prevent className="max-h-[90dvh] overflow-y-auto p-6 sm:p-10">
          <button
            type="button"
            autoFocus
            onClick={() => dialog.current?.close()}
            className="float-right ml-4 inline-flex h-10 items-center rounded-full border border-ink/20 px-4 label transition-colors hover:bg-ink hover:text-bg"
          >
            {closeLabel}{" "}
            <span aria-hidden className="ml-2">
              ×
            </span>
          </button>
          {children}
        </div>
      </dialog>
    </>
  );
}
