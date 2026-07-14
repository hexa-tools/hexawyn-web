import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#080C12",
        navy: "#0A1628",
        brand: {
          DEFAULT: "#3B82F6",
          dark: "#1E3A8A",
        },
        cloud: "#F0F4FF",
      },
      fontFamily: {
        sans: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: {
        content: "72rem",
      },
      boxShadow: {
        glow: "0 0 80px -20px rgba(59, 130, 246, 0.45)",
      },
    },
  },
  plugins: [],
};

export default config;
