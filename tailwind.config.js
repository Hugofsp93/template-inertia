/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/frontend/**/*.{js,jsx,ts,tsx}",
    "./app/views/**/*.erb"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
} 