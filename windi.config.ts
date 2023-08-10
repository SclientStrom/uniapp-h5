import { defineConfig } from "windicss/helpers";
import Forms from "windicss/plugin/forms";
import LineClamp from "windicss/plugin/line-clamp";

export default defineConfig({
  attributify: false,
  theme: {
    extend: {
      screens: {
        lg: "1200px",
      },
      colors: {
        "lc-gray": {
          200: "#e9ecf0",
          700: "#f3f3f3",
          800: "#787878",
          850: "#999999",
          900: "#EEEEEE",
          1000: "#F7F7F7",
        },
        "lc-black": {
          200: "#222222",
          300: "#323232",
          400: "#3A3A3A",
        },
        "lc-blue": {
          100: "#ced7f4",
          300: "#0A36CA",
        },
        "lc-red": {
          300: "#fff5f5",
          600: "#de1d1f",
        },
        bYellow: {
          300: "#F2D248",
        },
      },
    },
  },
  plugins: [Forms, LineClamp],
  separator: "_",
  extract: {
    include: ["src/**/*.{vue,html,ts}"],
    exclude: ["node_modules", ".git", "src/lib", "types"],
  },
  shortcuts: {
    screen: "w-screen h-screen",
    "flex-center": "flex justify-center items-center",
    "fixed-tl": "fixed top-0 left-0",
  },
});
