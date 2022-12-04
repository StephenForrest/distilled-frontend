import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalContent,
  Button,
  ModalCloseButton,
  Input,
  FormLabel,
  FormControl,
  Text,
} from '@chakra-ui/react';
import { CREATE_GOAL_MUTATION } from 'app/lib/mutations/Plan';
import { GOAL_FRAGMENT } from 'app/lib/fragments/Plan';
import { useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { convertDateToUTC } from 'app/lib/utilities';

const getDateSevenDaysFromToday = () => {
  // Create a date object for today
  const today = new Date();

  // Add 7 days to the date object
  const sevenDaysFromToday = new Date(
    today.getTime() + 7 * 24 * 60 * 60 * 1000,
  );

  // Return the date in the 'YYYY-MM-DD' format
  return sevenDaysFromToday.toISOString().split('T')[0];
};

const CreateNewGoalModal = (props: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { uuid } = useParams();
  const [createGoalMutation, { loading }] = useMutation(CREATE_GOAL_MUTATION, {
    update(cache, { data: { createGoal } }) {
      cache.modify({
        id: cache.identify({
          __typename: 'Plan',
          id: uuid,
        }),
        fields: {
          goals(existingGoals = []) {
            const newGoalRef = cache.writeFragment({
              data: createGoal.goal,
              fragment: GOAL_FRAGMENT,
            });
            return [...existingGoals, newGoalRef];
          },
        },
      });
    },
  });
  const [formError, setFormError] = useState<string | undefined>();
  const [planName, setPlanName] = useState<string>('');
  const [expiresOn, setExpiresOn] = useState<string>(
    getDateSevenDaysFromToday(),
  );
  const { isOpen, onClose } = props;
  const createGoal = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createGoalMutation({
        variables: {
          title: planName,
          expiresOn: convertDateToUTC(expiresOn),
          planUuid: uuid,
        },
      });
      props.onClose();
      setPlanName('');
      setExpiresOn(getDateSevenDaysFromToday());
      setFormError(undefined);
    } catch (e) {
      console.log(e);
      setFormError('Something went wrong');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader borderBottom={'1px solid'} borderColor={'gray.200'}>
          Create new goal
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={createGoal}>
            <FormControl size={'xs'} mt={2} mb={4}>
              <FormLabel>Goal name</FormLabel>
              <Input
                type="text"
                value={planName}
                required
                autoFocus
                autoComplete={'off'}
                onChange={e => setPlanName(e.target.value)}
              />
            </FormControl>
            <FormControl size={'xs'} mt={2} mb={2}>
              <FormLabel>Expires on</FormLabel>
              <Input
                type="date"
                value={expiresOn}
                required
                onChange={e => setExpiresOn(e.target.value)}
              />
            </FormControl>
            {formError && <Text>formError</Text>}
            <Button
              isLoading={loading}
              loadingText={'Submitting'}
              mt={4}
              colorScheme="brand"
              type="submit"
            >
              Save
            </Button>
          </form>
        </ModalBody>

        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateNewGoalModal;
