# design-kit

Design assets and rules from the **caiobatista.dev** website, packaged so other Claude Code sessions (and tools)
can create matching work, starting with iRacing liveries.

**Start with [`AGENTS.md`](AGENTS.md).** (`CLAUDE.md` just imports it, so Claude Code picks it up automatically.)

```
design-kit/
├── AGENTS.md            design principles, colour/type/logo rules, patterns to keep, workflow
├── CLAUDE.md            imports AGENTS.md for Claude Code
├── tokens/              colors.json (with contrast ratios), colors.css, typography.json, archive/ (retired amber palette)
├── logo/
│   ├── svg/             CB "Sprint" (chosen): red, ink, off-white, and two square tiles (red-on-ink, ink-on-red)
│   ├── png/             transparent 2048px renders; tiles 1024px
│   ├── alternates/      angular and plate variants (not chosen)
│   └── cb-geometry.json raw path, viewBox and transform for all three variants
├── signature/           handwritten signature: ink, off-white, red, currentColor (SVG + 2048px PNG)
├── fonts/               Big Shoulders Black, Geist Medium, Geist Mono Medium + OFL licences
├── reference/           brand-board.png, site-*.jpg and mobile-*.jpg screenshots of the live design
└── livery/              README.md (concepts, placement, iRacing notes, workflow) and driver.json
```

## Palette

**Rosso Corsa** (v2): off-white and blue-black, one signal red, and a cool steel for structure. It replaced the first
amber palette, which is kept in `tokens/archive/` for reference only. Chosen from 15 candidates after testing each on the live site.

## Use it in a new session

Copy this folder anywhere on your computer, open a terminal in it and start Claude Code there
(`cd design-kit && claude`). Or keep it inside a new project, for example `iracing-liveries/design-kit/`.
Put the work for each car under `livery/<car>/`.

## Not included

- iRacing's official paint templates (get them per car from iRacing or Trading Paints).
- Your photos. The screenshots in `reference/` deliberately avoid them.
- Anything from SAP, Dell or any sponsor.
