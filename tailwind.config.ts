import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Syne'", "sans-serif"],
        body: ["'DM Sans'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      colors: {
        bg: "#0A0A0F",
        surface: "#111118",
        card: "#16161F",
        border: "#1E1E2E",
        accent: "#00FFB2",
        accent2: "#7B61FF",
        accent3: "#FF6B6B",
        muted: "#4A4A6A",
        text: "#E8E8F0",
        dim: "#8888AA",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 4s ease-in-out infinite",
        "spin-slow": "spin 20s linear infinite",
        "gradient-shift": "gradientShift 8s ease infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
        "scanline": "scanline 8s linear infinite",
        "typewriter": "typewriter 2s steps(40) forwards",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        glow: {
          from: { boxShadow: "0 0 10px #00FFB230, 0 0 20px #00FFB215" },
          to: { boxShadow: "0 0 20px #00FFB260, 0 0 40px #00FFB230" },
        },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        typewriter: {
          from: { width: "0" },
          to: { width: "100%" },
        },
      },
      backgroundImage: {
        "grid-pattern": "linear-gradient(rgba(0,255,178,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,178,0.03) 1px, transparent 1px)",
        "noise": "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
};
export default config;
