import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

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

  it("sold out badge overlays the card", () => {
    const product = SAMPLE_PRODUCTS.find((p) => p.slug === "kuromi-keychain")!;
    render(<ProductCard product={product} />);
    expect(screen.getByText("Sold Out")).toBeInTheDocument();
  });

  it("View Details link points to product page", () => {
    const product = SAMPLE_PRODUCTS.find((p) => p.slug === "hello-kitty-sticker-pack")!;
    render(<ProductCard product={product} />);

    const link = screen.getByTestId("product-view-details");
    expect(link).toHaveAttribute("href", `/product/${product.slug}`);
  });
});
