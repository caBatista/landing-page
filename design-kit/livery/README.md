# Livery guide

How to turn the brand in `../AGENTS.md` into iRacing liveries. Driver details and open questions are in
`driver.json`. Visual reference: `../reference/brand-board.png`.

## Starting concepts

These are directions to choose from, not final designs. Each follows the patterns in `AGENTS.md`
(12° cuts, huge condensed type, one amber accent).

### A. "Night Run": ink base

- Body in ink `#111112`. One wide amber band cutting across the car at 12°, with a thin off-white line next to it
  and, optionally, a very thin deep-amber line (a few percent of the area).
- Number: huge, Big Shoulders Black, off-white or amber on ink.
- CB mark in amber. A single soft amber blob cropped by an edge as depth. Best contrast, reads well on every track.

### B. "Day Run": off-white base

- Body in off-white `#F4F2EC` with big ink cuts at 12°. Amber is a **fill panel** behind the number and mark, with ink on top.
  No amber lines or text directly on the off-white.
- The cleanest, most "website-like" option. Off-white can glare in sim lighting, so keep large ink areas.

### C. "Sprint": amber base

- Body in amber `#F4B400` with ink graphics and off-white accents. Everything on top of the amber is ink or off-white.
- The loudest option. Keep the cuts large and few; use `#E08A00` only for a thin depth line.
- When rendering the sim spec map, aim for a glossy metallic look, like the website's hero object.

## Where things go (car-agnostic)

| Area                        | What                                                                                      |
| --------------------------- | ----------------------------------------------------------------------------------------- |
| Hood                        | Huge CB mark or the car number, large and simple                                          |
| Roof                        | Number plus small CB (seen from above and by replay cameras)                              |
| Doors / sides               | Name split over two lines, `CAIO / BATISTA`, second line indented; slanted stripes at 12° |
| Number panels               | Highest-contrast pair on the whole car: ink on amber, amber on ink, or off-white on ink   |
| Rear quarter                | Signature (once, small) and mono microtext                                                |
| Rear / bumper               | `CAIOBATISTA.DEV` in Geist Mono caps                                                      |
| Helmet and suit (if wanted) | CB on the visor strip, stripes at 12°, same palette                                       |

Mono microtext ideas: `PORTO ALEGRE`, `CAIOBATISTA.DEV`, `ZERO DOWNTIME`, `FULL THROTTLE`, `PR`, `CB`.

## iRacing technical notes (verify before relying on them)

These come from general knowledge, **not from anything in this repository**. The official template and iRacing's
current documentation always win over this section.

- Paints are raster textures painted on a per-car **official template** (it provides the UV layout and the areas that
  matter). Get the template for each car from iRacing, or from Trading Paints, which mirrors them. Confirm where
  the current ones are published.
- Paint files are normally named after the driver's iRacing **customer ID** and stored in the iRacing documents folder under
  `iRacing/paint/<car folder>`. Typical files: `car_<id>.tga`, `car_spec_<id>.mip` (spec map), `helmet_<id>.tga`,
  `suit_<id>.tga`, and for some cars separate number/decal textures. Verify the exact names per car.
- A separate **spec map** controls metalness and gloss. Its channel layout is in the template notes. Do not guess it.
- Texture size and format vary by car (commonly 2048×2048, 32-bit TGA, but check the template).
- **Trading Paints** is the usual way to make a custom paint visible to other drivers.

## Workflow for each car

1. Ask the user which car and which concept. Get the car's official template and put it in `livery/<car>/template/`
   (it can be large; ask the user whether to keep it out of git).
2. Build the design from the kit assets: SVGs for marks and signature, `fonts/` for type, tokens for colour.
   Keep editable sources (SVG or layered files) in `livery/<car>/source/`.
3. Check contrast of every text/number pair against `tokens/colors.json`. Make the number legible at distance first.
4. Export the textures in the template's required format into `livery/<car>/export/`, with the names the template asks for.
5. Build the spec map for the glossy/metallic look.
6. Test in the sim (offline test drive or replay), look at the car from the chase camera and from other cars' point of view,
   then adjust.
7. Write `livery/<car>/NOTES.md`: concept, decisions, what is left, and any rule from `AGENTS.md` that was bent and why.

Tooling that works well for this: any editor that handles layers and TGA (Photoshop, Photopea, Affinity, GIMP), or scripts
(SVG to PNG with `sharp` or ImageMagick, TGA export with Python's Pillow) if the design is generated.
