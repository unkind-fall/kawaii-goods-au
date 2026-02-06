import { NextResponse } from "next/server";

import { SAMPLE_CHARACTERS } from "@/lib/data/sample";
import { normalizeQuery } from "@/lib/search/logic";

export const runtime = "edge";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const q = normalizeQuery(url.searchParams.get("q") ?? "");
  const type = (url.searchParams.get("type") ?? "all") as "main" | "sub" | "all";
  const cursor = Number(url.searchParams.get("cursor") ?? "0");
  const limit = Math.min(50, Math.max(1, Number(url.searchParams.get("limit") ?? "20")));

  let items = SAMPLE_CHARACTERS.slice();
  if (type !== "all") items = items.filter((c) => c.type === type);
  if (q) items = items.filter((c) => `${c.name} ${c.slug}`.toLowerCase().includes(q));

  const slice = items.slice(cursor, cursor + limit);
  const nextCursor = cursor + slice.length < items.length ? cursor + slice.length : null;

  return NextResponse.json({ items: slice, nextCursor, total: items.length });
}

