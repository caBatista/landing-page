import type { RaceResult } from "@/content/offcode";

/** "54:00" or "1:02:30" → seconds. */
export function toSeconds(time: string): number {
  return time.split(":").reduce((total, part) => total * 60 + Number(part), 0);
}

/** Seconds per km → "5:24". */
export function formatPace(result: RaceResult): string {
  const perKm = Math.round(toSeconds(result.time) / result.distanceKm);
  return `${Math.floor(perKm / 60)}:${String(perKm % 60).padStart(2, "0")}`;
}

export function formatDistance(km: number): string {
  return Number.isInteger(km) ? `${km}K` : `${km} km`;
}

/** Fastest result per distance, shortest distance first. */
export function personalBests(results: RaceResult[]): RaceResult[] {
  const best = new Map<number, RaceResult>();
  for (const result of results) {
    const current = best.get(result.distanceKm);
    if (!current || toSeconds(result.time) < toSeconds(current.time)) {
      best.set(result.distanceKm, result);
    }
  }
  return [...best.values()].sort((a, b) => a.distanceKm - b.distanceKm);
}
