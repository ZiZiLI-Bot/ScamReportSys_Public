import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

const config: Config = {
  important: true,
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      primary: "#8C20A4",
      secondary: "#DEDCFF",
      ...colors,
    },
    fontSize: {
      sm: "0.750rem",
      md: "0.850rem",
      base: "1rem",
      xl: "1.333rem",
      "2xl": "1.777rem",
      "3xl": "2.369rem",
      "4xl": "3.158rem",
      "5xl": "4.210rem",
    },
    fontFamily: {
      heading: "Inter",
      body: "Inter",
    },
    fontWeight: {
      normal: "400",
      medium: "500",
      bold: "700",
    },
  },
  plugins: [],
};
export default config;
