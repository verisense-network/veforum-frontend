/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary:'#556cd6',
        secondary: '#ff8f00',
        divider: '#424646'
      }
    },
  },
  plugins: [],
}

