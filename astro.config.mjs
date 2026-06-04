import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/static';

export default defineConfig({
  site: 'https://dino-design-system-v2.vercel.app',
  adapter: vercel(),
});
