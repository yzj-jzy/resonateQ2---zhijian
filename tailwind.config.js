/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        phone: { max: '640px' }, 
        tablet: { min: '641px', max: '1024px' }, 
        desktop: { min: '1025px' }, 
      },
    },
  },
  plugins: [],
};
