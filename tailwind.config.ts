import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0A0A0A",
        paper: "#F5F1EA",
        bone: "#E8E2D6",
        graphite: "#1A1A1A",
        smoke: "#2A2A2A",
        ash: "#9A9A9A",
        accent: "#E5FF4B"
      },
      fontFamily: {
        serif: ["var(--font-serif)", "ui-serif", "Georgia"],
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui"],
        mono: ["var(--font-mono)", "ui-monospace"]
      },
      letterSpacing: {
        tightest: "-0.06em"
      }
    }
  },
  plugins: []
};

export default config;
