"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { SAMPLE_CHARACTERS, SAMPLE_PRODUCTS, PRODUCT_CATEGORIES } from "@/lib/data/sample";
import { formatAud } from "@/lib/utils/format";
import { FloatingHearts, SparkleEffect } from "@/components/ui/DecorativeElements";

// Get featured items
const featuredCharacters = SAMPLE_CHARACTERS.filter((c) => c.type === "main").slice(0, 6);
const newArrivals = SAMPLE_PRODUCTS.filter((p) => p.badges.includes("new")).slice(0, 4);
const popularProducts = SAMPLE_PRODUCTS.filter((p) => p.badges.includes("popular")).slice(0, 4);
const allMainCharacters = SAMPLE_CHARACTERS.filter((c) => c.type === "main");

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 260, damping: 22 } },
};

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
    <div className="grid gap-8 sm:gap-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br from-kawaii-pink/50 via-kawaii-peach/35 to-kawaii-sky/40 p-5 sm:p-8 lg:p-10 shadow-lg ring-1 ring-kawaii-pink/40">
        <FloatingHearts count={6} />
        <SparkleEffect count={5} />

        {/* Animated background blobs */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 sm:h-48 sm:w-48 rounded-full bg-kawaii-sky/50 blur-3xl"
          animate={{ x: [0, 12, 0], y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -bottom-14 -left-14 h-36 w-36 sm:h-52 sm:w-52 rounded-full bg-kawaii-pink/50 blur-3xl"
          animate={{ x: [0, -10, 0], y: [0, 12, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute left-1/3 top-1/4 h-24 w-24 sm:h-32 sm:w-32 rounded-full bg-kawaii-lavender/40 blur-3xl"
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
            className="inline-flex rounded-full bg-white/75 px-3 py-1.5 text-xs font-bold tracking-wide text-foreground/80 shadow-sm"
          >
            ✨ Authentic Japanese goods • AU shipping
          </motion.p>
          <motion.h1
            variants={heroChild}
            className="mt-4 font-display text-2xl sm:text-3xl md:text-4xl font-bold leading-tight"
          >
            Kawaii character goods
            <br className="hidden sm:block" />
            <span className="text-kawaii-pink"> from Japan&apos;s best brands</span>
          </motion.h1>
          <motion.p
            variants={heroChild}
            className="mt-3 max-w-xl text-sm sm:text-base leading-relaxed text-foreground/80"
          >
            Discover Skater&apos;s adorable lunch boxes, bottles, and kitchen goods featuring Hello Kitty, Pokémon, Studio Ghibli, and more!
          </motion.p>
          <motion.div variants={heroChild} className="mt-6 flex flex-col gap-2 sm:flex-row">
            <Link
              href="/products"
              className="inline-flex min-h-11 sm:min-h-12 items-center justify-center rounded-xl bg-kawaii-pink px-6 sm:px-7 text-sm font-bold shadow-lg shadow-kawaii-pink/25 transition hover:shadow-xl hover:brightness-105 active:scale-[0.97]"
            >
              Shop All Products
            </Link>
            <Link
              href="/characters"
              className="inline-flex min-h-11 sm:min-h-12 items-center justify-center rounded-xl bg-white/85 px-6 sm:px-7 text-sm font-bold shadow-sm ring-1 ring-kawaii-pink/40 transition hover:bg-white hover:shadow-lg active:scale-[0.97]"
            >
              Browse Characters
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Product Categories */}
      <section>
        <h2 className="font-display text-lg sm:text-xl font-bold">Shop by Category</h2>
        <motion.div
          className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
        >
          {PRODUCT_CATEGORIES.slice(0, 4).map((cat) => (
            <motion.div key={cat.slug} variants={fadeUp}>
              <Link
                href={`/products?category=${cat.slug}`}
                className={`group block rounded-xl p-4 sm:p-5 ring-1 ring-kawaii-pink/30 transition hover:shadow-lg active:scale-[0.98] ${cat.color}`}
              >
                <span className="text-2xl sm:text-3xl">{cat.emoji}</span>
                <p className="mt-2 font-display text-sm sm:text-base font-bold">{cat.name}</p>
                <p className="text-xs text-foreground/60">{cat.nameJp}</p>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Popular Products */}
      {popularProducts.length > 0 && (
        <section>
          <div className="flex items-center justify-between gap-4">
            <h2 className="font-display text-lg sm:text-xl font-bold">🔥 Popular Items</h2>
            <Link href="/products" className="shrink-0 text-xs font-bold text-kawaii-pink hover:text-foreground/80">
              View all →
            </Link>
          </div>
          <motion.div
            className="mt-4 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
          >
            {popularProducts.map((p) => (
              <motion.div
                key={p.slug}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                transition={{ type: "spring" as const, stiffness: 300, damping: 15 }}
              >
                <Link
                  href={`/product/${p.slug}`}
                  className="group block rounded-xl bg-white/75 p-3 sm:p-4 shadow-sm ring-1 ring-kawaii-pink/30 transition hover:shadow-lg"
                >
                  <div className="relative aspect-square overflow-hidden rounded-lg bg-kawaii-cream">
                    <Image
                      src={p.images[0]?.url ?? ""}
                      alt={p.name}
                      fill
                      sizes="(max-width: 640px) 50vw, 25vw"
                      className="object-cover transition group-hover:scale-105"
                    />
                    {p.badges.includes("popular") && (
                      <span className="absolute left-2 top-2 rounded-full bg-orange-400 px-2 py-0.5 text-[10px] font-bold text-white">
                        人気
                      </span>
                    )}
                  </div>
                  <p className="mt-2 line-clamp-2 font-display text-xs sm:text-sm font-bold leading-tight">{p.name}</p>
                  <p className="mt-1 text-sm font-semibold text-kawaii-pink">{formatAud(p.priceCents)}</p>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </section>
      )}

      {/* Browse by Character - Horizontal Scroll */}
      <section>
        <h2 className="font-display text-lg sm:text-xl font-bold">Browse by Character</h2>
        <div className="-mx-4 mt-4 flex gap-4 overflow-x-auto px-4 pb-3 scrollbar-hide">
          {allMainCharacters.map((c, i) => (
            <Link
              key={c.slug}
              href={`/character/${c.slug}`}
              className="flex shrink-0 flex-col items-center gap-2 transition hover:-translate-y-1"
            >
              <motion.div
                className="relative flex items-center justify-center overflow-hidden rounded-full shadow-lg ring-2 ring-white/90"
                style={{ backgroundColor: c.hexColor, width: 64, height: 64 }}
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
                whileHover={{ scale: 1.12 }}
              >
                <Image
                  src={c.heroImage}
                  alt={c.name}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </motion.div>
              <span className="max-w-[72px] truncate font-display text-xs font-bold text-foreground/80">{c.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* New Arrivals */}
      {newArrivals.length > 0 && (
        <section>
          <div className="flex items-center justify-between gap-4">
            <h2 className="font-display text-lg sm:text-xl font-bold">✨ New Arrivals</h2>
            <Link href="/new" className="shrink-0 text-xs font-bold text-kawaii-pink hover:text-foreground/80">
              View all →
            </Link>
          </div>
          <motion.div
            className="mt-4 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
          >
            {newArrivals.map((p) => (
              <motion.div
                key={p.slug}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                transition={{ type: "spring" as const, stiffness: 300, damping: 15 }}
              >
                <Link
                  href={`/product/${p.slug}`}
                  className="group block rounded-xl bg-white/75 p-3 sm:p-4 shadow-sm ring-1 ring-kawaii-pink/30 transition hover:shadow-lg"
                >
                  <div className="relative aspect-square overflow-hidden rounded-lg bg-kawaii-cream">
                    <Image
                      src={p.images[0]?.url ?? ""}
                      alt={p.name}
                      fill
                      sizes="(max-width: 640px) 50vw, 25vw"
                      className="object-cover transition group-hover:scale-105"
                    />
                    <span className="absolute left-2 top-2 rounded-full bg-kawaii-pink px-2 py-0.5 text-[10px] font-bold text-white">
                      NEW
                    </span>
                  </div>
                  <p className="mt-2 line-clamp-2 font-display text-xs sm:text-sm font-bold leading-tight">{p.name}</p>
                  <p className="mt-1 text-sm font-semibold text-kawaii-pink">{formatAud(p.priceCents)}</p>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </section>
      )}

      {/* Featured Characters Grid */}
      <section>
        <h2 className="font-display text-lg sm:text-xl font-bold">Featured Characters</h2>
        <motion.div
          className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
        >
          {featuredCharacters.map((c) => (
            <motion.div key={c.slug} variants={fadeUp}>
              <Link
                href={`/character/${c.slug}`}
                className="group flex items-center gap-3 sm:gap-4 rounded-xl bg-white/75 p-3 sm:p-4 shadow-sm ring-1 ring-kawaii-pink/30 transition hover:shadow-lg active:scale-[0.98]"
              >
                <motion.div
                  className="relative flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center overflow-hidden rounded-full shadow-md ring-2 ring-white/90"
                  style={{ backgroundColor: c.hexColor }}
                  whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                  transition={{ type: "spring" as const, stiffness: 300, damping: 15 }}
                >
                  <Image
                    src={c.heroImage}
                    alt={c.name}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </motion.div>
                <div className="min-w-0 flex-1">
                  <p className="font-display text-sm font-bold">{c.name}</p>
                  {c.nameJp && (
                    <p className="text-xs text-foreground/50">{c.nameJp}</p>
                  )}
                  <p className="mt-0.5 truncate text-xs text-foreground/60">
                    {c.interests?.slice(0, 2).join(" • ") ?? "View collection"}
                  </p>
                </div>
                <span className="shrink-0 text-kawaii-pink transition group-hover:translate-x-1">→</span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Why Shop With Us */}
      <section className="rounded-xl bg-gradient-to-r from-kawaii-lavender/30 to-kawaii-sky/30 p-5 sm:p-6 ring-1 ring-kawaii-lavender/40">
        <h2 className="font-display text-lg sm:text-xl font-bold text-center">Why Shop With Us?</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          <div className="text-center">
            <span className="text-2xl">🇯🇵</span>
            <p className="mt-2 font-display text-sm font-bold">Authentic Japanese</p>
            <p className="mt-1 text-xs text-foreground/70">Direct from licensed manufacturers</p>
          </div>
          <div className="text-center">
            <span className="text-2xl">📦</span>
            <p className="mt-2 font-display text-sm font-bold">AU Shipping</p>
            <p className="mt-1 text-xs text-foreground/70">Fast delivery across Australia</p>
          </div>
          <div className="text-center">
            <span className="text-2xl">💖</span>
            <p className="mt-2 font-display text-sm font-bold">Curated Selection</p>
            <p className="mt-1 text-xs text-foreground/70">Only the cutest, highest quality</p>
          </div>
        </div>
      </section>
    </div>
  );
}
