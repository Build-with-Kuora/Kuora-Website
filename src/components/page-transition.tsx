"use client";

import { usePathname } from "next/navigation";
import { ViewTransition, type ReactNode } from "react";

/*
 * Route changes use the browser's View Transitions API: navigation starts
 * straight away, the old page fades out quickly and the new one fades in
 * with a slight rise. The header stays put. Keyed by pathname so every route
 * change is an exit and an enter. Browsers without the API swap instantly.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <ViewTransition key={pathname} enter="page-enter" exit="page-exit" default="none">
      {children}
    </ViewTransition>
  );
}
