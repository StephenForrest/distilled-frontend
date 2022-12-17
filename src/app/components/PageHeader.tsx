import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Text } from '@chakra-ui/react';

const PageHeader = (props: { text: string }) => {
  const [renderCount, setRenderCount] = useState<number>(Math.random());
  const target = document.getElementById('Header');
  useEffect(() => {
    setRenderCount(Math.random());
  }, []);

  if (target && renderCount) {
    return createPortal(
      <Text fontSize={'2xl'} fontWeight={'bold'}>
        {props.text}
      </Text>,
      target,
    );
  } else {
    return null;
  }
};

export default PageHeader;
