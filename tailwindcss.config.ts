/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          main: "var(--color-primary-main)",
          one: "var(--color-primary-one)",
          two: "var(--color-primary-two)",
          three: "var(--color-primary-three)",
          four: "var(--color-primary-four)",
        },
        secondary: {
          main: "var(--color-secondary-main)",
          one: "var(--color-secondary-one)",
          two: "var(--color-secondary-two)",
          three: "var(--color-secondary-three)",
          four: "var(--color-secondary-four)",
        },
        dark: {
          main: "var(--color-dark-main)",
          one: "var(--color-dark-one)",
          two: "var(--color-dark-two)",
          three: "var(--color-dark-three)",
          four: "var(--color-dark-four)",
        },
        light: {
          main: "var(--color-light-main)",
          one: "var(--color-light-one)",
          two: "var(--color-light-two)",
          three: "var(--color-light-three)",
          four: "var(--color-light-four)",
        },
      },
    },
  },
  plugins: [],
};
