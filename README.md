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

The visual language is a set of engineering drawings: every page is a numbered sheet (K-00 to K-03), sections open with a heavy cut line, and the Kura frame (a braced 2 × 2 square) appears throughout.

- Theme tokens live in `src/app/globals.css`: `canvas`, `surface`, `line`, `fg` and `muted` switch between the light (concrete) and dark themes; `panel` tokens stay dark in both. `neon-green` is the action and load colour, `neon-blue` marks structure.
- The theme defaults to light. `ThemeToggle` switches it and saves the choice to `localStorage`; an inline script in `layout.tsx` applies it before first paint.
- Type: Archivo (variable width) for text and headlines, set wide and heavy with the `display` utility; Martian Mono, condensed, for sheet references and labels (`label-mono`).
- Shared utilities: `btn-primary`, `btn-secondary`, `link-line`, `grid-hairline`.
- Signature components: `BracedFrame`, `LatencyBudget`, `DrawingRegister`, `PillarFrame`, `ProcessBeam`, `RegistrationMarks`.
- Page transitions: `src/components/page-transition.tsx`. Use `TransitionLink` instead of `next/link` for internal links so the four-panel transition runs. Reduced-motion users and browser back/forward get an instant swap.
