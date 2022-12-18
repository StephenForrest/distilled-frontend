import React from 'react';
import { Box } from '@chakra-ui/react';

const WelcomeBanner = () => {
  return (
    <img
      width={'100%'}
      alt="Logo"
      src={process.env.PUBLIC_URL + '/welcome.svg'}
    />
  );
};

export default WelcomeBanner;
