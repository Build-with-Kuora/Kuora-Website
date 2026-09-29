import { navigation, site } from "@/lib/site";
import { KuraMark } from "./kura-mark";
import { TransitionLink } from "./page-transition";
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
            <KuraMark className="size-6" />
            <span className="display text-xl">Kura</span>
          </div>
          <p className="mt-6 max-w-xs text-[0.9375rem] text-panel-muted">
            Scalable systems and full-cycle software development, from the first schema to the
            on-call rotation.
          </p>
        </div>

        <nav aria-label="Footer" className="md:col-span-2">
          <h2 className="label-mono text-panel-muted">Sheets</h2>
          <ul className="mt-4 space-y-2 text-[0.9375rem]">
            <li>
              <TransitionLink href="/" className="flex gap-3 transition-colors hover:text-neon-green">
                <span className="label-mono pt-0.5 text-panel-muted">K-00</span>
                Home
              </TransitionLink>
            </li>
            {navigation.map((item) => (
              <li key={item.href}>
                <TransitionLink href={item.href} className="flex gap-3 transition-colors hover:text-neon-green">
                  <span className="label-mono pt-0.5 text-panel-muted">{item.sheet}</span>
                  {item.label}
                </TransitionLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-3">
          <h2 className="label-mono text-panel-muted">Capabilities</h2>
          <ul className="mt-4 space-y-2 text-[0.9375rem] text-panel-fg/80">
            {capabilities.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2">
          <h2 className="label-mono text-panel-muted">Contact</h2>
          <a
            href={`mailto:${site.email}`}
            className="mt-4 inline-block text-[0.9375rem] text-neon-green underline decoration-neon-green/40 underline-offset-4 hover:decoration-neon-green"
          >
            {site.email}
          </a>
        </div>
      </div>

      {/* The name at full width, cropped by the edge of the sheet. */}
      <div aria-hidden="true" className="container-sheet select-none">
        <p className="display -mb-[0.2em] text-[clamp(6rem,26vw,24rem)] leading-[0.8] text-transparent [-webkit-text-stroke:1.5px_rgb(57_255_136/0.45)]">
          Kura
        </p>
      </div>

      <div className="relative border-t border-panel-line bg-panel">
        <div className="container-sheet flex items-center justify-between gap-4 py-4">
          <p className="label-mono text-panel-muted">© {new Date().getFullYear()} Kura · Structure first</p>
          <ThemeToggle tone="panel" />
        </div>
      </div>
    </footer>
  );
}
