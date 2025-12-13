import { test, expect } from "@playwright/test";

test("TicTacToe loads and can play and reset", async ({ page }) => {
  await page.goto("/tictactoe");

  const firstSquare = page.getByRole("button", { name: "" }).first();
  await firstSquare.click();

  const resetButton = page.getByRole("button", { name: /reset game/i });
  await resetButton.click();

  await expect(firstSquare).toHaveText("");
});
