const daisyui = require("daisyui");

/** @type {import('tailwindcss').Config}*/
const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  daisyui: {
    themes: [
      {
      miracleproject: {
          "primary": "#e7b443d9",
          "secondary": "#3261bed9",
          "accent": "#DAE1E9",
          "neutral": "#3d4451",
          "base-100": "#FFF",
          "base-200": "#E5E7EB",
          "base-300": "#D1D5DB",
        },
      },
      "dark",
      "black",
    ],
  },

  theme: {
    extend: {}
  },

  plugins: [daisyui]
};

module.exports = config;