import { describe, expect, it } from "vitest";

import { formatAud } from "@/lib/utils/format";

describe("formatAud", () => {
  it("formats correctly ($10.00 AUD style)", () => {
    expect(formatAud(1000)).toContain("$");
    expect(formatAud(1000)).toContain("10.00");
  });
});

