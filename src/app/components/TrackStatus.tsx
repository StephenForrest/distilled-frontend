import React from 'react';
import { Circle, HStack, Text } from '@chakra-ui/react';
import { Menu, MenuButton, MenuList, MenuItem, Button } from '@chakra-ui/react';

const TrackingText = (props: { editable?: boolean }) => {
  const options = {
    ontrack: (
      <HStack>
        <Circle size="10px" bg="green.200" />
        <Text fontSize={'sm'}>On track</Text>
      </HStack>
    ),
    completed: (
      <HStack>
        <Circle size="10px" bg="blue.300" />
        <Text fontSize={'sm'}>Completed</Text>
      </HStack>
    ),
    atrisk: (
      <HStack>
        <Circle size="10px" bg="red.400" />
        <Text fontSize={'sm'}>At risk</Text>
      </HStack>
    ),
  };

  if (typeof props.editable === 'undefined' || props.editable === true) {
    return (
      <HStack spacing={2} mt={'12px'}>
        <Menu>
          <MenuButton as={Button} variant={'outline'} size={'xs'}>
            {options['ontrack']}
          </MenuButton>
          <MenuList>
            <MenuItem>{options['ontrack']}</MenuItem>
            <MenuItem>{options['atrisk']}</MenuItem>
            <MenuItem>{options['completed']}</MenuItem>
          </MenuList>
        </Menu>
      </HStack>
    );
  } else {
    return <>{options['ontrack']}</>;
  }
};

export default TrackingText;
