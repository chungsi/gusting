const React = require("react");
module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials", "@storybook/addon-interactions"],
  framework: {
    name: "@storybook/react-webpack5",
    options: {}
  },
  // webpackFinal: async (config, { configType }) => {
  //   // console.log('config', config)

  //   config.module.rules.push({
  //     test: /\.(mjs|tsx?|jsx?)$/,
  //     exclude: [/node_modules\/(?!(gatsby|gatsby-script)\/)/, /core-js/],
  //     use: [
  //       {
  //         options: {
  //           plugins: [require.resolve("babel-plugin-remove-graphql-queries")],
  //         }
  //       }
  //     ]
  //   })

  //   console.log('config rules', config.module.rules)

  //   // // Transpile Gatsby module because Gatsby includes un-transpiled ES6 code.
  //   // config.module.rules[0].exclude = [/node_modules\/(?!(gatsby|gatsby-script)\/)/];

  //   // Use correct react-dom depending on React version.
  //   if (parseInt(React.version) <= 18) {
  //     config.externals = ["react-dom/client"];
  //   }

  //   // // Remove core-js to prevent issues with Storybook
  //   // config.module.rules[0].exclude = [/core-js/];
  //   // // Use babel-plugin-remove-graphql-queries to remove static queries from components when rendering in storybook
  //   // config.module.rules[0].use[0].options.plugins.push(require.resolve("babel-plugin-remove-graphql-queries"));
  //   config.resolve.mainFields = ["browser", "module", "main"];
  //   return config;
  // },
  docs: {
    autodocs: true
  }
};