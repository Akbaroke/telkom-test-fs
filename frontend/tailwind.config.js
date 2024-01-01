/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#aa69ff',
        softGray: '#2b2b2f',
        hardGray: '#1e1e24',
        darkPrimary: '#101015',
        darkSecondary: '#15151b',
        white: '#c4c4c5',
      },
    },
  },
  plugins: [],
};