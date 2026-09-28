"use client";

import { usePathname } from "next/navigation";
import { navigation, site } from "@/lib/site";
import { KuraMark } from "./kura-mark";
import { TransitionLink } from "./page-transition";

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ink/90 backdrop-blur-md">
      <div className="container-sheet flex h-16 items-center justify-between gap-6">
        <TransitionLink href="/" className="flex items-center gap-2.5" aria-label="Kura, home">
          <KuraMark className="size-6" />
          <span className="stretch-wide text-lg font-semibold tracking-tight">Kura</span>
        </TransitionLink>

        <nav aria-label="Primary" className="flex items-center gap-8">
          <ul className="flex items-center gap-5 text-[0.9375rem] sm:gap-8">
            {navigation.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <li key={item.href}>
                  <TransitionLink
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`flex items-center gap-2 py-2 transition-colors ${
                      active ? "text-chalk" : "text-graphite hover:text-chalk"
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`size-1.5 bg-signal ${active ? "" : "hidden"}`}
                    />
                    {item.label}
                  </TransitionLink>
                </li>
              );
            })}
          </ul>
          <a
            href={`mailto:${site.email}`}
            className="hidden border border-line px-4 py-2 text-[0.9375rem] transition-colors hover:border-signal hover:text-signal md:block"
          >
            Start a project
          </a>
        </nav>
      </div>
    </header>
  );
}
