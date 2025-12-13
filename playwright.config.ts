import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  use: {
    baseURL: "http://localhost:5173/final-project-shrutika-ubnare/",
    headless: true,
    viewport: { width: 1200, height: 800 },
  },
  webServer: {
    command: "npm run build && npm run preview",
    url: "http://localhost:5173/final-project-shrutika-ubnare/",
    timeout: 120_000,
    reuseExistingServer: !process.env.CI,
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
});