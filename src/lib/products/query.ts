import type { Product, ProductCategory } from "@/lib/data/sample";
import { applySynonyms, normalizeQuery } from "@/lib/search/logic";

export type ProductQuery = {
  q?: string;
  category?: "all" | ProductCategory;
  character?: string | null;
  min?: number;
  max?: number;
  sort?: "newest" | "price_asc" | "price_desc" | "popular";
  page?: number;
  pageSize?: number;
};

export type ProductQueryResult = {
  items: Product[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  normalizedQuery: string;
};

export function queryProducts(all: Product[], q: ProductQuery): ProductQueryResult {
  const qRaw = q.q ?? "";
  const normalizedQuery = normalizeQuery(applySynonyms(qRaw));

  const category = q.category ?? "all";
  const character = q.character ?? null;
  const min = q.min ?? 0;
  const max = q.max ?? Number.MAX_SAFE_INTEGER;
  const sort = q.sort ?? "newest";
  const pageSize = Math.min(24, Math.max(1, q.pageSize ?? 12));
  const page = Math.max(1, q.page ?? 1);

  let items = all.slice();

  // Filter by category
  if (category !== "all") {
    items = items.filter((p) => p.category === category);
  }

  // Filter by character
  if (character) {
    items = items.filter((p) => p.characterTags.includes(character));
  }

  // Filter by price range
  items = items.filter((p) => p.priceCents >= min && p.priceCents <= max);

  // Text search
  if (normalizedQuery) {
    items = items.filter((p) => {
      const hay = `${p.name} ${p.nameJp ?? ""} ${p.slug} ${p.description} ${p.characterTags.join(" ")}`.toLowerCase();
      return hay.includes(normalizedQuery);
    });
  }

  // Sorting
  switch (sort) {
    case "newest":
      items.sort((a, b) => b.createdAtMs - a.createdAtMs);
      break;
    case "price_asc":
      items.sort((a, b) => a.priceCents - b.priceCents);
      break;
    case "price_desc":
      items.sort((a, b) => b.priceCents - a.priceCents);
      break;
    case "popular":
      // Sort by badge (popular first) then by date
      items.sort((a, b) => {
        const aPopular = a.badges.includes("popular") ? 1 : 0;
        const bPopular = b.badges.includes("popular") ? 1 : 0;
        if (bPopular !== aPopular) return bPopular - aPopular;
        return b.createdAtMs - a.createdAtMs;
      });
      break;
  }

  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const clampedPage = Math.min(page, totalPages);
  const start = (clampedPage - 1) * pageSize;

  return {
    items: items.slice(start, start + pageSize),
    total,
    page: clampedPage,
    pageSize,
    totalPages,
    normalizedQuery,
  };
}
