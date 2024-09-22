/** @type {import('tailwindcss').Config} */
module.exports = {
  // This is my boilerplate default configuration for Tailwind CSS and daisyUI
  content: ["./index.html", "./JavaScript/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        lexend: ["Lexend"],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light"],
  },
  corePlugins: {},
};