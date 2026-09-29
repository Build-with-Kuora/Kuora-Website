"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation, site } from "@/lib/site";
import { KuraMark } from "./kura-mark";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-canvas/85 backdrop-blur-md [view-transition-name:site-header]">
      <div className="container-sheet flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2.5" aria-label="Kura, home">
          <KuraMark className="size-[1.375rem]" />
          <span className="hidden text-lg font-semibold tracking-[-0.02em] min-[420px]:inline">Kura</span>
        </Link>

        <nav aria-label="Primary" className="flex items-center">
          <ul className="flex items-center">
            {navigation.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`px-2 py-2 text-[0.9375rem] transition-colors sm:px-3.5 ${
                      active ? "text-fg" : "text-muted hover:text-fg"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="ml-2 flex items-center gap-3 sm:ml-4">
            <ThemeToggle />
            <a href={`mailto:${site.email}`} className="btn-primary hidden h-9 px-4 text-sm md:inline-flex">
              Start a project
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
