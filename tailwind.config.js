module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,html,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: {
          background: "#254d70",
          foreground: "#ffffff",
          light: "#254d7033",
          dark: "#1e3d5a",
        },
        golden:{
          background: "#f5c800",
          foreground: "#242524",
          light: "#f7d06b19",
          dark: "#c4a24c",
        },
        secondary: {
          background: "#ffffff",
          foreground: "#242524",
          light: "#f7f7f7",
          dark: "#8c8d8b",
        },
        accent: {
          DEFAULT: "#254d70",
          foreground: "#ffffff",
          light: "#254d7019",
          dark: "#1e3d5a",
        },
        border: {
          primary: "#ebebea",
          secondary: "#bcc1ca",
          light: "#f7f7f7",
          dark: "#8c8d8b",
        },
      },
    },
  },
  plugins: [],
};
