/**
 * The first-visit preloader is pure CSS so it starts at first paint, not at
 * hydration. The hero intro reads the preloader's exit animation to start in
 * sync with it.
 */

/**
 * Runs before first paint (inlined in <head>): repeat visits in the same
 * session get html[data-visited], which hides the preloader.
 */
export const visitedScript = `try{var d=document.documentElement;sessionStorage.getItem("cb-visited")?d.dataset.visited="":sessionStorage.setItem("cb-visited","1")}catch(e){}`;

/** How late hydration may land after the preloader left and still play the intro. */
const LATE_MS = 300;

/**
 * Milliseconds until the hero intro should start: 0 when there is no
 * preloader (repeat visit, reduced motion), or null when the preloader already
 * left a while ago and the visible hero must not be hidden and replayed.
 */
export function introDelay(): number | null {
  const exit = document
    .querySelector(".preloader")
    ?.getAnimations()
    .find((a) => a instanceof CSSAnimation && a.animationName === "preloader-exit");
  if (!exit) return 0;
  const remaining = Number(exit.effect?.getTiming().delay ?? 0) - Number(exit.currentTime ?? 0);
  return remaining < -LATE_MS ? null : Math.max(0, remaining);
}
