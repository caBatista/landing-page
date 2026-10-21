# Private tools (`/me/*`)

This route group is reserved for personal tools that only Caio can use (for example a
personal finance organiser). Nothing ships here yet.

## How it is wired

- `app/(private)/me/layout.tsx` is its own **root layout**: it reuses the brand tokens
  (`app/globals.css`) and fonts (`lib/fonts.ts`) but none of the public site's chrome,
  smooth scrolling or i18n. Shared brand pieces live in `components/brand`.
- Every page under it inherits `robots: noindex, nofollow`, and `proxy.ts` adds an
  `X-Robots-Tag: noindex, nofollow` header to every `/me` response.
- `app/robots.ts` disallows `/me` and `app/sitemap.ts` only lists public pages.

## Adding a tool

1. **Add authentication first.** Pick a provider (Auth.js, Clerk or a passkey/magic-link
   setup) and put the session check in the `/me` branch of `proxy.ts`: redirect to a
   login page when there is no valid session, otherwise `NextResponse.next()`. Allow only
   your own account.
2. Create the tool at `app/(private)/me/<tool>/page.tsx`, e.g. `app/(private)/me/finance/page.tsx`
   → `https://caiobatista.dev/me/finance`.
3. Re-check the session in the tool's server code too (Server Components, Route Handlers
   and Server Actions). Proxy is the first gate, not the only one.
4. Keep private data out of client bundles and out of `/content`.
