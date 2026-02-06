"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import type { Character } from "@/lib/data/sample";
import { SAMPLE_CHARACTERS, SAMPLE_PRODUCTS } from "@/lib/data/sample";
import { ProductCard } from "@/components/product/ProductCard";
import { useToast } from "@/components/ui/Toast";

export function CharacterShrine({ character }: { character: Character }) {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(12);
  const [expanded, setExpanded] = useState(false);
  const [justLiked, setJustLiked] = useState(false);
  const { toast } = useToast();

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
    if (nextLiked) {
      setJustLiked(true);
      setTimeout(() => setJustLiked(false), 600);
    }
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
        <span aria-hidden>&rsaquo;</span>{" "}
        <Link className="hover:underline" href="/characters">
          Characters
        </Link>{" "}
        <span aria-hidden>&rsaquo;</span> <span className="font-semibold text-foreground/80">{character.name}</span>
      </nav>

      <section
        data-testid="character-hero"
        className="relative overflow-hidden rounded-kawaii-lg p-8 shadow-kawaii ring-1 ring-kawaii-pink/30"
        style={{ backgroundColor: character.hexColor }}
      >
        {/* Soft gradient overlay */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${character.hexColor}CC 0%, transparent 60%)`,
          }}
        />
        <FloatingStamps />
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 24 }}
          className="relative z-10 max-w-2xl"
        >
          <p className="inline-flex rounded-kawaii bg-white/70 px-4 py-2 text-xs font-semibold text-foreground/75">
            Character Shrine
          </p>
          <h1 className="mt-4 text-balance text-3xl font-semibold">{character.name}</h1>
          <p className="mt-2 text-sm text-foreground/75">A gentle spotlight on a very cute friend.</p>

          <div className="mt-6 flex flex-wrap gap-2">
            <button
              data-testid="character-like"
              type="button"
              className={[
                "inline-flex min-h-11 items-center gap-2 rounded-kawaii bg-white/80 px-5 text-sm font-semibold shadow-sm ring-1 ring-kawaii-pink/30 transition",
                justLiked ? "animate-heart-beat" : "",
              ].join(" ")}
              onClick={toggleLike}
            >
              <span aria-hidden>{liked ? "\uD83D\uDC97" : "\uD83E\uDD0D"}</span>
              Like
              <span data-testid="character-like-count" className="text-xs text-foreground/70">
                {count}
              </span>
            </button>

            <button
              data-testid="character-share"
              type="button"
              className="inline-flex min-h-11 items-center gap-2 rounded-kawaii bg-white/80 px-5 text-sm font-semibold shadow-sm ring-1 ring-kawaii-pink/30 transition hover:shadow-kawaii-hover"
              onClick={async () => {
                const text = shareUrl || window.location.href;
                await navigator.clipboard.writeText(text);
                toast("Link copied!", "happy");
              }}
            >
              <span aria-hidden>&#128279;</span>
              Share
            </button>
          </div>
        </motion.div>
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
            className="mt-2 inline-flex rounded-kawaii bg-kawaii-lavender/40 px-4 py-2 text-xs font-semibold transition hover:bg-kawaii-lavender/60"
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
              style={{ borderLeft: `3px solid ${f.hexColor}` }}
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
          {relatedProducts.map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i} />
          ))}
          {relatedProducts.length === 0 ? <p className="text-sm text-foreground/70">No products yet.</p> : null}
        </div>
      </section>

      <section className="flex items-center justify-between rounded-kawaii-lg bg-white/60 p-6 shadow-sm ring-1 ring-kawaii-pink/20">
        <div>
          {prev ? (
            <Link data-testid="character-prev" className="text-sm font-semibold hover:underline" href={`/character/${prev.slug}`}>
              &larr; {prev.name}
            </Link>
          ) : (
            <span />
          )}
        </div>
        <div>
          {next ? (
            <Link data-testid="character-next" className="text-sm font-semibold hover:underline" href={`/character/${next.slug}`}>
              {next.name} &rarr;
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
        className="absolute left-6 top-6 text-lg"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        &#9829;
      </motion.div>
      <motion.div
        className="absolute right-10 top-10 text-xl"
        animate={{ y: [0, -8, 0], rotate: [0, 12, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        &#10022;
      </motion.div>
      <motion.div
        className="absolute bottom-8 left-1/3 text-lg"
        animate={{ y: [0, -7, 0] }}
        transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
      >
        &#9733;
      </motion.div>
      <motion.div
        className="absolute bottom-12 right-1/4 text-sm"
        animate={{ y: [0, -5, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
      >
        &#9825;
      </motion.div>
    </div>
  );
}
