"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import type { Product } from "@/lib/data/sample";
import { useCart } from "@/lib/cart/store";
import { formatAud } from "@/lib/utils/format";
import { estimateShippingLabel } from "@/lib/utils/shipping";
import { ImageGallery } from "./ImageGallery";
import { ProductCard } from "./ProductCard";
import { SAMPLE_PRODUCTS } from "@/lib/data/sample";

export function ProductDetail({ product }: { product: Product }) {
  const cart = useCart();
  const [variantId, setVariantId] = useState<string | null>(product.variants.length === 1 ? product.variants[0]!.id : null);

  const variant = useMemo(() => product.variants.find((v) => v.id === variantId) ?? null, [product.variants, variantId]);
  const soldOut = variant ? variant.stock <= 0 : product.variants.every((v) => v.stock <= 0);

  const priceCents = variant?.priceCents ?? product.priceCents;
  const lowStock = variant ? variant.stock > 0 && variant.stock <= 3 : false;

  const fbt = useMemo(() => SAMPLE_PRODUCTS.filter((p) => p.slug !== product.slug).slice(0, 2), [product.slug]);

  return (
    <div className="grid gap-6">
      <nav className="text-xs text-foreground/65">
        <Link className="hover:underline" href="/">
          Home
        </Link>{" "}
        <span aria-hidden>›</span>{" "}
        <Link className="hover:underline" href="/products">
          Products
        </Link>{" "}
        <span aria-hidden>›</span> <span className="font-semibold text-foreground/80">{product.name}</span>
      </nav>

      <div className="grid gap-6 lg:grid-cols-2">
        <ImageGallery images={product.images} />

        <section className="rounded-kawaii-lg bg-white/70 p-8 shadow-kawaii ring-1 ring-kawaii-pink/30">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold">{product.name}</h1>
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

          <p data-testid="ship-estimate" className="mt-2 text-sm text-foreground/70">
            {estimateShippingLabel()}
          </p>

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
                        "min-h-11 rounded-kawaii px-4 text-sm font-semibold shadow-sm ring-1 ring-kawaii-pink/30",
                        active ? "bg-kawaii-sky/40" : "bg-white/80 hover:bg-white",
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

          <div className="mt-6 grid gap-2">
            <button
              data-testid="add-to-cart"
              type="button"
              className="min-h-11 rounded-kawaii bg-kawaii-pink px-6 text-sm font-semibold shadow-sm transition hover:shadow-kawaii-hover disabled:opacity-60"
              disabled={!variantId || (variant ? variant.stock <= 0 : true)}
              onClick={() => {
                const v = variant ?? product.variants[0]!;
                cart.addItem({
                  productSlug: product.slug,
                  variantId: v.id,
                  name: product.name,
                  priceCents: v.priceCents ?? product.priceCents,
                  qty: 1,
                  sku: v.sku,
                  imageUrl: product.images[0]?.url,
                  maxPerCustomer: product.maxPerCustomer,
                });
              }}
            >
              Add to Cart
            </button>

            {soldOut ? (
              <form data-testid="restock-form" className="rounded-kawaii bg-white/70 p-4 ring-1 ring-kawaii-pink/20">
                <p className="text-sm font-semibold">Restock Notification</p>
                <p className="mt-1 text-xs text-foreground/60">Get an email when it’s back.</p>
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
        </section>
      </div>

      <section className="rounded-kawaii-lg bg-white/70 p-8 shadow-sm ring-1 ring-kawaii-pink/30">
        <h2 className="text-lg font-semibold">Frequently Bought Together</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {fbt.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
        <button
          data-testid="add-fbt"
          type="button"
          className="mt-5 min-h-11 rounded-kawaii bg-kawaii-peach/70 px-6 text-sm font-semibold shadow-sm"
          onClick={() => {
            for (const p of fbt) {
              const v = p.variants[0]!;
              if (v.stock <= 0) continue;
              cart.addItem({
                productSlug: p.slug,
                variantId: v.id,
                name: p.name,
                priceCents: v.priceCents ?? p.priceCents,
                qty: 1,
                sku: v.sku,
                imageUrl: p.images[0]?.url,
                maxPerCustomer: p.maxPerCustomer,
              });
            }
          }}
        >
          Add both to cart
        </button>
      </section>
    </div>
  );
}
