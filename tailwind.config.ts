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
        sans: ["var(--font-noto-sans-jp)", "var(--font-kosugi-maru)", "sans-serif"],
      },
      boxShadow: {
        kawaii: "0 4px 14px 0 rgba(255, 182, 193, 0.39)",
        "kawaii-hover": "0 6px 20px rgba(255, 182, 193, 0.5)",
        "kawaii-sm": "0 2px 8px rgba(255, 182, 193, 0.25)",
        "kawaii-lg": "0 8px 30px rgba(255, 182, 193, 0.45)",
        "kawaii-glow": "0 0 20px rgba(255, 182, 193, 0.35)",
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
        "heart-beat": "heart-beat 0.6s ease-in-out",
      },
    },
  },
  plugins: [],
};
export default config;
