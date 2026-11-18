# AGENTS.md: Caio Batista design kit (iRacing liveries)

This folder holds the visual identity built for **caiobatista.dev** so it can be reused for
other work, starting with custom **iRacing liveries**. Read this file first. Everything here
was derived from the website, so a livery should feel like it came from the same person.

**Precedence:** this file and the assets in this folder win. Do not invent new colours,
fonts or logo variants. If something is missing or ambiguous, ask the user.

## 1. Brand essence

- **Who:** Caio Batista, backend/platform software engineer in Porto Alegre, Brazil, who
  also runs, races sims and plays volleyball. Personal brand, not a company.
- **Idea:** _engineering precision meets racing/running energy._ "Backend systems that don't
  fail when it matters" on one side, "chasing personal records" on the other.
- **Closing line (chosen):** "Zero downtime. Full throttle." (PT-BR: "Zero downtime. Pé no fundo.")
- **Personality:** precise, fast, confident, a little dry and playful. Minimal, with one loud accent.
- **Never:** corporate, neon/cyberpunk, chrome-and-flames, busy gradients, clip-art racing clichés.

## 2. Colour

Tokens live in `tokens/colors.json` (with contrast ratios) and `tokens/colors.css`.

| Token          | Hex       | Role                                                             |
| -------------- | --------- | ---------------------------------------------------------------- |
| `bg`           | `#F4F3F1` | Off-white base (faint cool tint)                                 |
| `ink`          | `#12151A` | Primary text and dark sections (blue-black)                      |
| `ink-soft`     | `#1E232C` | Dark panels and cards on ink                                     |
| `muted`        | `#8D9AAF` | Secondary text, on dark only                                     |
| `muted-strong` | `#566175` | Secondary text on off-white                                      |
| `accent`       | `#FF3D55` | **The one loud colour**: Rosso Corsa signal red                  |
| `accent-deep`  | `#E0112E` | Depth, hover, gradient end (red to deep red, 135°)               |
| `steel`        | `#5A6B81` | Cool **support** colour on light: tags, thin lines, dots, panels |
| `steel-light`  | `#7D8FA6` | The same support colour on dark surfaces                         |
| `mist`         | `#E9ECEF` | Cool tint for cards and panels on light                          |

The palette was chosen from 15 candidates (palette v2, "Rosso Corsa"). The earlier amber palette is archived in
`tokens/archive/` and is **retired**: do not mix it in.

Rules:

1. **One accent.** Off-white and near-black do the work. Red is for highlights, the mark, key words, buttons,
   blobs and the hero object. Deep red is a supporting tone, not a second accent.
2. **Red is text or line colour only on ink or ink-soft** (5.3:1 and 4.5:1). On light surfaces red is a **fill**
   with ink on top (5.3:1). Red on off-white is only 3.1:1: never use it for small text or thin lines there.
3. **Steel supports, it never competes.** Use it for structure and data: tags, thin rules, timeline dots, secondary panels
   and microtext. Use `steel` on light surfaces and `steel-light` on dark ones; a steel fill takes off-white text.
4. Approved pairs are in the contrast table in `tokens/colors.json`. Do not separate two shapes using only red and
   deep red (1.4:1).
5. The site is light with full-bleed ink sections for rhythm. Livery equivalent: alternate off-white (or mist) and
   ink areas, with red cutting through.
6. Proportion guideline for liveries: roughly 70-80% off-white/ink/steel, red up to about 20%, deep red a few percent at
   most. If red is the base colour (concept C in `livery/README.md`), everything on top is ink or off-white.
7. Neutrals are tinted toward the brand's cool hue, never pure grey. No new hues beyond the tokens above.

## 3. Typography

Details in `tokens/typography.json`; font files and licences in `fonts/`.

- **Display: Big Shoulders Display Black (900)**, UPPERCASE, line-height 0.82, letter-spacing
  -0.015em. Condensed and sporty. Use it for names, numbers and headlines, and make it **huge**.
- **Body: Geist.** **Labels: Geist Mono**, UPPERCASE, small, tracking 0.06em, for metadata
  (places, years, URLs, captions).
- Never substitute a different "racing font". Never use a wide or italic display face; the slant
  comes from the geometry (see motifs), not from italic type.

## 4. The CB mark

- **Chosen variant: "Sprint".** A bold, geometric, rounded C and B that share one baseline, slanted
  forward **12°**. Readable down to about 24px.
- Files: `logo/svg/` (SVG), `logo/png/` (transparent, 2048px; tiles 1024px), `logo/cb-geometry.json`
  (raw path, viewBox and transform to rebuild at any size or colour). `logo/alternates/` holds the
  two unchosen directions (angular, plate): **do not use them** unless the user asks.
- **Allowed colourways:** red `#FF3D55`, ink `#12151A`, off-white `#F4F3F1`, on surfaces that pass the contrast
  rules, plus the two square tiles (red on ink, ink on red).
