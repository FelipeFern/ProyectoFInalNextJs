/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx}',
		'./src/components/**/*.{js,ts,jsx,tsx}',
		'./src/app/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic':
					'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
			colors: {
				primary: '#223E3F',
				secondary: '#CF8420',
				'light-gray': '#7B7B7B',
				// primary: '#BDEB00',
				// secondary: {
				// 	100: '#1E1F25',
				// 	900: '#131517',
				// },
				titles: '#374151',
				texts: '#1e293b',
				placeholder: '#9ca3af',
			},
			gridTemplateColumns: {
				'list-cards': 'repeat(auto-fit, minmax(250px, 1fr))',
			},
			screens: {
				xs: '400px',
			},
		},
	},
	plugins: [],
};
