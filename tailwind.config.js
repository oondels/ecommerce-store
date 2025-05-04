/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#E6EBF4',
          100: '#C2D1E4',
          200: '#9AB5D3',
          300: '#7298C2',
          400: '#4F82B8',
          500: '#336699',
          600: '#295A87',
          700: '#1F4A75',
          800: '#153A63',
          900: '#0A2342',
        },
        secondary: {
          50: '#F6F6F6',
          100: '#E7E7E7',
          200: '#D1D1D1',
          300: '#B8B8B8',
          400: '#999999',
          500: '#666666',
          600: '#4D4D4D',
          700: '#333333',
          800: '#1A1A1A',
          900: '#121212',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};