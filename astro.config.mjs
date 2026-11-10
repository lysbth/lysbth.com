// @ts-check
import { defineConfig } from 'astro/config';

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  site: 'https://lysbth.com',
  vite: {
    server: {
      // v0 previews the dev server on a *.vercel.run sandbox address
      allowedHosts: ['.vercel.run'],
    },
  },
});
