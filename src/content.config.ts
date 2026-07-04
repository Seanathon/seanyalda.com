import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

const caseStudies = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/case-studies' }),
  schema: z.object({
    title: z.string(),
    order: z.number(),
    company: z.string().optional(),
    role: z.string(),
    period: z.string(),
    tag: z.string(),
    summary: z.string(),
    heroImage: z.string(),
    bgCredit: z.string().optional(),
    liveUrl: z.string().url().optional(),
    liveUrlLabel: z.string().optional(),
    credits: z.array(z.string()),
    stack: z.array(z.string()),
    services: z.array(z.string()),
    outroBody: z.string(),
    draft: z.boolean().optional().default(false),
  }),
});

const articles = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    titleEm: z.string().optional(),
    deck: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    topic: z.string(),
    heroImage: z.string().optional(),
    draft: z.boolean().optional().default(false),
  }),
});

const photos = defineCollection({
  loader: file('./src/data/photos.json'),
  schema: z.object({
    id: z.string(),
    src: z.string(),
    alt: z.string().default(''),
    location: z.string().optional(),
    date: z.string().optional(),
    year: z.number().optional(),
    width: z.number().optional(),
    height: z.number().optional(),
    camera: z.string().optional(),
    lens: z.string().optional(),
    focal: z.string().optional(),
    aperture: z.string().optional(),
    shutter: z.string().optional(),
    iso: z.union([z.number(), z.string()]).optional(),
    gps: z.string().optional(),
    color: z.string().optional(),
    palette: z.array(z.string()).optional(),
    hue: z.number().optional(),
    saturation: z.number().optional(),
    lightness: z.number().optional(),
    bucket: z.enum(['neutral', 'red', 'orange', 'yellow', 'green', 'teal', 'blue', 'purple', 'pink']).optional(),
  }),
});

export const collections = { caseStudies, articles, photos };
