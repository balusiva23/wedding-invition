/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#FCF9EE',
          100: '#F7F0D4',
          200: '#EDDDA6',
          300: '#E1C773',
          400: '#D4B043',
          500: '#C59A27',
          600: '#A97E1C',
          700: '#886017',
          800: '#6C4A17',
          900: '#583D17',
        },
        maroon: {
          50: '#FDF3F3',
          100: '#FBE6E7',
          200: '#F7D0D3',
          300: '#EEAAB1',
          400: '#E07783',
          500: '#CE4B5C',
          600: '#B63345',
          700: '#982536',
          800: '#7E2230',
          900: '#4D101A',
          950: '#2D060C',
        },
        ivory: {
          50: '#FCFBF7',
          100: '#F7F5EE',
          200: '#EFECE0',
          300: '#E4DFCC',
          400: '#D5CDB2',
          500: '#C2B797',
        },
        temple: {
          green: '#1A382B',
          deepgreen: '#0F231B',
          terracotta: '#A8482A',
          sandalwood: '#C89358'
        }
      },
      fontFamily: {
        serif: ['Cinzel', 'Playfair Display', 'Cormorant Garamond', 'Georgia', 'serif'],
        display: ['Cinzel Decorative', 'Cinzel', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'flame': 'flame 1.5s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        flame: {
          '0%': { transform: 'scale(1) rotate(-1deg)', opacity: '0.9' },
          '50%': { transform: 'scale(1.08, 1.15) rotate(1.5deg)', opacity: '1' },
          '100%': { transform: 'scale(0.95, 0.98) rotate(-1deg)', opacity: '0.85' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
