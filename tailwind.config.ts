import type { Config } from "tailwindcss";

export default {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx}",
		"./src/components/**/*.{js,ts,jsx,tsx}",
		"./src/app/**/*.{js,ts,jsx,tsx}",
		"./src/styles/globals.css",
	],
	theme: {
		extend: {
			fontFamily: {
				sans: [
					"var(--font-geist-sans)",
					"ui-sans-serif",
					"system-ui",
					"sans-serif",
				],
				mono: ["var(--font-geist-mono)", "monospace"],
				epilogue: ["var(--font-epilogue)", "sans-serif"],
				redHat: ["var(--font-red_hat_display)", "sans-serif"],
				abel: ["var(--font-abel)", "sans-serif"],
				inter: ["var(--font-inter)", "sans-serif"],
			},
			colors: {
				background: "var(--background)",
				foreground: "var(--foreground)",
			},
		},
	},
	plugins: [],
} satisfies Config;
