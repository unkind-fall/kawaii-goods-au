"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

import { SAMPLE_PRODUCTS } from "@/lib/data/sample";
import { ProductCard } from "@/components/product/ProductCard";

export default function NewArrivalsPage() {
  const newProducts = useMemo(
    () =>
      SAMPLE_PRODUCTS
        .filter((p) => p.badges.includes("new"))
        .sort((a, b) => b.createdAtMs - a.createdAtMs),
    [],
  );

  return (
    <div className="grid gap-6">
      <div className="relative overflow-hidden rounded-kawaii-lg bg-white/70 p-8 shadow-kawaii ring-1 ring-kawaii-pink/30">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full bg-kawaii-mint/30 blur-2xl"
        />
        <span className="inline-flex rounded-kawaii bg-kawaii-mint/50 px-3 py-1 text-[11px] font-semibold">New</span>
        <h1 className="mt-3 text-2xl font-semibold">New Arrivals</h1>
        <p className="mt-2 text-sm text-foreground/70">The latest additions to our catalog.</p>
      </div>

      {newProducts.length === 0 ? (
        <div className="rounded-kawaii-lg bg-white/70 p-8 text-center shadow-sm ring-1 ring-kawaii-pink/30">
          <p className="text-sm text-foreground/70">No new arrivals right now. Check back soon!</p>
        </div>
      ) : (
        <motion.div
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
        >
          {newProducts.map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i} />
          ))}
        </motion.div>
      )}
    </div>
  );
}
