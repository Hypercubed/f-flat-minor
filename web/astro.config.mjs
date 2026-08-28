import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://hypercubed.github.io",
  base: "/f-flat-minor",
  server: {
    host: '0.0.0.0',
    port: 4321,
    allowedHosts: process.env.ALLOWED_HOSTS ? process.env.ALLOWED_HOSTS.split(',') : []
  }
});