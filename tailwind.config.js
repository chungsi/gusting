import containerQueries from '@tailwindcss/container-queries'
import defaultTheme from 'tailwindcss/defaultTheme'
import plugin from 'tailwindcss/plugin'

/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
	],
	theme: {
		fontSize: {
			'xs': 'var(--h-xs)',
			'sm': 'var(--h-sm)',
			'md': 'var(--h-md)', // alias for base
			'base': 'var(--h-md)',
			'lg': 'var(--h-lg)',
			'xl': 'var(--h-xl)',
			'2xl': 'var(--h-2xl)',
			'3xl': 'var(--h-3xl)',
			'4xl': 'var(--h-4xl)',
			'5xl': 'var(--h-5xl)'
		},
		extend: {
			colors: {
				buttercup: {
					50: '#FFFCF1',
					100: '#FFFAE5',
					400: '#FFEC40',
					500: '#FFD540',
					600: '#F6A507'
				},
				mandarin: {
					50: '#FFF6F1',
					100: '#FEEDE2',
					500: '#FAA56F',
					600: '#F66C20'
				},
				allium: {
					50: '#F8F5FC',
					100: '#F5EFFA',
					500: '#B894DE',
					600: '#9D6BD1'
				},
				pine: {
					50: '#F0FDED',
					100: '#E1F9DC',
					500: '#68C35B',
					600: '#3B9B43',
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
					950: '#304413'
				},

				th: {
					primary: 'var(--primary-color)',
					header: 'var(--header-color)',
					text: 'var(--text-color)',
					link: 'var(--link-color)',
					meta: 'var(--meta-color)',
					highlight: 'var(--c-highlight-color)',
					bg: 'var(--c-bg-color)',
				}
			},
			fontFamily: {
				serif: [ 'Fanwood Text', ...defaultTheme.fontFamily.serif ],
				heading: [ 'Fanwood Text', ...defaultTheme.fontFamily.serif ],
				mono: [ 'Commit Mono', ...defaultTheme.fontFamily.mono ],
				body: [ 'Commit Mono', ...defaultTheme.fontFamily.mono ]
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
				'6xl': 'var(--space-6xl)',
			},
			screens: {
				'2xs-th': '30rem', // 428px
				'xs-th': '39rem', // 624px
				'sm-th': '44rem', // 704px
				'md-th': '50rem', // 800px
				'lg-th': '70rem', // 1120px
				'xl-th': '96rem', // 1536px
				'2xl-th': '120rem', // 1920px
			}
		},
	},
	plugins: [
		containerQueries,
		plugin(function ({ addVariant }) {
			addVariant('third', '&:nth-child(3n)')
		})
	],
}
