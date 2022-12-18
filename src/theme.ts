import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    primary: {
      '50': '#c9ffc6',
      '100': '#99ff93',
      '200': '#82fe7a',
      '300': '#6afe60',
      '400': '#52fe47',
      '500': '#22FE14',
      '600': '#0ede01',
    },

    secondary: {
      '50': '#ffeffd',
      '100': '#ffbcf5',
      '200': '#ffa2f2',
      '300': '#fe89ee',
      '400': '#fe70ea',
      '500': '#FE3DE3',
      '600': '#fe0adc',
    },

    tertiary: {
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

      a: {},
      button: {},
    }),
  },
});

export default theme;
