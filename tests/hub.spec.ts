import { test, expect } from "@playwright/test";

test("hub loads and lists games", async ({ page }) => {
  await page.goto("/");

  const main = page.getByRole("main");

  await expect(
    main.getByRole("heading", { name: /player settings/i })
  ).toBeVisible();
  await expect(
    main.getByRole("heading", { name: /available games/i })
  ).toBeVisible();

  await expect(
    main.getByRole("button", { name: /play rock paper scissors/i })
  ).toBeVisible();
  await expect(
    main.getByRole("button", { name: /^play tic tac toe$/i })
  ).toBeVisible();
  await expect(
    main.getByRole("button", { name: /play wordle/i })
  ).toBeVisible();
  await expect(
    main.getByRole("button", { name: /play typing speed test/i })
  ).toBeVisible();
});

test("captures player name and shows it in RPS", async ({ page }) => {
  await page.goto("/");

  const main = page.getByRole("main");

  await main.getByLabel(/player name/i).fill("Shrutika");
  await main.getByRole("button", { name: /save settings/i }).click();

  await main
    .getByRole("button", { name: /play rock paper scissors/i })
    .click();

  await expect(page.getByTestId("greeting")).toContainText("Shrutika");
});
