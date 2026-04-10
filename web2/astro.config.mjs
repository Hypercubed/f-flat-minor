import { fileURLToPath } from "node:url";
import { defineConfig } from "astro/config";

const repoRoot = fileURLToPath(new URL("../", import.meta.url));

export default defineConfig({
  vite: {
    server: {
      fs: {
        allow: [repoRoot],
      },
    },
  },
});
