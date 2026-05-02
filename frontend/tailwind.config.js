/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        sidebar: {
          DEFAULT: "#1E1B4B",
          light: "#2D1B69",
          accent: "#4C1D95",
        },
      },
      boxShadow: {
        "purple-sm":
          "0 1px 3px 0 rgba(124, 58, 237, 0.08), 0 1px 2px -1px rgba(124, 58, 237, 0.08)",
        "purple-md":
          "0 4px 16px -2px rgba(124, 58, 237, 0.15), 0 2px 8px -2px rgba(124, 58, 237, 0.10)",
        "purple-lg":
          "0 10px 40px -4px rgba(124, 58, 237, 0.25), 0 4px 16px -4px rgba(124, 58, 237, 0.15)",
        "purple-glow": "0 0 20px rgba(139, 92, 246, 0.4)",
      },
      backgroundImage: {
        "sidebar-gradient":
          "linear-gradient(180deg, #1E1B4B 0%, #2D1B69 50%, #3B1F7A 100%)",
        "auth-left":
          "linear-gradient(160deg, #1E1B4B 0%, #4C1D95 40%, #6D28D9 100%)",
      },
      animation: {
        "fade-up": "fadeUp 0.4s ease-out both",
        "slide-in-right": "slideInRight 0.3s ease-out both",
        shrink: "shrink 4s linear forwards",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(16px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        shrink: {
          "0%": { width: "100%" },
          "100%": { width: "0%" },
        },
      },
    },
  },
  plugins: [],
};
