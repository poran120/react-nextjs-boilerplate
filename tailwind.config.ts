import type { Config } from "tailwindcss";

const config: Config = {
  theme: {
    extend: {
      colors: {
        brand: {
          50: "rgb(var(--color-brand-50) / <alpha-value>)",
          100: "rgb(var(--color-brand-100) / <alpha-value>)",
          200: "rgb(var(--color-brand-200) / <alpha-value>)",
          300: "rgb(var(--color-brand-300) / <alpha-value>)",
          400: "rgb(var(--color-brand-400) / <alpha-value>)",
          500: "rgb(var(--color-brand-500) / <alpha-value>)",
          600: "rgb(var(--color-brand-600) / <alpha-value>)",
          700: "rgb(var(--color-brand-700) / <alpha-value>)",
        },

        neutral: {
          10: "rgb(var(--color-black-10) / <alpha-value>)",
          20: "rgb(var(--color-black-20) / <alpha-value>)",
          30: "rgb(var(--color-black-30) / <alpha-value>)",
          40: "rgb(var(--color-black-40) / <alpha-value>)",
          50: "rgb(var(--color-black-50) / <alpha-value>)",
          60: "rgb(var(--color-black-60) / <alpha-value>)",
          70: "rgb(var(--color-black-70) / <alpha-value>)",
          80: "rgb(var(--color-black-80) / <alpha-value>)",
        },

        success: "rgb(var(--color-success) / <alpha-value>)",
        warning: "rgb(var(--color-warning) / <alpha-value>)",
        danger: "rgb(var(--color-danger) / <alpha-value>)",
      },
    },
  },
};

export default config;
