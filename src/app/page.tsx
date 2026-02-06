"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { SAMPLE_CHARACTERS, SAMPLE_PRODUCTS } from "@/lib/data/sample";
import { formatAud } from "@/lib/utils/format";
import { FloatingHearts, SparkleEffect } from "@/components/ui/DecorativeElements";

const FEATURED = [
  { title: "Sanrio Stationery", desc: "Pens, stickers, and notebooks.", href: "/products?category=stationery" },
  { title: "Character Plush", desc: "Soft friends for your desk.", href: "/products?category=plush" },
  { title: "Tiny Accessories", desc: "Keychains, pouches, charms.", href: "/products?category=accessories" },
  { title: "New Arrivals", desc: "Fresh drops every week.", href: "/new" },
];

const featuredCharacters = SAMPLE_CHARACTERS.filter((c) => c.type === "main").slice(0, 6);
const newArrivals = SAMPLE_PRODUCTS.filter((p) => p.badges.includes("new")).slice(0, 4);
const allMainCharacters = SAMPLE_CHARACTERS.filter((c) => c.type === "main");

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 260, damping: 22 } },
};

export default function HomePage() {
  return (
    <div className="grid gap-10">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-kawaii-lg bg-white/70 p-8 shadow-kawaii ring-1 ring-kawaii-pink/30">
        <FloatingHearts count={5} />
        <SparkleEffect count={4} />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-kawaii-sky/30 blur-2xl"
          animate={{ x: [0, 8, 0], y: [0, -6, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -bottom-12 -left-12 h-44 w-44 rounded-full bg-kawaii-pink/30 blur-2xl"
          animate={{ x: [0, -6, 0], y: [0, 8, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="relative z-10">
          <p className="inline-flex rounded-kawaii bg-kawaii-lavender/40 px-4 py-2 text-xs font-semibold text-foreground/75">
            AU shipping, JP vibes
          </p>
          <h1 className="mt-4 text-balance text-3xl font-semibold sm:text-4xl">
            Character goods that feel like a tiny Tokyo stationery aisle
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-foreground/75">
            Curated kawaii character goods from Japan&#39;s most beloved brands, shipped to your door in Australia.
          </p>
          <div className="mt-6 flex flex-col gap-2 sm:flex-row">
            <Link
              href="/characters"
              className="inline-flex min-h-11 items-center justify-center rounded-kawaii bg-kawaii-pink px-6 text-sm font-semibold shadow-sm transition hover:shadow-kawaii-hover"
            >
              Browse characters
            </Link>
            <Link
              href="/products"
              className="inline-flex min-h-11 items-center justify-center rounded-kawaii bg-white/80 px-6 text-sm font-semibold shadow-sm ring-1 ring-kawaii-pink/30 transition hover:bg-white"
            >
              Browse catalog
            </Link>
          </div>
        </div>
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
              className="group block rounded-kawaii-lg bg-white/70 p-6 shadow-sm ring-1 ring-kawaii-pink/30 transition hover:-translate-y-0.5 hover:shadow-kawaii-hover"
            >
              <p className="text-base font-semibold">{c.title}</p>
              <p className="mt-1 text-sm text-foreground/70">{c.desc}</p>
              <p className="mt-4 text-xs font-semibold text-foreground/60 group-hover:text-foreground/80">
                Explore &rarr;
              </p>
            </Link>
          </motion.div>
        ))}
      </motion.section>

      {/* Featured Characters */}
      <section>
        <h2 className="text-lg font-semibold">Featured Characters</h2>
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
                className="group flex items-center gap-4 rounded-kawaii-lg bg-white/70 p-4 shadow-sm ring-1 ring-kawaii-pink/30 transition hover:-translate-y-0.5 hover:shadow-kawaii-hover"
              >
                <div
                  className="relative h-16 w-16 flex-none overflow-hidden rounded-full shadow-sm ring-2 ring-kawaii-pink/40"
                >
                  <Image
                    src={c.heroImage}
                    alt={c.name}
                    fill
                    sizes="64px"
                    className="object-cover"
                    placeholder="blur"
                    blurDataURL="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold">{c.name}</p>
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
            <h2 className="text-lg font-semibold">New Arrivals</h2>
            <Link href="/new" className="text-xs font-semibold text-foreground/60 hover:text-foreground/80">
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
              <motion.div key={p.slug} variants={fadeUp}>
                <Link
                  href={`/product/${p.slug}`}
                  className="group block rounded-kawaii-lg bg-white/70 p-4 shadow-sm ring-1 ring-kawaii-pink/30 transition hover:-translate-y-0.5 hover:shadow-kawaii-hover"
                >
                  <div className="relative aspect-square overflow-hidden rounded-kawaii bg-kawaii-cream">
                    <Image
                      src={p.images[0]?.url ?? ""}
                      alt={p.name}
                      fill
                      sizes="(max-width: 640px) 50vw, 25vw"
                      className="object-cover transition group-hover:scale-[1.02]"
                      placeholder="blur"
                      blurDataURL="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="
                    />
                  </div>
                  <p className="mt-3 text-sm font-semibold">{p.name}</p>
                  <p className="mt-1 text-sm text-foreground/70">{formatAud(p.priceCents)}</p>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </section>
      ) : null}

      {/* Browse by Character - horizontal scroll */}
      <section>
        <h2 className="text-lg font-semibold">Browse by Character</h2>
        <div className="mt-4 flex gap-4 overflow-x-auto pb-2">
          {allMainCharacters.map((c) => (
            <Link
              key={c.slug}
              href={`/character/${c.slug}`}
              className="flex flex-none flex-col items-center gap-2 transition hover:-translate-y-0.5"
            >
              <div
                className="relative h-16 w-16 overflow-hidden rounded-full shadow-kawaii-sm ring-2 ring-kawaii-pink/40"
              >
                <Image
                  src={c.heroImage}
                  alt={c.name}
                  fill
                  sizes="64px"
                  className="object-cover"
                  placeholder="blur"
                  blurDataURL="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="
                />
              </div>
              <span className="text-xs font-semibold text-foreground/70">{c.name}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
