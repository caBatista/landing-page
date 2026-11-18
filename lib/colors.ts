/**
 * Brand colours for code that can't use CSS variables (image generation, the
 * manifest, the 3D scene, scripted text colour). Keep in sync with the tokens
 * in app/globals.css.
 */
export const colors = {
  bg: "#F4F3F1",
  ink: "#12151A",
  inkSoft: "#1E232C",
  muted: "#8D9AAF",
  mutedStrong: "#566175",
  /** Soft grey for not-yet-read manifesto words: 3.2:1 on bg, AA for large text. */
  dim: "#7C899C",
  /** Rosso Corsa: the one loud colour. */
  accent: "#FF3D55",
  accentDeep: "#E0112E",
  /** Cool support colour: structure and data. `steelLight` is its version for dark surfaces. */
  steel: "#5A6B81",
  steelLight: "#7D8FA6",
  /** Cool tint for surfaces on light. */
  mist: "#E9ECEF",
} as const;
