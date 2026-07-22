import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const projectDir = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  // Keep source files separate from the static GitHub Pages publish directory.
  root: resolve(projectDir, "app"),
  publicDir: resolve(projectDir, "public"),
  base: "./",
  build: {
    outDir: resolve(projectDir, "docs"),
    emptyOutDir: true,
  },
  optimizeDeps: {
    include: ["react", "react-dom/client"],
  },
  server: {
    host: "0.0.0.0",
    allowedHosts: ["terminal.local"],
    warmup: {
      clientFiles: ["./src/main.jsx"],
    },
  },
  plugins: [react()],
});
