const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      xs: "375px",
      sm: "576px",
      ...defaultTheme.screens,
    },
    //   // md: "768px",
    //   // lg: "1024px",
    //   // xl: "1280px",
    //   // "2xl": "1536px",
    // },
    extend: {},
  },
  plugins: [],
};
