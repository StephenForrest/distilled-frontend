import React from 'react';
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
import { useForm, SubmitHandler } from 'react-hook-form';
import { CREATE_SLACK_CONNECT } from 'app/lib/mutations/User';
import { useMutation } from '@apollo/client';
import { useToast } from '@chakra-ui/react';

interface IFormInput {
  email: string;
}

const SlackConnectModal = (props: {
  isOpen: boolean;
  email: string;
  domain: string;
  onClose: () => void;
}) => {
  const { isOpen, onClose, email, domain } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: { email },
  });

  const toast = useToast();
  const [handleConnect, { loading }] = useMutation(CREATE_SLACK_CONNECT);

  const onSubmit: SubmitHandler<IFormInput> = async data => {
    const channelName =
      domain.replace(/\.(com|dev|net|org|edu|gov|io)$/, '') + '-support';
    const response = (await handleConnect({
      variables: {
        email: data.email,
        channelName,
      },
    })) as { data: { createSlackConnect: { ok: boolean } } };
    if (response.data.createSlackConnect.ok) {
      toast({
        title: 'Slack Connect invite created successfully',
        status: 'success',
        position: 'top',
      });
      onClose();
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack spacing={4} alignItems={'flex-start'}>
              <FormControl size={'xs'}>
                <FormLabel fontSize={'sm'}>Email</FormLabel>
                <Input
                  {...register('email', {
                    required: 'Required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address',
                    },
                  })}
                  fontSize={'sm'}
                  size={'sm'}
                  required
                  autoFocus
                />
              </FormControl>
              {errors?.email && (
                <Box fontSize={'md'} color={'red'}>
                  {' '}
                  {errors.email.message}{' '}
                </Box>
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

export default SlackConnectModal;
