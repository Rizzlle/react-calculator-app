const PAD_SIZE = "5rem";

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			gridTemplateColumns: {
				calculator: `repeat(4, ${PAD_SIZE})`,
			},
			gridAutoRows: {
				calculator: PAD_SIZE,
			},
		},
	},
	plugins: [],
};
