"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

import type { Product, Character } from "@/lib/data/sample";
import { SAMPLE_CHARACTERS, SAMPLE_PRODUCTS } from "@/lib/data/sample";
import { ProductCard } from "@/components/product/ProductCard";
import { CharacterCard } from "@/components/character/CharacterCard";
import { applySynonyms } from "@/lib/search/logic";

export default function SearchPage() {
  const sp = useSearchParams();
  const rawQ = sp.get("q") ?? "";
  const q = useMemo(() => applySynonyms(rawQ).toLowerCase(), [rawQ]);

  const [inputVal, setInputVal] = useState(rawQ);

  useEffect(() => {
    setInputVal(rawQ);
  }, [rawQ]);

  const matchedProducts = useMemo<Product[]>(() => {
    if (!q) return [];
    return SAMPLE_PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.characterTags.some((t) => t.includes(q)),
    ).slice(0, 12);
  }, [q]);

  const matchedCharacters = useMemo<Character[]>(() => {
    if (!q) return [];
    return SAMPLE_CHARACTERS.filter(
      (c) => c.name.toLowerCase().includes(q) || c.slug.includes(q),
    ).slice(0, 8);
  }, [q]);

  return (
    <div className="grid gap-6">
      <div className="relative overflow-hidden rounded-kawaii-lg bg-white/70 p-8 shadow-kawaii ring-1 ring-kawaii-pink/30">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full bg-kawaii-sky/30 blur-2xl"
        />
        <h1 className="font-display text-2xl font-bold">Search</h1>
        <form
          className="mt-4"
          onSubmit={(e) => {
            e.preventDefault();
            const normalized = applySynonyms(inputVal);
            window.location.href = `/search?q=${encodeURIComponent(normalized)}`;
          }}
        >
          <div className="flex gap-2">
            <input
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Search characters and products..."
              className="min-h-11 flex-1 rounded-kawaii bg-white px-4 text-sm shadow-sm ring-1 ring-kawaii-pink/30"
            />
            <button
              type="submit"
              className="min-h-11 rounded-kawaii bg-kawaii-pink px-5 text-sm font-semibold shadow-sm transition hover:shadow-kawaii-hover"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      {q && matchedCharacters.length === 0 && matchedProducts.length === 0 ? (
        <div className="rounded-kawaii-lg bg-white/70 p-8 text-center shadow-sm ring-1 ring-kawaii-pink/30">
          <p className="text-2xl" aria-hidden>&#65288;&#12290;&#8226;&#769;&#65103;&#8226;&#768;&#12290;&#65289;</p>
          <p className="mt-3 text-sm text-foreground/70">
            No results for &ldquo;{rawQ}&rdquo;. Try a different search term.
          </p>
        </div>
      ) : null}

      {!q ? (
        <div className="rounded-kawaii-lg bg-white/70 p-8 text-center shadow-sm ring-1 ring-kawaii-pink/30">
          <p className="text-sm text-foreground/70">
            Type something to search across products and characters.
          </p>
        </div>
      ) : null}

      {matchedCharacters.length > 0 ? (
        <section>
          <h2 className="font-display text-lg font-bold">Characters</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {matchedCharacters.map((c, i) => (
              <CharacterCard key={c.slug} character={c} index={i} />
            ))}
          </div>
        </section>
      ) : null}

      {matchedProducts.length > 0 ? (
        <section>
          <h2 className="font-display text-lg font-bold">Products</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {matchedProducts.map((p, i) => (
              <ProductCard key={p.slug} product={p} index={i} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
