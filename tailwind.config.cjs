/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
        fadeOut: { from: { opacity: 1 }, to: { opacity: 0 } },
        scaleIn: {
          '0%': { opacity: 0, transform: 'translate(-50%, -48%) scale(0.96)' },
          '100%': { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
        },
        scaleOut: {
          '0%': { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
          '100%': { opacity: 0, transform: 'translate(-50%, -48%) scale(0.96)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 200ms ease-out forwards',
        fadeOut: 'fadeOut 200ms ease-in forwards',
        scaleIn: 'scaleIn 250ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
        scaleOut: 'scaleOut 200ms ease-in forwards',
      },
    },
  },
  plugins: [],
};
