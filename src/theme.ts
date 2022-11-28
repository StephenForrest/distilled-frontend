import { extendTheme, theme as baseTheme } from '@chakra-ui/react';

console.log(baseTheme.colors.red);
const theme = extendTheme({
  colors: {
    brand: {
      100: '#4d2292',
      200: '#4d2292',
      300: '#4d2292',
      400: '#4d2292',
      500: '#4d2292',
      600: '#4d2292',
      700: '#4d2292',
      800: '#4d2292',
      900: '#4d2292',
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
