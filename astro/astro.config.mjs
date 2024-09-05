import { defineConfig } from 'astro/config'

import mdx from '@astrojs/mdx'
import tailwind from "@astrojs/tailwind"
import remarkUnwrapImages from 'remark-unwrap-images'

// https://astro.build/config
export default defineConfig({
  site: 'https://www.chungsi.io',
  output: 'static',
  markdown: {
    shikiConfig: {
      wrap: true,
      theme: 'rose-pine-dawn'
    },
    remarkPlugins: [
      remarkUnwrapImages
    ],
  },
  integrations: [
    tailwind({
      nesting: true,
      // Disable injecting a basic `base.css` import on every page that has all tailwind
      applyBaseStyles: false,
    }),
    mdx()
  ]
})