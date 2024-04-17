/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}", "./index.html"],
  theme: {
    extend: {
      screens: {
        xs: { max: "639px" }, // screens smaller than 640px
      },
      spacing: {
        2.5: "45%", // Assuming '2.5' means you want 40%
      },
    },
  },
  plugins: [],
};
