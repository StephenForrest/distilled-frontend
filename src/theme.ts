import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    brand: {
      '50': '#FCEBFA',
      '100': '#F0C0E9',
      '200': '#E6A1DC',
      '300': '#D975CB',
      '400': '#D14BBE',
      '500': '#FE3DE3',
      '600': '#9E238D',
      '700': '#751C69',
      '800': '#521449',
      '900': '#21081E',
    },
  },
  styles: {
    global: props => ({
      body: {
        bg: '#d3d6e9',
      },
      a: {
        _hover: {
          cursor: 'default !important',
        },
      },
      button: {
        _hover: {
          cursor: 'default !important',
        },
      },
    }),
  },
});

export default theme;
