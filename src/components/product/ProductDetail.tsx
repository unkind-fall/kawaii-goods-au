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

  const related = useMemo(() => {
    // Find products with similar characters or category
    return SAMPLE_PRODUCTS
      .filter((p) => p.slug !== product.slug)
      .filter((p) => 
        p.category === product.category || 
        p.characterTags.some(t => product.characterTags.includes(t))
      )
      .slice(0, 4);
  }, [product.slug, product.category, product.characterTags]);

  const characterLinks = useMemo(
    () =>
      product.characterTags
        .map((tag) => SAMPLE_CHARACTERS.find((c) => c.slug === tag))
        .filter(Boolean) as { slug: string; name: string; hexColor: string }[],
    [product.characterTags],
  );

  return (
    <div className="grid gap-6">
      {/* Breadcrumb */}
      <nav className="text-xs text-foreground/65">
        <Link className="hover:underline" href="/">
          Home
        </Link>{" "}
        <span aria-hidden>&rsaquo;</span>{" "}
        <Link className="hover:underline" href="/products">
          Products
        </Link>{" "}
        <span aria-hidden>&rsaquo;</span>{" "}
        <span className="font-semibold text-foreground/80">{product.name}</span>
      </nav>

      <div className="grid gap-6 lg:grid-cols-2">
        <ImageGallery images={product.images} />

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 24, delay: 0.1 }}
          className="rounded-xl bg-white/70 p-5 sm:p-8 shadow-sm ring-1 ring-kawaii-pink/30"
        >
          <div>
            <h1 className="font-display text-xl sm:text-2xl font-bold">{product.name}</h1>
            {product.nameJp && (
              <p className="mt-1 text-sm text-foreground/50">{product.nameJp}</p>
            )}
            <p className="mt-3 text-sm leading-relaxed text-foreground/70">{product.description}</p>
          </div>

          {/* Price */}
          <div className="mt-5 flex items-baseline gap-3">
            <p data-testid="pdp-price" className="text-2xl font-bold text-kawaii-pink">
              {formatAud(priceCents)}
            </p>
            {product.compareAtPriceCents ? (
              <p className="text-sm text-foreground/50 line-through">{formatAud(product.compareAtPriceCents)}</p>
            ) : null}
          </div>

          <p data-testid="pdp-sku" className="mt-2 text-xs text-foreground/60">
            SKU: {variant?.sku ?? product.variants[0]?.sku ?? "N/A"}
          </p>

          {/* Stock Status */}
          {lowStock ? (
            <p data-testid="stock-status" className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-orange-600">
              <span className="h-2 w-2 animate-pulse rounded-full bg-orange-400" />
              Only {variant!.stock} left!
            </p>
          ) : soldOut ? (
            <p data-testid="stock-status" className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-foreground/60">
              <span className="h-2 w-2 rounded-full bg-gray-400" />
              Sold out
            </p>
          ) : null}

          {/* Character Tags */}
          {characterLinks.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {characterLinks.map((c) => (
                <Link
                  key={c.slug}
                  href={`/character/${c.slug}`}
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold shadow-sm ring-1 ring-kawaii-pink/30 transition hover:shadow-md"
                  style={{ backgroundColor: `${c.hexColor}30` }}
                >
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: c.hexColor }} />
                  {c.name}
                </Link>
              ))}
            </div>
          )}

          {/* Variants */}
          {product.variants.length > 1 && (
            <div className="mt-5">
              <p className="text-xs font-semibold text-foreground/70">Size / Option</p>
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
                        "min-h-10 rounded-lg px-4 text-sm font-medium shadow-sm ring-1 transition",
                        active 
                          ? "bg-kawaii-pink text-white ring-kawaii-pink" 
                          : "bg-white ring-kawaii-pink/30 hover:bg-kawaii-pink/10",
                        v.stock <= 0 ? "opacity-50" : "",
                      ].join(" ")}
                    >
                      {v.title}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Catalog Info */}
          <div className="mt-6 rounded-xl bg-kawaii-cream/60 p-4 ring-1 ring-kawaii-pink/20">
            <p className="text-sm font-semibold">📦 Catalog Item</p>
            <p className="mt-1 text-xs text-foreground/65">
              {soldOut
                ? "This item is currently out of stock. Check back soon!"
                : "This item is available. Contact us for purchase details and shipping to Australia."}
            </p>
          </div>

          {/* Restock Form (if sold out) */}
          {soldOut && (
            <form data-testid="restock-form" className="mt-4 rounded-xl bg-white/70 p-4 ring-1 ring-kawaii-pink/20">
              <p className="text-sm font-semibold">🔔 Restock Notification</p>
              <p className="mt-1 text-xs text-foreground/60">Get notified when it&apos;s back in stock.</p>
              <input
                className="mt-3 w-full rounded-lg bg-white px-4 py-2.5 text-sm shadow-sm ring-1 ring-kawaii-pink/30 focus:outline-none focus:ring-2 focus:ring-kawaii-pink"
                placeholder="you@example.com"
                type="email"
              />
              <button
                type="button"
                className="mt-3 min-h-10 w-full rounded-lg bg-kawaii-mint px-5 text-sm font-semibold shadow-sm transition hover:brightness-105"
              >
                Notify me
              </button>
            </form>
          )}

          {/* Product Details Accordion */}
          <details data-testid="materials-accordion" className="mt-6 rounded-xl bg-white/60 p-4 ring-1 ring-kawaii-pink/20" open>
            <summary className="cursor-pointer text-sm font-semibold">Product Details</summary>
            <div className="mt-3 space-y-2 text-sm text-foreground/70">
              {product.materials && (
                <p>
                  <span className="font-semibold">Materials:</span> {product.materials}
                </p>
              )}
              {product.capacity && (
                <p>
                  <span className="font-semibold">Capacity:</span> {product.capacity}
                </p>
              )}
              {product.dimensions && (
                <p>
                  <span className="font-semibold">Dimensions:</span> {product.dimensions}
                </p>
              )}
              {product.features && product.features.length > 0 && (
                <div>
                  <span className="font-semibold">Features:</span>
                  <ul className="mt-1 ml-4 list-disc space-y-0.5">
                    {product.features.map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </details>
        </motion.section>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="rounded-xl bg-white/70 p-5 sm:p-8 shadow-sm ring-1 ring-kawaii-pink/30">
          <h2 className="font-display text-lg font-bold">You May Also Like</h2>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {related.map((p, i) => (
              <ProductCard key={p.slug} product={p} index={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
