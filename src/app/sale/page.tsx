"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

import { SAMPLE_PRODUCTS } from "@/lib/data/sample";
import { ProductCard } from "@/components/product/ProductCard";

export default function SalePage() {
  const saleProducts = useMemo(
    () =>
      SAMPLE_PRODUCTS.filter(
        (p) => p.badges.includes("sale") || ((p.compareAtPriceCents ?? 0) > p.priceCents),
      ),
    [],
  );

  return (
    <div className="grid gap-6">
      <div className="relative overflow-hidden rounded-kawaii-lg bg-white/70 p-8 shadow-kawaii ring-1 ring-kawaii-pink/30">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full bg-kawaii-peach/30 blur-2xl"
        />
        <span className="inline-flex rounded-kawaii bg-kawaii-peach/70 px-3 py-1 text-[11px] font-semibold">Sale</span>
        <h1 className="mt-3 text-2xl font-semibold">Sale</h1>
        <p className="mt-2 text-sm text-foreground/70">Grab these kawaii deals before they&apos;re gone.</p>
      </div>

      {saleProducts.length === 0 ? (
        <div className="rounded-kawaii-lg bg-white/70 p-8 text-center shadow-sm ring-1 ring-kawaii-pink/30">
          <p className="text-sm text-foreground/70">No items on sale right now. Check back soon!</p>
        </div>
      ) : (
        <motion.div
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
        >
          {saleProducts.map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i} />
          ))}
        </motion.div>
      )}
    </div>
  );
}
