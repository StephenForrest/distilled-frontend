import React, { useState } from 'react';
import {
  Input,
  VStack,
  HStack,
  Button,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

const ChecklistItem = () => {
  return (
    <HStack w={'100%'} spacing={4}>
      <FormControl flexGrow={1}>
        <FormLabel fontSize={'sm'} mb={0}>
          Item
        </FormLabel>
        <Input type="text" size={'sm'} />
      </FormControl>
      <FormControl w={'250px'}>
        <FormLabel fontSize={'sm'} mb={0}>
          Due date
        </FormLabel>
        <Input type="date" size={'sm'} />
      </FormControl>
      <Button
        p={1}
        variant="ghost"
        _hover={{ bg: 'brand.50' }}
        onClick={() => null}
        h={'30px'}
        w={'20px !important'}
        mt={'auto !important'}
      >
        <DeleteIcon boxSize={3} />
      </Button>
    </HStack>
  );
};

const Checklist = () => {
  const [checklistItems, setChecklistItems] = useState<
    {
      id: number;
      name: string;
      dueDate: string;
    }[]
  >([]);

  const onAddNewChecklistItem = () => {
    setChecklistItems([
      ...checklistItems,
      {
        id: Math.random(),
        name: '',
        dueDate: '',
      },
    ]);
  };

  return (
    <VStack alignItems={'flex-start'} mt={4} spacing={4}>
      {checklistItems.map(checklistItem => (
        <ChecklistItem key={checklistItem.id} />
      ))}
      <ChecklistItem />
      <Button
        size={'sm'}
        p={1}
        variant={'outline'}
        onClick={onAddNewChecklistItem}
      >
        Add new item
      </Button>
    </VStack>
  );
};

export default Checklist;
