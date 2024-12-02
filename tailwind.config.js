/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-gray': '#4C6173',
        'custom-beige': '#F2F0E5',
      },
    },
  },
  plugins: [],
}

