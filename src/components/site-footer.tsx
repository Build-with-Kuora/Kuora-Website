import Link from "next/link";
import { navigation, site } from "@/lib/site";
import { KuraMark } from "./kura-mark";
import { ThemeToggle } from "./theme-toggle";

const capabilities = [
  "System architecture",
  "Node.js services and APIs",
  "PostgreSQL and Prisma",
  "Next.js interfaces",
  "Performance and scaling",
];

export function SiteFooter() {
  return (
    <footer className="mt-auto overflow-hidden bg-panel text-panel-fg">
      <div className="container-sheet grid gap-12 pt-16 pb-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="flex items-center gap-2.5">
            <KuraMark className="size-[1.375rem]" />
            <span className="text-lg font-semibold tracking-[-0.02em]">Kura</span>
          </div>
          <p className="mt-5 max-w-xs text-[0.9375rem] text-panel-muted">
            Scalable systems and full-cycle software development, from the first schema to the
            on-call rotation.
          </p>
        </div>

        <nav aria-label="Footer" className="md:col-span-2">
          <h2 className="text-sm text-panel-muted">Pages</h2>
          <ul className="mt-4 space-y-2 text-[0.9375rem]">
            <li>
              <Link href="/" className="transition-colors hover:text-neon-green">
                Home
              </Link>
            </li>
            {navigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-neon-green">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-3">
          <h2 className="text-sm text-panel-muted">Capabilities</h2>
          <ul className="mt-4 space-y-2 text-[0.9375rem] text-panel-fg/80">
            {capabilities.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2">
          <h2 className="text-sm text-panel-muted">Contact</h2>
          <a
            href={`mailto:${site.email}`}
            className="mt-4 inline-block text-[0.9375rem] text-neon-green underline decoration-neon-green/40 underline-offset-4 transition-colors hover:decoration-neon-green"
          >
            {site.email}
          </a>
        </div>
      </div>

      {/*
        The name at full width, cropped by the bottom bar. The stroke is
        painted under a panel-coloured fill, so only the outer edge shows and
        the font's overlapping contours stay hidden.
      */}
      <div aria-hidden="true" className="container-sheet select-none">
        <p className="display -mb-[0.2em] text-[clamp(6rem,26vw,24rem)] leading-[0.8] text-panel [paint-order:stroke_fill] [-webkit-text-stroke:3px_rgb(57_255_136/0.45)]">
          Kura
        </p>
      </div>

      <div className="relative border-t border-panel-line bg-panel">
        <div className="container-sheet flex items-center justify-between gap-4 py-4">
          <p className="text-sm text-panel-muted">© {new Date().getFullYear()} Kura · Structure first</p>
          <ThemeToggle tone="panel" />
        </div>
      </div>
    </footer>
  );
}
