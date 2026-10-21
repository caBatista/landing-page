import { races } from "@/content/offcode";
import { ui } from "@/content/ui";
import { localeTags, type Locale } from "@/i18n/config";
import { cn } from "@/lib/cn";
import { formatDistance, formatPace, personalBests } from "@/lib/race";

function formatMonth(date: string, locale: Locale): string {
  return new Intl.DateTimeFormat(localeTags[locale], {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}-15T00:00:00Z`));
}

/** Personal bests up top, then every race like a timing board. */
export function ResultsBoard({ locale }: { locale: Locale }) {
  const copy = ui.offCode;
  const bests = personalBests(races);
  const isBest = (index: number) => bests.includes(races[index]);

  return (
    <div className="space-y-10">
      <ul className="grid gap-4 sm:grid-cols-2">
        {bests.map((best) => (
          <li key={best.distanceKm} className="rounded-2xl bg-ink-soft p-6">
            <p className="flex justify-between label text-muted">
              <span>{copy.personalBest[locale]}</span>
              <span className="text-accent">{formatDistance(best.distanceKm)}</span>
            </p>
            <p className="mt-6 display text-[clamp(4.5rem,9vw,7.5rem)] text-accent tabular-nums">
              {best.time}
            </p>
            <p className="mt-3 label text-muted">
              {formatPace(best)}
              {copy.perKm[locale]} · {best.race}
            </p>
          </li>
        ))}
      </ul>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left font-mono text-sm tabular-nums sm:min-w-[34rem]">
          <caption className="mb-4 text-left label text-muted">{copy.results[locale]}</caption>
          <thead>
            <tr className="label text-muted">
              <th scope="col" className="w-10 pb-3 font-normal max-sm:hidden">
                #
              </th>
              <th scope="col" className="pb-3 font-normal">
                {copy.columns.race[locale]}
              </th>
              <th scope="col" className="pb-3 font-normal">
                {copy.columns.distance[locale]}
              </th>
              <th scope="col" className="pb-3 font-normal">
                {copy.columns.time[locale]}
              </th>
              <th scope="col" className="pb-3 font-normal max-sm:hidden">
                {copy.columns.pace[locale]}
              </th>
              <th scope="col" className="pb-3 text-right font-normal">
                {copy.columns.date[locale]}
              </th>
            </tr>
          </thead>
          <tbody>
            {races.map((race, index) => (
              <tr
                key={`${race.race}-${race.date}`}
                className="border-t border-white/10 transition-colors hover:bg-white/[0.03]"
              >
                <td className="py-4 text-muted max-sm:hidden">
                  {String(index + 1).padStart(2, "0")}
                </td>
                <th scope="row" className="py-4 pr-4 font-sans text-sm font-medium sm:text-base">
                  {race.race}
                  {isBest(index) && (
                    <span className="ml-3 rounded-full bg-accent px-2 py-0.5 label text-ink">
                      PB
                    </span>
                  )}
                </th>
                <td className="py-4">{formatDistance(race.distanceKm)}</td>
                <td className={cn("py-4", isBest(index) && "text-accent")}>{race.time}</td>
                <td className="py-4 max-sm:hidden">
                  {formatPace(race)}
                  <span className="text-muted">{copy.perKm[locale]}</span>
                </td>
                <td className="py-4 text-right text-muted">
                  <time dateTime={race.date}>{formatMonth(race.date, locale)}</time>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
