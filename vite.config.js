import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/final-project-shrutika-ubnare/",
  server: { port: 5173, open: false },
  preview: { port: 5173 },
});