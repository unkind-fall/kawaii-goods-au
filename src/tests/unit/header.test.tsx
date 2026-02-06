import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Header } from "@/components/layout/Header";

// Header includes search which uses next/navigation hooks.
// Mocking keeps this a pure DOM unit test.
import { vi } from "vitest";
vi.mock("next/navigation", () => {
  return {
    useRouter: () => ({ push: vi.fn() }),
    usePathname: () => "/",
    useSearchParams: () => new URLSearchParams(""),
  };
});

describe("Header", () => {
  it("applies a drop shadow only after scrolling 50px", async () => {
    let scrollY = 0;
    Object.defineProperty(window, "scrollY", {
      configurable: true,
      get: () => scrollY,
    });

    render(<Header />);
    const header = screen.getByTestId("header");

    scrollY = 0;
    window.dispatchEvent(new Event("scroll"));
    await waitFor(() => expect(header.className).toContain("shadow-none"));

    scrollY = 51;
    window.dispatchEvent(new Event("scroll"));
    await waitFor(() => expect(header.className).toContain("shadow-kawaii"));
  });
});
