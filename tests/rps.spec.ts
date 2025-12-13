import { test, expect } from "@playwright/test";

test("RPS loads and can play and reset", async ({ page }) => {
  await page.goto("/rps");

  await expect(page.locator("#score-player")).toHaveText("0");
  await expect(page.locator("#score-cpu")).toHaveText("0");
  await expect(page.locator("#score-ties")).toHaveText("0");

  await page.getByRole("button", { name: /play rock/i }).click();
  await expect(page.locator("#history li")).toHaveCount(1);

  await page.getByRole("button", { name: /reset game/i }).click();
  await expect(page.locator("#history li")).toHaveCount(0);
});
