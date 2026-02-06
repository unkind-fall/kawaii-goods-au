"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useMemo, useState } from "react";

import type { Product } from "@/lib/data/sample";
import { SAMPLE_CHARACTERS, SAMPLE_PRODUCTS } from "@/lib/data/sample";
import { formatAud } from "@/lib/utils/format";
import { ImageGallery } from "./ImageGallery";
import { ProductCard } from "./ProductCard";

export function ProductDetail({ product }: { product: Product }) {
  const [variantId, setVariantId] = useState<string | null>(product.variants.length === 1 ? product.variants[0]!.id : null);

  const variant = useMemo(() => product.variants.find((v) => v.id === variantId) ?? null, [product.variants, variantId]);
  const soldOut = variant ? variant.stock <= 0 : product.variants.every((v) => v.stock <= 0);

  const priceCents = variant?.priceCents ?? product.priceCents;
  const lowStock = variant ? variant.stock > 0 && variant.stock <= 3 : false;

  const related = useMemo(() => SAMPLE_PRODUCTS.filter((p) => p.slug !== product.slug).slice(0, 4), [product.slug]);

  const characterLinks = useMemo(
    () =>
      product.characterTags
        .map((tag) => SAMPLE_CHARACTERS.find((c) => c.slug === tag))
        .filter(Boolean) as { slug: string; name: string; hexColor: string }[],
    [product.characterTags],
  );

  return (
    <div className="grid gap-6">
      <nav className="text-xs text-foreground/65">
        <Link className="hover:underline" href="/">
          Home
        </Link>{" "}
        <span aria-hidden>&rsaquo;</span>{" "}
        <Link className="hover:underline" href="/products">
          Products
        </Link>{" "}
        <span aria-hidden>&rsaquo;</span> <span className="font-semibold text-foreground/80">{product.name}</span>
      </nav>

      <div className="grid gap-6 lg:grid-cols-2">
        <ImageGallery images={product.images} />

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 24, delay: 0.1 }}
          className="rounded-kawaii-lg bg-white/70 p-8 shadow-kawaii ring-1 ring-kawaii-pink/30"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="font-display text-2xl font-bold">{product.name}</h1>
              <p className="mt-2 text-sm text-foreground/70">{product.description}</p>
            </div>
          </div>

          <div className="mt-5 flex items-baseline gap-3">
            <p data-testid="pdp-price" className="text-xl font-semibold">
              {formatAud(priceCents)}
            </p>
            {product.compareAtPriceCents ? (
              <p className="text-sm text-foreground/50 line-through">{formatAud(product.compareAtPriceCents)}</p>
            ) : null}
          </div>

          <p data-testid="pdp-sku" className="mt-2 text-xs text-foreground/60">
            SKU: {variant?.sku ?? product.variants[0]?.sku ?? "N/A"}
          </p>

          {lowStock ? (
            <p data-testid="stock-status" className="mt-2 text-sm font-semibold text-foreground/80">
              Only {variant!.stock} left!
            </p>
          ) : soldOut ? (
            <p data-testid="stock-status" className="mt-2 text-sm font-semibold text-foreground/80">
              Sold out
            </p>
          ) : null}

          {characterLinks.length > 0 ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {characterLinks.map((c) => (
                <Link
                  key={c.slug}
                  href={`/character/${c.slug}`}
                  className="inline-flex items-center gap-1.5 rounded-kawaii px-3 py-1.5 text-xs font-semibold shadow-sm ring-1 ring-kawaii-pink/30 transition hover:shadow-kawaii-hover"
                  style={{ backgroundColor: `${c.hexColor}40` }}
                >
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: c.hexColor }} />
                  {c.name}
                </Link>
              ))}
            </div>
          ) : null}

          {product.variants.length > 1 ? (
            <div className="mt-5">
              <p className="text-xs font-semibold text-foreground/70">Size</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.variants.map((v) => {
                  const active = v.id === variantId;
                  return (
                    <button
                      key={v.id}
                      data-testid={`variant-${v.id}`}
                      type="button"
                      onClick={() => setVariantId(v.id)}
                      className={[
                        "min-h-11 rounded-kawaii px-4 text-sm font-semibold shadow-sm ring-1 ring-kawaii-pink/30 transition",
                        active ? "bg-kawaii-sky/40 ring-kawaii-sky/60" : "bg-white/80 hover:bg-white",
                        v.stock <= 0 ? "opacity-55" : "",
                      ].join(" ")}
                    >
                      {v.title}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : null}

          <div className="mt-6 grid gap-3">
            <div className="rounded-kawaii bg-kawaii-cream/60 p-4 ring-1 ring-kawaii-pink/20">
              <p className="text-sm font-semibold">Catalog Info</p>
              <p className="mt-1 text-xs text-foreground/65">
                {soldOut
                  ? "This item is currently out of stock. Check back soon!"
                  : "This item is available. Visit us in-store or contact us for purchase details."}
              </p>
            </div>

            {soldOut ? (
              <form data-testid="restock-form" className="rounded-kawaii bg-white/70 p-4 ring-1 ring-kawaii-pink/20">
                <p className="text-sm font-semibold">Restock Notification</p>
                <p className="mt-1 text-xs text-foreground/60">Get an email when it&apos;s back.</p>
                <input
                  className="mt-3 w-full rounded-kawaii bg-white px-4 py-3 text-sm shadow-sm ring-1 ring-kawaii-pink/30"
                  placeholder="you@example.com"
                />
                <button
                  type="button"
                  className="mt-3 min-h-11 w-full rounded-kawaii bg-kawaii-mint/50 px-5 text-sm font-semibold shadow-sm"
                >
                  Notify me
                </button>
              </form>
            ) : null}
          </div>

          <details data-testid="materials-accordion" className="mt-6 rounded-kawaii bg-white/60 p-4 ring-1 ring-kawaii-pink/20">
            <summary className="cursor-pointer text-sm font-semibold">Materials / Care</summary>
            <div className="mt-3 text-sm text-foreground/70">
              {product.materials ? <p><span className="font-semibold">Materials:</span> {product.materials}</p> : null}
              {product.care ? <p className="mt-2"><span className="font-semibold">Care:</span> {product.care}</p> : null}
            </div>
          </details>
        </motion.section>
      </div>

      <section className="rounded-kawaii-lg bg-white/70 p-8 shadow-sm ring-1 ring-kawaii-pink/30">
        <h2 className="font-display text-lg font-bold">You May Also Like</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {related.map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
