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
  VStack,
  Text,
  Box,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { CREATE_WORKSPACE_MEMBER } from 'app/lib/mutations/Workspace';
import { GET_WORKSPACE_DETAILS } from 'app/lib/queries/Workspace';
import { useMutation } from '@apollo/client';
import { useToast } from '@chakra-ui/react';

const NewWorkspaceMemberModal = (props: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const toast = useToast();
  const [createWorkspaceMember, { loading, error }] = useMutation(
    CREATE_WORKSPACE_MEMBER,
  );
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const { isOpen, onClose } = props;
  const NewMemberInvite = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = await createWorkspaceMember({
      variables: {
        name,
        email,
      },
    });
    if (data) {
      toast({
        title: 'Workspace member created successfully',
        status: 'success',
        position: 'top',
      });
      props.onClose();
      setEmail('');
      setName('');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered autoFocus>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader borderBottom={'1px solid #f2f2f2'} fontSize={'md'}>
          Create workspace member
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={NewMemberInvite}>
            <VStack spacing={4} alignItems={'flex-start'}>
              <FormControl size={'xs'}>
                <FormLabel fontSize={'sm'}>Name</FormLabel>
                <Input
                  type="text"
                  value={name}
                  fontSize={'sm'}
                  required
                  size={'sm'}
                  autoFocus
                  onChange={e => setName(e.target.value)}
                />
              </FormControl>
              <FormControl size={'xs'}>
                <FormLabel fontSize={'sm'}>Email</FormLabel>
                <Input
                  type="email"
                  value={email}
                  fontSize={'sm'}
                  size={'sm'}
                  required
                  autoFocus
                  onChange={e => setEmail(e.target.value)}
                />
              </FormControl>
              {error && (
                <Alert status="error" fontSize={'sm'}>
                  <AlertIcon />
                  {error.message}
                </Alert>
              )}
              <Box mt={'var(--chakra-space-6) !important'}>
                <Button
                  isLoading={loading}
                  loadingText={'Submitting'}
                  colorScheme="brand"
                  type="submit"
                  size={'sm'}
                >
                  Save
                </Button>
              </Box>
            </VStack>
          </form>
        </ModalBody>

        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default NewWorkspaceMemberModal;
