import type { CSSProperties } from "react";

/*
 * Marks an element to rise into place when the loading screen fades (see
 * the reveal rules in globals.css). Spread onto the element:
 * <h1 {...reveal(200)}>. "down" drops in from above instead, "fade" only
 * fades.
 */
export function reveal(delay: number, motion: "rise" | "down" | "fade" = "rise") {
  return {
    "data-reveal-item": motion,
    style: { "--reveal-delay": `${delay}ms` } as CSSProperties,
  };
}
