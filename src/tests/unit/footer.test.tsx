import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Footer } from "@/components/layout/Footer";

describe("Footer", () => {
  it("updates the copyright year dynamically", () => {
    render(<Footer />);
    const year = String(new Date().getFullYear());
    expect(screen.getByTestId("copyright")).toHaveTextContent(year);
  });

  it("validates newsletter email format client-side", async () => {
    const user = userEvent.setup();
    render(<Footer />);

    await user.type(screen.getByTestId("newsletter-email"), "not-an-email");
    await user.click(screen.getByTestId("newsletter-submit"));

    expect(await screen.findByTestId("newsletter-error")).toHaveTextContent("valid email");
  });
});
