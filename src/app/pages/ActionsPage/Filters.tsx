import React from 'react';
import {
  FormControl,
  Input,
  HStack,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

const TaskFilters = (props: {
  search: string;
  setSearch: (value: string) => void;
}) => {
  const { search, setSearch } = props;
  return (
    <HStack pl={8} pr={8} mt={2} w={'100%'}>
      <FormControl>
        <InputGroup size={'sm'} w={'300px'}>
          <InputLeftElement
            pointerEvents="none"
            children={<SearchIcon color="gray.300" />}
          />
          <Input
            placeholder="Search tasks"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </InputGroup>
      </FormControl>
    </HStack>
  );
};

export default TaskFilters;
