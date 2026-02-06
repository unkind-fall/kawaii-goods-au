"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

import { TRENDING_SEARCH_TERMS } from "@/lib/data/sample";
import { applySynonyms } from "@/lib/search/logic";

type NavItem = { label: string; href: string };

const NAV: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Characters", href: "/characters" },
  { label: "Products", href: "/products" },
  { label: "New", href: "/new" },
  { label: "Sale", href: "/sale" },
];

function useScrollShadow(thresholdPx: number) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const onScroll = () => setActive(window.scrollY > thresholdPx);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [thresholdPx]);

  return active;
}

export function Header() {
  const hasShadow = useScrollShadow(50);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const closeTimeoutRef = useRef<number | null>(null);

  const charactersNav = useMemo(() => NAV.find((n) => n.label === "Characters")!, []);

  return (
    <header
      data-testid="header"
      className={[
        "sticky top-0 z-50 w-full",
        "bg-kawaii-cream/90 backdrop-blur supports-[backdrop-filter]:bg-kawaii-cream/75",
        "border-b border-kawaii-pink/40",
        hasShadow ? "shadow-kawaii" : "shadow-none",
      ].join(" ")}
    >
      <div className="mx-auto max-w-6xl px-4">
        <div className="relative grid h-16 grid-cols-3 items-center sm:h-20">
          <button
            type="button"
            aria-label="Open menu"
            className="h-11 w-11 justify-self-start rounded-kawaii bg-white/80 shadow-sm ring-1 ring-kawaii-pink/30 sm:hidden"
            onClick={() => setMobileMenuOpen((v) => !v)}
          >
            <span className="mx-auto block h-0.5 w-5 rounded bg-foreground/80" />
            <span className="mx-auto mt-1.5 block h-0.5 w-5 rounded bg-foreground/80" />
            <span className="mx-auto mt-1.5 block h-0.5 w-5 rounded bg-foreground/80" />
          </button>

          <Link
            href="/"
            className="col-start-2 justify-self-center text-center text-lg font-semibold tracking-tight sm:col-start-1 sm:justify-self-start sm:text-left"
          >
            <span className="inline-flex items-center gap-2">
              <span aria-hidden className="inline-block h-7 w-7 rounded-full bg-kawaii-pink shadow-sm" />
              <span className="text-balance">Kawaii Goods AU</span>
            </span>
          </Link>

          <div className="justify-self-end sm:flex sm:items-center sm:gap-3">
            <div className="hidden sm:block">
              <Search testId="desktop-search" />
            </div>
            <Link
              href="/cart"
              className="inline-flex h-11 w-11 items-center justify-center rounded-kawaii bg-white/80 shadow-sm ring-1 ring-kawaii-pink/30"
              aria-label="Cart"
            >
              <span aria-hidden>🛒</span>
            </Link>
          </div>
        </div>

        <nav className="hidden sm:block">
          <ul className="flex items-center gap-1 pb-3">
            {NAV.map((item) => {
              const isCharacters = item.label === "Characters";
              if (!isCharacters) {
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="inline-flex min-h-11 items-center rounded-kawaii px-4 text-sm font-medium transition hover:bg-white/70 hover:shadow-kawaii-hover"
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              }
              return (
                <li
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => {
                    if (closeTimeoutRef.current) window.clearTimeout(closeTimeoutRef.current);
                    setMegaOpen(true);
                  }}
                  onMouseLeave={() => {
                    closeTimeoutRef.current = window.setTimeout(() => setMegaOpen(false), 200);
                  }}
                >
                  <Link
                    href={charactersNav.href}
                    className="inline-flex min-h-11 items-center rounded-kawaii bg-white/40 px-4 text-sm font-medium transition hover:bg-white/70 hover:shadow-kawaii-hover"
                  >
                    Characters
                  </Link>
                  <AnimatePresence>
                    {megaOpen ? <MegaMenu key="mega" /> : null}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      <AnimatePresence>
        {mobileMenuOpen ? (
          <motion.div
            key="mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            className="sm:hidden"
          >
            <div className="mx-auto max-w-6xl px-4 pb-4">
              <div className="rounded-kawaii-lg bg-white/80 p-3 shadow-kawaii ring-1 ring-kawaii-pink/30">
                <div className="mb-3">
                  <Search testId="mobile-search" />
                </div>
                <ul className="grid gap-1">
                  {NAV.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="inline-flex min-h-11 w-full items-center rounded-kawaii px-4 text-sm font-medium transition hover:bg-kawaii-cream"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

function MegaMenu() {
  return (
    <motion.div
      data-testid="mega-menu"
      initial={{ opacity: 0, y: 6, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 6, scale: 0.98 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className="absolute left-0 top-full mt-2 w-[520px] overflow-hidden rounded-kawaii-lg bg-white shadow-kawaii ring-1 ring-kawaii-pink/30"
    >
      <div className="grid grid-cols-2 gap-4 p-4">
        <div className="rounded-kawaii bg-kawaii-lavender/40 p-4">
          <p className="text-sm font-semibold">Featured</p>
          <div className="mt-3 grid gap-2 text-sm">
            <Link className="rounded-kawaii px-3 py-2 hover:bg-white/70" href="/characters/hello-kitty">
              Hello Kitty
            </Link>
            <Link className="rounded-kawaii px-3 py-2 hover:bg-white/70" href="/characters/cinnamoroll">
              Cinnamoroll
            </Link>
            <Link className="rounded-kawaii px-3 py-2 hover:bg-white/70" href="/characters/kuromi">
              Kuromi
            </Link>
          </div>
        </div>
        <div className="rounded-kawaii bg-kawaii-mint/30 p-4">
          <p className="text-sm font-semibold">Browse</p>
          <div className="mt-3 grid gap-2 text-sm">
            <Link className="rounded-kawaii px-3 py-2 hover:bg-white/70" href="/characters">
              All characters
            </Link>
            <Link className="rounded-kawaii px-3 py-2 hover:bg-white/70" href="/products?tag=sanrio">
              Sanrio goods
            </Link>
            <Link className="rounded-kawaii px-3 py-2 hover:bg-white/70" href="/products?tag=stationery">
              Stationery
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function Search({ testId }: { testId?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const [focused, setFocused] = useState(false);
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const fetchAbortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (!open) return;

    fetchAbortRef.current?.abort();
    const ac = new AbortController();
    fetchAbortRef.current = ac;

    const run = async () => {
      if (!q.trim()) {
        setSuggestions(TRENDING_SEARCH_TERMS.slice(0, 5));
        return;
      }
      const res = await fetch(`/api/search/suggest?q=${encodeURIComponent(q)}`, { signal: ac.signal });
      const data = (await res.json()) as { suggestions: string[] };
      setSuggestions(data.suggestions);
    };

    void run();
    return () => ac.abort();
  }, [open, q]);

  function submit(nextQ: string) {
    const normalized = applySynonyms(nextQ);
    const sp = new URLSearchParams(params.toString());
    sp.set("q", normalized);
    // Keep any existing product filters in URL when searching.
    router.push(pathname === "/products" ? `/products?${sp.toString()}` : `/products?${sp.toString()}`);

    try {
      const key = "kawaii_recent_searches";
      const prev = JSON.parse(localStorage.getItem(key) ?? "[]") as string[];
      const merged = [normalized, ...prev.filter((x) => x !== normalized)].slice(0, 8);
      localStorage.setItem(key, JSON.stringify(merged));
    } catch {
      // ignore
    }
  }

  return (
    <div className="w-full max-w-md">
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        className={[
          "flex min-h-11 items-center gap-2 rounded-kawaii bg-white/80 px-3 shadow-sm ring-1 ring-kawaii-pink/30",
          focused ? "shadow-kawaii-hover" : "",
        ].join(" ")}
      >
        <span aria-hidden className="text-sm">
          🔎
        </span>
        <input
          data-testid={testId}
          aria-label="Search products"
          placeholder="Search cute things..."
          className="w-full bg-transparent text-sm outline-none placeholder:text-foreground/50"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onFocus={() => {
            setFocused(true);
            setOpen(true);
          }}
          onBlur={() => {
            setFocused(false);
            // Delay close so click on suggestion works
            window.setTimeout(() => setOpen(false), 120);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") submit(q);
          }}
        />
      </motion.div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.99 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            className="relative"
          >
            <div className="absolute left-0 right-0 mt-2 overflow-hidden rounded-kawaii-lg bg-white/90 shadow-kawaii ring-1 ring-kawaii-pink/30">
              <ul data-testid="search-suggestions" className="grid">
                {suggestions.slice(0, 5).map((s) => (
                  <li key={s}>
                    <button
                      type="button"
                      className="w-full px-4 py-3 text-left text-sm hover:bg-kawaii-cream"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => submit(s)}
                    >
                      {s}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
