import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://seanyalda.com',
  integrations: [mdx(), react(), sitemap()],
  devToolbar: { enabled: false },
  vite: {
    server: { fs: { strict: false } },
  },
});
