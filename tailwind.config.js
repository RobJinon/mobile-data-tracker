/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui')
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#14213D",
          "neutral-0": "#E6E6E6",
          "neutral-1": "#D9D9D9",
          "neutral-2": "#C5C5C5",
          "accent": "#FCA311",
          "base-100": "#F6F6F6"
        }
      }
    ],
  },
  
}