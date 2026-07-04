import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://seanyalda.com',
  integrations: [mdx(), react(), sitemap()],
  markdown: {
    // `css-variables` exposes --astro-code-* custom properties, bound to the
    // site's theme tokens in global.css so code blocks re-theme with the palette.
    shikiConfig: { theme: 'css-variables' },
  },
  devToolbar: { enabled: false },
  vite: {
    server: { fs: { strict: false } },
  },
});
