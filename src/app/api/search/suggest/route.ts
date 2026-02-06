import { NextResponse } from "next/server";

import { SAMPLE_CHARACTERS, SAMPLE_PRODUCTS, TRENDING_SEARCH_TERMS } from "@/lib/data/sample";
import { applySynonyms, normalizeQuery } from "@/lib/search/logic";

export const runtime = "edge";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const qRaw = url.searchParams.get("q") ?? "";
  const q = applySynonyms(qRaw);
  const nq = normalizeQuery(q);

  if (!nq) return NextResponse.json({ suggestions: TRENDING_SEARCH_TERMS.slice(0, 5), normalizedQuery: "" });

  const suggestions = [
    ...SAMPLE_CHARACTERS.filter((c) => c.name.toLowerCase().includes(nq)).slice(0, 3).map((c) => c.name),
    ...SAMPLE_PRODUCTS.filter((p) => p.name.toLowerCase().includes(nq)).slice(0, 5).map((p) => p.name),
  ]
    .filter((v, i, a) => a.indexOf(v) === i)
    .slice(0, 5);

  return NextResponse.json({ suggestions, normalizedQuery: nq });
}

