"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { SAMPLE_CHARACTERS, SAMPLE_PRODUCTS } from "@/lib/data/sample";
import { formatAud } from "@/lib/utils/format";
import { FloatingHearts, SparkleEffect } from "@/components/ui/DecorativeElements";

const FEATURED = [
  { title: "Sanrio Stationery", desc: "Pens, stickers, and notebooks.", href: "/products?category=stationery", color: "bg-kawaii-pink/30", shadow: "shadow-kawaii", emoji: "\u270F\uFE0F" },
  { title: "Character Plush", desc: "Soft friends for your desk.", href: "/products?category=plush", color: "bg-kawaii-sky/30", shadow: "shadow-kawaii-sky", emoji: "\uD83E\uDDF8" },
  { title: "Tiny Accessories", desc: "Keychains, pouches, charms.", href: "/products?category=accessories", color: "bg-kawaii-lavender/35", shadow: "shadow-kawaii-lavender", emoji: "\uD83D\uDD11" },
  { title: "New Arrivals", desc: "Fresh drops every week.", href: "/new", color: "bg-kawaii-mint/30", shadow: "shadow-kawaii-mint", emoji: "\u2728" },
];

const featuredCharacters = SAMPLE_CHARACTERS.filter((c) => c.type === "main").slice(0, 6);
const newArrivals = SAMPLE_PRODUCTS.filter((p) => p.badges.includes("new")).slice(0, 4);
const allMainCharacters = SAMPLE_CHARACTERS.filter((c) => c.type === "main");

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 260, damping: 22 } },
};

/** Hero elements stagger with longer delays for dramatic entrance */
const heroStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const heroChild = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 200, damping: 20 } },
};

