import js from "@eslint/js"
import eslintPluginAstro from 'eslint-plugin-astro'
import importPlugin from 'eslint-plugin-import'
import globals from "globals"
import ts from "typescript-eslint"


export default [
  { files: [ '**/*.{ts,tsx,js,jsx,astro}' ] },
  { languageOptions: { globals: globals.browser } },
  js.configs.recommended,
  importPlugin.flatConfigs.typescript,
  ...ts.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  {
    files: [ '**/*.{ts,tsx,astro}' ],
    plugins: {
      import: importPlugin,
    },
    rules: {
      'import/newline-after-import': [ 'error', { count: 1, exactCount: false } ],
      'import/order': [
        'error', {
          pathGroups: [
            { pattern: "@/**.{types,d}.ts", group: 'type' },
            { pattern: "@/utils/groq/**", group: 'type', position: 'before' },
            { pattern: '@/**', group: 'internal' },
            { pattern: "@**/*.astro", group: 'internal' },
          ],
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'object',
            'type',
          ],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true
          },
          named: false
        }
      ]
    }
  }
]