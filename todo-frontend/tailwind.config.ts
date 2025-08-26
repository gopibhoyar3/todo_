/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: { bg: "#0B0F14", card: "#111827", ring: "#60A5FA" }
      }
    }
  },
  plugins: []
};
