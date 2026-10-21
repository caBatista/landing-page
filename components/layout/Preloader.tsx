import { Logo } from "@/components/brand/Logo";

/**
 * First-visit branded preloader (1.2s), animated entirely in CSS (see
 * globals.css) so it runs from first paint. Hidden before paint on repeat
 * visits and for reduced motion.
 */
export function Preloader({ label }: { label: string }) {
  return (
    <div
      aria-hidden
      className="preloader dark-surface fixed inset-0 z-[60] flex flex-col bg-ink text-bg"
    >
      <div className="grid flex-1 place-items-center">
        <span className="preloader-logo block w-24 text-accent sm:w-32">
          <Logo className="w-full" />
        </span>
      </div>
      <div className="flex items-end justify-between container-x pb-6">
        <p className="preloader-label label text-muted">{label}</p>
        <p className="preloader-count display text-[clamp(4rem,14vw,10rem)] text-bg tabular-nums" />
      </div>
    </div>
  );
}
