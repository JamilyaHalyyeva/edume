/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}", "./index.html"],
  theme: {
    extend: {
      screens: {
        xs: { max: "639px" }, // screens smaller than 640px
      },
      spacing: {
        7.25: "29%", // Tailwind uses a scale of 0 to spacing, so 7.25 is arbitrary
      },
    },
  },
  plugins: [],
};
