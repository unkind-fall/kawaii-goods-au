import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { CharacterShrine } from "@/components/character/CharacterShrine";
import { SAMPLE_CHARACTERS } from "@/lib/data/sample";

vi.stubGlobal("navigator", {
  clipboard: { writeText: vi.fn(async () => undefined) },
});

describe("CharacterShrine", () => {
  it("renders Birthday and Interests when present", () => {
    const c = SAMPLE_CHARACTERS.find((x) => x.slug === "hello-kitty")!;
    render(<CharacterShrine character={c} />);

    expect(screen.getByTestId("character-birthday")).toBeInTheDocument();
    expect(screen.getByTestId("character-interests")).toBeInTheDocument();
  });

  it("shows breadcrumbs Home > Characters > Name", () => {
    const c = SAMPLE_CHARACTERS.find((x) => x.slug === "hello-kitty")!;
    render(<CharacterShrine character={c} />);
    expect(screen.getByTestId("breadcrumbs")).toHaveTextContent("Home");
    expect(screen.getByTestId("breadcrumbs")).toHaveTextContent("Characters");
    expect(screen.getByTestId("breadcrumbs")).toHaveTextContent("Hello Kitty");
  });

  it("truncates bio and expands with Read More without page reload", async () => {
    const user = userEvent.setup();
    const c = { ...SAMPLE_CHARACTERS.find((x) => x.slug === "hello-kitty")!, bio: "a ".repeat(200) };
    render(<CharacterShrine character={c} />);

    expect(screen.getByTestId("character-bio").className).toContain("line-clamp-3");
    await user.click(screen.getByTestId("character-read-more"));
    expect(screen.getByTestId("character-bio").className).not.toContain("line-clamp-3");
  });

  it("renders Next/Prev navigation links", () => {
    const c = SAMPLE_CHARACTERS.find((x) => x.slug === "hello-kitty")!;
    render(<CharacterShrine character={c} />);
    expect(screen.getByTestId("character-prev")).toBeInTheDocument();
    expect(screen.getByTestId("character-next")).toBeInTheDocument();
  });

  it("optimistically updates Like count and persists to localStorage", async () => {
    const user = userEvent.setup();
    const c = SAMPLE_CHARACTERS.find((x) => x.slug === "hello-kitty")!;

    render(<CharacterShrine character={c} />);
    const btn = screen.getByTestId("character-like");

    const before = Number(screen.getByTestId("character-like-count").textContent ?? "0");
    await user.click(btn);
    const after = Number(screen.getByTestId("character-like-count").textContent ?? "0");
    expect(after).toBe(before + 1);

    const key = `kawaii_like_${c.slug}`;
    expect(() => JSON.parse(localStorage.getItem(key) ?? "")).not.toThrow();
  });
});
