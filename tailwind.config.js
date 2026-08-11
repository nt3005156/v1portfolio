/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['General Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Clash Display', 'General Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      },
      colors: {
        ink: {
          50: '#f8f8f9',
          100: '#e9e9ec',
          900: '#0a0a0f',
          950: '#050507'
        },
        accent: {
          violet: '#7c3aed',
          indigo: '#6366f1',
          cyan: '#06b6d4',
          lime: '#a3e635'
        }
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 2s infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'marquee': 'marquee 25s linear infinite'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        glow: {
          '0%': { opacity: '0.5' },
          '100%': { opacity: '1' }
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' }
        }
      },
      backgroundImage: {
        'grid': 'linear-gradient(to right, #80808012 1px, transparent 1px), linear-gradient(to bottom, #80808012 1px, transparent 1px)',
        'aurora': 'radial-gradient(at 20% 30%, hsla(263,70%,50%,0.15) 0px, transparent 50%), radial-gradient(at 80% 20%, hsla(189,94%,43%,0.15) 0px, transparent 50%), radial-gradient(at 40% 80%, hsla(250,84%,54%,0.1) 0px, transparent 50%)'
      }
    },
  },
  plugins: [],
}
