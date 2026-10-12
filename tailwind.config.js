/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./js/**/*.js"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef6ff",
          100: "#d9ecff",
          300: "#7cc3f0",
          400: "#4aa8e6",
          500: "#2d8fd6",
          600: "#1f6fb2",
          700: "#184f86",
        },
        teal: {
          300: "#5fd3d0",
          400: "#35bdc0",
          500: "#15a7ab",
        },
      },
    },
  },
  plugins: [],
};
