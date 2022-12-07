import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    brand: {
      '50': '#bfa5e8',
      '100': '#a27cde',
      '200': '#9368d9',
      '300': '#8554d4',
      '400': '#763fcf',
      '500': 'rgba(94, 44, 175, 1)',
      '600': '#482286',
      '700': '#3d1d72',
      '800': '#32185d',
      '900': '#1c0d35',
    },

    alerts: {
      error: '#22FE14',
      success: '#E9D8FD',
      warning: '#FEEBC8',
      infi: 'BEE3F8',
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
