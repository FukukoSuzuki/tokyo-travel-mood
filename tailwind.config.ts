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
        ink: "#334756",
        wash: "#F9F9F7",
      },
      fontFamily: {
        sans: [
          "var(--font-elegant)",
          "Hiragino Sans",
          "Hiragino Kaku Gothic ProN",
          "Yu Gothic",
          "YuGothic",
          "Meiryo",
          "system-ui",
          "sans-serif",
        ],
      },
      letterSpacing: {
        widest: "0.35em",
      },
      animation: {
        "bubble-float": "bubble-float 1.55s ease-in-out infinite",
        "bubble-float-delayed":
          "bubble-float 1.55s ease-in-out 0.35s infinite",
      },
      keyframes: {
        "bubble-float": {
          "0%": { opacity: "0", transform: "translateY(4px) scale(0.9)" },
          "18%": { opacity: "0.75" },
          "100%": { opacity: "0", transform: "translateY(-16px) scale(1)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
