import mdx from '@astrojs/mdx'
import { defineConfig } from 'astro/config'
import remarkUnwrapImages from 'remark-unwrap-images'

import netlify from '@astrojs/netlify'

import tailwindcss from '@tailwindcss/vite'

// https://astro.build/config
export default defineConfig({
  site: 'https://www.chungsi.io',
  output: 'static',
  adapter: netlify(),

  markdown: {
    shikiConfig: {
      wrap: true,
      theme: 'rose-pine-dawn'
    },
    remarkPlugins: [ remarkUnwrapImages ]
  },

  integrations: [ mdx() ],

  vite: {
    plugins: [ tailwindcss({
      nesting: true,
    }) ],
  },
})