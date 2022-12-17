import React from 'react';
import { Spinner, VStack } from '@chakra-ui/react';

const Loader = (props: { size?: number }) => {
  return (
    <VStack w={'100%'} h={'100%'}>
      <Spinner boxSize={props.size || 6} margin={'auto !important'} />
    </VStack>
  );
};

export default Loader;
