import { expect, test } from "@playwright/test";

test("[E2E] Character grid renders all characters fetched from API", async ({ page }) => {
  await page.goto("/characters");
  await expect(page.getByTestId("character-grid")).toBeVisible();
  await expect(page.getByTestId("character-grid-item").first()).toBeVisible();
});

test("[E2E] Infinite scroll or Load More loads next batch of 20 characters", async ({ page }) => {
  await page.goto("/characters");
  const before = await page.getByTestId("character-grid-item").count();
  await page.getByTestId("characters-load-more").click();
  await expect.poll(async () => page.getByTestId("character-grid-item").count()).toBeGreaterThan(before);
});

test("[E2E] Like persists to local storage (for guest users)", async ({ page }) => {
  await page.goto("/character/hello-kitty");
  const count = page.getByTestId("character-like-count");
  const before = Number(await count.textContent());
  await page.getByTestId("character-like").click();
  await expect.poll(async () => Number(await count.textContent()), { timeout: 5_000 }).toBe(before + 1);

  const stored = await page.evaluate(() => localStorage.getItem("kawaii_like_hello-kitty"));
  expect(stored).toContain("\"liked\":true");
});

test("[E2E] Share button copies specific URL with UTM params", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/character/hello-kitty");
  await page.getByTestId("character-share").click();
  const text = await page.evaluate(() => navigator.clipboard.readText());
  expect(text).toContain("utm_source=share");
  expect(text).toContain("utm_medium=copy");
  expect(text).toContain("utm_campaign=character");
});
