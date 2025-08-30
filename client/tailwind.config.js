/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0D9488",   // Teal Green
        secondary: "#F97316", // Orange
        background: "#F3F4F6", // Light Gray
        textDark: "#334155",   // Slate Gray
      },
    },
  },
  plugins: [],
};
