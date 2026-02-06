import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { ProductCard } from "@/components/product/ProductCard";
import { SAMPLE_PRODUCTS } from "@/lib/data/sample";

describe("ProductCard", () => {
  it("shows image, name, price, New badge, fav button", () => {
    const product = SAMPLE_PRODUCTS.find((p) => p.slug === "hello-kitty-sticker-pack")!;
    render(<ProductCard product={product} />);

    expect(screen.getByRole("link", { name: product.name })).toBeInTheDocument();
    expect(screen.getByText(product.name)).toBeInTheDocument();
    expect(screen.getByTestId("product-price")).toHaveTextContent("$");
    expect(screen.getByText("New")).toBeInTheDocument();
    expect(screen.getByTestId("product-fav")).toBeInTheDocument();
  });

  it("sold out badge overlays and disables quick add", () => {
    const product = SAMPLE_PRODUCTS.find((p) => p.slug === "kuromi-keychain")!;
    render(<ProductCard product={product} />);
    expect(screen.getByText("Sold Out")).toBeInTheDocument();
    expect(screen.getByTestId("product-quick-add")).toBeDisabled();
  });

  it("clicking Quick Add calls handler and does not navigate", () => {
    const product = SAMPLE_PRODUCTS.find((p) => p.slug === "hello-kitty-sticker-pack")!;
    const onQuickAdd = vi.fn();
    render(<ProductCard product={product} onQuickAdd={onQuickAdd} />);

    fireEvent.click(screen.getByTestId("product-quick-add"));
    expect(onQuickAdd).toHaveBeenCalledWith(product.slug);
  });
});

