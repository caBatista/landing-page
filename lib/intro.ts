/**
 * The first-visit preloader and the hero entrance are pure CSS so they run from
 * first paint, not from hydration. This file only exposes the preloader's clock
 * to the few things that must wait for it (loading the 3D scene).
 */

/**
 * Runs before first paint (inlined in <head>): repeat visits in the same
 * session get html[data-visited], which hides the preloader.
 */
export const visitedScript = `try{var d=document.documentElement;sessionStorage.getItem("cb-visited")?d.dataset.visited="":sessionStorage.setItem("cb-visited","1")}catch(e){}`;

/** Milliseconds until the preloader has left: 0 when it's gone or never shown. */
export function introDelay(): number {
  const exit = document
    .querySelector(".preloader")
    ?.getAnimations()
    .find((a) => a instanceof CSSAnimation && a.animationName === "preloader-exit");
  if (!exit) return 0;
  const remaining = Number(exit.effect?.getTiming().delay ?? 0) - Number(exit.currentTime ?? 0);
  return Math.max(0, remaining);
}
