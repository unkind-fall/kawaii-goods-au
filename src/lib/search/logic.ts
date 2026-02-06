import { SEARCH_SYNONYMS } from "@/lib/data/sample";

export function normalizeQuery(q: string) {
  return q.trim().toLowerCase();
}

export function applySynonyms(q: string) {
  const nq = normalizeQuery(q);
  if (!nq) return nq;

  // Single-term synonym expansion for now (good enough for Suite 3).
  const parts = nq.split(/\s+/g);
  const mapped = parts.map((p) => SEARCH_SYNONYMS[p] ?? p);
  return mapped.join(" ");
}

