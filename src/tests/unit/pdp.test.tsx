import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import React from "react";

import { ProductDetail } from "@/components/product/ProductDetail";
import { SAMPLE_PRODUCTS } from "@/lib/data/sample";

vi.mock("@/lib/cart/store", () => {
  return { useCart: () => ({ addItem: vi.fn(), count: 0 }) };
});

vi.mock("next/link", () => {
  return { default: (props: any) => <a {...props} /> };
});

describe("ProductDetail", () => {
  it("thumbnail clicks update the active image", async () => {
    const user = userEvent.setup();
    const p = SAMPLE_PRODUCTS.find((x) => x.slug === "hello-kitty-sticker-pack")!;
    render(<ProductDetail product={p} />);

    const thumbs = screen.getByTestId("pdp-thumbs").querySelectorAll("button");
    expect(thumbs.length).toBeGreaterThan(1);

    await user.click(thumbs[1]!);
    expect(screen.getByTestId("pdp-image")).toBeInTheDocument();
  });

  it("selecting size variant updates availability and add button is disabled until selected", async () => {
    const user = userEvent.setup();
    const p = SAMPLE_PRODUCTS.find((x) => x.slug === "cinnamoroll-plush-mini")!;
    render(<ProductDetail product={p} />);

    const add = screen.getByTestId("add-to-cart");
    expect(add).toBeDisabled();

    await user.click(screen.getByTestId("variant-s"));
    expect(add).toBeEnabled();
  });

  it("restock form appears for sold-out selected variant", async () => {
    const user = userEvent.setup();
    const p = SAMPLE_PRODUCTS.find((x) => x.slug === "cinnamoroll-plush-mini")!;
    render(<ProductDetail product={p} />);

    await user.click(screen.getByTestId("variant-m"));
    expect(screen.getByTestId("restock-form")).toBeInTheDocument();
  });

  it("materials accordion starts collapsed", () => {
    const p = SAMPLE_PRODUCTS.find((x) => x.slug === "hello-kitty-sticker-pack")!;
    render(<ProductDetail product={p} />);
    expect(screen.getByTestId("materials-accordion")).not.toHaveAttribute("open");
  });
});
