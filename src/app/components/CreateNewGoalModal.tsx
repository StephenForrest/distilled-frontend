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
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import { CREATE_GOAL_MUTATION } from 'app/lib/mutations/Plan';
import { GOAL_FRAGMENT } from 'app/lib/fragments/Plan';
import { useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { convertDateToUTC, getDateSevenDaysFromToday } from 'app/lib/utilities';
import { GraphQLError } from 'graphql';

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
  const [formError, setFormError] = useState<GraphQLError | null>(null);
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
      setFormError(null);
    } catch (error) {
      setFormError(error as GraphQLError);
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
            {formError && (
              <Alert status="error" mt={4}>
                <AlertIcon />
                {formError.message}
              </Alert>
            )}
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
