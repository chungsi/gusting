const defaultTheme = require('tailwindcss/defaultTheme')
const plugin = require('tailwindcss/plugin')

module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./content/**/*.mdx"
  ],
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
        buttercup: {
          50: '#FFFCF1',
          100: '#FFFAE5',
          400: '#FFEC40',
          500: '#FFD540'
        },
        mandarin: {
          50: '#FFF6F1',
          100: '#FEEDE2',
          500: '#FAA56F',
          600: '#F66C20',
        },
        allium: {
          50: '#F8F5FC',
          100: '#F5EFFA',
          500: '#B894DE',
          600: '#9D6BD1',
        },
        cobalt: {
          500: '#7598FF',
          600: '#3366ff',
          700: '#0A3FDB',
          800: '#0C34AC',
          900: '#082477'
        },
        cedar: {
          50: '#FAFCE8',
          100: '#F4F7D1',
          400: '#C9D817',
          600: '#93BB30',
          700: '#799B3B',
          800: '#68853D',
          900: '#415A20',
          950: '#304413',
        },

        th: {
          primary: 'var(--primary)',
          bg: 'var(--c-bg-color)',
          highlight: 'var(--c-highlight-color)',
          header: 'var(--header-color)',
          text: 'var(--text-color)',
          link: 'var(--link-color)',
          meta: 'var(--meta-color)',
        }
      },
      fontFamily: {
        serif:   ['Fanwood Text', ...defaultTheme.fontFamily.serif],
        heading: ['Fanwood Text', ...defaultTheme.fontFamily.serif],
        mono: ['JetBrains Mono', ...defaultTheme.fontFamily.mono],
        body: ['JetBrains Mono', ...defaultTheme.fontFamily.mono]
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
  plugins: [
    plugin(function({ addVariant }) {
      addVariant('third', '&:nth-child(3n)')
    })
  ],
}