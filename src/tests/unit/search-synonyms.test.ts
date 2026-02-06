import { describe, expect, it } from "vitest";

import { applySynonyms } from "@/lib/search/logic";

describe("applySynonyms", () => {
  it("maps kitty -> hello kitty", () => {
    expect(applySynonyms("Kitty")).toBe("hello kitty");
  });
});

