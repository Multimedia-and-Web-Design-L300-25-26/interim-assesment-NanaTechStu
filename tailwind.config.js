/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cb: {
          blue:    '#0052FF',
          'blue-dark': '#0039B3',
          'blue-light': '#EBF0FF',
          green:   '#05B169',
          red:     '#F15A24',
          gray:    '#F5F5F5',
          'gray-2':'#E2E2E2',
          'gray-3':'#9B9B9B',
          dark:    '#0A0B0D',
          'dark-2':'#16181D',
          'dark-3':'#1E2026',
        },
      },
      fontFamily: {
        sans: ['Coinbase Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Coinbase Display', 'Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
