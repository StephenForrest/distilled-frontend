import React from 'react';
import { Button, HStack } from '@chakra-ui/react';
import { ChevronLeftIcon, CloseIcon, EditIcon } from '@chakra-ui/icons';

const DrawerHeader = (props: {
  showBackButton: boolean;
  showEditButton?: boolean;
  onBack?: () => void;
  onClose?: () => void;
  onEdit?: () => void;
  children: React.ReactElement;
}) => {
  const { onBack, onClose, children, showBackButton, showEditButton, onEdit } =
    props;
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
      <HStack marginLeft={'auto !important'}>
        {showEditButton && (
          <Button
            p={2}
            variant="ghost"
            _hover={{ bg: 'brand.50' }}
            onClick={onEdit}
          >
            <EditIcon boxSize={5} />
          </Button>
        )}
        <Button
          p={2}
          variant="ghost"
          _hover={{ bg: 'brand.50' }}
          onClick={onClose}
        >
          <CloseIcon boxSize={2.5} />
        </Button>
      </HStack>
    </HStack>
  );
};

export default DrawerHeader;
