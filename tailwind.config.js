/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["InterVariable", "Inter", "ui-sans-serif", "system-ui"],
        heading: ["Poppins", "ui-sans-serif", "system-ui"],
      },
      colors: {
        midnightNavy: '#0A0C1B', // Background / Footer
        digitalBlue: '#2B78E4', // Links / Buttons / Highlights
        fuchsiaAccent: '#CE1A89', // CTAs / Headings / Highlights
        softWhite: '#F4F4F4', // Text on dark background
        slateGray: '#4E5566', // Subtext / UI elements
        tealLightGlow: '#71D3E3', // Hover effects / Accent glow
      },
    },
  },
  plugins: [],
  darkMode: "class",
}

