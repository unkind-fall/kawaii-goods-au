"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

import type { Product } from "@/lib/data/sample";
import { formatAud } from "@/lib/utils/format";

export function ProductCard({
  product,
  onQuickAdd,
}: {
  product: Product;
  onQuickAdd?: (slug: string) => void;
}) {
  const [hover, setHover] = useState(false);

  const soldOut = product.badges.includes("sold_out") || product.variants.every((v) => v.stock <= 0);
  const isNew = product.badges.includes("new");
  const isSale = product.badges.includes("sale") || (product.compareAtPriceCents ?? 0) > product.priceCents;

  const primary = product.images[0];
  const secondary = product.images[1] ?? product.images[0];
  const img = hover ? secondary : primary;

  const displayPrice = useMemo(() => {
    const cents = product.priceCents;
    return formatAud(cents);
  }, [product.priceCents]);

  return (
    <motion.div whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 260, damping: 18 }}>
      <div
        className="group overflow-hidden rounded-kawaii-lg bg-white/70 shadow-sm ring-1 ring-kawaii-pink/30 transition hover:shadow-kawaii-hover"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        data-testid={`product-card-${product.slug}`}
      >
        <div className="relative aspect-square overflow-hidden bg-kawaii-cream">
          <Link href={`/product/${product.slug}`} aria-label={product.name} className="absolute inset-0">
            <Image
              src={img.url}
              alt={img.alt}
              fill
              sizes="(max-width: 640px) 50vw, 25vw"
              className={[
                "object-cover transition",
                soldOut ? "grayscale opacity-60" : "group-hover:scale-[1.02]",
              ].join(" ")}
              placeholder="blur"
              blurDataURL="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="
            />
          </Link>

          <div className="pointer-events-none absolute left-3 top-3 flex gap-2">
            {isNew ? <Badge kind="new" /> : null}
            {isSale ? <Badge kind="sale" /> : null}
            {soldOut ? <Badge kind="sold_out" /> : null}
          </div>

          <button
            data-testid="product-fav"
            type="button"
            className="absolute right-3 top-3 inline-flex h-11 w-11 items-center justify-center rounded-kawaii bg-white/85 shadow-sm ring-1 ring-kawaii-pink/30"
            aria-label="Favorite"
          >
            <span aria-hidden>♡</span>
          </button>
        </div>

        <div className="p-4">
          <p className="text-sm font-semibold">{product.name}</p>
          <div className="mt-1 flex items-center gap-2">
            <p data-testid="product-price" className="text-sm font-semibold text-foreground/90">
              {displayPrice}
            </p>
            {product.compareAtPriceCents ? (
              <p className="text-xs text-foreground/50 line-through">{formatAud(product.compareAtPriceCents)}</p>
            ) : null}
          </div>

          <div className="mt-3 flex gap-2">
            <button
              data-testid="product-quick-add"
              type="button"
              className="min-h-11 flex-1 rounded-kawaii bg-kawaii-pink px-4 text-xs font-semibold shadow-sm transition hover:shadow-kawaii-hover disabled:opacity-60"
              onClick={(e) => {
                e.preventDefault();
                onQuickAdd?.(product.slug);
              }}
              disabled={soldOut}
            >
              Quick Add
            </button>
            <Link
              className="inline-flex min-h-11 items-center justify-center rounded-kawaii bg-white/80 px-4 text-xs font-semibold shadow-sm ring-1 ring-kawaii-pink/30"
              href={`/product/${product.slug}`}
            >
              View
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function Badge({ kind }: { kind: "new" | "sale" | "sold_out" }) {
  const label = kind === "new" ? "New" : kind === "sale" ? "Sale" : "Sold Out";
  const cls =
    kind === "new"
      ? "bg-kawaii-mint/70"
      : kind === "sale"
        ? "bg-kawaii-peach/80"
        : "bg-foreground/15";
  return (
    <span className={`inline-flex items-center rounded-kawaii px-3 py-1 text-[11px] font-semibold ${cls}`}>
      {label}
    </span>
  );
}

