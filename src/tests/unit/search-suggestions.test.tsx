import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { Header } from "@/components/layout/Header";
import { TRENDING_SEARCH_TERMS } from "@/lib/data/sample";

vi.mock("next/navigation", () => {
  return {
    useRouter: () => ({ push: vi.fn() }),
    usePathname: () => "/",
    useSearchParams: () => new URLSearchParams(""),
  };
});

vi.mock("@/lib/cart/store", () => {
  return {
    useCart: () => ({ count: 0 }),
  };
});

describe("Search suggestions", () => {
  it("suggests top 5 trending terms on focus", async () => {
    render(<Header />);

    const input = screen.getByLabelText("Search products");
    fireEvent.focus(input);

    const list = await screen.findByTestId("search-suggestions");
    expect(list).toBeInTheDocument();
    for (const term of TRENDING_SEARCH_TERMS.slice(0, 5)) {
      expect(list).toHaveTextContent(term);
    }
  });
});
