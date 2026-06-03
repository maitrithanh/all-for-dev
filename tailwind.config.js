/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        surface: {
          1: "#0c0f14",
          2: "#111827",
        },
        ink: {
          1: "#e5e7eb",
          2: "#cbd5f5",
        },
      },
      boxShadow: {
        soft: "0 12px 40px rgba(15, 23, 42, 0.2)",
      },
      fontFamily: {
        display: ["Space Grotesk", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "monospace"],
      },
    },
  },
  plugins: [],
};
