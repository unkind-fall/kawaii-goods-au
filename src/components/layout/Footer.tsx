"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";

import { isValidEmail } from "@/lib/utils/email";
import { WaveDivider } from "@/components/ui/DecorativeElements";

export function Footer() {
  const year = useMemo(() => new Date().getFullYear(), []);
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  return (
    <footer className="mt-16 border-t border-kawaii-pink/40 bg-gradient-to-b from-kawaii-cream to-white">
      <WaveDivider className="text-kawaii-pink/15 -mt-[1px]" />
      <div className="mx-auto max-w-6xl px-4 pb-28 pt-6 sm:pb-10">
        <div className="grid gap-8 sm:grid-cols-2 sm:items-start">
          <div className="rounded-kawaii-lg bg-white/80 p-6 shadow-kawaii ring-1 ring-kawaii-pink/30">
            <div className="flex items-start gap-4">
              <Mascot />
              <div>
                <p className="text-base font-semibold">Newsletter of Cute Things</p>
                <p className="mt-1 text-sm text-foreground/70">
                  Drops, restocks, and character spotlights. No spam, just kawaii.
                </p>
              </div>
            </div>

            <form
              noValidate
              className="mt-4 flex flex-col gap-2 sm:flex-row"
              onSubmit={(e) => {
                e.preventDefault();
                setSuccess(false);
                if (!isValidEmail(email)) {
                  setError("Please enter a valid email address.");
                  return;
                }
                setError(null);
                setSuccess(true);
              }}
            >
              <label className="sr-only" htmlFor="newsletter-email">
                Email
              </label>
              <input
                id="newsletter-email"
                data-testid="newsletter-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="you@example.com"
                className="min-h-11 flex-1 rounded-kawaii bg-white px-4 text-sm shadow-sm ring-1 ring-kawaii-pink/30 placeholder:text-foreground/40"
              />
              <button
                data-testid="newsletter-submit"
                type="submit"
                className="min-h-11 rounded-kawaii bg-kawaii-pink px-5 text-sm font-semibold text-foreground shadow-sm transition hover:shadow-kawaii-hover"
              >
                Sign up
              </button>
            </form>

            {error ? (
              <p data-testid="newsletter-error" className="mt-2 text-sm text-red-700">
                {error}
              </p>
            ) : null}
            {success ? (
              <p data-testid="newsletter-success" className="mt-2 text-sm text-foreground/80">
                Yay! You&apos;re on the list. A tiny mascot is doing a happy dance.
              </p>
            ) : null}
          </div>

          <div className="grid gap-4 text-sm">
            <div className="rounded-kawaii-lg bg-white/70 p-6 shadow-sm ring-1 ring-kawaii-pink/30">
              <p className="font-semibold">Customer Care</p>
              <ul className="mt-2 grid gap-1 text-foreground/75">
                <li>Shipping (AU)</li>
                <li>Returns</li>
                <li>Contact</li>
              </ul>
            </div>

            <div className="rounded-kawaii-lg bg-white/70 p-6 shadow-sm ring-1 ring-kawaii-pink/30">
              <p className="font-semibold">Follow</p>
              <div className="mt-2 flex gap-2">
                <a
                  className="inline-flex h-11 w-11 items-center justify-center rounded-kawaii bg-white shadow-sm ring-1 ring-kawaii-pink/30 transition hover:bg-kawaii-sky/30 hover:shadow-kawaii-hover"
                  href="#"
                  aria-label="Instagram"
                >
                  <span aria-hidden>&#128247;</span>
                </a>
                <a
                  className="inline-flex h-11 w-11 items-center justify-center rounded-kawaii bg-white shadow-sm ring-1 ring-kawaii-pink/30 transition hover:bg-kawaii-mint/30 hover:shadow-kawaii-hover"
                  href="#"
                  aria-label="TikTok"
                >
                  <span aria-hidden>&#127925;</span>
                </a>
                <a
                  className="inline-flex h-11 w-11 items-center justify-center rounded-kawaii bg-white shadow-sm ring-1 ring-kawaii-pink/30 transition hover:bg-kawaii-lavender/40 hover:shadow-kawaii-hover"
                  href="#"
                  aria-label="X"
                >
                  <span aria-hidden>&#10022;</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <p data-testid="copyright" className="mt-10 text-center text-xs text-foreground/60">
          &copy; {year} Kawaii Goods AU. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

function Mascot() {
  return (
    <motion.div
      aria-hidden
      className="relative h-16 w-16 flex-none rounded-full bg-gradient-to-br from-kawaii-pink to-kawaii-peach shadow-kawaii"
      whileHover={{ rotate: [0, -3, 3, -3, 0] }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute left-1/2 top-1/2 h-8 w-10 -translate-x-1/2 -translate-y-1/2 rounded-kawaii bg-white/80" />
      <div className="absolute left-1/2 top-[56%] h-1 w-6 -translate-x-1/2 rounded bg-foreground/20" />
      <div className="absolute left-[38%] top-[40%] h-1.5 w-1.5 rounded-full bg-foreground/50" />
      <div className="absolute right-[38%] top-[40%] h-1.5 w-1.5 rounded-full bg-foreground/50" />
      <div className="absolute left-[22%] top-[30%] h-4 w-4 rotate-12 rounded-kawaii bg-kawaii-lavender/70" />
    </motion.div>
  );
}
