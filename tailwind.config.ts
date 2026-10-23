import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: "#0f172a",
          dark: "#0b1120",
          emerald: "#10b981",
          emeraldDark: "#059669",
          amber: "#f59e0b",
          amberDark: "#d97706",
          slate: "#334155",
          steel: "#475569",
          border: "#1e293b",
        },
      },
    },
  },
  plugins: [],
};

export default config;
