import React from 'react';
import { Progress } from '@chakra-ui/react';

const ProgressSlider = () => {
  return (
    <Progress value={80} borderRadius={8} colorScheme="green" w={'100%'} />
  );
};

export default ProgressSlider;
