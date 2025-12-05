/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          main: "#f36600",
          one: "#f48331",
          two: "#f49f62",
          three: "#f4bc93",
          four: "#f5d8c4",
        },
        secondary: {
          main: "#25691b",
          one: "#4f8546",
          two: "#78a172",
          three: "#a2bd9e",
          four: "#cbd9c9",
        },
        dark: {
          main: "#0d0d0d",
          one: "#151515",
          two: "#3b3b3b",
          three: "#6a6a6a",
          four: "#575757",
        },
        light: {
          main: "#f8f8f8",
          one: "#f0f0f0",
          two: "#e8e8e8",
          three: "#e2e2e2",
          four: "#dfdfdf",
        },
      },
      fontFamily: {
        sans: ["Montserrat", "sans-serif"],
      },
    },
  },
  plugins: [],
};
