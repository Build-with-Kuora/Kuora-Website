"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ComponentProps,
  type ReactNode,
} from "react";

/*
 * Page transitions as a closing frame. Four plates slide in from the corners
 * of the viewport, meet at the centre while the next route loads, then
 * retract to reveal it. Browser back/forward and reduced-motion users get an
 * immediate swap.
 */

const CLOSE_MS = 420;
const OPEN_MS = 560;
// If a navigation never commits (an error, or a URL that keeps the pathname),
// open the frame anyway rather than leaving the page covered.
const MAX_COVERED_MS = 4000;

type Phase = "idle" | "closing" | "covered" | "opening";

type Shutter = { phase: Phase; from: string };

const NavigateContext = createContext<(href: string) => boolean>(() => false);

const plates = [
  { corner: "left-0 top-0 border-r border-b", away: "-translate-x-full -translate-y-full" },
  { corner: "right-0 top-0 border-l border-b", away: "translate-x-full -translate-y-full" },
  { corner: "left-0 bottom-0 border-r border-t", away: "-translate-x-full translate-y-full" },
  { corner: "right-0 bottom-0 border-l border-t", away: "translate-x-full translate-y-full" },
];

export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [shutter, setShutter] = useState<Shutter>({ phase: "idle", from: pathname });
  const phaseRef = useRef<Phase>("idle");
  const timers = useRef<number[]>([]);

  // The new route has committed once the pathname moves on while covered.
  const arrived = shutter.phase === "covered" && pathname !== shutter.from;
  const phase: Phase = arrived ? "opening" : shutter.phase;

  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  useEffect(() => {
    if (phase !== "opening") return;
    const id = window.setTimeout(() => setShutter({ phase: "idle", from: pathname }), OPEN_MS);
    return () => window.clearTimeout(id);
  }, [phase, pathname]);

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach((id) => window.clearTimeout(id));
  }, []);

  const navigate = useCallback(
    (href: string) => {
      const target = new URL(href, window.location.href);
      const samePage = target.pathname === window.location.pathname;
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (samePage || reducedMotion) return false;
      // A second click while the frame is moving is ignored, not queued.
      if (phaseRef.current !== "idle") return true;

      phaseRef.current = "closing";
      setShutter({ phase: "closing", from: window.location.pathname });
      timers.current.push(
        window.setTimeout(() => {
          setShutter((current) => ({ ...current, phase: "covered" }));
          router.push(href);
          timers.current.push(
            window.setTimeout(
              () =>
                setShutter((current) =>
                  current.phase === "covered" ? { ...current, phase: "opening" } : current,
                ),
              MAX_COVERED_MS,
            ),
          );
        }, CLOSE_MS),
      );
      return true;
    },
    [router],
  );

  return (
    <NavigateContext.Provider value={navigate}>
      {children}
      <div
        aria-hidden="true"
        className={`fixed inset-0 z-50 ${phase === "idle" ? "pointer-events-none" : "cursor-wait"}`}
      >
        {plates.map((plate) => (
          <div
            key={plate.corner}
            className={`absolute h-1/2 w-1/2 border-line bg-plate ${plate.corner} ${
              phase === "idle"
                ? `invisible ${plate.away}`
                : phase === "opening"
                  ? `${plate.away} transition-transform duration-[560ms] ease-structural`
                  : "translate-0 transition-transform duration-[420ms] ease-structural"
            }`}
          />
        ))}
      </div>
    </NavigateContext.Provider>
  );
}

type TransitionLinkProps = Omit<ComponentProps<typeof Link>, "href" | "onNavigate"> & {
  href: string;
};

/** A next/link that closes the frame before navigating. */
export function TransitionLink({ href, ...props }: TransitionLinkProps) {
  const navigate = useContext(NavigateContext);
  return (
    <Link
      href={href}
      onNavigate={(event) => {
        if (navigate(href)) event.preventDefault();
      }}
      {...props}
    />
  );
}
