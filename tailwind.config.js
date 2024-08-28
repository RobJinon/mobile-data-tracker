/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation:{
          'shake': 'shake 0.45s cubic-bezier(.36,.07,.19,.97) both',
      },
      keyframes: {
          'shake' : {
              '10%, 90%': {
                  transform: 'translate3d(-1px, 0, 0)'
              },
              '20%, 80%' : {
                  transform: 'translate3d(2px, 0, 0)'
              },
              '30%, 50%, 70%': {
                  transform: 'translate3d(-4px, 0, 0)'
              },
              '40%, 60%': {
                  transform: 'translate3d(4px, 0, 0)'
              }
          }
      }
    },
  },
  plugins: [
    require('daisyui')
  ],
  daisyui: {
    themes: [
      {
        light_mode: {
          "primary": "#14213D",
          "base-200": "#E6E6E6",
          "base-300": "#D9D9D9",
          "base-400": "#C5C5C5",
          "accent": "#FCA311",
          "base-100": "#F6F6F6"
        },
      },

      {
        dark_mode: {
          "primary": "#253e74",
          "base-200": "#333333",
          "base-300": "#cccccc",
          "base-400": "#292524",
          "accent": "#FCA311",
          "base-100": "#292524"
        }
      },
      'dark',
    ],
  },
  
}