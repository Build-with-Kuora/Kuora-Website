# Koura website

Marketing site for Koura, built with Next.js (App Router), React, TypeScript and Tailwind CSS v4.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static production build
```

## Pages

| Route          | File                               |
| -------------- | ---------------------------------- |
| `/`            | `src/app/page.tsx`                 |
| `/philosophy`  | `src/app/philosophy/page.tsx`      |
| `/systems`     | `src/app/systems/page.tsx`         |
| `/work`        | `src/app/work/page.tsx`            |
| `/work/[slug]` | `src/app/work/[slug]/page.tsx`     |

## Content

- `src/lib/site.ts`: contact email and navigation. The email is a placeholder.
- `src/lib/pillars.ts`: the four pillars, shared by the home page and Philosophy.
- `src/lib/projects.ts`: case studies. Every project, client and figure in this file is placeholder content. Replace it with approved client work before launch. Each project's `diagram` draws its card cover and case-study figure.

## Design system

Every colour comes from the Koura logo: a navy tile, a white stem and a chevron that runs from mint into sky blue.

- Theme tokens live in `src/app/globals.css`: `canvas`, `surface`, `line`, `fg`, `muted` and `accent` switch between the dark (default) and light themes; `panel` tokens stay navy in both. `brand-sky` leads actions, links and focus; `brand-mint` marks status. The mint-to-sky gradient is kept for the logo, the hero chevron and the loading screen.
- `ThemeToggle` switches the theme and saves the choice to `localStorage`; an inline script in `layout.tsx` applies it before first paint.
- Type: Instrument Sans for text and headlines (headlines set tight with the `display` utility); JetBrains Mono only for code.
- Logo: `KouraMark` and `KouraChevron` in `src/components/koura-mark.tsx`; `src/app/icon.svg` is the favicon.
- Loading screen: `src/components/koura-splash.tsx` plays the Glyph Portal (`src/components/ui/glyph-portal.tsx`) on every full page load.
- Shared utilities: `btn-primary`, `btn-secondary`, `link-line`, `grid-hairline`.
