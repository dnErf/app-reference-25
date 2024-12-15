// @ts-check
import { defineConfig, envField } from 'astro/config';

import tailwind from '@astrojs/tailwind';

import node from '@astrojs/node';

// ! can't access env on coolify without using process.env 
// ! need to get back for this
// import { loadEnv } from 'vite'
// const env = loadEnv(process.env.NODE_ENV, process.cwd(), '')

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
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
      E2EE_SERVER: envField.string({ context: 'server', access: 'public', optional: true }),
      DIRECTUS_BEARER: envField.string({ context: 'server', access: 'secret' }),
    }
  }
});