import { defineConfig } from "vite";

export default defineConfig({
  base: "/f-flat-minor/",
  server: {
    fs: {
      allow: [".."],
    },
  },
});
