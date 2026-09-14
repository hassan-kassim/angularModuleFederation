/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './apps/**/*.{html,ts}',
    './libs/**/*.{html,ts}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--app-color-primary)',
        secondary: 'var(--app-color-secondary)',
        background: 'var(--app-color-background)',
        text: 'var(--app-color-text)',
      },
    },
  },
  plugins: [],
};
