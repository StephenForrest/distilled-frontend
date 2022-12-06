import React from 'react';
import { Button, HStack } from '@chakra-ui/react';
import { ChevronLeftIcon, CloseIcon } from '@chakra-ui/icons';

const DrawerHeader = (props: {
  showBackButton: boolean;
  onBack?: () => void;
  onClose?: () => void;
  children: React.ReactElement;
}) => {
  const { onBack, onClose, children, showBackButton } = props;
  return (
    <HStack w={'100%'}>
      {showBackButton && (
        <Button
          p={2}
          variant="ghost"
          _hover={{ bg: 'brand.50' }}
          onClick={onBack}
        >
          <ChevronLeftIcon boxSize={5} />
        </Button>
      )}
      {children}
      <Button
        p={2}
        variant="ghost"
        marginLeft={'auto !important'}
        _hover={{ bg: 'brand.50' }}
        onClick={onClose}
      >
        <CloseIcon boxSize={2.5} />
      </Button>
    </HStack>
  );
};

export default DrawerHeader;
