import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: "#f5f5f7",
        card: "#ffffff",
        accent: "#e5e7eb",
        highlight: "#2563eb",
        text: "#1f2937",
        muted: "#6b7280",
      },
    },
  },
  plugins: [],
};

export default config;
