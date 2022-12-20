import React from 'react';
import {
  FormControl,
  Input,
  HStack,
  InputGroup,
  InputLeftElement,
  Button,
} from '@chakra-ui/react';
import { SearchIcon, AddIcon } from '@chakra-ui/icons';

const GoalFilters = (props: {
  setIsNewGoalModal: (value: boolean) => void;
  search: string;
  setSearch: (value: string) => void;
}) => {
  const { setIsNewGoalModal, search, setSearch } = props;
  return (
    <HStack pl={2} pr={2} mt={2} w={'100%'}>
      <FormControl>
        <InputGroup size={'sm'} w={'300px'}>
          <InputLeftElement
            pointerEvents="none"
            children={<SearchIcon color="gray.300" />}
          />
          <Input
            placeholder="Search goals"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </InputGroup>
      </FormControl>
      <Button
        ml={'auto !important'}
        colorScheme="brand"
        size={'sm'}
        pl={4}
        pr={4}
        leftIcon={<AddIcon />}
        onClick={() => setIsNewGoalModal(true)}
      >
        Create new goal
      </Button>
    </HStack>
  );
};

export default GoalFilters;
