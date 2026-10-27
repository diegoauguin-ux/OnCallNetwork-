/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0E1512",
        paper: "#F6F3EC",
        line: "#E2DDD1",
        forest: { DEFAULT: "#14342B", soft: "#1D4A3D" },
        accent: { DEFAULT: "#B9452D", dark: "#9A3822", light: "#EE8D76" },
        muted: "#5B6560",
      },
      fontFamily: {
        display: ["'Instrument Serif'", "Georgia", "serif"],
        sans: ["'Geist Variable'", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
      },
      maxWidth: { site: "1280px" },
      borderRadius: {
        lg: "8px",
        md: "6px",
        sm: "4px",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};
