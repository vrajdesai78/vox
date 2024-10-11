/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        bricolage: ['"Bricolage Grotesque"', 'sans-serif'],
        inter: ['"Inter"', 'sans-serif'],
      },
      colors: {
        'custom-gray': '#616161',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
