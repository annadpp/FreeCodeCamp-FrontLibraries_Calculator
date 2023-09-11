/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        lightblue: "#b9e7df",
        darkblue: "#b8e1f5",
        darkpink: "#ffc4c8",
        lightpink: "#ffe1e1",
        custard: "#ffd162",
        creme: "#faf4e1",
        lightgrey: "#8f8f8f",
        darkgrey: "#262626",
      },
    },
  },
  plugins: [],
};
