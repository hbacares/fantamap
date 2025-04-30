/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './app/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
              parchment: '#fdf6e3',
              leather: '#a67c52',
              ink: '#3b2f2f',
            },
          },      
    },
    plugins: [],
  }
