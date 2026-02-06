import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ProductCard } from "@/components/product/ProductCard";
import { SAMPLE_PRODUCTS } from "@/lib/data/sample";

describe("ProductCard", () => {
  it("shows image, name, price, NEW badge, fav button", () => {
    // Use a product with "new" badge
    const product = SAMPLE_PRODUCTS.find((p) => p.badges.includes("new"))!;
    render(<ProductCard product={product} />);

    expect(screen.getByRole("link", { name: product.name })).toBeInTheDocument();
    expect(screen.getByText(product.name)).toBeInTheDocument();
    expect(screen.getByTestId("product-price")).toHaveTextContent("$");
    expect(screen.getByText("NEW")).toBeInTheDocument();
    expect(screen.getByTestId("product-fav")).toBeInTheDocument();
  });

  it("sold out badge overlays the card when stock is 0", () => {
    // Create a mock product that's sold out
    const soldOutProduct = {
      ...SAMPLE_PRODUCTS[0]!,
      slug: "test-sold-out",
      badges: ["sold_out" as const],
      variants: [{ id: "default", title: "Default", sku: "TEST-01", stock: 0 }],
    };
    render(<ProductCard product={soldOutProduct} />);
    expect(screen.getByText("SOLD OUT")).toBeInTheDocument();
  });

  it("View Details link points to product page (hidden on mobile)", () => {
    const product = SAMPLE_PRODUCTS[0]!;
    render(<ProductCard product={product} />);

    const link = screen.getByTestId("product-view-details");
    expect(link).toHaveAttribute("href", `/product/${product.slug}`);
  });
});
