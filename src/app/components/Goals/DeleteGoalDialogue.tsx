import React, { RefObject } from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  Button,
} from '@chakra-ui/react';
import { DELETE_GOAL_MUTATION } from 'app/lib/mutations/Plan';
import { useMutation } from '@apollo/client';
import { selectedDrawerConfig } from 'app/lib/cache';
import { GET_PLAN } from 'app/lib/queries/Plan';
import { useParams } from 'react-router-dom';

const DeleteGoalDialogue = props => {
  const { uuid } = useParams();
  const { isOpen, onClose, id } = props;
  const [deleteGoal, { loading }] = useMutation(DELETE_GOAL_MUTATION, {
    variables: { id },
    refetchQueries: [{ query: GET_PLAN, variables: { uuid } }],
    awaitRefetchQueries: true,
  });

  const cancelRef = React.useRef();

  const handleDeleteGoal = async () => {
    const res = await deleteGoal(id);
    if (res.data?.deleteGoal.success) {
      onClose();
      selectedDrawerConfig({ goalId: undefined, successCriteriaId: undefined });
    }
  };

  return (
    <AlertDialog
      motionPreset="slideInBottom"
      leastDestructiveRef={cancelRef as RefObject<any>}
      onClose={onClose}
      isOpen={isOpen}
      isCentered
    >
      <AlertDialogOverlay />

      <AlertDialogContent>
        <AlertDialogHeader>Delete goal</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>
          Are you sure you want to delete your goal?
        </AlertDialogBody>
        <AlertDialogFooter justifyContent={'flex-start'}>
          <Button
            colorScheme="red"
            mr={4}
            isLoading={loading}
            onClick={handleDeleteGoal}
          >
            Yes
          </Button>
          <Button ref={cancelRef as RefObject<any>} onClick={onClose}>
            No
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteGoalDialogue;
