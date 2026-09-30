"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { reveal } from "@/lib/reveal";
import { navigation } from "@/lib/site";
import { KouraMark } from "./koura-mark";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
  const pathname = usePathname();
  // The menu belongs to the page it was opened on, so any navigation closes it.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenOn(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header {...reveal(0, "down")} className="sticky top-0 z-40 border-b border-line bg-canvas/85 backdrop-blur-md [view-transition-name:site-header]">
      <div className="container-sheet flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2.5" aria-label="Koura, home">
          <KouraMark className="size-8" />
          <span className="text-lg font-semibold tracking-[-0.02em]">Koura</span>
        </Link>

        <nav aria-label="Primary" className="flex items-center">
          <ul className="hidden items-center md:flex">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`px-3.5 py-2 text-[0.9375rem] transition-colors ${
                    isActive(item.href) ? "text-accent" : "text-muted hover:text-fg"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2 md:ml-4 md:gap-3">
            <ThemeToggle />
            <Link href="/start" className="btn-primary hidden h-9 px-4 text-sm md:inline-flex">
              Start a project
            </Link>
            <button
              type="button"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpenOn(open ? null : pathname)}
              className="grid size-9 place-items-center rounded-lg border border-line text-muted transition-colors hover:border-line-strong hover:text-fg md:hidden"
            >
              <svg viewBox="0 0 20 20" className="size-[1.125rem]" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path
                  d={open ? "M5 5l10 10M15 5 5 15" : "M3 6h14M3 10h14M3 14h14"}
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </nav>
      </div>

      {/* Below md the links live here. The panel eases open by animating its row height. */}
      <div
        id="mobile-menu"
        inert={!open}
        className={`grid transition-[grid-template-rows] duration-300 ease-out md:hidden ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="container-sheet border-t border-line pt-2 pb-5">
            <ul>
              {navigation.map((item) => (
                <li key={item.href} className="border-b border-line">
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    onClick={() => setOpenOn(null)}
                    className={`flex py-3.5 text-lg font-medium ${isActive(item.href) ? "text-accent" : "text-fg"}`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/start"
              onClick={() => setOpenOn(null)}
              className="btn-primary mt-5 w-full justify-center"
            >
              Start a project
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
