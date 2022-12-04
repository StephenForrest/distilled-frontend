import { extendTheme, theme as baseTheme } from '@chakra-ui/react';

console.log(baseTheme.colors.red);
const theme = extendTheme({
  colors: {
    brand: {
      '50': '#F0EAFA',
      '100': '#D6C5F2',
      '200': '#BCA0E9',
      '300': '#A27BE0',
      '400': '#8755D8',
      '500': '#6D30CF',
      '600': '#5727A5',
      '700': '#411D7C',
      '800': '#2C1353',
      '900': '#160A29',
    },
  },
  styles: {
    global: props => ({
      body: {
        bg: '#d3d6e9',
      },
    }),
  },
});

export default theme;
