/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      height: {
        "screen-25": "25vh",
        "screen-50": "50vh",
        "screen-70": "70vh",
        "screen-73": "73vh",
      },
    },
  },
  plugins: [],
};
