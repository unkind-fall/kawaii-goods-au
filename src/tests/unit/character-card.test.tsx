import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { CharacterCard } from "@/components/character/CharacterCard";
import { SAMPLE_CHARACTERS } from "@/lib/data/sample";

describe("CharacterCard", () => {
  it("routes to /character/[slug]", () => {
    const c = SAMPLE_CHARACTERS.find((x) => x.slug === "kuromi")!;
    render(<CharacterCard character={c} />);
    expect(screen.getByRole("link")).toHaveAttribute("href", "/character/kuromi");
  });
});

