/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'header': '0px 4px 15px rgba(0, 0, 0, 0.05)',
      },
      dropShadow: {
        'book': '1.87536px 1.87536px 1.87536px rgba(0, 0, 0, 0.25)',
      }
    },
  },
  plugins: [],
}
