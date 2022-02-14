const defaultTheme = require('tailwindcss/defaultTheme')

const baseFonts = {
  'serif': ['Fanwood Text', ...defaultTheme.fontFamily.serif],
  'mono': ['JetBrains Mono', ...defaultTheme.fontFamily.mono],
}

module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'th': {
          'primary': 'var(--primary)',
          'bg': 'var(--c-bg-color)',
          'highlight': 'var(--c-bg-highlight-color)',
        }
      },
      fontFamily: {
        'serif': baseFonts.serif,
        'mono': baseFonts.mono,
        'heading': baseFonts.serif,
        'body': baseFonts.mono
      },
    },
  },
  plugins: [],
}