export default function HomePage() {
  return (
    <div className="grid gap-12">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-kawaii-lg bg-gradient-to-br from-kawaii-pink/50 via-kawaii-peach/35 to-kawaii-sky/40 p-8 shadow-kawaii-lg ring-1 ring-kawaii-pink/40 sm:p-10">
        <FloatingHearts count={6} />
        <SparkleEffect count={5} />

        {/* Layered glow blobs for depth */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-kawaii-sky/50 blur-3xl"
          animate={{ x: [0, 12, 0], y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -bottom-14 -left-14 h-52 w-52 rounded-full bg-kawaii-pink/50 blur-3xl"
          animate={{ x: [0, -10, 0], y: [0, 12, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute left-1/3 top-1/4 h-32 w-32 rounded-full bg-kawaii-lavender/40 blur-3xl"
          animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.6, 0.4] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="relative z-10"
          variants={heroStagger}
          initial="hidden"
          animate="show"
        >
          <motion.p
            variants={heroChild}
            className="inline-flex rounded-kawaii bg-white/75 px-4 py-2 text-xs font-bold tracking-wide text-foreground/80 shadow-sm"
          >
            AU shipping, JP vibes
          </motion.p>
          <motion.h1
            variants={heroChild}
            className="mt-4 text-balance font-display text-3xl font-bold leading-tight sm:text-4xl md:text-[2.75rem]"
          >
            Character goods that feel like a tiny Tokyo stationery aisle
          </motion.h1>
          <motion.p
            variants={heroChild}
            className="mt-3 max-w-2xl text-sm leading-relaxed text-foreground/80"
          >
            Curated kawaii character goods from Japan&#39;s most beloved brands, shipped to your door in Australia.
          </motion.p>
          <motion.div variants={heroChild} className="mt-6 flex flex-col gap-2 sm:flex-row">
            <Link
              href="/characters"
              className="inline-flex min-h-12 items-center justify-center rounded-kawaii bg-kawaii-pink px-7 text-sm font-bold shadow-kawaii transition hover:shadow-kawaii-hover hover:brightness-105 active:scale-[0.97]"
            >
              Browse characters
            </Link>
            <Link
              href="/products"
              className="inline-flex min-h-12 items-center justify-center rounded-kawaii bg-white/85 px-7 text-sm font-bold shadow-sm ring-1 ring-kawaii-pink/40 transition hover:bg-white hover:shadow-kawaii active:scale-[0.97]"
            >
              Browse catalog
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Featured Categories */}
      <motion.section
        aria-label="Featured categories"
        className="grid gap-4 sm:grid-cols-2"
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
      >
        {FEATURED.map((c) => (
          <motion.div key={c.href} variants={fadeUp}>
            <Link
              href={c.href}
              className={`group block rounded-kawaii-lg p-6 ring-1 ring-kawaii-pink/30 transition hover:shadow-kawaii-hover active:animate-squish ${c.color} ${c.shadow}`}
            >
              <span className="text-2xl">{c.emoji}</span>
              <p className="mt-2 font-display text-base font-bold">{c.title}</p>
              <p className="mt-1 text-sm text-foreground/70">{c.desc}</p>
              <p className="mt-4 text-xs font-bold text-kawaii-pink group-hover:text-foreground/80">
                Explore &rarr;
              </p>
            </Link>
          </motion.div>
        ))}
      </motion.section>

      {/* Featured Characters */}
      <section>
        <h2 className="font-display text-xl font-bold">Featured Characters</h2>
        <motion.div
          className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
        >
          {featuredCharacters.map((c) => (
            <motion.div key={c.slug} variants={fadeUp}>
              <Link
                href={`/character/${c.slug}`}
                className="group flex items-center gap-4 rounded-kawaii-lg bg-white/75 p-4 shadow-kawaii-sm ring-1 ring-kawaii-pink/30 transition hover:shadow-kawaii-hover active:animate-squish"
              >
                <motion.div
                  className="relative flex h-16 w-16 flex-none items-center justify-center overflow-hidden rounded-full shadow-kawaii ring-2 ring-white/90"
                  style={{ backgroundColor: c.hexColor }}
                  whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                  transition={{ type: "spring" as const, stiffness: 300, damping: 15 }}
                >
                  <Image
                    src={c.heroImage}
                    alt={c.name}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </motion.div>
                <div>
                  <p className="font-display text-sm font-bold">{c.name}</p>
                  <p className="mt-0.5 text-xs text-foreground/60">
                    {c.interests?.slice(0, 2).join(", ") ?? "Kawaii friend"}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* New Arrivals */}
      {newArrivals.length > 0 ? (
        <section>
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl font-bold">New Arrivals</h2>
            <Link href="/new" className="text-xs font-bold text-kawaii-pink hover:text-foreground/80">
              View all &rarr;
            </Link>
          </div>
          <motion.div
            className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
          >
            {newArrivals.map((p) => (
              <motion.div
                key={p.slug}
                variants={fadeUp}
                whileHover={{ rotate: [-0.5, 0.8, -0.5, 0], y: -4 }}
                transition={{ type: "spring" as const, stiffness: 300, damping: 15 }}
              >
                <Link
                  href={`/product/${p.slug}`}
                  className="group block rounded-kawaii-lg bg-white/75 p-4 shadow-kawaii-sm ring-1 ring-kawaii-pink/30 transition hover:shadow-kawaii-hover"
                >
                  <div className="relative aspect-square overflow-hidden rounded-kawaii bg-kawaii-cream">
                    <Image
                      src={p.images[0]?.url ?? ""}
                      alt={p.name}
                      fill
                      sizes="(max-width: 640px) 50vw, 25vw"
                      className="object-cover transition group-hover:scale-105"
                    />
                  </div>
                  <p className="mt-3 font-display text-sm font-bold">{p.name}</p>
                  <p className="mt-1 text-sm font-semibold text-kawaii-pink">{formatAud(p.priceCents)}</p>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </section>
      ) : null}

      {/* Browse by Character - horizontal scroll */}
      <section>
        <h2 className="font-display text-xl font-bold">Browse by Character</h2>
        <div className="mt-4 flex gap-5 overflow-x-auto pb-2">
          {allMainCharacters.map((c, i) => (
            <Link
              key={c.slug}
              href={`/character/${c.slug}`}
              className="flex flex-none flex-col items-center gap-2 transition hover:-translate-y-1"
            >
              <motion.div
                className="relative flex h-18 w-18 items-center justify-center overflow-hidden rounded-full shadow-kawaii ring-3 ring-white/90"
                style={{ backgroundColor: c.hexColor, width: 72, height: 72 }}
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
                whileHover={{ scale: 1.12, rotate: [0, -6, 6, 0] }}
              >
                <Image
                  src={c.heroImage}
                  alt={c.name}
                  fill
                  sizes="72px"
                  className="object-cover"
                />
              </motion.div>
              <span className="font-display text-xs font-bold text-foreground/80">{c.name}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
