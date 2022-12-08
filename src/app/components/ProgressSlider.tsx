import React from 'react';
import { Progress } from '@chakra-ui/react';

const ProgressSlider = (props: {
  value: number;
  size?: 'xs' | 'md' | 'sm';
}) => {
  return (
    <Progress
      value={props.value}
      borderRadius={8}
      colorScheme="green"
      w={'100%'}
      size={props.size || 'md'}
    />
  );
};

export default ProgressSlider;
