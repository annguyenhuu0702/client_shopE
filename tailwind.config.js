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
        'border-mobile': '#D9D9D9',
        'name-product': '#333f48',
        'root-price': '#fdaa63',
        'border-product-page': '#c8c7cc',
      },
      width: {
        45: '45rem',
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
