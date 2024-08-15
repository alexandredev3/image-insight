import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
        kalam: ["var(--font-kalam)"],
      },
      colors: {
        "surface-primary": "var(--surface-primary)",
        "surface-secondary": "var(--surface-secondary)",
        "heading-primary": "var(--heading-primary)",
        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
        "text-tertiary": "var(--text-tertiary)",
        "text-accent": "var(--text-accent)",
        "accent-primary": "var(--accent-primary)",
      },
      animation: {
        bounce: "bounce 0.7s infinite",
      },
      keyframes: {
        bounce: {
          "0%, 100%": {
            transform: "none",
            "animation-timing-function": "ease-out",
          },
          "50%": {
            transform: "translateY(-10%)",
            "animation-timing-function": "ease-in",
          },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
