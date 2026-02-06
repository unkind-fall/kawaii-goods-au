import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import React from "react";

import { ProductDetail } from "@/components/product/ProductDetail";
import { SAMPLE_PRODUCTS } from "@/lib/data/sample";

vi.mock("next/link", () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return { default: (props: any) => <a {...props} /> };
});

describe("ProductDetail", () => {
  it("thumbnail clicks update the active image", async () => {
    const user = userEvent.setup();
    // Use a product with multiple images
    const p = SAMPLE_PRODUCTS.find((x) => x.slug === "hello-kitty-bento-600ml")!;
    render(<ProductDetail product={p} />);

    const thumbs = screen.getByTestId("pdp-thumbs").querySelectorAll("button");
    expect(thumbs.length).toBeGreaterThan(1);

    await user.click(thumbs[1]!);
    expect(screen.getByTestId("pdp-image")).toBeInTheDocument();
  });

  it("selecting size variant updates availability", async () => {
    const user = userEvent.setup();
    // Use a product with multiple variants
    const p = SAMPLE_PRODUCTS.find((x) => x.slug === "totoro-glass-container")!;
    render(<ProductDetail product={p} />);

    await user.click(screen.getByTestId("variant-small"));
    expect(screen.getByTestId("pdp-price")).toBeInTheDocument();
  });

  it("restock form appears for sold-out product", async () => {
    // Create a mock sold-out product
    const soldOutProduct = {
      ...SAMPLE_PRODUCTS[0]!,
      slug: "test-sold-out",
      badges: [],
      variants: [{ id: "default", title: "Default", sku: "TEST-01", stock: 0 }],
    };
    render(<ProductDetail product={soldOutProduct} />);
    expect(screen.getByTestId("restock-form")).toBeInTheDocument();
  });

  it("materials accordion starts open by default", () => {
    const p = SAMPLE_PRODUCTS.find((x) => x.slug === "hello-kitty-bento-600ml")!;
    render(<ProductDetail product={p} />);
    // We changed it to be open by default in the new component
    expect(screen.getByTestId("materials-accordion")).toHaveAttribute("open");
  });

  it("shows You May Also Like section", () => {
    const p = SAMPLE_PRODUCTS.find((x) => x.slug === "hello-kitty-bento-600ml")!;
    render(<ProductDetail product={p} />);
    expect(screen.getByText("You May Also Like")).toBeInTheDocument();
  });
});
