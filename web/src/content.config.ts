import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const docs = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/docs" }),
  schema: z.object({
    title: z.string(),
    summary: z.string().optional(),
    order: z.number().optional(),
    showInSidebar: z.boolean().optional(),
    section: z.enum(["manual", "reference"]).optional(),
  }),
});

export const collections = { docs };
