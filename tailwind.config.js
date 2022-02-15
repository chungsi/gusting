const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    fontSize: {
      'xs':   'var(--h-xs)',
      'sm':   'var(--h-sm)',
      'md':   'var(--h-md)', // alias for base
      'base': 'var(--h-md)',
      'lg':   'var(--h-lg)',
      'xl':   'var(--h-xl)',
      '2xl':  'var(--h-2xl)',
      '3xl':  'var(--h-3xl)',
      '4xl':  'var(--h-4xl)',
      '5xl':  'var(--h-5xl)'
    },
    extend: {
      colors: {
        'th': {
          'primary': 'var(--primary)',
          'bg': 'var(--c-bg-color)',
          'highlight': 'var(--c-highlight-color)',

          'header': 'var(--header-color)',
          'text': 'var(--text-color)',
          'link': 'var(--link-color)',
          'meta': 'var(--meta-color)',
        }
      },
      fontFamily: {
        'serif':   ['Fanwood Text', ...defaultTheme.fontFamily.serif],
        'heading': ['Fanwood Text', ...defaultTheme.fontFamily.serif],
        'mono': ['JetBrains Mono', ...defaultTheme.fontFamily.mono],
        'body': ['JetBrains Mono', ...defaultTheme.fontFamily.mono]
      },
      spacing: {
        '3xs': 'var(--space-3xs)',
        '2xs': 'var(--space-2xs)',
        'xs': 'var(--space-xs)',
        'sm': 'var(--space-sm)',
        'md': 'var(--space-md)',
        'lg': 'var(--space-lg)',
        'xl': 'var(--space-xl)',
        '2xl': 'var(--space-2xl)',
        '3xl': 'var(--space-3xl)',
        '4xl': 'var(--space-4xl)',
        '5xl': 'var(--space-5xl)',
      }
    },
  },
  plugins: [],
}