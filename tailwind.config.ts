import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          red: "#C8392B",
          "red-dark": "#A52E22",
          orange: "#E8621A",
          gold: "#C9A84C",
          brown: "#6B2D0E",
        },
        surface: {
          base: "#FDFAF6",
          card: "#F5F0E8",
          elevated: "#EDE6D9",
          border: "rgba(107,45,14,0.10)",
        },
        ink: {
          primary: "#1C1208",
          secondary: "#6B5B45",
          muted: "#A8967E",
        },
      },
      fontFamily: {
        display: ["'Playfair Display'", "Georgia", "serif"],
        sans: ["'DM Sans'", "system-ui", "sans-serif"],
      },
      animation: {
        marquee: "marquee 32s linear infinite",
        "fade-up": "fadeUp 0.7s ease forwards",
        "bounce-slow": "bounce 2.5s infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
