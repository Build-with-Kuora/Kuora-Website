"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useLenis } from "lenis/react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedNavFramer } from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { reveal } from "@/lib/reveal";
import { navigation } from "@/lib/site";
import { KuoraMark } from "./kuora-mark";
import { ThemeToggle } from "./theme-toggle";

const items = navigation.map((item) => ({ name: item.label, href: item.href }));

/*
 * The site navigation: a floating pill (AnimatedNavFramer) centred at the top
 * of the screen, carrying the logo, the links, the theme toggle and Start a
 * project. Below md it shrinks to a round button while you scroll down, and
 * the links and the call to action move into a sheet that slides in from the
 * right. From md up it stays open.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      {...reveal(0, "down")}
      className="pointer-events-none fixed inset-x-0 top-3 z-40 flex justify-center px-4 sm:top-5 [view-transition-name:site-header]"
    >
      <AnimatedNavFramer
        brand={
          <Link href="/" aria-label="Kuora, home" className="flex items-center gap-2 rounded-full pr-1">
            <KuoraMark className="size-8" />
            <span className="text-base font-semibold tracking-[-0.02em]">Kuora</span>
          </Link>
        }
        items={items}
        isActive={isActive}
        actions={
          <>
            <ThemeToggle tone="pill" />
            <Button asChild size="sm" className="hidden rounded-full px-4 font-semibold md:inline-flex">
              <Link href="/start">Start a project</Link>
            </Button>
            <MobileMenu isActive={isActive} />
          </>
        }
      />
    </header>
  );
}

function MobileMenu({ isActive }: { isActive: (href: string) => boolean }) {
  const [open, setOpen] = useState(false);
  const lenis = useLenis();

  // Hold the smooth scroller still while the sheet covers the page.
  useEffect(() => {
    if (!lenis) return;
    if (open) lenis.stop();
    else lenis.start();
  }, [open, lenis]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          aria-label="Open menu"
          className="grid size-9 place-items-center rounded-full text-muted transition-colors hover:text-fg md:hidden"
        >
          <Menu className="size-5" aria-hidden="true" />
        </button>
      </SheetTrigger>
      <SheetContent side="right" data-lenis-prevent className="flex w-[85%] flex-col border-line">
        <SheetHeader className="text-left">
          <SheetTitle className="flex items-center gap-2.5">
            <KuoraMark id="kuora-mark-sheet" className="size-8" />
            Kuora
          </SheetTitle>
          <SheetDescription>Software built to carry load.</SheetDescription>
        </SheetHeader>
        <nav aria-label="Mobile" className="mt-4">
          <ul className="border-t border-line">
            {items.map((item) => (
              <li key={item.href} className="border-b border-line">
                <SheetClose asChild>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={`flex py-3.5 text-lg font-medium ${isActive(item.href) ? "text-accent" : "text-fg"}`}
                  >
                    {item.name}
                  </Link>
                </SheetClose>
              </li>
            ))}
          </ul>
        </nav>
        <SheetClose asChild>
          <Button asChild className="mt-auto w-full rounded-full font-semibold">
            <Link href="/start">Start a project</Link>
          </Button>
        </SheetClose>
      </SheetContent>
    </Sheet>
  );
}
