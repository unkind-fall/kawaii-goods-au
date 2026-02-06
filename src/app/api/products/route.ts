import { NextResponse } from "next/server";

import { SAMPLE_PRODUCTS } from "@/lib/data/sample";
import { applySynonyms, normalizeQuery } from "@/lib/search/logic";

export const runtime = "edge";

function asInt(value: string | null, fallback: number) {
  if (value == null) return fallback;
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

export async function GET(req: Request) {
  const url = new URL(req.url);

  const qRaw = url.searchParams.get("q") ?? "";
  const q = applySynonyms(qRaw);
  const category = (url.searchParams.get("category") ?? "all") as "all" | "stationery" | "plush" | "accessories";
  const character = url.searchParams.get("character");
  const min = asInt(url.searchParams.get("min"), 0);
  const max = asInt(url.searchParams.get("max"), Number.MAX_SAFE_INTEGER);
  const sort = (url.searchParams.get("sort") ?? "newest") as "newest" | "price_asc";
  const page = Math.max(1, asInt(url.searchParams.get("page"), 1));
  const pageSize = Math.min(24, Math.max(1, asInt(url.searchParams.get("pageSize"), 12)));

  let items = SAMPLE_PRODUCTS.slice();

  if (category !== "all") items = items.filter((p) => p.category === category);
  if (character) items = items.filter((p) => p.characterTags.includes(character));
  items = items.filter((p) => p.priceCents >= min && p.priceCents <= max);

  const nq = normalizeQuery(q);
  if (nq) {
    items = items.filter((p) => {
      const hay = `${p.name} ${p.slug} ${p.characterTags.join(" ")}`.toLowerCase();
      return hay.includes(nq);
    });
  }

  if (sort === "newest") items.sort((a, b) => b.createdAtMs - a.createdAtMs);
  if (sort === "price_asc") items.sort((a, b) => a.priceCents - b.priceCents);

  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const clampedPage = Math.min(page, totalPages);
  const start = (clampedPage - 1) * pageSize;
  const pageItems = items.slice(start, start + pageSize);

  return NextResponse.json({
    items: pageItems,
    total,
    page: clampedPage,
    pageSize,
    totalPages,
    normalizedQuery: nq,
  });
}

