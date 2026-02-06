"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { pickMascot } from "@/lib/mascots";
import { FloatingHearts } from "@/components/ui/DecorativeElements";

export default function NotFound() {
  const [seed, setSeed] = useState<string | null>(null);

  useEffect(() => {
    const s = new URLSearchParams(window.location.search).get("seed");
    setSeed(s);
  }, []);

  const mascot = useMemo(() => pickMascot(seed), [seed]);

  return (
    <div data-testid="not-found" className="mx-auto max-w-xl py-14 text-center">
      <div className="relative mx-auto grid place-items-center">
        <FloatingHearts count={4} />
        <div className="rounded-kawaii-lg bg-white/80 px-8 py-10 shadow-kawaii ring-1 ring-kawaii-pink/30">
          <motion.div
            aria-hidden
            className="mx-auto mb-4 grid h-24 w-24 place-items-center rounded-full bg-gradient-to-br from-kawaii-sky/40 to-kawaii-pink/50 shadow-kawaii"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-4xl">&#9734;</span>
          </motion.div>
          <p className="text-sm font-semibold text-foreground/70">404</p>
          <h1 className="mt-2 text-2xl font-semibold">Page not found</h1>
          <p className="mt-2 text-sm text-foreground/60">
            This page wandered off into the pastel void...
          </p>
          <p data-testid="not-found-mascot" className="mt-3 text-sm text-foreground/75">
            {mascot.name}: {mascot.tagline}
          </p>
          <div className="mt-6 flex flex-col justify-center gap-2 sm:flex-row">
            <Link
              href="/"
              className="inline-flex min-h-11 items-center justify-center rounded-kawaii bg-kawaii-pink px-5 text-sm font-semibold shadow-sm transition hover:shadow-kawaii-hover"
            >
              Take me home
            </Link>
            <Link
              href="/characters"
              className="inline-flex min-h-11 items-center justify-center rounded-kawaii bg-white/80 px-5 text-sm font-semibold shadow-sm ring-1 ring-kawaii-pink/30 transition hover:bg-white"
            >
              Browse characters
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
