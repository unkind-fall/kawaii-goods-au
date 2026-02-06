import { expect, test } from "@playwright/test";

test("[E2E] Filtering by Category updates URL params", async ({ page }) => {
  await page.goto("/products");
  await page.getByTestId("filter-category").selectOption("plush");
  await expect(page).toHaveURL(/category=plush/);
});

test("[E2E] Filtering by Price Range updates grid", async ({ page }) => {
  await page.goto("/products");
  await expect(page.getByTestId("product-card-hello-kitty-sticker-pack")).toBeVisible();

  await page.getByTestId("filter-min").fill("2000");
  await page.waitForTimeout(200);
  await expect(page.getByTestId("result-count")).toContainText("results");
  await expect(page.getByTestId("product-card-hello-kitty-sticker-pack")).toBeHidden();
});

test("[E2E] Sorting by Newest is default", async ({ page }) => {
  await page.goto("/products");
  await expect(page.getByTestId("filter-sort")).toHaveValue("newest");
});

test("[E2E] Hovering product image swaps to 2nd image (Quick Look)", async ({ page }) => {
  await page.goto("/products");
  const card = page.getByTestId("product-card-hello-kitty-sticker-pack");
  await expect(card).toBeVisible();

  const img = card.getByTestId("product-image");
  const first = await img.getAttribute("data-src");
  await card.hover();
  const second = await img.getAttribute("data-src");
  expect(second).not.toBe(first);
});

test("[E2E] Search handles synonyms (Kitty -> Hello Kitty) and maintains filters", async ({ page }) => {
  await page.goto("/products");
  await page.getByTestId("filter-category").selectOption("stationery");
  await page.getByTestId("product-search").fill("Kitty");
  await page.waitForTimeout(250);
  await expect(page).toHaveURL(/category=stationery/);
  await expect(page).toHaveURL(/q=hello(\+|%20)kitty/);
});

test("[E2E] View Details link navigates to PDP", async ({ page }) => {
  await page.goto("/products");
  await page.getByTestId("product-card-hello-kitty-sticker-pack").getByTestId("product-view-details").click();
  await expect(page).toHaveURL(/\/product\/hello-kitty-sticker-pack/);
});
