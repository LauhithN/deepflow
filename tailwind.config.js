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
        // Cyberpunk theme colors
        'cyber-black': '#0a0b10',
        'cyber-navy': '#051b30',
        'cyber-blue': {
          100: '#00ccff33',
          300: '#00ccff66',
          500: '#00ccff',
          700: '#00ccffcc',
          900: '#00ccffff',
        },
        'cyber-purple': {
          100: '#ff00ff33',
          300: '#ff00ff66',
          500: '#ff00ff',
          700: '#ff00ffcc',
          900: '#ff00ffff',
        },
        'cyber-green': {
          100: '#00ff0033',
          300: '#00ff0066',
          500: '#00ff00',
          700: '#00ff00cc',
          900: '#00ff00ff',
        },
      },
      fontFamily: {
        'cyber': ['Share Tech Mono', 'monospace'],
        'cyber-header': ['Orbitron', 'sans-serif'],
      },
      boxShadow: {
        'cyber-blue': '0 0 5px #00ccff, 0 0 10px #00ccff, 0 0 15px #00ccff',
        'cyber-purple': '0 0 5px #ff00ff, 0 0 10px #ff00ff, 0 0 15px #ff00ff',
        'cyber-green': '0 0 5px #00ff00, 0 0 10px #00ff00, 0 0 15px #00ff00',
      },
      animation: {
        'pulse-blue': 'pulse-blue 2s infinite',
        'pulse-purple': 'pulse-purple 2s infinite',
        'pulse-green': 'pulse-green 2s infinite',
        'glitch': 'glitch 1s ease-in-out infinite',
      },
      keyframes: {
        'pulse-blue': {
          '0%, 100%': { boxShadow: '0 0 5px #00ccff, 0 0 10px #00ccff' },
          '50%': { boxShadow: '0 0 10px #00ccff, 0 0 15px #00ccff, 0 0 20px #00ccff' },
        },
        'pulse-purple': {
          '0%, 100%': { boxShadow: '0 0 5px #ff00ff, 0 0 10px #ff00ff' },
          '50%': { boxShadow: '0 0 10px #ff00ff, 0 0 15px #ff00ff, 0 0 20px #ff00ff' },
        },
        'pulse-green': {
          '0%, 100%': { boxShadow: '0 0 5px #00ff00, 0 0 10px #00ff00' },
          '50%': { boxShadow: '0 0 10px #00ff00, 0 0 15px #00ff00, 0 0 20px #00ff00' },
        },
        'glitch': {
          '0%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
          '100%': { transform: 'translate(0)' },
        },
      },
    },
  },
  plugins: [],
} 