/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6',
        secondary: '#6366f1',
        dark: '#0f172a',
        'dark-lighter': '#1e293b',
      }
    },
  },
  plugins: [],
}