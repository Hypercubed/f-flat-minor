import { fileURLToPath } from "node:url";
import { defineConfig } from "astro/config";

const repoRoot = fileURLToPath(new URL("../", import.meta.url));

export default defineConfig({
  site: "https://hypercubed.github.io",
  base: "/f-flat-minor",
  vite: {
    server: {
      fs: {
        allow: [repoRoot],
      },
    },
  },
});
