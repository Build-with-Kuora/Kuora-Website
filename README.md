# Kura website

Marketing site for Kura, built with Next.js (App Router), React, TypeScript and Tailwind CSS v4.

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

- Palette tokens live in `src/app/globals.css` under `@theme` (`ink`, `plate`, `line`, `chalk`, `graphite`, `signal`).
- One typeface, Archivo, loaded with its width axis. Use `stretch-wide` for display type, `stretch-narrow` for annotations.
- Page transitions: `src/components/page-transition.tsx`. Use `TransitionLink` instead of `next/link` for internal links so the four-panel shutter runs. Reduced-motion users and browser back/forward get an instant swap.
