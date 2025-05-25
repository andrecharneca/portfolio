/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // enables manual dark mode
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      dropShadow: {
        "glow-green": [
          "0 0px 20px rgba(0, 255, 0, 0.65)"
        ],
        "glow-purple": [
          "0 0px 20px rgba(208, 80, 242, 0.95)"
        ]
      }
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
