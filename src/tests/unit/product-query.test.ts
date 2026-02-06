import { describe, expect, it } from "vitest";

import { SAMPLE_PRODUCTS } from "@/lib/data/sample";
import { queryProducts } from "@/lib/products/query";

describe("queryProducts", () => {
  it("sorting by price asc reorders correctly", () => {
    const result = queryProducts(SAMPLE_PRODUCTS, { sort: "price_asc", pageSize: 5, page: 1 });
    const prices = result.items.map((p) => p.priceCents);
    const sorted = prices.slice().sort((a, b) => a - b);
    expect(prices).toEqual(sorted);
  });

  it("sorting by price desc reorders correctly", () => {
    const result = queryProducts(SAMPLE_PRODUCTS, { sort: "price_desc", pageSize: 5, page: 1 });
    const prices = result.items.map((p) => p.priceCents);
    const sorted = prices.slice().sort((a, b) => b - a);
    expect(prices).toEqual(sorted);
  });

  it("pagination returns correct page size", () => {
    const r1 = queryProducts(SAMPLE_PRODUCTS, { pageSize: 10, page: 1 });
    const r2 = queryProducts(SAMPLE_PRODUCTS, { pageSize: 10, page: 2 });
    expect(r1.items.length).toBe(10);
    expect(r2.items.length).toBeLessThanOrEqual(10);
    expect(r1.items[0]!.slug).not.toBe(r2.items[0]!.slug);
  });

  it("filters by category", () => {
    const result = queryProducts(SAMPLE_PRODUCTS, { category: "lunch-boxes" });
    result.items.forEach((p) => {
      expect(p.category).toBe("lunch-boxes");
    });
  });

  it("filters by character", () => {
    const result = queryProducts(SAMPLE_PRODUCTS, { character: "hello-kitty" });
    result.items.forEach((p) => {
      expect(p.characterTags).toContain("hello-kitty");
    });
  });
});
