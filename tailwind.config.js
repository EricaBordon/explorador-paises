/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // 👈 activamos modo oscuro manual con una clase
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
