import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    brand: {
      '50': '#ffeffd',
      '100': '#ffbcf5',
      '200': '#ffa2f2',
      '300': '#fe89ee',
      '400': '#fe70ea',
      '500': '#FE3DE3',
      '600': '#fe0adc',
      '700': '#ed01cc',
      '800': '#d401b6',
      '900': '#a1018b',
    },
    secondary: {
      '50': '#c9ffc6',
      '100': '#99ff93',
      '200': '#82fe7a',
      '300': '#6afe60',
      '400': '#52fe47',
      '500': '#22FE14',
      '600': '#0ede01',
      '700': '#0dc501',
      '800': '#0bab01',
      '900': '#087801',
    },

    tertiary: {
      '50': '#595959',
      '100': '#404040',
      '200': '#333333',
      '300': '#262626',
      '400': '#1a1a1a',
      '500': 'rgba(0, 0, 0, 1)',
      '600': '#000000',
      '700': '#000000',
      '800': '#000000',
      '900': '#000000',
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
