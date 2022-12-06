import React, { useState } from 'react';
import { GoalWithDetails, ActionType } from 'types';
import { DrawerHeader, DrawerBody } from '@chakra-ui/react';
import {
  Input,
  Stack,
  FormControl,
  FormLabel,
  Button,
  Divider,
  VStack,
  Textarea,
  HStack,
  Text,
  Select,
} from '@chakra-ui/react';
import { ChevronLeftIcon, CloseIcon } from '@chakra-ui/icons';
import MilestoneForm from './MilestoneForm';
import ChecklistForm from './ChecklistForm';

const NewAction = (props: {
  goal: GoalWithDetails;
  onClose: () => void;
  onBack: () => void;
}) => {
  const { goal, onClose, onBack } = props;
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [actionType, setActionType] = useState<ActionType>('checklist');
  const [trackingSettings, setTrackingSettigns] = useState<{
    [key: string]: unknown;
  }>({});

  const onSubmit = () => {};

  return (
    <>
      <DrawerHeader>
        <HStack w={'100%'}>
          <Button
            p={2}
            variant="ghost"
            _hover={{ bg: 'brand.50' }}
            onClick={onBack}
          >
            <ChevronLeftIcon boxSize={5} />
          </Button>
          <Text>Create New Action</Text>
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
      </DrawerHeader>
      <DrawerBody>
        <VStack>
          <form onSubmit={onSubmit} className="full-width">
            <Stack spacing={6} w={'100%'}>
              <FormControl>
                <FormLabel fontSize={'small'}>Name</FormLabel>
                <Input
                  type="text"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  maxWidth={'300px'}
                  size={'sm'}
                />
              </FormControl>
              <FormControl>
                <HStack spacing="24px">
                  <VStack spacing={0} alignItems={'flex-start'}>
                    <FormLabel fontSize={'small'}>Start date</FormLabel>
                    <Input type="date" size={'sm'} />
                  </VStack>
                  <VStack spacing={0} alignItems={'flex-start'}>
                    <FormLabel fontSize={'small'}>End date</FormLabel>
                    <Input type="date" size={'sm'} />
                  </VStack>
                </HStack>
              </FormControl>
              <FormControl>
                <FormLabel fontSize={'small'}>Description</FormLabel>
                <Textarea
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  size={'sm'}
                />
              </FormControl>
              <FormControl>
                <FormLabel fontSize={'small'}>Action type</FormLabel>
                <Select
                  size={'sm'}
                  width={'300px'}
                  value={actionType}
                  onChange={e => setActionType(e.target.value as ActionType)}
                >
                  <option value="milestone">Milestone</option>
                  <option value="checklist">Checklist</option>
                </Select>
                {(() => {
                  if (actionType === 'milestone') {
                    return <MilestoneForm />;
                  } else if (actionType === 'checklist') {
                    return <ChecklistForm />;
                  } else {
                    return null;
                  }
                })()}
              </FormControl>

              {/* {error && <Text as="i">{error.message}</Text>} */}
              <Button
                mt={4}
                colorScheme="brand"
                type="submit"
                width={'100px'}
                isLoading={false}
                size={'sm'}
              >
                Create
              </Button>
              <Divider mt="12px" mb="12px" />
            </Stack>
          </form>
        </VStack>
      </DrawerBody>
    </>
  );
};

export default NewAction;
