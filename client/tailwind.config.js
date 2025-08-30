/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb",     // blue
        secondary: "#9333ea",   // purple
        background: "#f9fafb",  // light gray background
        textDark: "#111827",    // dark text
      },
    },
  },
  plugins: [],
}
