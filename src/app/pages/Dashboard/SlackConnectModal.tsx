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
} from '@chakra-ui/react';
import { CREATE_SLACK_CONNECT } from 'app/lib/mutations/User';
import { useMutation } from '@apollo/client';
import { useToast } from '@chakra-ui/react';

const SlackConnectModal = (props: { isOpen: boolean; onClose: () => void }) => {
  const toast = useToast();
  const [handleConnect, { loading, error }] = useMutation(CREATE_SLACK_CONNECT);
  const [email, setEmail] = useState<string>('');
  const [channelName, setChannelName] = useState<string>('');
  const { isOpen, onClose } = props;
  const SlackConnectInvite = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = await handleConnect({
      variables: {
        email,
        channelName,
      },
    });
    if (data) {
      toast({
        title: 'Slack Connect invite created successfully',
        status: 'success',
        position: 'top',
      });
      props.onClose();
      setEmail('');
      setChannelName('');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered autoFocus>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader borderBottom={'1px solid #f2f2f2'} fontSize={'md'}>
          Invite to Slack Connect Channel
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={SlackConnectInvite}>
            <VStack spacing={4} alignItems={'flex-start'}>
              <FormControl size={'xs'}>
                <FormLabel fontSize={'sm'}>Company Name</FormLabel>
                <Input
                  type="text"
                  value={channelName}
                  fontSize={'sm'}
                  required
                  size={'sm'}
                  autoFocus
                  onChange={e => setChannelName(e.target.value)}
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
              {error && <Text fontSize={'sm'}>{error.message}</Text>}
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

export default SlackConnectModal;
