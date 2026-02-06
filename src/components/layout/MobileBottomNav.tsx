"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const ITEMS = [
  { href: "/", label: "Home", icon: "🏠" },
  { href: "/characters", label: "Chars", icon: "🎀" },
  { href: "/search", label: "Search", icon: "🔎" },
  { href: "/cart", label: "Cart", icon: "🛒" },
  { href: "/account", label: "Me", icon: "👤" },
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
          const active = pathname === item.href;
          return (
            <li key={item.href} className="flex justify-center">
              <Link
                href={item.href}
                className={[
                  "inline-flex h-11 w-14 flex-col items-center justify-center gap-0.5 rounded-kawaii text-xs",
                  active ? "bg-white/70 shadow-sm ring-1 ring-kawaii-pink/30" : "hover:bg-white/50",
                ].join(" ")}
                aria-current={active ? "page" : undefined}
              >
                <span aria-hidden className="text-sm leading-none">
                  {item.icon}
                </span>
                <span className="leading-none">{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

