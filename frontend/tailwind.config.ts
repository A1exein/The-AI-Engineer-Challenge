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
        surface: "#1a1a2e",
        card: "#16213e",
        accent: "#0f3460",
        highlight: "#e94560",
        text: "#eaeaea",
        muted: "#a0a0a0",
      },
    },
  },
  plugins: [],
};

export default config;
