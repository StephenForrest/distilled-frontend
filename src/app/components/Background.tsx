import React from 'react';
import { Box } from '@chakra-ui/react';

const Background = () => {
  return <Box bgImage={process.env.PUBLIC_URL + 'welcome.png'} />;
};

export default Background;
