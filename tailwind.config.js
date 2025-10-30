/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        'custom-black': '#343434',
        'custom-blue': '#00328E',
        'custom-light-blue': '#EBF2FF',
        'custom-grey': '#848484',
        'custom-green': '#2C9361',
        'custom-red': '#DB0000',
        'custom-yellow': '#C2A200',
        // Cores acessíveis com contraste adequado
        'accessible': {
          'bg-primary': 'var(--color-bg-primary)',
          'bg-secondary': 'var(--color-bg-secondary)',
          'text-primary': 'var(--color-text-primary)',
          'text-secondary': 'var(--color-text-secondary)',
          'accent': 'var(--color-accent)',
          'accent-hover': 'var(--color-accent-hover)',
          'border': 'var(--color-border)',
          'error': 'var(--color-error)',
          'success': 'var(--color-success)',
          'warning': 'var(--color-warning)',
          'focus': 'var(--color-focus)',
        }
      },
      fontSize: {
        'accessible-sm': 'var(--font-size-sm)',
        'accessible-base': 'var(--font-size-base)',
        'accessible-lg': 'var(--font-size-lg)',
        'accessible-xl': 'var(--font-size-xl)',
      },
      transitionDuration: {
        'accessible': 'var(--transition-duration)',
      },
      animation: {
        'accessible-spin': 'spin var(--animation-duration) linear infinite',
      },
      minHeight: {
        'touch': '44px', // Tamanho mínimo para elementos tocáveis
      },
      minWidth: {
        'touch': '44px',
      },
    },
  },
  plugins: [],
}