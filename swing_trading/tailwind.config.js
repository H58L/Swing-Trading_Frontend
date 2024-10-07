// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./src/**/*.{js,jsx,ts,tsx}",
//   ],
//   theme: {
//     extend: {
//       colors{
//         white: "white",
//         none: "none",
//       },
//       borderwidth: {
//         1:"1px"
//       }
//     },
//   },
//   plugins: [],
// };

const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        white: "white",
        none: "none",
      },
      fontFamily: {
        quicksand: ["Quicksand", "sans-serif"],
      },
      borderWidth: {
        1: "1px",
      },
      gridTemplateRows: {
        7: "repeat(7, minmax(0, 1fr))",  //will create 7 equally sixed row, in the CSS grid
        8: "repeat(8, minmax(0, 1fr))",
      },
    },
  },
  plugins: [],
};