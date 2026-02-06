"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ITEMS = [
  { href: "/", label: "Home", icon: "\uD83C\uDFE0" },
  { href: "/characters", label: "Chars", icon: "\uD83C\uDF80" },
  { href: "/search", label: "Search", icon: "\uD83D\uDD0E" },
  { href: "/products", label: "Products", icon: "\uD83D\uDECD" },
  { href: "/account", label: "Me", icon: "\uD83D\uDC64" },
];

export function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav
      data-testid="mobile-bottom-nav"
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-kawaii-pink/40 bg-kawaii-cream/90 backdrop-blur sm:hidden"
      aria-label="Bottom navigation"
    >
      <ul className="mx-auto grid max-w-lg grid-cols-5 px-2 py-2">
        {ITEMS.map((item) => {
          const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          return (
            <li key={item.href} className="flex justify-center">
              <Link
                href={item.href}
                className="relative inline-flex h-11 w-14 flex-col items-center justify-center gap-0.5 rounded-kawaii text-xs"
                aria-current={active ? "page" : undefined}
              >
                <motion.span
                  whileTap={{ scale: 0.85 }}
                  className="text-sm leading-none"
                  aria-hidden
                >
                  {item.icon}
                </motion.span>
                <span className={active ? "font-semibold" : "text-foreground/70"}>{item.label}</span>
                {active ? (
                  <motion.div
                    layoutId="bottom-nav-indicator"
                    className="absolute -bottom-0.5 h-0.5 w-6 rounded-full bg-kawaii-pink"
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                ) : null}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
