/**
 * Coordinates the first-visit preloader with the hero intro. The preloader
 * shows once per browser session; repeat visits skip straight to the intro.
 */
const VISITED_KEY = "cb-visited";
const INTRO_EVENT = "cb:intro";

/** Runs before first paint (inlined in <head>) so repeat visits never flash the preloader. */
export const visitedScript = `try{if(sessionStorage.getItem("${VISITED_KEY}"))document.documentElement.dataset.visited=""}catch(e){}`;

export function isRepeatVisit(): boolean {
  return "visited" in document.documentElement.dataset;
}

export function finishIntro(): void {
  try {
    sessionStorage.setItem(VISITED_KEY, "1");
  } catch {
    // Storage can be unavailable (private mode); the preloader just shows again.
  }
  document.documentElement.dataset.intro = "done";
  window.dispatchEvent(new Event(INTRO_EVENT));
}

/** Calls back once the preloader has finished (immediately on repeat visits). */
export function onIntro(callback: () => void): () => void {
  if (isRepeatVisit() || document.documentElement.dataset.intro === "done") {
    callback();
    return () => {};
  }
  window.addEventListener(INTRO_EVENT, callback, { once: true });
  return () => window.removeEventListener(INTRO_EVENT, callback);
}
