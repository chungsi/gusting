// @ts-nocheck
const React = require('react')

import type { StorybookConfig } from '@storybook/react-webpack5'

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/manager-api',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    {
      name: '@storybook/addon-styling',
      options: {
        postCss: true,
      }
    }
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  webpackFinal: async (config) => {
    console.log('config', config.module)

    // config.module?.rules = [
    //   {
    //     test: /\.m?js$/,
    //     exclude: /node_modules\/(?!(gatsby|gatsby-script)\/)/,
    //   },
    //   {
    //     test: /\.m?js$/,
    //     exclude: /core-js/,
    //   },
    //   {
    //     test: /\.m?js$/,
    //     use: [
    //       {
    //         options: {
    //           plugins: [require.resolve('babel-plugin-remove-graphql-queries')],
    //         },
    //       },
    //     ],
    //   },
    //   ...config.module?.rules,
    // ]

    //   console.log('config rules', config.module.rules)

    // Transpile Gatsby module because Gatsby includes un-transpiled ES6 code.
    config.module.rules[0].exclude = [
      /node_modules\/(?!(gatsby|gatsby-script)\/)/,
      /core-js/,
    ]
    console.log('config after 1st', config.module.rules)

    //   // Use correct react-dom depending on React version.
    //   if (parseInt(React.version) <= 18) {
    //     config.externals = ["react-dom/client"];
    //   }

    // Remove core-js to prevent issues with Storybook
    // config.module.rules[0].exclude = [/core-js/]
    // console.log('config after 2nd', config.module.rules)

    // Use babel-plugin-remove-graphql-queries to remove static queries from components when rendering in storybook
    config.module.rules[0].use?.[0].options.plugins.push(
      require.resolve('babel-plugin-remove-graphql-queries')
    )

    console.log('config after babel', config.module.rules)

    console.log('config BEFORE resolve mainFields', config.resolve.mainFields)
    config.resolve.mainFields = ['browser', 'module', 'main']
    console.log('config AFTER resolve mainFields', config.resolve.mainFields)

    return config
  },
  docs: {
    autodocs: true,
  },
}

export default config
