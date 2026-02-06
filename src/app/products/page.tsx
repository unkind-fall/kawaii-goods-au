"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import type { Product } from "@/lib/data/sample";
import { SAMPLE_CHARACTERS } from "@/lib/data/sample";
import { ProductCard } from "@/components/product/ProductCard";
import { QuickAddDrawer } from "@/components/product/QuickAddDrawer";
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

export default function ProductsPage() {
  const router = useRouter();
  const sp = useSearchParams();
  const paramsRef = useRef<URLSearchParams>(new URLSearchParams());

  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [drawerSlug, setDrawerSlug] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

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
    return SAMPLE_CHARACTERS.filter((c) => c.type === "main").slice(0, 12);
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

  return (
    <div className="grid gap-6">
      <div className="rounded-kawaii-lg bg-white/70 p-8 shadow-kawaii ring-1 ring-kawaii-pink/30">
        <h1 className="text-2xl font-semibold">Products</h1>
        <p className="mt-2 text-sm text-foreground/70">High-density grids, clear prices, and cute badges.</p>
      </div>

      <section className="rounded-kawaii-lg bg-white/70 p-5 shadow-sm ring-1 ring-kawaii-pink/30">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <label className="text-xs font-semibold text-foreground/70" htmlFor="product-q">
              Search
            </label>
            <input
              id="product-q"
              data-testid="product-search"
              value={params.q}
              onChange={(e) => setParam("q", e.target.value)}
              placeholder="Search (try: Kitty)"
              className="mt-1 w-full rounded-kawaii bg-white px-4 py-3 text-sm shadow-sm ring-1 ring-kawaii-pink/30"
            />
            {recent.length ? (
              <div className="mt-2 text-xs text-foreground/60">
                Recent:{" "}
                {recent.slice(0, 5).map((t) => (
                  <button
                    key={t}
                    className="mr-2 rounded-kawaii bg-kawaii-cream px-2 py-1 hover:bg-white"
                    type="button"
                    onClick={() => setParam("q", t)}
                  >
                    {t}
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          <div>
            <label className="text-xs font-semibold text-foreground/70" htmlFor="product-category">
              Category
            </label>
            <select
              id="product-category"
              data-testid="filter-category"
              value={params.category}
              onChange={(e) => setParam("category", e.target.value)}
              className="mt-1 min-h-11 w-full rounded-kawaii bg-white px-4 text-sm shadow-sm ring-1 ring-kawaii-pink/30"
            >
              <option value="all">All</option>
              <option value="stationery">Stationery</option>
              <option value="plush">Plush</option>
              <option value="accessories">Accessories</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-foreground/70" htmlFor="product-character">
              Character
            </label>
            <select
              id="product-character"
              data-testid="filter-character"
              value={params.character}
              onChange={(e) => setParam("character", e.target.value)}
              className="mt-1 min-h-11 w-full rounded-kawaii bg-white px-4 text-sm shadow-sm ring-1 ring-kawaii-pink/30"
            >
              <option value="">All</option>
              {charactersForFilter.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-foreground/70" htmlFor="product-sort">
              Sort
            </label>
            <select
              id="product-sort"
              data-testid="filter-sort"
              value={params.sort}
              onChange={(e) => setParam("sort", e.target.value)}
              className="mt-1 min-h-11 w-full rounded-kawaii bg-white px-4 text-sm shadow-sm ring-1 ring-kawaii-pink/30"
            >
              <option value="newest">Newest</option>
              <option value="price_asc">Price: Low to High</option>
            </select>
          </div>
        </div>

        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <div>
            <label className="text-xs font-semibold text-foreground/70" htmlFor="min">
              Min (cents)
            </label>
            <input
              id="min"
              data-testid="filter-min"
              inputMode="numeric"
              value={params.min}
              onChange={(e) => setParam("min", e.target.value)}
              className="mt-1 w-full rounded-kawaii bg-white px-4 py-3 text-sm shadow-sm ring-1 ring-kawaii-pink/30"
              placeholder="0"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-foreground/70" htmlFor="max">
              Max (cents)
            </label>
            <input
              id="max"
              data-testid="filter-max"
              inputMode="numeric"
              value={params.max}
              onChange={(e) => setParam("max", e.target.value)}
              className="mt-1 w-full rounded-kawaii bg-white px-4 py-3 text-sm shadow-sm ring-1 ring-kawaii-pink/30"
              placeholder="99999"
            />
          </div>
          <div className="sm:col-span-2 lg:col-span-3">
            <p data-testid="result-count" className="mt-7 text-sm text-foreground/70">
              {loading ? "Loading..." : `${data?.total ?? 0} results`}
            </p>
          </div>
        </div>
      </section>

      <section>
        <div data-testid="product-grid" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {(data?.items ?? []).map((p) => (
            <ProductCard
              key={p.slug}
              product={p}
              onQuickAdd={(slug) => {
                setDrawerSlug(slug);
                setDrawerOpen(true);
              }}
            />
          ))}
        </div>
      </section>

      {data ? (
        <nav aria-label="Pagination" className="flex flex-wrap justify-center gap-2">
          {Array.from({ length: data.totalPages }).slice(0, 8).map((_, i) => {
            const p = i + 1;
            const active = p === data.page;
            return (
              <button
                key={p}
                data-testid={`page-${p}`}
                type="button"
                onClick={() => setPage(p)}
                className={[
                  "min-h-11 rounded-kawaii px-4 text-sm font-semibold shadow-sm ring-1 ring-kawaii-pink/30",
                  active ? "bg-kawaii-pink" : "bg-white/80 hover:bg-white",
                ].join(" ")}
              >
                {p}
              </button>
            );
          })}
        </nav>
      ) : null}

      <QuickAddDrawer
        slug={drawerSlug}
        open={drawerOpen}
        onClose={() => {
          setDrawerOpen(false);
          setDrawerSlug(null);
        }}
      />
    </div>
  );
}
