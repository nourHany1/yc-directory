import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // كل ملفات src
    "./components/**/*.{js,ts,jsx,tsx,mdx}", // لو عندك فولدر components
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // لو شغال App Router
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
