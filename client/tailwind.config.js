/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        syncoria: {
          DEFAULT: "#113155",
          50: "#448ADA",
          100: "#3380D6",
          200: "#256CBB",
          300: "#1F5899",
          400: "#184577",
          500: "#113155",
          600: "#081626",
          700: "#000000",
          800: "#000000",
          900: "#000000",
        },
      },
    },
  },
  plugins: [],
};
