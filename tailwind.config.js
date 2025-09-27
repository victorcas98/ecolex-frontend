/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        'custom-black': '#343434',
        'custom-blue': '#00328E',
        'custom-light-blue': '#EBF2FF',
        'custom-grey': '#848484',
        'custom-green': '#2C9361',
        'custom-red': '#DB0000',
        'custom-yellow': '#C2A200',
      },
    },
  },
  plugins: [],
}