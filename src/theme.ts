import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    primary: {
      '50': '#bfa5e8',
      '100': '#a27cde',
      '200': '#9368d9',
      '300': '#8554d4',
      '400': '#763fcf',
      '500': '#5E2CAF',
      '600': '#482286',
    },
    secondary: {
      '50': '#FFEFFD',
      '100': '#FFBCF5',
      '200': '#FFA2F2',
      '300': '#FE89EE',
      '400': '#FE70EA',
      '500': '#FE3DE3',
      '600': '#FE0ADC',
    },

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

    alerts: {
      error: '#22FE14',
      success: '#E9D8FD',
      warning: '#FEEBC8',
      infi: 'BEE3F8',
    },
  },
  styles: {
    global: props => ({
      body: {},

      fontSizes: {
        xs: '0.75rem',
        sm: '0.875rem',
        md: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '3.75rem',
        '7xl': '4.5rem',
        '8xl': '6rem',
        '9xl': '8rem',
      },

      fontWeights: {
        hairline: 100,
        thin: 200,
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800,
        black: 900,
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
