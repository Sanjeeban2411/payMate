/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: { backgroundImage: {
      'wallet-bg': "url('./src/assests/Wallet-1.png')",
      
    },
      fontFamily: {
        Montserrat: ["Montserrat", "cursive"],
        MinionPro: ["Minion Pro","Cond"]
      },
    },
  },
  plugins: [],
}
