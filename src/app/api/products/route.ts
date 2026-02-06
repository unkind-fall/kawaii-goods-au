import { NextResponse } from "next/server";

import { SAMPLE_PRODUCTS } from "@/lib/data/sample";
import { queryProducts } from "@/lib/products/query";

export const runtime = "edge";

export async function GET(req: Request) {
  const url = new URL(req.url);

  const category = (url.searchParams.get("category") ?? "all") as "all" | "stationery" | "plush" | "accessories";
  const character = url.searchParams.get("character");
  const min = Number(url.searchParams.get("min") ?? "0");
  const max = Number(url.searchParams.get("max") ?? String(Number.MAX_SAFE_INTEGER));
  const sort = (url.searchParams.get("sort") ?? "newest") as "newest" | "price_asc";
  const page = Number(url.searchParams.get("page") ?? "1");
  const pageSize = Number(url.searchParams.get("pageSize") ?? "12");
  const q = url.searchParams.get("q") ?? "";

  const result = queryProducts(SAMPLE_PRODUCTS, {
    q,
    category,
    character,
    min: Number.isFinite(min) ? min : 0,
    max: Number.isFinite(max) ? max : Number.MAX_SAFE_INTEGER,
    sort,
    page: Number.isFinite(page) ? page : 1,
    pageSize: Number.isFinite(pageSize) ? pageSize : 12,
  });

  return NextResponse.json(result);
}
