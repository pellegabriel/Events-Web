/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [plugin(({ addBase}) => {
    addBase({
      '.scrollbar::-webkit-scrollbar ':{
        width: '16px',
        height: '16px'
      },
    
      '.scrollbar::-webkit-scrollbar-track': {
        borderRadius: '100vh',
        background: '#f7f4ed'
      },
    
      '.scrollbar::-webkit-scrollbar-thumb': {
        background: '#e0cbcb',
        borderRadius: '100vh',
        border: '3px solid #f6f7ed'
      },
    
      '.scrollbar::-webkit-scrollbar-thumb:hover': {
        background: '#c0a0b9'
      }
    });
}),],
}
