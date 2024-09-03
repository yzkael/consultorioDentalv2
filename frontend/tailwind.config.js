/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        loginBgPink: "rgb(244, 219, 221)",
      },
      fontFamily: {
        belleza: ["Belleza", "sans-serif"],
      },
    },
  },
  plugins: [],
};
