/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,ts,tsx,js,jsx}'],
	theme: {
		extend: {},
		colors: ({ colors }) => ({
			primary: '#A82A27',
			secondary: '#273241',
			gray: '#F6F6F6',
			'main-footer': '#273241',
			'white-mini': 'rgba(255, 255, 255, 0.6)',
			white: '#FFFFFF',
			'border-white': '#E6E8EC',
			'border-gray': 'E4E4E4',
		}),
		borderRadius: {
			none: '0',
			sm: '0.125rem',
			DEFAULT: '0.25rem',
			DEFAULT: '4px',
			md: '0.375rem',
			lg: '0.5rem',
			full: '9999px',
			large: '10px',
		},
		fontFamily: {
			new: ['SF Pro Text'],
			sans: [
				'ui-sans-serif',
				'system-ui',
				'-apple-system',
				'BlinkMacSystemFont',
				'"Segoe UI"',
				'Roboto',
				'"Helvetica Neue"',
				'Arial',
				'"Noto Sans"',
				'sans-serif',
				'"Apple Color Emoji"',
				'"Segoe UI Emoji"',
				'"Segoe UI Symbol"',
				'"Noto Color Emoji"',
			],
			serif: ['ui-serif', 'Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
			mono: [
				'ui-monospace',
				'SFMono-Regular',
				'Menlo',
				'Monaco',
				'Consolas',
				'"Liberation Mono"',
				'"Courier New"',
				'monospace',
			],
		},
		fontWeight: {
			thin: '100',
			extralight: '200',
			light: '300',
			normal: '400',
			medium: '500',
			semibold: '600',
			bold: '700',
			extrabold: '800',
			black: '900',
		},
		screens: {
			'2xl': { max: '1535px' },
			// => @media (max-width: 1535px) { ... }

			xl: { max: '1279px' },
			// => @media (max-width: 1279px) { ... }

			lg: { max: '1023px' },
			// => @media (max-width: 1023px) { ... }

			md: { max: '767px' },
			// => @media (max-width: 767px) { ... }

			sm: { max: '639px' },
			// => @media (max-width: 639px) { ... }
		},
	},
	plugins: [],
};
