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
        // Paleta de obra (tema claro). Verde = subida/materiales, naranja = bajada/residuos,
        // amarillo = señalética, celeste = digital/QR. Los nombres emerald/amber/navy/dark se
        // conservan del tema anterior; el texto de color sobre fondo claro usa las variantes *Dark.
        brand: {
          navy: "#fffdf8",
          dark: "#fff8ec",
          cream: "#fff8ec",
          ink: "#14213d",
          emerald: "#00b84a",
          emeraldDark: "#047a3b",
          amber: "#ff6a00",
          amberDark: "#c2410c",
          yellow: "#ffd60a",
          sky: "#0ea5e9",
          slate: "#334155",
          steel: "#475569",
          border: "#e7dcc8",
        },
      },
      boxShadow: {
        // Sombra dura tipo señalética
        hard: "4px 4px 0 0 #14213d",
        "hard-green": "4px 4px 0 0 #00b84a",
        "hard-orange": "4px 4px 0 0 #ff6a00",
      },
      keyframes: {
        dash: { to: { strokeDashoffset: "-24" } },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        rain: {
          from: { transform: "translateY(-12px)", opacity: "0" },
          "30%": { opacity: "1" },
          to: { transform: "translateY(28px)", opacity: "0" },
        },
        scan: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(100%)" },
        },
      },
      animation: {
        dash: "dash 0.8s linear infinite",
        float: "float 3s ease-in-out infinite",
        rain: "rain 0.9s linear infinite",
        scan: "scan 1.6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
