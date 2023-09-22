/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",

		// Or if using `src` directory:
		"./src/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			fontFamily: {
				bungee: ["Bungee Hailine", "monospace"],
			},
			backgroundImage: {
				Home: "url('/static/assets/home_icon.svg')",
				Challenges: "url('/static/assets/challs_icon.svg')",
				Submissions: "url('/static/assets/logs_icon.svg')",
				Login: "url('/static/assets/login_icon.svg')",
				Logout: "url('/static/assets/logout_icon.svg')",

			},
		},
	},
	plugins: [],
}