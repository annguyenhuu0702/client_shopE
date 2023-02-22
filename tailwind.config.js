/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      screens: {
        xss: '375px',
      },
      colors: {
        'border-mobile': '#D9D9D9',
        'btn-order': '#fcaf17',
        'hover-btn-order': '#BD8311',
        'bg-cart': '#f9f9f9',
        'name-product': '#333f48',
        'root-price': '#fdaa63',
        'border-product-page': '#c8c7cc',
        'border-checkout': '#545454',
        'bg-checkout': '#e7e8fc',
      },
      width: {
        45: '45rem',
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
