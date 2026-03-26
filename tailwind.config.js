/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary colors
        primary: {
          DEFAULT: '#12120F',
          50: '#F2F2F1',
          100: '#E5E5E3',
          200: '#C9C9C4',
          300: '#A1A19A',
          400: '#75756D',
          500: '#5A5A53',
          600: '#484841',
          700: '#383833',
          800: '#262622',
          900: '#1A1A17',
          950: '#12120F',
        },
        // Accent colors
        accent: {
          DEFAULT: '#059669',
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#059669',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
        // Custom colors
        cream: '#F5F1E8',
      },

      fontFamily: {
        display: ['var(--font-peace)', 'sans-serif'], // Big headlines
        sans: ['var(--font-mont)', 'sans-serif'], // Body text
      },
    },
  },
  plugins: [],
}
