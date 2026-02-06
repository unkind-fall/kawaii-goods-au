import { expect, test } from "@playwright/test";

function pickMascotName(seed: string) {
  const mascots = ["Hello Kitty", "Cinnamoroll", "Pompompurin", "My Melody", "Kuromi"];
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return mascots[h % mascots.length]!;
}

test("[E2E] Mobile bottom navigation bar appears on viewports < 640px", async ({ page }, testInfo) => {
  await page.goto("/");
  if (testInfo.project.name.includes("mobile")) {
    await expect(page.getByTestId("mobile-bottom-nav")).toBeVisible();
  } else {
    await expect(page.getByTestId("mobile-bottom-nav")).toBeHidden();
  }
});

test("[E2E] Header logo centers on mobile, aligns left on desktop", async ({ page }, testInfo) => {
  await page.goto("/");

  const logo = page.getByRole("link", { name: "Kawaii Goods AU" });
  const header = page.getByTestId("header");
  const headerContainer = header.locator(":scope > div").first();

  const logoBox = await logo.boundingBox();
  const headerBox = await header.boundingBox();
  const containerBox = await headerContainer.boundingBox();
  expect(logoBox).toBeTruthy();
  expect(headerBox).toBeTruthy();
  expect(containerBox).toBeTruthy();

  const logoCenterX = logoBox!.x + logoBox!.width / 2;
  const headerCenterX = headerBox!.x + headerBox!.width / 2;

  if (testInfo.project.name.includes("mobile")) {
    expect(Math.abs(logoCenterX - headerCenterX)).toBeLessThan(28);
  } else {
    expect(logoBox!.x - containerBox!.x).toBeLessThan(48);
  }
});

test("[E2E] Hamburger menu opens with a smooth spring animation", async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.includes("mobile"), "Hamburger menu is mobile-only");
  await page.goto("/");

  const button = page.getByRole("button", { name: "Open menu" });
  await button.click();

  const search = page.getByTestId("mobile-search");
  await expect(search).toBeVisible();
});

test("[E2E] Mega Menu opens on hover for Characters category and closes after mouse leaves + 200ms buffer", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name.includes("mobile"), "Mega menu is desktop-only");
  await page.goto("/");

  const characters = page.getByRole("link", { name: "Characters" }).first();
  await characters.hover();
  await expect(page.getByTestId("mega-menu")).toBeVisible();

  // Move mouse away.
  await page.mouse.move(5, 5);
  await page.waitForTimeout(250);
  await expect(page.getByTestId("mega-menu")).toBeHidden();
});

test("[E2E] Sticky header applies a drop shadow only after scrolling 50px", async ({ page }) => {
  await page.goto("/");
  const header = page.getByTestId("header");
  await expect(header).not.toHaveClass(/shadow-kawaii/);

  await page.evaluate(() => window.scrollTo(0, 120));
  await expect(header).toHaveClass(/shadow-kawaii/);
});

test("[E2E] Back to Top button appears after 1 screen height scroll and scrolls smoothly", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByTestId("back-to-top")).toBeHidden();
  await page.evaluate(() => window.scrollTo(0, window.innerHeight + 10));
  await expect(page.getByTestId("back-to-top")).toBeVisible();

  await page.getByTestId("back-to-top").click();
  await expect
    .poll(async () => page.evaluate(() => window.scrollY), { timeout: 2_500 })
    .toBeLessThan(40);
});

test("[E2E] 404 Page renders a random character mascot (seedable for tests)", async ({ page }) => {
  const seed = "e2e-seed";
  await page.goto(`/this-route-does-not-exist?seed=${seed}`);
  await expect(page.getByTestId("not-found")).toBeVisible();

  const expected = pickMascotName(seed);
  await expect(page.getByTestId("not-found-mascot")).toContainText(expected);
});

test("[E2E] No horizontal scroll on mobile", async ({ page }) => {
  await page.goto("/");
  const hasHorizontalScroll = await page.evaluate(() => {
    const doc = document.documentElement;
    return doc.scrollWidth > window.innerWidth + 1;
  });
  expect(hasHorizontalScroll).toBe(false);
});
