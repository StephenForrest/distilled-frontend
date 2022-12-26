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
import { DELETE_PLAN_MUTATION } from 'app/lib/mutations/Plan';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

const DeletePlanDialog = props => {
  const { isOpen, onClose, id } = props;
  const [deletePlan, { loading }] = useMutation(DELETE_PLAN_MUTATION, {
    variables: { id },
  });
  const navigate = useNavigate();

  const cancelRef = React.useRef();

  const handleDeletePlan = async () => {
    const res = await deletePlan(id);
    if (res.data?.deletePlan.success) {
      onClose();
      navigate('/plans');
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
        <AlertDialogHeader>Delete plan</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>
          Are you sure you want to delete your plan?
        </AlertDialogBody>
        <AlertDialogFooter justifyContent={'flex-start'}>
          <Button
            colorScheme="red"
            mr={4}
            isLoading={loading}
            onClick={handleDeletePlan}
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

export default DeletePlanDialog;
