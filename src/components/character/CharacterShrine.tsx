"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import type { Character } from "@/lib/data/sample";
import { SAMPLE_CHARACTERS, SAMPLE_PRODUCTS } from "@/lib/data/sample";
import { ProductCard } from "@/components/product/ProductCard";

export function CharacterShrine({ character }: { character: Character }) {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(12);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const key = `kawaii_like_${character.slug}`;
    try {
      const raw = localStorage.getItem(key);
      if (raw) {
        const parsed = JSON.parse(raw) as { liked: boolean; count: number };
        setLiked(parsed.liked);
        setCount(parsed.count);
      } else {
        setCount(12);
      }
    } catch {
      setCount(12);
    }
  }, [character.slug]);

  function toggleLike() {
    const nextLiked = !liked;
    setLiked(nextLiked);
    const nextCount = count + (nextLiked ? 1 : -1);
    setCount(nextCount);
    const key = `kawaii_like_${character.slug}`;
    try {
      localStorage.setItem(key, JSON.stringify({ liked: nextLiked, count: nextCount }));
    } catch {
      // ignore
    }
  }

  const friends = useMemo(
    () => SAMPLE_CHARACTERS.filter((c) => character.friends.includes(c.slug)).slice(0, 8),
    [character.friends],
  );

  const relatedProducts = useMemo(
    () => SAMPLE_PRODUCTS.filter((p) => p.characterTags.includes(character.slug)).slice(0, 8),
    [character.slug],
  );

  const ordered = useMemo(() => SAMPLE_CHARACTERS.slice().sort((a, b) => a.name.localeCompare(b.name)), []);
  const idx = ordered.findIndex((c) => c.slug === character.slug);
  const prev = idx > 0 ? ordered[idx - 1] : null;
  const next = idx >= 0 && idx < ordered.length - 1 ? ordered[idx + 1] : null;

  const shareUrl = useMemo(() => {
    if (typeof window === "undefined") return "";
    const u = new URL(window.location.href);
    u.searchParams.set("utm_source", "share");
    u.searchParams.set("utm_medium", "copy");
    u.searchParams.set("utm_campaign", "character");
    return u.toString();
  }, []);

  return (
    <div className="grid gap-6">
      <nav data-testid="breadcrumbs" className="text-xs text-foreground/65">
        <Link className="hover:underline" href="/">
          Home
        </Link>{" "}
        <span aria-hidden>›</span>{" "}
        <Link className="hover:underline" href="/characters">
          Characters
        </Link>{" "}
        <span aria-hidden>›</span> <span className="font-semibold text-foreground/80">{character.name}</span>
      </nav>

      <section
        data-testid="character-hero"
        className="relative overflow-hidden rounded-kawaii-lg p-8 shadow-kawaii ring-1 ring-kawaii-pink/30"
        style={{ backgroundColor: character.hexColor }}
      >
        <FloatingStamps />
        <div className="relative z-10 max-w-2xl">
          <p className="inline-flex rounded-kawaii bg-white/70 px-4 py-2 text-xs font-semibold text-foreground/75">
            Character Shrine
          </p>
          <h1 className="mt-4 text-balance text-3xl font-semibold">{character.name}</h1>
          <p className="mt-2 text-sm text-foreground/75">A gentle spotlight on a very cute friend.</p>

          <div className="mt-6 flex flex-wrap gap-2">
            <button
              data-testid="character-like"
              type="button"
              className="inline-flex min-h-11 items-center gap-2 rounded-kawaii bg-white/80 px-5 text-sm font-semibold shadow-sm ring-1 ring-kawaii-pink/30"
              onClick={toggleLike}
            >
              <span aria-hidden>{liked ? "💗" : "🤍"}</span>
              Like
              <span data-testid="character-like-count" className="text-xs text-foreground/70">
                {count}
              </span>
            </button>

            <button
              data-testid="character-share"
              type="button"
              className="inline-flex min-h-11 items-center gap-2 rounded-kawaii bg-white/80 px-5 text-sm font-semibold shadow-sm ring-1 ring-kawaii-pink/30"
              onClick={async () => {
                const text = shareUrl || window.location.href;
                await navigator.clipboard.writeText(text);
              }}
            >
              <span aria-hidden>🔗</span>
              Share
            </button>
          </div>
        </div>
      </section>

      <section className="grid gap-4 rounded-kawaii-lg bg-white/70 p-8 shadow-sm ring-1 ring-kawaii-pink/30">
        <h2 className="text-lg font-semibold">About</h2>

        {character.birthday ? (
          <p data-testid="character-birthday" className="text-sm text-foreground/75">
            <span className="font-semibold">Birthday:</span> {character.birthday}
          </p>
        ) : null}

        {character.interests?.length ? (
          <p data-testid="character-interests" className="text-sm text-foreground/75">
            <span className="font-semibold">Interests:</span> {character.interests.join(", ")}
          </p>
        ) : null}

        <div>
          <p
            data-testid="character-bio"
            className={[
              "text-sm leading-relaxed text-foreground/75",
              expanded ? "" : "line-clamp-3",
            ].join(" ")}
          >
            {character.bio}
          </p>
          <button
            data-testid="character-read-more"
            type="button"
            className="mt-2 inline-flex rounded-kawaii bg-kawaii-lavender/40 px-4 py-2 text-xs font-semibold"
            onClick={() => setExpanded((v) => !v)}
          >
            {expanded ? "Show Less" : "Read More"}
          </button>
        </div>
      </section>

      <section className="rounded-kawaii-lg bg-white/70 p-8 shadow-sm ring-1 ring-kawaii-pink/30">
        <h2 className="text-lg font-semibold">Related Friends</h2>
        <div data-testid="related-friends" className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {friends.map((f) => (
            <Link
              key={f.slug}
              href={`/character/${f.slug}`}
              className="rounded-kawaii bg-white/70 p-4 shadow-sm ring-1 ring-kawaii-pink/20 transition hover:-translate-y-0.5 hover:shadow-kawaii-hover"
            >
              <p className="text-sm font-semibold">{f.name}</p>
              <p className="mt-1 text-xs text-foreground/60">{f.type === "main" ? "Main" : "Sub-character"}</p>
            </Link>
          ))}
          {friends.length === 0 ? <p className="text-sm text-foreground/70">No friends listed yet.</p> : null}
        </div>
      </section>

      <section className="rounded-kawaii-lg bg-white/70 p-8 shadow-sm ring-1 ring-kawaii-pink/30">
        <h2 className="text-lg font-semibold">Related Products</h2>
        <div data-testid="related-products" className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {relatedProducts.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
          {relatedProducts.length === 0 ? <p className="text-sm text-foreground/70">No products yet.</p> : null}
        </div>
      </section>

      <section className="flex items-center justify-between rounded-kawaii-lg bg-white/60 p-6 shadow-sm ring-1 ring-kawaii-pink/20">
        <div>
          {prev ? (
            <Link data-testid="character-prev" className="text-sm font-semibold hover:underline" href={`/character/${prev.slug}`}>
              ← {prev.name}
            </Link>
          ) : (
            <span />
          )}
        </div>
        <div>
          {next ? (
            <Link data-testid="character-next" className="text-sm font-semibold hover:underline" href={`/character/${next.slug}`}>
              {next.name} →
            </Link>
          ) : (
            <span />
          )}
        </div>
      </section>
    </div>
  );
}

function FloatingStamps() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 opacity-50">
      <motion.div
        className="absolute left-6 top-6 h-10 w-10 rounded-kawaii bg-white/40"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-10 top-10 h-12 w-12 rounded-full bg-white/30"
        animate={{ y: [0, -8, 0], rotate: [0, 6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-8 left-1/3 h-9 w-9 rounded-kawaii bg-white/35"
        animate={{ y: [0, -7, 0] }}
        transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
