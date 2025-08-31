/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // adjust to your project
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb",   // Blue
        secondary: "#9333ea", // Purple
        background: "#f9fafb",
        textDark: "#111827",
      },
    },
  },
  plugins: [],
};
