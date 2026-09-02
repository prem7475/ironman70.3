/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#E10600', // Primary brand accent
        secondary: '#000000',
        accent: '#FFD700',
      },
      fontFamily: {
        ironman: ['"Titillium Web"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
