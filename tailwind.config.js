const { colors } = require('tailwindcss/defaultTheme');

module.exports = {
  theme: {
    extend: {
      colors: {
        green: {
          light: '#15CD72',
          base: '#15CD72',
          dark: '#15CD72',
        },
        blue: {
          light: '#4d97ff',
          base: '#0069ff',
          dark: '#196ee6',
        },
      },
    },
  },
  variants: {
    display: ['group-hover'],
  },
  plugins: [],
};
