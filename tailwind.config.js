/** @type {import('tailwindcss').Config} */
import flowbite from "flowbite-react/tailwind";
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content()
  ],
  theme: {
    container:{
      center: true,
    screens: {
      'sm': '600px',
      'md': '728px',
      'lg': '960px',
      'xl': '1200px',
      '2xl': '1380px',
    }
    },
    extend: {
      fontFamily: {
        cairo: 'Cairo Variable'
      },
      colors: {
        primary: {
          50: "#e7f7e7",
          100: "#9dde9d",
          200: "#6cce6c",
          300: "#54c654",
          400: "#3bbd3b",
          500: "#23b523",
          600: "#0aad0a",
          700: "#099c09",
          800: "#088a08",
          900: "#066806",
          950: "#033303",
        },
      },
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
}

