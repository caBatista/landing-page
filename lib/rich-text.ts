export type RichSegment = { text: string; bold: boolean };

/** Splits "plain **bold** plain" into segments. Only `**` is supported. */
export function parseBold(source: string): RichSegment[] {
  return source
    .split("**")
    .map((text, index) => ({ text, bold: index % 2 === 1 }))
    .filter((segment) => segment.text.length > 0);
}
