export type RichSegment = { text: string; bold: boolean };

/** Splits "plain **bold** plain" into segments. Only `**` is supported. */
export function parseBold(source: string): RichSegment[] {
  return source
    .split("**")
    .map((text, index) => ({ text, bold: index % 2 === 1 }))
    .filter((segment) => segment.text.length > 0);
}

/** Splits a phrase into two lines of roughly equal length, at a word boundary. */
export function splitBalanced(phrase: string): [string, string] {
  const words = phrase.split(" ");
  let best: [string, string] = [phrase, ""];
  let bestDiff = Infinity;
  for (let i = 1; i < words.length; i++) {
    const top = words.slice(0, i).join(" ");
    const bottom = words.slice(i).join(" ");
    const diff = Math.abs(top.length - bottom.length);
    if (diff < bestDiff) [best, bestDiff] = [[top, bottom], diff];
  }
  return best;
}
