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

| Token          | Hex       | Role                                                   |
| -------------- | --------- | ------------------------------------------------------ |
| `bg`           | `#F4F2EC` | Off-white base                                         |
| `ink`          | `#111112` | Primary text and dark sections                         |
| `ink-soft`     | `#2A2A2D` | Dark grey panels and cards on ink                      |
| `muted`        | `#8A8A8F` | Secondary text, on dark only                           |
| `muted-strong` | `#5F5F64` | Secondary text on off-white                            |
| `accent`       | `#F4B400` | **The one loud colour**: warm amber                    |
| `accent-deep`  | `#E08A00` | Depth, hover, gradient end (amber to deep amber, 135°) |

Rules:

1. **One accent.** Off-white and near-black do the work. Amber is for highlights, the mark,
   key words, buttons, blobs and the hero object. Deep amber is a supporting tone, not a second accent.
2. **Never put amber text (or thin amber lines) on off-white**: 1.65:1. On light surfaces amber is a
   **fill** with ink on top. Amber is text/line colour only on ink or ink-soft.
3. Approved pairs are in the contrast table in `tokens/colors.json`. Amber on ink and ink on
   amber are both 10.2:1. Do not separate two shapes using only amber and deep amber (1.46:1).
4. The site is light with full-bleed ink sections for rhythm. Livery equivalent: alternate
   off-white and ink areas, with amber cutting through.
5. Proportion guideline for liveries: roughly 70-80% off-white/ink, amber up to about 20%,
   deep amber a few percent at most. If amber is the base colour (concept C in `livery/README.md`),
   everything on top is ink or off-white.
6. No new hues. The only greys are `ink-soft`, `muted` and `muted-strong`.

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
- **Allowed colourways:** amber `#F4B400`, ink `#111112`, off-white `#F4F2EC`, on surfaces that pass the contrast
  rules, plus the two square tiles (amber on ink, ink on amber).
- Clear space: keep at least 25% of the mark's height free on every side (kit guideline).
- Do not: stretch, rotate, outline, add drop shadows or gradients to the flat mark, recolour outside
  the palette, or mix variants. The only 3D treatment is the website's hero object: extruded, glossy
  metallic amber (website material: metalness 0.75, roughness 0.22, clearcoat 1).

## 5. Signature

A handwritten monoline signature ("Caio Batista"), used sparingly: **at most once per design**, small,
as a personal touch (rear quarter, footer-like corner, helmet). Files in `signature/`: ink, off-white and amber
SVG/PNG (`signature-currentcolor.svg` follows the surrounding colour). Amber only on ink.

## 6. Graphic patterns to keep

These are what make a design "ours":

1. **The 12° forward slant.** Every decorative cut, stripe and panel edge leans forward at 12° like the
   mark. No vertical or random-angle decorative edges (text baselines excepted).
2. **Huge condensed uppercase type, split over two lines**, second line indented about 0.4-0.6em:
   `CAIO / BATISTA`, `ON / CODE`, `OFF / CODE`. Tight leading so the lines nearly touch.
3. **Two-surface rhythm:** off-white against ink in big, confident blocks. Amber is the interruption.
4. **One organic blob.** A soft, slightly irregular amber shape (gradient amber to deep amber), cropped by an edge
   or sitting behind type. One or two per design, never a pattern fill.
5. **Outlined numerals:** display numbers with no fill and a thin ink stroke (timeline years), solid on emphasis.
6. **Results-board numerals:** big amber numbers on ink-soft panels with a small mono caption beneath. A good
   model for car numbers, lap times and stats decals.
7. **Highlighter on key words:** bold words with a band of amber under them (fill, never amber text on light).
8. **Pills and dots:** small rounded chips with a single amber dot and mono caps ("NEXT RACE"), usable as small decals.
9. **Mono microtext:** `PORTO ALEGRE, BRAZIL`, `CAIOBATISTA.DEV`, `2026`, in Geist Mono caps with wide tracking.

For anything animated (previews, videos), keep the site's feel: a long ease-out
`cubic-bezier(0.16, 1, 0.3, 1)`, text sliding up out of a mask with a short stagger, nothing bouncy.

## 7. Voice and copy

First person, short, declarative. Engineering and racing/running double meanings (PR = pull request and
personal record; downtime; DNF). Bilingual: English is primary, Portuguese (pt-BR) is the second language.
Approved lines: "Zero downtime. Full throttle." / "Zero downtime. Pé no fundo."
Other candidates considered: "No downtime. No DNF.", "Built to last. Built to race.", "Ship it. Then go faster."

## 8. Livery rules

Full guidance and starting concepts: `livery/README.md`. Summary:

1. **Readability first.** The car number must read at distance on every side. Use only high-contrast pairs (ink on amber,
   amber on ink, off-white on ink); aim for 7:1 or better.
2. Apply the patterns above (12° cuts, huge condensed type, one accent) rather than copying website layouts literally.
3. **No third-party or employer marks** (SAP, Dell, sim/series sponsors, etc.) unless the user supplies the asset and confirms
   it is allowed. Personal brand only: CB mark, name, signature, website URL.
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
