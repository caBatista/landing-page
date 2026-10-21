/**
 * IntersectionObserver helpers for one-shot entrances and pausing loops.
 * Unlike ScrollTrigger, observing never forces a layout.
 */

/** Calls back once when `el` crosses `bottomOffset` (fraction of the viewport from the bottom). */
export function onceInView(el: Element, callback: () => void, bottomOffset = 0.15): () => void {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      callback();
    },
    { rootMargin: `0px 0px -${Math.round(bottomOffset * 100)}% 0px` },
  );
  observer.observe(el);
  return () => observer.disconnect();
}

/** Reports visibility changes of `el` (e.g. to pause off-screen loops). */
export function whileInView(el: Element, onChange: (visible: boolean) => void): () => void {
  const observer = new IntersectionObserver(([entry]) => onChange(entry.isIntersecting));
  observer.observe(el);
  return () => observer.disconnect();
}
