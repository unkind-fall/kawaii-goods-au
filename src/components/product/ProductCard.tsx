"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

import type { Product } from "@/lib/data/sample";
import { formatAud } from "@/lib/utils/format";
import { useFavorites } from "@/lib/favorites/store";
import { useToast } from "@/components/ui/Toast";

export function ProductCard({
  product,
  index = 0,
}: {
  product: Product;
  index?: number;
}) {
  const [hover, setHover] = useState(false);
  const { isFavorite, toggle } = useFavorites();
  const { toast } = useToast();
  const faved = isFavorite(product.slug);

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
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 22, delay: index * 0.05 }}
      whileHover={{ y: -6, rotate: [-0.5, 0.8, -0.5, 0] }}
    >
      <div
        className="group overflow-hidden rounded-kawaii-lg bg-white/75 shadow-kawaii-sm ring-1 ring-kawaii-pink/30 transition hover:shadow-kawaii-hover"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        data-testid={`product-card-${product.slug}`}
      >
        <div className="relative aspect-square overflow-hidden bg-kawaii-cream">
          <Link href={`/product/${product.slug}`} aria-label={product.name} className="absolute inset-0">
            <Image
              src={primary?.url ?? ""}
              alt={primary?.alt ?? product.name}
              fill
              sizes="(max-width: 640px) 50vw, 25vw"
              data-testid="product-image"
              data-src={img?.url}
              className={[
                "object-cover transition-opacity duration-300",
                soldOut ? "grayscale opacity-60" : "group-hover:scale-[1.02]",
                hover ? "opacity-0" : "opacity-100",
              ].join(" ")}
              placeholder="blur"
              blurDataURL="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="
            />
            <Image
              src={secondary?.url ?? ""}
              alt={secondary?.alt ?? product.name}
              fill
              sizes="(max-width: 640px) 50vw, 25vw"
              className={[
                "object-cover transition-opacity duration-300",
                soldOut ? "grayscale opacity-60" : "group-hover:scale-[1.02]",
                hover ? "opacity-100" : "opacity-0",
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
            className={[
              "absolute right-3 top-3 inline-flex h-11 w-11 items-center justify-center rounded-kawaii shadow-sm ring-1 ring-kawaii-pink/30 transition active:animate-pop",
              faved ? "bg-kawaii-pink/30" : "bg-white/85",
            ].join(" ")}
            aria-label={faved ? "Remove from favorites" : "Add to favorites"}
            onClick={(e) => {
              e.preventDefault();
              const added = toggle(product.slug);
              toast(added ? "Added to favorites!" : "Removed from favorites", added ? "happy" : "sad");
            }}
          >
            <span aria-hidden>{faved ? "\u2665" : "\u2661"}</span>
          </button>
        </div>

        <div className="p-4">
          <p className="font-display text-sm font-bold">{product.name}</p>
          <div className="mt-1 flex items-center gap-2">
            <p data-testid="product-price" className="text-sm font-semibold text-foreground/90">
              {displayPrice}
            </p>
            {product.compareAtPriceCents ? (
              <p className="text-xs text-foreground/50 line-through">{formatAud(product.compareAtPriceCents)}</p>
            ) : null}
          </div>

          {product.characterTags.length > 0 ? (
            <div className="mt-2 h-1 w-12 rounded-full bg-kawaii-pink/50" />
          ) : null}

          <div className="mt-3">
            <Link
              data-testid="product-view-details"
              className="inline-flex min-h-11 w-full items-center justify-center rounded-kawaii bg-kawaii-pink px-4 text-xs font-semibold shadow-sm transition hover:shadow-kawaii-hover"
              href={`/product/${product.slug}`}
            >
              View Details
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
      ? "bg-kawaii-mint/80 shadow-kawaii-mint"
      : kind === "sale"
        ? "bg-kawaii-peach/90 shadow-kawaii"
        : "bg-foreground/15";
  return (
    <span className={`inline-flex items-center rounded-kawaii px-3 py-1 text-[11px] font-bold ${cls}`}>
      {label}
    </span>
  );
}
