"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

import type { Product } from "@/lib/data/sample";
import { formatAud } from "@/lib/utils/format";
import { useFavorites } from "@/lib/favorites/store";
import { useToast } from "@/components/ui/Toast";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 260, damping: 22 } },
};

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
  const isPopular = product.badges.includes("popular");

  const primary = product.images[0];
  const secondary = product.images[1] ?? product.images[0];

  const displayPrice = useMemo(() => {
    return formatAud(product.priceCents);
  }, [product.priceCents]);

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="show"
      transition={{ delay: index * 0.03 }}
      whileHover={{ y: -4 }}
    >
      <div
        className="group overflow-hidden rounded-xl bg-white/75 shadow-sm ring-1 ring-kawaii-pink/30 transition hover:shadow-lg"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        data-testid={`product-card-${product.slug}`}
      >
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-kawaii-cream">
          <Link href={`/product/${product.slug}`} aria-label={product.name} className="absolute inset-0">
            <Image
              src={primary?.url ?? ""}
              alt={primary?.alt ?? product.name}
              fill
              sizes="(max-width: 640px) 50vw, 25vw"
              data-testid="product-image"
              className={[
                "object-cover transition-all duration-300",
                soldOut ? "grayscale opacity-60" : "group-hover:scale-105",
                hover && secondary ? "opacity-0" : "opacity-100",
              ].join(" ")}
              placeholder="blur"
              blurDataURL="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="
            />
            {secondary && (
              <Image
                src={secondary.url}
                alt={secondary.alt ?? product.name}
                fill
                sizes="(max-width: 640px) 50vw, 25vw"
                className={[
                  "object-cover transition-all duration-300",
                  soldOut ? "grayscale opacity-60" : "group-hover:scale-105",
                  hover ? "opacity-100" : "opacity-0",
                ].join(" ")}
                placeholder="blur"
                blurDataURL="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="
              />
            )}
          </Link>

          {/* Badges */}
          <div className="pointer-events-none absolute left-2 top-2 flex flex-wrap gap-1">
            {isNew && <Badge kind="new" />}
            {isSale && <Badge kind="sale" />}
            {isPopular && <Badge kind="popular" />}
            {soldOut && <Badge kind="sold_out" />}
          </div>

          {/* Favorite Button */}
          <button
            data-testid="product-fav"
            type="button"
            className={[
              "absolute right-2 top-2 inline-flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full shadow-sm ring-1 ring-kawaii-pink/30 transition active:scale-90",
              faved ? "bg-kawaii-pink text-white" : "bg-white/90 hover:bg-white",
            ].join(" ")}
            aria-label={faved ? "Remove from favorites" : "Add to favorites"}
            onClick={(e) => {
              e.preventDefault();
              const added = toggle(product.slug);
              toast(added ? "Added to favorites!" : "Removed from favorites", added ? "happy" : "sad");
            }}
          >
            <span className="text-sm" aria-hidden>{faved ? "♥" : "♡"}</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-3 sm:p-4">
          <p className="line-clamp-2 font-display text-xs sm:text-sm font-bold leading-tight">{product.name}</p>
          
          {/* Japanese name if exists */}
          {product.nameJp && (
            <p className="mt-0.5 truncate text-[10px] text-foreground/50">{product.nameJp}</p>
          )}
          
          {/* Price */}
          <div className="mt-2 flex flex-wrap items-center gap-1.5">
            <p data-testid="product-price" className="text-sm font-bold text-kawaii-pink">
              {displayPrice}
            </p>
            {product.compareAtPriceCents ? (
              <p className="text-xs text-foreground/40 line-through">{formatAud(product.compareAtPriceCents)}</p>
            ) : null}
          </div>

          {/* View Details - Hidden on mobile to save space */}
          <div className="mt-3 hidden sm:block">
            <Link
              data-testid="product-view-details"
              className="inline-flex min-h-10 w-full items-center justify-center rounded-lg bg-kawaii-pink px-4 text-xs font-semibold text-white shadow-sm transition hover:shadow-md hover:brightness-105 active:scale-[0.98]"
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

function Badge({ kind }: { kind: "new" | "sale" | "sold_out" | "popular" }) {
  const config = {
    new: { label: "NEW", bg: "bg-kawaii-pink text-white" },
    sale: { label: "SALE", bg: "bg-orange-400 text-white" },
    popular: { label: "人気", bg: "bg-gradient-to-r from-orange-400 to-pink-400 text-white" },
    sold_out: { label: "SOLD OUT", bg: "bg-gray-400 text-white" },
  }[kind];

  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold shadow-sm ${config.bg}`}>
      {config.label}
    </span>
  );
}
