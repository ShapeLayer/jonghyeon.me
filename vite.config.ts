import { fileURLToPath } from 'node:url';
import tailwindcss from '@tailwindcss/vite';
import { paraglideVitePlugin } from '@inlang/paraglide-js';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    fs: {
      // SvelteKit already allows its source/runtime paths; add only this workspace build.
      allow: [fileURLToPath(new URL('./packages/zoomable-image/dist', import.meta.url))]
    }
  },
  plugins: [
    tailwindcss(),
    sveltekit(),
    paraglideVitePlugin({
      project: './project.inlang',
      outdir: './src/lib/paraglide',
      strategy: ['cookie', 'baseLocale']
    })
  ]
});
