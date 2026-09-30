"use client";

/*
 * Animated floating navigation, adapted from AnimatedNavFramer: a pill that
 * shrinks to a round menu button when you scroll down and springs back open
 * when you scroll up or tap it.
 *
 * Changes from the original: the brand, links and actions are props rather
 * than a hard-coded arrow icon and "#" links; links are Next.js links with
 * an active state; the collapsed circle is a real button, and the hidden
 * links are inert while collapsed, so it works from the keyboard; motion
 * follows the visitor's reduced-motion setting. Positioning is left to the
 * caller, which wraps it in a fixed container.
 */
import * as React from "react";
import Link from "next/link";
import { motion, MotionConfig, useMotionValueEvent, useScroll, type Variants } from "framer-motion";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";

export type NavItem = { name: string; href: string };

const COLLAPSE_AFTER = 150;
const EXPAND_SCROLL_THRESHOLD = 80;

const containerVariants: Variants = {
  expanded: {
    y: 0,
    opacity: 1,
    width: "auto",
    transition: {
      y: { type: "spring", damping: 18, stiffness: 250 },
      opacity: { duration: 0.3 },
      type: "spring",
      damping: 20,
      stiffness: 300,
      staggerChildren: 0.07,
      delayChildren: 0.2,
    },
  },
  collapsed: {
    y: 0,
    opacity: 1,
    width: "3rem",
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 300,
      when: "afterChildren",
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

const logoVariants: Variants = {
  expanded: { opacity: 1, x: 0, rotate: 0, transition: { type: "spring", damping: 15 } },
  collapsed: { opacity: 0, x: -25, rotate: -180, transition: { duration: 0.3 } },
};

const itemVariants: Variants = {
  expanded: { opacity: 1, x: 0, scale: 1, transition: { type: "spring", damping: 15 } },
  collapsed: { opacity: 0, x: -20, scale: 0.95, transition: { duration: 0.2 } },
};

const collapsedIconVariants: Variants = {
  expanded: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
  collapsed: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", damping: 15, stiffness: 300, delay: 0.15 },
  },
};

const MotionLink = motion.create(Link);

export function AnimatedNavFramer({
  brand,
  items,
  actions,
  isActive,
  className,
}: {
  /** Shown where the original had its arrow icon, e.g. the logo. */
  brand: React.ReactNode;
  /** Text links, shown from md up. */
  items: readonly NavItem[];
  /** Controls after the links: theme toggle, call to action, a mobile menu trigger. */
  actions?: React.ReactNode;
  isActive?: (href: string) => boolean;
  className?: string;
}) {
  const [isExpanded, setExpanded] = React.useState(true);

  const { scrollY } = useScroll();
  const lastScrollY = React.useRef(0);
  const scrollPositionOnCollapse = React.useRef(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = lastScrollY.current;

    if (isExpanded && latest > previous && latest > COLLAPSE_AFTER) {
      setExpanded(false);
      scrollPositionOnCollapse.current = latest;
    } else if (
      !isExpanded &&
      latest < previous &&
      (scrollPositionOnCollapse.current - latest > EXPAND_SCROLL_THRESHOLD || latest < COLLAPSE_AFTER)
    ) {
      setExpanded(true);
    }

    lastScrollY.current = latest;
  });

  return (
    <MotionConfig reducedMotion="user">
      <motion.nav
        aria-label="Primary"
        initial={{ y: -80, opacity: 0 }}
        animate={isExpanded ? "expanded" : "collapsed"}
        variants={containerVariants}
        whileHover={!isExpanded ? { scale: 1.1 } : {}}
        whileTap={!isExpanded ? { scale: 0.95 } : {}}
        className={cn(
          "pointer-events-auto relative flex h-12 items-center overflow-hidden rounded-full border border-border bg-background/80 shadow-lg shadow-black/20 backdrop-blur-md",
          !isExpanded && "cursor-pointer justify-center",
          className,
        )}
      >
        <motion.div variants={logoVariants} className="flex shrink-0 items-center pr-2 pl-2" inert={!isExpanded}>
          {brand}
        </motion.div>

        <motion.div
          className={cn("flex items-center gap-1 pr-1.5", !isExpanded && "pointer-events-none")}
          inert={!isExpanded}
        >
          <div className="hidden items-center md:flex">
            {items.map((item) => {
              const active = isActive?.(item.href) ?? false;
              return (
                <MotionLink
                  key={item.href}
                  href={item.href}
                  variants={itemVariants}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "rounded-full px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-colors",
                    active ? "text-accent" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {item.name}
                </MotionLink>
              );
            })}
          </div>
          {actions && (
            <motion.div variants={itemVariants} className="flex items-center gap-2 pl-1">
              {actions}
            </motion.div>
          )}
        </motion.div>

        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <motion.div variants={collapsedIconVariants} animate={isExpanded ? "expanded" : "collapsed"}>
            <Menu className="h-5 w-5" aria-hidden="true" />
          </motion.div>
        </div>

        {!isExpanded && (
          <button
            type="button"
            aria-label="Show navigation"
            aria-expanded={false}
            onClick={() => setExpanded(true)}
            className="absolute inset-0 rounded-full"
          />
        )}
      </motion.nav>
    </MotionConfig>
  );
}
