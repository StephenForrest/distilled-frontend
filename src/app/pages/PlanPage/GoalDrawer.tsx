import React from 'react';
import {
  Drawer,
  DrawerOverlay,
  DrawerHeader,
  DrawerBody,
  DrawerContent,
} from '@chakra-ui/react';

const GoalDrawer = (props: {
  goalId: number | undefined;
  onClose: () => void;
}) => {
  const { onClose, goalId } = props;

  return (
    <Drawer
      placement={'right'}
      onClose={onClose}
      isOpen={!!goalId}
      size={'lg'}
      trapFocus={false}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader borderBottomWidth="1px">Basic Drawer</DrawerHeader>
        <DrawerBody>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default GoalDrawer;
