# caiobatista.dev

Personal site of Caio Batista: who I am, what I've built, what I do off the keyboard.
English at `/`, Portuguese at `/pt`.

**Stack:** Next.js 16 (App Router, Cache Components) · TypeScript (strict) · Tailwind CSS v4 ·
GSAP (ScrollTrigger, SplitText, MorphSVG, DrawSVG) · Lenis · React Three Fiber + drei ·
deployed on Vercel.

## Run locally

Requires Node.js 20.9+ (22 recommended).

```bash
npm install
npm run dev        # http://localhost:3000 and http://localhost:3000/pt
```

Other scripts:

| Command             | What it does                                |
| ------------------- | ------------------------------------------- |
| `npm run build`     | Production build (also type-checks)         |
| `npm start`         | Serve the production build                  |
| `npm run lint`      | ESLint                                      |
| `npm run typecheck` | Generate route types and run `tsc --noEmit` |
| `npm run format`    | Prettier (with Tailwind class sorting)      |

## Editing content

Everything you'd want to change lives in typed files under [`content/`](content). Every
string has an `en` and a `pt` value, and TypeScript fails the build if one is missing. You
never need to touch JSX.

| File                  | What's in it                                                         |
| --------------------- | -------------------------------------------------------------------- |
| `content/site.ts`     | Name, role, SEO copy, chosen logo, next race, manifesto, footer line |
| `content/projects.ts` | Project cards, details dialogs, screenshots                          |
| `content/timeline.ts` | Journey milestones (the last one is highlighted as "now")            |
| `content/offcode.ts`  | Race results (personal bests are computed), sim racing, volleyball   |
| `content/gallery.ts`  | Horizontal gallery photos (with "Place, Year") and quotes            |
| `content/socials.ts`  | LinkedIn, GitHub, Instagram, email                                   |
| `content/ui.ts`       | Menu items and interface copy                                        |

- **Bold in the manifesto:** wrap words in `**double asterisks**`.
- **Next race widget:** set `site.nextRace` (`date` is `YYYY-MM-DD`). It hides itself after
  race day; set it to `null` to hide it.
- **Images:** drop files in `public/images/...` and update `src`, `width` and `height`
  (the file's real pixel size) plus the `alt` text in both languages. `next/image` serves
  AVIF/WebP automatically. The gallery works with any number of photos.
- **Logo:** open [`/brand`](http://localhost:3000/brand) to compare the three monograms, then set
  `site.logo` to `"sprint"`, `"angular"` or `"plate"`. Header, favicon, Apple touch icon,
  Open Graph image and the 3D hero all follow.
- **Signature:** replace `public/brand/signature.svg` and keep `currentColor` for colour.
  Stroked (monoline) artwork draws itself stroke by stroke; filled artwork (for example a
  traced photo) wipes in left to right.

## Project structure

```
app/
  (site)/[locale]/     public site: root layout, home, /brand, not-found
  (private)/me/        reserved for private tools (see app/(private)/README.md)
  icon.tsx, apple-icon.tsx, opengraph-image.tsx, sitemap.ts, robots.ts, manifest.ts
  globals.css          brand tokens, utilities, preloader
components/
  brand/               Logo + monogram geometry, Signature, Blob
  layout/              Header, MenuOverlay, Footer, Preloader, LocaleToggle
  sections/            one folder per home page section
  motion/              SmoothScroll (Lenis + ScrollTrigger), Reveal, Magnetic, ParallaxImage
  three/               3D monogram (lazy-loaded)
  ui/                  small shared pieces
content/               all editable content (EN + PT)
i18n/                  locales and the server-side locale getter
lib/                   GSAP setup, fonts, intro timing, idle scheduling, helpers
proxy.ts               locale routing (/ → en, /pt → pt) and the /me gate
```

Brand tokens (`--bg`, `--ink`, `--ink-soft`, `--muted`, `--accent`, `--accent-deep`) live in
`app/globals.css` and are exposed as Tailwind colours (`bg-ink`, `text-accent`, …).
`--muted-strong` (#5F5F64) was added because `--muted` only reaches 3:1 on the off-white
background. Use it for small grey text on light surfaces.

## Touch screens

Phones and tablets (`pointer: coarse`) get their own, lighter behaviour on the same code:

- Native scrolling only: no Lenis, no scroll-scrubbed parallax. The gallery is a native swipe
  row with snapping instead of a pinned, scroll-hijacked section.
- Project cards have no hover, so their screenshots crossfade to the alternate view by themselves.
- A lighter 3D scene (lower resolution, simpler bevel, no clearcoat) and tap targets of 36px or more.
- The pinned gallery and parallax are gated by the `pin` Tailwind variant and `MOTION.desktop`
  (mouse or trackpad, motion allowed), so desktop is unchanged.

## Motion and accessibility notes

- With `prefers-reduced-motion`: no smooth scrolling, preloader, pinning, 3D or morphing.
  Entrances become simple fades and the gallery becomes a native swipeable row.
- The menu and project details are native modal `<dialog>`s: Esc closes them, Tab stays
  inside, and focus returns to the trigger.
- The 3D monogram loads on the first interaction, and only on hardware-accelerated WebGL.
  Until then (and as the fallback) the flat SVG logo is shown.

## Deploying to Vercel with caiobatista.dev

1. Push this repository to GitHub.
2. In Vercel: **Add New → Project**, import the repository, and keep the detected
   **Next.js** preset (build command `next build`; no environment variables needed).
3. Open the project's **Settings → Domains** and add `caiobatista.dev`, plus
   `www.caiobatista.dev` set to redirect to the apex.
4. At your domain registrar, either point the nameservers to Vercel or add the DNS records
   Vercel shows: an `A` record for `@` (`76.76.21.21`) and a `CNAME` for `www`
   (`cname.vercel-dns.com`). `.dev` is HSTS-preloaded, and Vercel issues the HTTPS
   certificate automatically.
5. Every push to the main branch deploys to production; other branches get preview URLs.

The canonical site URL used in metadata, the sitemap and JSON-LD is `site.url` in
`content/site.ts`.

## Private tools

`/me/*` is reserved for personal tools behind authentication. See
[`app/(private)/README.md`](<app/(private)/README.md>) for how to add one.
