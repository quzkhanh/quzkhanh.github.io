import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '*.md' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      tech: z.array(z.string()),
      year: z.number().int(),
      images: z.array(image()).min(1),
      icon: image().optional(),
      video: z.string().optional(),
      color: z.string().regex(/^#[0-9a-f]{6}$/i).default('#d9d9d6'),
      store: z.url().optional(),
      repo: z.url().optional(),
      demo: z.url().optional(),
      order: z.number(),
    }),
});

export const collections = { projects };
