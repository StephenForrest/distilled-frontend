import React from 'react';
import { GoalWithDetails, SuccessCriteriaType } from 'types';
import { Box, Divider, HStack, Text, VStack, Icon } from '@chakra-ui/react';
import ListSuccessCriterias from './ListSuccessCriterias';
import { Menu, MenuButton, MenuList, MenuItem, Button } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import AppIcons from 'app/components/AppIcons';

const EmptyState = (props: {
  onCreateNew: (successCriteriaType: SuccessCriteriaType) => void;
}) => {
  return (
    <VStack spacing={8} p={8}>
      <Text fontSize={'sm'}>
        You don't have any success criterias created. Let's get you started:
      </Text>
      <HStack
        spacing={8}
        justify={'center'}
        divider={
          <Divider orientation="vertical" variant={'solid'} h={'100px'} />
        }
      >
        <Box
          borderRadius={8}
          p={4}
          _hover={{ bg: 'gray.50' }}
          onClick={() => props.onCreateNew('measurement')}
        >
          <VStack spacing={1}>
            <Icon
              color={'gray.200'}
              as={AppIcons['measurement']}
              boxSize={8}
              mb={2}
            />
            <Text fontSize={'sm'} fontWeight={'semibold'}>
              Add a measurement
            </Text>
            <Text
              fontSize={'xs'}
              color={'gray.600'}
              fontWeight={'light'}
              align={'center'}
            >
              A specific and quantifiable way of tracking progress towards
              achieving a goal
            </Text>
          </VStack>
        </Box>
        <Box
          borderRadius={8}
          p={4}
          _hover={{ bg: 'gray.50' }}
          onClick={() => props.onCreateNew('action')}
        >
          <VStack spacing={1}>
            <Icon
              color={'gray.800'}
              as={AppIcons['action']}
              boxSize={8}
              mb={2}
            />
            <Text fontSize={'sm'} fontWeight={'semibold'}>
              Add a Task
            </Text>
            <Text
              fontSize={'xs'}
              color={'gray.600'}
              fontWeight={'light'}
              align={'center'}
            >
              A specific action or activity that an individual or team takes in
              order to move closer to achieving a goal
            </Text>
          </VStack>
        </Box>
      </HStack>
    </VStack>
  );
};

const SuccessCriteriaTab = (props: {
  goal: GoalWithDetails;
  onCreateNew: (successCriteriaType: SuccessCriteriaType) => void;
  onSuccessCriteriaSelect: (id: string) => void;
}) => {
  const { goal, onCreateNew } = props;
  const successCriterias = goal.successCriterias;
  if (!successCriterias.length) {
    return <EmptyState onCreateNew={onCreateNew} />;
  }
  return (
    <VStack w={'100%'}>
      <Menu size={'xs'}>
        {({ isOpen }) => (
          <>
            <MenuButton
              isActive={isOpen}
              as={Button}
              leftIcon={<AddIcon boxSize={2} />}
              ml={'auto !important'}
              size={'xs'}
            >
              Add success criteria
            </MenuButton>
            <MenuList w={'100px'}>
              <MenuItem fontSize={'xs'} onClick={() => onCreateNew('action')}>
                Action
              </MenuItem>
              <MenuItem
                onClick={() => onCreateNew('measurement')}
                fontSize={'xs'}
              >
                Measurement
              </MenuItem>
            </MenuList>
          </>
        )}
      </Menu>
      <ListSuccessCriterias
        successCriterias={successCriterias}
        onSuccessCriteriaSelect={props.onSuccessCriteriaSelect}
      />
    </VStack>
  );
};

export default SuccessCriteriaTab;
