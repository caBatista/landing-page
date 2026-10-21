"use client";

import { useSyncExternalStore } from "react";
import { localeTags, type Locale } from "@/i18n/config";

const TIME_ZONE = "America/Sao_Paulo";
const subscribe = () => () => {};

type NextRaceProps = { label: string; name: string; date: string; locale: Locale };

/** "Next race" status pill. Renders on the client only, and only until race day ends. */
export function NextRace({ label, name, date, locale }: NextRaceProps) {
  const upcoming = useSyncExternalStore(
    subscribe,
    () => Date.now() <= new Date(`${date}T23:59:59-03:00`).getTime(),
    () => false,
  );
  if (!upcoming) return null;

  const formatted = new Intl.DateTimeFormat(localeTags[locale], {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: TIME_ZONE,
  }).format(new Date(`${date}T12:00:00-03:00`));

  return (
    <p className="flex items-center gap-x-3 rounded-full bg-ink py-2.5 pr-4 pl-3 text-bg">
      <span aria-hidden className="relative flex size-2">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-75" />
        <span className="relative inline-flex size-2 rounded-full bg-accent" />
      </span>
      <span className="shrink-0 label text-accent max-sm:hidden">{label}</span>
      <span className="text-xs sm:text-sm">
        <span className="label text-accent sm:hidden">{label} · </span>
        {name} · <time dateTime={date}>{formatted}</time>
      </span>
    </p>
  );
}
