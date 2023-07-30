/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        LobsterTwo: ['Lobster Two', 'cursive'],
        Squada: ['Squada One', 'cursive']
      },
      gridTemplateColumns: {
        sidebar: "300px auto", //for sidebar layout
        "sidebar-collapsed": "64px auto", //for collapsed sidebar layout
      },
      fontSize: {
        'xxs': '0.5rem', // You can adjust the value as per your preference
      },
    },
  },
  plugins: [],
}

