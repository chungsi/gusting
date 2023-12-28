import { action } from "@storybook/addon-actions"
import { withThemeByDataAttribute } from '@storybook/addon-styling'
import { themes } from '@storybook/theming'

import '../src/css/global.css'

// Gatsby's Link overrides:
// Gatsby Link calls the `enqueue` & `hovering` methods on the global variable ___loader.
// This global object isn't set in storybook context, requiring you to override it to empty functions (no-op),
// so Gatsby Link doesn't throw errors.
global.___loader = {
  enqueue: () => { },
  hovering: () => { },
}
// This global variable prevents the "__BASE_PATH__ is not defined" error inside Storybook.
global.__BASE_PATH__ = "/"

// Navigating through a gatsby app using gatsby-link or any other gatsby component will use the `___navigate` method.
// In Storybook, it makes more sense to log an action than doing an actual navigate. Check out the actions addon docs for more info: https://storybook.js.org/docs/react/essentials/actions
// TODO: not sure how to convert this to be Typescript compatible
window.___navigate = pathname => {
  action("NavigateTo:")(pathname)
}

export const decorators = [
  withThemeByDataAttribute({
    themes: {
      art: 'theme-art',
      design: 'theme-design',
      // dev: 'dev',
      // storytelling: 'storytelling',
    },
    defaultTheme: 'theme-art',
    attributeName: 'id',
    // parentSelector: 'main'
  })
]

export const parameters = {
  docs: {
    theme: themes.dark,
  },
  layout: 'centered',
  actions: { argTypesRegex: "^on[A-Z].*" },
  backgrounds: {
    default: 'light',
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
