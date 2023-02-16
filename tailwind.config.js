/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      screens: {
        xss: '375px',
      },
      colors: {
        'btn-order': '#333f48',
        'bg-cart': '#f9f9f9',
      },
      spacing: {
        '100%': '100%',
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
