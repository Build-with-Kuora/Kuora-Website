"use client";

import { usePathname } from "next/navigation";
import { navigation, site } from "@/lib/site";
import { KuraMark } from "./kura-mark";
import { TransitionLink } from "./page-transition";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-line-strong bg-canvas/90 backdrop-blur-md">
      <div className="container-sheet flex h-16 items-stretch justify-between gap-4">
        <TransitionLink href="/" className="flex items-center gap-2.5" aria-label="Kura, home">
          <KuraMark className="size-6" />
          <span className="display hidden text-xl min-[420px]:inline">Kura</span>
        </TransitionLink>

        <nav aria-label="Primary" className="flex items-stretch">
          <ul className="flex items-stretch">
            {navigation.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <li key={item.href} className="flex">
                  <TransitionLink
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative flex items-center gap-2 px-2 text-sm font-medium sm:text-[0.9375rem] transition-colors sm:px-4 ${
                      active ? "text-fg" : "text-muted hover:text-fg"
                    }`}
                  >
                    <span aria-hidden="true" className="label-mono hidden lg:inline">
                      {item.sheet}
                    </span>
                    {item.label}
                    {active && (
                      <span aria-hidden="true" className="absolute inset-x-2 -bottom-px h-0.5 bg-fg sm:inset-x-4" />
                    )}
                  </TransitionLink>
                </li>
              );
            })}
          </ul>
          <div className="ml-1 flex items-center gap-3 border-l border-line pl-2 sm:ml-3 sm:pl-4">
            <ThemeToggle />
            <a href={`mailto:${site.email}`} className="btn-primary hidden h-10 text-sm md:inline-flex">
              Start a project
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
