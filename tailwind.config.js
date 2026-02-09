/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF0000', // Logic Labs Red
        secondary: '#FFFFFF', // Logic Labs White
        dark: '#111111', // Contrast dark
        'dark-lighter': '#1a1a1a',
        'light-dim': '#f5f5f5',
      },
      fontFamily: {
        // We'll import these in index.css or index.html
        heading: ['Oswald', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      }
    },
  },
  plugins: [],
}
