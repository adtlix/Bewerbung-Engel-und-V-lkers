import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Engel & Völkers Markenrot als Akzent / volumetrisches Licht
        ev: {
          red: "#E4002B",
          black: "#000000",
          anthracite: "#111111",
          steel: "#1a1a1a",
        },
      },
      fontFamily: {
        // System-Stack: keine externen Webfonts nötig, bleibt brutalistisch-clean
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "Arial", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      keyframes: {
        // Laufender News-Ticker
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        // Pulsierendes "LIVE"-Signal
        livePulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.25" },
        },
        flicker: {
          "0%, 100%": { opacity: "1" },
          "92%": { opacity: "1" },
          "94%": { opacity: "0.6" },
          "96%": { opacity: "1" },
        },
      },
      animation: {
        marquee: "marquee 22s linear infinite",
        livePulse: "livePulse 1.4s ease-in-out infinite",
        flicker: "flicker 6s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
