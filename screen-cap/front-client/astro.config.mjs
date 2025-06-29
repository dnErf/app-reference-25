// @ts-check
import { defineConfig, envField } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import node from '@astrojs/node';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },

  output: "server",

  adapter: node({
    mode: "standalone"
  }),

  integrations: [react()],

  env: {
    schema: {
      DIRECTUS_URL: envField.string({ context: "client", access: "public" })
    }
  }
});