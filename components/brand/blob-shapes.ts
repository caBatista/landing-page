/**
 * Organic blob outlines on a 200×200 box centred at 0,0. Deterministic, so the
 * server and client render the same first frame.
 */
function random(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function blobPath(seed: number, points = 7, variance = 0.2): string {
  const rand = random(seed);
  const pts = Array.from({ length: points }, (_, i) => {
    const angle = (i / points) * Math.PI * 2;
    const radius = 88 * (1 - variance + rand() * variance * 2) * 0.92;
    return [Math.cos(angle) * radius, Math.sin(angle) * radius] as const;
  });
  // Closed Catmull-Rom spline converted to cubic Béziers.
  const at = (i: number) => pts[(i + points) % points];
  let d = `M${at(0)[0].toFixed(1)} ${at(0)[1].toFixed(1)}`;
  for (let i = 0; i < points; i++) {
    const [p0, p1, p2, p3] = [at(i - 1), at(i), at(i + 1), at(i + 2)];
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += `C${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
  }
  return `${d}Z`;
}

/** Each blob morphs through its own set of shapes. */
export const blobShapes = (seed: number) => [1, 2, 3, 4].map((n) => blobPath(seed * 97 + n * 13));