- Clear space: keep at least 25% of the mark's height free on every side (kit guideline).
- Do not: stretch, rotate, outline, add drop shadows or gradients to the flat mark, recolour outside
  the palette, or mix variants. The only 3D treatment is the website's hero object: extruded, glossy
  car-paint red (website material: metalness 0.35, roughness 0.3, clearcoat 1).

## 5. Signature

A handwritten monoline signature ("Caio Batista"), used sparingly: **at most once per design**, small,
as a personal touch (rear quarter, footer-like corner, helmet). Files in `signature/`: ink, off-white and red
SVG/PNG (`signature-currentcolor.svg` follows the surrounding colour). Red only on ink.

## 6. Graphic patterns to keep

These are what make a design "ours":

1. **The 12° forward slant.** Every decorative cut, stripe and panel edge leans forward at 12° like the
   mark. No vertical or random-angle decorative edges (text baselines excepted).
2. **Huge condensed uppercase type, split over two lines**, second line indented about 0.4-0.6em:
   `CAIO / BATISTA`, `ON / CODE`, `OFF / CODE`. Tight leading so the lines nearly touch.
3. **Two-surface rhythm:** off-white against ink in big, confident blocks. Red is the interruption.
4. **One organic blob.** A soft, slightly irregular red shape (gradient red to deep red), cropped by an edge
   or sitting behind type. One or two per design, never a pattern fill.
5. **Outlined numerals:** display numbers with no fill and a thin ink stroke (timeline years), solid on emphasis.
6. **Results-board numerals:** big red numbers on ink-soft panels with a small mono caption beneath. A good
   model for car numbers, lap times and stats decals.
7. **Highlighter on key words:** bold words with a band of red under them (fill, never red text on light).
8. **Pills and dots:** small rounded chips with a single red dot and mono caps ("NEXT RACE"), usable as small decals.
9. **Mono microtext:** `PORTO ALEGRE, BRAZIL`, `CAIOBATISTA.DEV`, `2026`, in Geist Mono caps with wide tracking.

10. **Cool steel details:** thin rules, timeline dots, tags and small secondary panels in `steel` give structure and a
    technical, carbon/aluminium feel without adding a second loud colour.

For anything animated (previews, videos), keep the site's feel: a long ease-out
`cubic-bezier(0.16, 1, 0.3, 1)`, text sliding up out of a mask with a short stagger, nothing bouncy.

## 7. Voice and copy

First person, short, declarative. Engineering and racing/running double meanings (PR = pull request and
personal record; downtime; DNF). Bilingual: English is primary, Portuguese (pt-BR) is the second language.
Approved lines: "Zero downtime. Full throttle." / "Zero downtime. Pé no fundo."
Other candidates considered: "No downtime. No DNF.", "Built to last. Built to race.", "Ship it. Then go faster."

## 8. Livery rules

Full guidance and starting concepts: `livery/README.md`. Summary:

1. **Readability first.** The car number must read at distance on every side. Use only high-contrast pairs (ink on red,
   red on ink, off-white on ink); aim for 7:1 or better.
2. Apply the patterns above (12° cuts, huge condensed type, one accent) rather than copying website layouts literally.
3. **No third-party or employer marks** (SAP, Dell, Ferrari or Scuderia marks, sim/series sponsors, etc.). "Rosso Corsa" is
   just the name of a red; it does not permit using anyone's logo or livery. Never use such marks unless the user
   supplies the asset and confirms it is allowed. Personal brand only: CB mark, name, signature, website URL.
4. **iRacing's technical details differ per car.** Always work from the official template for that car (see
   `livery/README.md`) and treat anything technical in this kit as general guidance to verify, not fact.
5. Keep decorative detail large and simple. Fine detail is lost at racing distance.

## 9. How to work in this folder

1. Read this file and look at `reference/brand-board.png` and the `reference/site-*.jpg` screenshots to see the look.
2. Ask the user for what is missing, see `livery/driver.json` (`todo-ask-the-user`): car number, iRacing customer ID,
   cars/series, helmet/suit, concept choice, and the official paint templates (not included here).
3. Put work in `livery/<car-name>/`: keep editable sources (SVG, PSD or layered files), the exported textures and a short
   `NOTES.md` with decisions side by side. **Never edit files under `logo/`, `signature/`, `fonts/` or `tokens/`
   in place**; copy what you need.
4. Check every design against the contrast table before showing it, and render a preview.
5. If a rule here blocks something the user explicitly wants, do what they ask and say which rule you bent.

## 10. Source of truth and refreshing the kit

The kit is a snapshot of the website repo (`caBatista/landing-page`). If the site's design changes, refresh from there:

- Colours: `app/globals.css` (`:root` tokens). Fonts: `lib/fonts.ts`. Mark geometry: `components/brand/monogram.ts`.
- Signature: `public/brand/signature.svg`. Screenshots: take them from the deployed site.
- Logo files are generated from `monogramSvg()` in `components/brand/monogram.ts`; `logo/cb-geometry.json` holds the same data.
