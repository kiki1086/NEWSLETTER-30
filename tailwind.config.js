/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          50: '#FDFCF9',
          100: '#FDFBF7',
          200: '#F8F5EE',
          300: '#EFE9DC',
          400: '#E4DCShort',
          500: '#D5CBB6',
        },
        navy: {
          950: '#040B14',
          900: '#0C2340',
          800: '#143054',
          700: '#1B365D',
          600: '#284E82',
        },
        saffron: {
          400: '#FFA043',
          500: '#FF8A00',
          600: '#E06D14',
          700: '#C85A00',
          800: '#9E4400',
        },
        forest: {
          900: '#0F2111',
          800: '#1E3F20',
          700: '#2D5A27',
          600: '#3D7835',
          500: '#4D9644',
        },
        sand: {
          100: '#F5F3ED',
          200: '#E8E3D5',
          300: '#D8D2C2',
          400: '#B8B09D',
          500: '#8A8270',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'Cambria', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'Menlo', 'monospace'],
        display: ['"Cinzel"', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}
