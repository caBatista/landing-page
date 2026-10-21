import Image from "next/image";
import { gallery } from "@/content/gallery";
import { ui } from "@/content/ui";
import type { Locale } from "@/i18n/config";
import { GalleryTrack } from "./GalleryTrack";

export function Gallery({ locale }: { locale: Locale }) {
  return (
    <section aria-labelledby="gallery-title" className="dark-surface bg-ink text-bg">
      <h2 id="gallery-title" className="sr-only">
        {ui.gallery.title[locale]}
      </h2>
      <GalleryTrack className="flex h-svh items-center overflow-x-auto overflow-y-hidden overscroll-x-contain motion-safe:overflow-x-visible motion-reduce:snap-x motion-reduce:snap-mandatory">
        <ul data-track className="flex w-max items-center gap-[max(1.5rem,5vw)] container-x">
          {gallery.map((item, index) =>
            item.type === "photo" ? (
              <li key={index} className="shrink-0 snap-center">
                <figure>
                  <div
                    className="relative overflow-hidden rounded-2xl bg-ink-soft"
                    style={{
                      aspectRatio: `${item.image.width} / ${item.image.height}`,
                      height: `min(62svh, ${((82 * item.image.height) / item.image.width).toFixed(1)}vw)`,
                    }}
                  >
                    <Image
                      data-drift
                      src={item.image.src}
                      alt={item.image.alt[locale]}
                      fill
                      sizes="(max-width: 768px) 82vw, 60vw"
                      className="scale-[1.18] object-cover"
                    />
                  </div>
                  <figcaption className="mt-4 flex justify-between gap-6 label text-muted">
                    <span>
                      {item.place}, {item.year}
                    </span>
                    <span aria-hidden>{String(index + 1).padStart(2, "0")}</span>
                  </figcaption>
                </figure>
              </li>
            ) : (
              <li key={index} className="w-[min(78vw,30rem)] shrink-0 snap-center">
                <blockquote className="display text-[clamp(2.75rem,6.5vw,6rem)] leading-[0.9] text-accent">
                  <p>“{item.text[locale]}”</p>
                </blockquote>
              </li>
            ),
          )}
        </ul>
      </GalleryTrack>
    </section>
  );
}
