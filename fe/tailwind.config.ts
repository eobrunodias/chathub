import type { Config } from "tailwindcss"

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      minHeight: {
        "screen-minus-header": "calc(100vh - (72px + 56px))",
      },
      colors: {
        primary: "#3490dc",
        secondary: "#ffed4a",
        accent: "#e3342f",
        background: "#f8f9fa",
        text: "#333333",

        success: "#38c172",
        warning: "#ff9800",
        danger: "#e3342f",
        info: "#17a2b8",

        gradientStart: "#f6d365",
        gradientEnd: "#fda085",
      },
    },
  },
  plugins: [],
}
export default config
