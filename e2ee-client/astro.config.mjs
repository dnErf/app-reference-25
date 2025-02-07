// @ts-check
import { defineConfig, envField } from 'astro/config';

import tailwind from '@astrojs/tailwind';

import node from '@astrojs/node';

import react from '@astrojs/react';

import db from '@astrojs/db';

// ! can't access env on coolify without using process.env 
// ! need to get back for this
// import { loadEnv } from 'vite'
// const env = loadEnv(process.env.NODE_ENV, process.cwd(), '')

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react(), db()],
  output: 'server',
  adapter: node({
    mode: 'standalone'
  }),
  vite: {
    define: {
      // VITE__APP_ENV__: JSON.stringify(env),
      // 'VITE__APP_ENV__': true
      E2EE_SERVER: true
      
    }
  },
  env: {
    schema: {
      E2EE_SERVER: envField.string({ context: "server", access: "public", optional: true }),
      INTERNAL_SERVER: envField.string({ context: "server", access: "public", optional: false }),
      DIRECTUS_URL: envField.string({ context: "client", access: "public", optional: false }),
      DIRECTUS_BEARER: envField.string({ context: "server", access: "secret", optional: false }),
      DIRECTUS_FILE_FOLDER: envField.string({ context: "server", access: "public", optional: false }),
      ASTRO_DB_REMOTE_URL: envField.string({ context: "server", access: "public", optional: false }),
      ASTRO_DB_APP_TOKEN: envField.string({ context: "server", access: "secret", optional: false }),
      STRIPE_SECRET_KEY: envField.string({ context: "server", access: "secret", optional: false })
    }
  }
});