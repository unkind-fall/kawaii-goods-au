import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/styles/**/*.css",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        kawaii: {
          pink: "#FFB6C1",
          cream: "#FFF8E7",
          mint: "#98D8C8",
          lavender: "#E6E6FA",
          peach: "#FFDAB9",
          sky: "#87CEEB",
        },
      },
      borderRadius: {
        kawaii: "1.5rem",
        "kawaii-lg": "2rem",
      },
      fontFamily: {
        sans: ["var(--font-noto-sans-jp)", "sans-serif"],
        display: ["var(--font-kosugi-maru)", "var(--font-noto-sans-jp)", "sans-serif"],
      },
      boxShadow: {
        kawaii: "0 4px 14px 0 rgba(255, 182, 193, 0.45), 0 1px 3px rgba(255, 182, 193, 0.3)",
        "kawaii-hover": "0 8px 25px rgba(255, 182, 193, 0.55), 0 2px 6px rgba(255, 182, 193, 0.35)",
        "kawaii-sm": "0 2px 8px rgba(255, 182, 193, 0.3)",
        "kawaii-lg": "0 10px 35px rgba(255, 182, 193, 0.5), 0 4px 12px rgba(255, 182, 193, 0.3)",
        "kawaii-glow": "0 0 24px rgba(255, 182, 193, 0.45), 0 0 8px rgba(255, 182, 193, 0.25)",
        "kawaii-mint": "0 4px 14px rgba(152, 216, 200, 0.4)",
        "kawaii-sky": "0 4px 14px rgba(135, 206, 235, 0.4)",
        "kawaii-lavender": "0 4px 14px rgba(230, 230, 250, 0.5)",
      },
      keyframes: {
        "bounce-soft": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-4px)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-1deg)" },
          "50%": { transform: "rotate(1deg)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        pop: {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.15)" },
          "100%": { transform: "scale(1)" },
        },
        squish: {
          "0%": { transform: "scale(1)" },
          "40%": { transform: "scale(0.97, 1.03)" },
          "100%": { transform: "scale(1)" },
        },
        "wobble-slow": {
          "0%, 100%": { transform: "rotate(-1.5deg)" },
          "50%": { transform: "rotate(1.5deg)" },
        },
        "heart-beat": {
          "0%, 100%": { transform: "scale(1)" },
          "15%": { transform: "scale(1.25)" },
          "30%": { transform: "scale(1)" },
          "45%": { transform: "scale(1.15)" },
          "60%": { transform: "scale(1)" },
        },
      },
      animation: {
        "bounce-soft": "bounce-soft 0.5s ease-in-out",
        wiggle: "wiggle 0.3s ease-in-out",
        float: "float 3s ease-in-out infinite",
        shimmer: "shimmer 1.8s ease-in-out infinite",
        pop: "pop 0.3s ease-out",
        squish: "squish 0.3s ease-out",
        "wobble-slow": "wobble-slow 2s ease-in-out infinite",
        "heart-beat": "heart-beat 0.6s ease-in-out",
      },
    },
  },
  plugins: [],
};
export default config;
