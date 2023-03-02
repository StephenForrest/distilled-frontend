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
declare const window: any;

const NewWorkspaceMemberModal = (props: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const toast = useToast();
  const [createWorkspaceMember, { loading, error }] = useMutation(
    CREATE_WORKSPACE_MEMBER,
  );
  const [email, setEmail] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const { isOpen, onClose } = props;
  const NewMemberInvite = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = await createWorkspaceMember({
      variables: {
        firstName,
        lastName,
        email,
      },
    });
    if (data) {
      window.analytics.track('Workspace Member Added', {
        workspaceMemberName: [firstName, lastName].join(' '),
        workspaceMemberEmail: email,
      });
      toast({
        title: 'Workspace member created successfully',
        status: 'success',
        position: 'top',
      });
      props.onClose();
      setEmail('');
      setFirstName('');
      setLastName('');
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
                <FormLabel fontSize={'sm'}>First Name</FormLabel>
                <Input
                  type="text"
                  value={firstName}
                  fontSize={'sm'}
                  required
                  size={'sm'}
                  autoFocus
                  onChange={e => setFirstName(e.target.value)}
                />
              </FormControl>
              <FormControl size={'xs'}>
                <FormLabel fontSize={'sm'}>Last Name</FormLabel>
                <Input
                    type="text"
                    value={lastName}
                    fontSize={'sm'}
                    required
                    size={'sm'}
                    autoFocus
                    onChange={e => setLastName(e.target.value)}
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
