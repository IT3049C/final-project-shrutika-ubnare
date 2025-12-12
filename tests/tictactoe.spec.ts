import { test, expect } from "@playwright/test";

test("TicTacToe loads and can play and reset", async ({ page }) => {
  await page.goto("/tictactoe");

  await expect(
    page.getByRole("heading", { name: /tic-tac-toe/i })
  ).toBeVisible();

  const firstSquare = page.getByRole("button", { name: "" }).first();
  await firstSquare.click();

  const goToStart = page.getByRole("button", { name: /reset game/i });
  await goToStart.click();

  await expect(firstSquare).toHaveText("");
});
