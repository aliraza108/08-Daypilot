import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        bgPrimary: "var(--bg-primary)",
        bgSecondary: "var(--bg-secondary)",
        bgCard: "var(--bg-card)",
        accentGreen: "var(--accent-green)",
        accentGreenDim: "var(--accent-green-dim)",
        accentPurple: "var(--accent-purple)",
        textPrimary: "var(--text-primary)",
        textSecondary: "var(--text-secondary)",
        textMuted: "var(--text-muted)",
        borderSubtle: "var(--border)"
      },
      fontFamily: {
        heading: ["var(--font-heading)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"]
      },
      backgroundImage: {
        hero: "var(--gradient-hero)"
      },
      boxShadow: {
        glowGreen: "0 0 20px rgba(0, 255, 148, 0.28)"
      }
    }
  },
  plugins: []
};

export default config;
