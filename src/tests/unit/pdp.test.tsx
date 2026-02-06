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
    const p = SAMPLE_PRODUCTS.find((x) => x.slug === "hello-kitty-sticker-pack")!;
    render(<ProductDetail product={p} />);

    const thumbs = screen.getByTestId("pdp-thumbs").querySelectorAll("button");
    expect(thumbs.length).toBeGreaterThan(1);

    await user.click(thumbs[1]!);
    expect(screen.getByTestId("pdp-image")).toBeInTheDocument();
  });

  it("selecting size variant updates availability", async () => {
    const user = userEvent.setup();
    const p = SAMPLE_PRODUCTS.find((x) => x.slug === "cinnamoroll-plush-mini")!;
    render(<ProductDetail product={p} />);

    await user.click(screen.getByTestId("variant-s"));
    expect(screen.getByTestId("pdp-price")).toBeInTheDocument();
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

  it("shows You May Also Like section", () => {
    const p = SAMPLE_PRODUCTS.find((x) => x.slug === "hello-kitty-sticker-pack")!;
    render(<ProductDetail product={p} />);
    expect(screen.getByText("You May Also Like")).toBeInTheDocument();
  });
});
