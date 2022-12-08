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
} from '@chakra-ui/react';
import { CREATE_PLAN_MUTATION } from 'app/lib/mutations/Plan';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

const CreateNewPlanModal = (props: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const navigate = useNavigate();
  const [createPlanMutation, { loading }] = useMutation(CREATE_PLAN_MUTATION);
  const [planName, setPlanName] = useState<string>('');
  const { isOpen, onClose } = props;
  const createPlan = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await createPlanMutation({
      variables: {
        name: planName,
      },
      refetchQueries: ['getPlans'],
    });
    const uuid = result.data?.createPlan?.plan?.uuid;
    if (uuid) {
      navigate(`plan/${uuid}`);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader borderBottom={'1px solid #f2f2f2'}>
          Create new plan
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={createPlan}>
            <FormControl size={'xs'}>
              <FormLabel>Plan name</FormLabel>
              <Input
                type="text"
                value={planName}
                required
                autoFocus
                onChange={e => setPlanName(e.target.value)}
              />
            </FormControl>
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

export default CreateNewPlanModal;
