/**
 * Defers non-critical work (below-the-fold animation setup) to idle time.
 * Jobs run one per task so they never pile up into a single long task.
 */
const queue: Array<() => void> = [];
let scheduled = false;

function schedule() {
  if (scheduled || queue.length === 0) return;
  scheduled = true;
  const run = () => {
    scheduled = false;
    queue.shift()?.();
    schedule();
  };
  if ("requestIdleCallback" in window) window.requestIdleCallback(run, { timeout: 1500 });
  else setTimeout(run, 50);
}

/**
 * Runs `callback` at idle time. `prepare` (e.g. a dynamic import) runs first,
 * so code only needed for the deferred work stays out of the startup bundle.
 */
export function afterIdle(callback: () => void, prepare?: () => Promise<unknown>): () => void {
  let cancelled = false;
  queue.push(() => {
    if (cancelled) return;
    if (!prepare) return callback();
    prepare().then(() => {
      if (!cancelled) callback();
    });
  });
  schedule();
  return () => {
    cancelled = true;
  };
}
