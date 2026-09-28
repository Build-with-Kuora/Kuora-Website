import { navigation, site } from "@/lib/site";
import { KuraMark } from "./kura-mark";
import { TransitionLink } from "./page-transition";

// Laid out like the title block in the corner of a drawing sheet.
export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-line">
      <div className="container-sheet py-12">
        <div className="grid border border-line sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr]">
          <div className="border-b border-line p-6 sm:col-span-2 lg:col-span-1 lg:border-r lg:border-b-0">
            <div className="flex items-center gap-2.5">
              <KuraMark className="size-6" />
              <span className="stretch-wide text-lg font-semibold tracking-tight">Kura</span>
            </div>
            <p className="mt-4 max-w-sm text-base text-graphite">
              Scalable systems and full-cycle software development, from the schema to the
              interface.
            </p>
          </div>

          <div className="border-b border-line p-6 sm:border-r sm:border-b-0">
            <h2 className="stretch-narrow text-sm text-graphite">Contact</h2>
            <a
              href={`mailto:${site.email}`}
              className="mt-2 inline-block text-base underline decoration-line underline-offset-4 transition-colors hover:text-signal hover:decoration-signal"
            >
              {site.email}
            </a>
          </div>

          <nav aria-label="Footer" className="p-6">
            <h2 className="stretch-narrow text-sm text-graphite">Pages</h2>
            <ul className="mt-2 space-y-1 text-base">
              <li>
                <TransitionLink href="/" className="transition-colors hover:text-signal">
                  Home
                </TransitionLink>
              </li>
              {navigation.map((item) => (
                <li key={item.href}>
                  <TransitionLink href={item.href} className="transition-colors hover:text-signal">
                    {item.label}
                  </TransitionLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <p className="stretch-narrow mt-4 text-sm text-graphite">
          © {new Date().getFullYear()} Kura
        </p>
      </div>
    </footer>
  );
}
