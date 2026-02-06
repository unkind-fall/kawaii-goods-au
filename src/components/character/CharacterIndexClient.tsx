"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import type { Character } from "@/lib/data/sample";

type ApiResponse = { items: Character[]; nextCursor: number | null; total: number };

export function CharacterIndexClient() {
  const [type, setType] = useState<"all" | "main" | "sub">("all");
  const [q, setQ] = useState("");
  const [items, setItems] = useState<Character[]>([]);
  const [nextCursor, setNextCursor] = useState<number | null>(0);
  const [loading, setLoading] = useState(false);

  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const queryKey = useMemo(() => `${type}:${q}`, [type, q]);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    (async () => {
      const res = await fetch(`/api/characters?type=${encodeURIComponent(type)}&q=${encodeURIComponent(q)}&cursor=0&limit=20`);
      const data = (await res.json()) as ApiResponse;
      if (!alive) return;
      setItems(data.items);
      setNextCursor(data.nextCursor);
      setLoading(false);
    })().catch(() => setLoading(false));
    return () => {
      alive = false;
    };
  }, [queryKey]);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    if (nextCursor == null) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        if (loading) return;
        void loadMore();
      },
      { rootMargin: "240px" },
    );
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nextCursor, loading, queryKey]);

  async function loadMore() {
    if (nextCursor == null) return;
    setLoading(true);
    const res = await fetch(
      `/api/characters?type=${encodeURIComponent(type)}&q=${encodeURIComponent(q)}&cursor=${nextCursor}&limit=20`,
    );
    const data = (await res.json()) as ApiResponse;
    setItems((prev) => [...prev, ...data.items]);
    setNextCursor(data.nextCursor);
    setLoading(false);
  }

  return (
    <div>
      <div className="flex flex-col gap-3 rounded-kawaii-lg bg-white/70 p-5 shadow-sm ring-1 ring-kawaii-pink/30 sm:flex-row sm:items-end">
        <div className="flex-1">
          <label className="text-xs font-semibold text-foreground/70" htmlFor="character-search">
            Search
          </label>
          <input
            id="character-search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search characters..."
            className="mt-1 w-full rounded-kawaii bg-white px-4 py-3 text-sm shadow-sm ring-1 ring-kawaii-pink/30"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-foreground/70" htmlFor="character-type">
            Filter
          </label>
          <select
            id="character-type"
            data-testid="character-type-filter"
            value={type}
            onChange={(e) => setType(e.target.value as "all" | "main" | "sub")}
            className="mt-1 min-h-11 w-full rounded-kawaii bg-white px-4 text-sm shadow-sm ring-1 ring-kawaii-pink/30"
          >
            <option value="all">All</option>
            <option value="main">Main</option>
            <option value="sub">Sub-character</option>
          </select>
        </div>
      </div>

      {items.length === 0 && !loading ? (
        <div data-testid="sad-mascot" className="mt-8 rounded-kawaii-lg bg-white/70 p-8 text-center shadow-sm ring-1 ring-kawaii-pink/30">
          <p className="text-2xl" aria-hidden>
            (｡•́︿•̀｡)
          </p>
          <p className="mt-2 text-sm text-foreground/70">No characters found. Try a different search.</p>
        </div>
      ) : null}

      <div data-testid="character-grid" className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((c) => (
          <div key={c.slug} data-testid="character-grid-item">
            {/* lazy image handled inside card */}
            {/** */}
            {/* eslint-disable-next-line @typescript-eslint/no-use-before-define */}
            <CharacterCardLazy character={c} />
          </div>
        ))}
      </div>

      <div ref={sentinelRef} className="h-10" />

      {nextCursor != null ? (
        <div className="mt-4 flex justify-center">
          <button
            data-testid="characters-load-more"
            type="button"
            className="min-h-11 rounded-kawaii bg-white/80 px-6 text-sm font-semibold shadow-sm ring-1 ring-kawaii-pink/30 transition hover:bg-white"
            onClick={() => void loadMore()}
            disabled={loading}
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      ) : null}
    </div>
  );
}

// Local import to keep module graph simple for now.
import { CharacterCard } from "./CharacterCard";
function CharacterCardLazy({ character }: { character: Character }) {
  return <CharacterCard character={character} />;
}

