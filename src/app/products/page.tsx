"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

import type { Product } from "@/lib/data/sample";
import { SAMPLE_CHARACTERS, PRODUCT_CATEGORIES } from "@/lib/data/sample";
import { ProductCard } from "@/components/product/ProductCard";
import { applySynonyms } from "@/lib/search/logic";

type ApiResponse = {
  items: Product[];
  total: number;
  page: number;
  totalPages: number;
  pageSize: number;
};

function asInt(v: string | null, fallback: number) {
  if (v == null) return fallback;
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};

export default function ProductsPage() {
  const router = useRouter();
  const sp = useSearchParams();
  const paramsRef = useRef<URLSearchParams>(new URLSearchParams());

  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const params = useMemo(() => {
    return {
      q: sp.get("q") ?? "",
      category: sp.get("category") ?? "all",
      character: sp.get("character") ?? "",
      min: sp.get("min") ?? "",
      max: sp.get("max") ?? "",
      sort: sp.get("sort") ?? "newest",
      page: asInt(sp.get("page"), 1),
    };
  }, [sp]);

  useEffect(() => {
    paramsRef.current = new URLSearchParams(sp.toString());
  }, [sp]);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    (async () => {
      const qs = new URLSearchParams();
      for (const [k, v] of Object.entries(params)) {
        if (v === "" || v === "all") continue;
        qs.set(k, String(v));
      }
      const res = await fetch(`/api/products?${qs.toString()}`);
      const json = (await res.json()) as ApiResponse;
      if (!alive) return;
      setData(json);
      setLoading(false);
    })().catch(() => setLoading(false));
    return () => {
      alive = false;
    };
  }, [params]);

  function setParam(key: string, value: string) {
    const next = new URLSearchParams(paramsRef.current.toString());
    const v = key === "q" ? applySynonyms(value) : value;
    if (!v || v === "all") next.delete(key);
    else next.set(key, v);
    next.delete("page");
    paramsRef.current = next;
    router.push(`/products?${next.toString()}`);

    if (key === "q") {
      try {
        const normalized = applySynonyms(value);
        if (!normalized) return;
        const storageKey = "kawaii_recent_searches";
        const prev = JSON.parse(localStorage.getItem(storageKey) ?? "[]") as string[];
        const merged = [normalized, ...prev.filter((x) => x !== normalized)].slice(0, 8);
        localStorage.setItem(storageKey, JSON.stringify(merged));
      } catch {
        // ignore
      }
    }
  }

  function setPage(page: number) {
    const next = new URLSearchParams(paramsRef.current.toString());
    if (page <= 1) next.delete("page");
    else next.set("page", String(page));
    paramsRef.current = next;
    router.push(`/products?${next.toString()}`);
  }

  const charactersForFilter = useMemo(() => {
    return SAMPLE_CHARACTERS.filter((c) => c.type === "main");
  }, []);

  const [recent, setRecent] = useState<string[]>([]);
  useEffect(() => {
    try {
      const raw = localStorage.getItem("kawaii_recent_searches");
      setRecent(raw ? (JSON.parse(raw) as string[]) : []);
    } catch {
      setRecent([]);
    }
  }, [params.q]);

  const activeCategory = PRODUCT_CATEGORIES.find(c => c.slug === params.category);

  return (
    <div className="grid gap-6">
      {/* Header */}
      <div className="rounded-xl bg-white/70 p-5 sm:p-8 shadow-sm ring-1 ring-kawaii-pink/30">
        <h1 className="font-display text-xl sm:text-2xl font-bold">
          {activeCategory ? (
            <>
              <span className="mr-2">{activeCategory.emoji}</span>
              {activeCategory.name}
              <span className="ml-2 text-base font-normal text-foreground/50">{activeCategory.nameJp}</span>
            </>
          ) : (
            "All Products"
          )}
        </h1>
        <p className="mt-2 text-sm text-foreground/70">
          Authentic Skater products from Japan — lunch boxes, bottles, kitchen goods & more
        </p>
      </div>

      {/* Category Pills - Mobile Horizontal Scroll */}
      <div className="-mx-4 overflow-x-auto px-4 scrollbar-hide">
        <div className="flex gap-2 pb-2">
          <button
            type="button"
            onClick={() => setParam("category", "all")}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${
              params.category === "all" 
                ? "bg-kawaii-pink text-white shadow-md" 
                : "bg-white/80 ring-1 ring-kawaii-pink/30 hover:bg-white"
            }`}
          >
            All
          </button>
          {PRODUCT_CATEGORIES.map((cat) => (
            <button
              key={cat.slug}
              type="button"
              onClick={() => setParam("category", cat.slug)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${
                params.category === cat.slug
                  ? "bg-kawaii-pink text-white shadow-md"
                  : "bg-white/80 ring-1 ring-kawaii-pink/30 hover:bg-white"
              }`}
            >
              <span className="mr-1">{cat.emoji}</span>
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Filters */}
      <section className="rounded-xl bg-white/70 p-4 sm:p-5 shadow-sm ring-1 ring-kawaii-pink/30">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {/* Search */}
          <div className="sm:col-span-2 lg:col-span-1">
            <label className="text-xs font-semibold text-foreground/70" htmlFor="product-q">
              Search
            </label>
            <input
              id="product-q"
              data-testid="product-search"
              value={params.q}
              onChange={(e) => setParam("q", e.target.value)}
              placeholder="Search products..."
              className="mt-1 w-full rounded-lg bg-white px-4 py-2.5 text-sm shadow-sm ring-1 ring-kawaii-pink/30 focus:outline-none focus:ring-2 focus:ring-kawaii-pink"
            />
            {recent.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1">
                {recent.slice(0, 3).map((t) => (
                  <button
                    key={t}
                    className="rounded-full bg-kawaii-cream px-2 py-1 text-xs hover:bg-kawaii-pink/20"
                    type="button"
                    onClick={() => setParam("q", t)}
                  >
                    {t}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Character Filter */}
          <div>
            <label className="text-xs font-semibold text-foreground/70" htmlFor="product-character">
              Character
            </label>
            <select
              id="product-character"
              data-testid="filter-character"
              value={params.character}
              onChange={(e) => setParam("character", e.target.value)}
              className="mt-1 min-h-10 w-full rounded-lg bg-white px-3 text-sm shadow-sm ring-1 ring-kawaii-pink/30"
            >
              <option value="">All Characters</option>
              {charactersForFilter.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div>
            <label className="text-xs font-semibold text-foreground/70" htmlFor="product-sort">
              Sort by
            </label>
            <select
              id="product-sort"
              data-testid="filter-sort"
              value={params.sort}
              onChange={(e) => setParam("sort", e.target.value)}
              className="mt-1 min-h-10 w-full rounded-lg bg-white px-3 text-sm shadow-sm ring-1 ring-kawaii-pink/30"
            >
              <option value="newest">Newest</option>
              <option value="price_asc">Price: Low → High</option>
              <option value="price_desc">Price: High → Low</option>
              <option value="popular">Popular</option>
            </select>
          </div>

          {/* Results Count */}
          <div className="flex items-end">
            <p data-testid="result-count" className="text-sm text-foreground/70">
              {loading ? (
                <span className="inline-flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-kawaii-pink border-t-transparent" />
                  Loading...
                </span>
              ) : (
                `${data?.total ?? 0} products found`
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section>
        <motion.div 
          data-testid="product-grid" 
          className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4"
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          {(data?.items ?? []).map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i} />
          ))}
        </motion.div>

        {/* Empty State */}
        {!loading && data?.items.length === 0 && (
          <div className="rounded-xl bg-white/70 p-8 text-center ring-1 ring-kawaii-pink/30">
            <p className="text-3xl">🔍</p>
            <p className="mt-2 font-display font-bold">No products found</p>
            <p className="mt-1 text-sm text-foreground/60">Try adjusting your filters</p>
            <button
              type="button"
              onClick={() => {
                router.push("/products");
              }}
              className="mt-4 rounded-lg bg-kawaii-pink px-4 py-2 text-sm font-medium text-white"
            >
              Clear filters
            </button>
          </div>
        )}
      </section>

      {/* Pagination */}
      {data && data.totalPages > 1 && (
        <nav aria-label="Pagination" className="flex flex-wrap justify-center gap-2">
          {data.page > 1 && (
            <button
              type="button"
              onClick={() => setPage(data.page - 1)}
              className="min-h-10 rounded-lg bg-white/80 px-3 text-sm font-medium shadow-sm ring-1 ring-kawaii-pink/30 hover:bg-white"
            >
              ← Prev
            </button>
          )}
          {Array.from({ length: Math.min(data.totalPages, 5) }).map((_, i) => {
            const p = i + 1;
            const active = p === data.page;
            return (
              <button
                key={p}
                data-testid={`page-${p}`}
                type="button"
                onClick={() => setPage(p)}
                className={`min-h-10 min-w-10 rounded-lg px-3 text-sm font-medium shadow-sm ring-1 ring-kawaii-pink/30 transition ${
                  active ? "bg-kawaii-pink text-white" : "bg-white/80 hover:bg-white"
                }`}
              >
                {p}
              </button>
            );
          })}
          {data.page < data.totalPages && (
            <button
              type="button"
              onClick={() => setPage(data.page + 1)}
              className="min-h-10 rounded-lg bg-white/80 px-3 text-sm font-medium shadow-sm ring-1 ring-kawaii-pink/30 hover:bg-white"
            >
              Next →
            </button>
          )}
        </nav>
      )}
    </div>
  );
}
