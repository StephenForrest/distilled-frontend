import React, { useState } from 'react';
import { VStack, Box } from '@chakra-ui/react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Switch,
} from '@chakra-ui/react';
import { CurrentUser } from 'types';
import { CREATE_WORKSPACE_MUTATION } from 'app/lib/mutations/Workspace';
import { useMutation } from '@apollo/client';
import { CURRENT_USER } from 'app/lib/queries/User';

const CreateWorkspace = (props: { currentUser: CurrentUser }) => {
  const { currentUser } = props;
  const domain = currentUser.email.split('@')[1];
  const [createWorkspaceMutation, { loading }] = useMutation(
    CREATE_WORKSPACE_MUTATION,
  );
  const [workspaceName, setWorkspaceName] = useState<string>(domain);
  const [autoJoinWorkspace, setAutoJoinWorkspace] = useState<boolean>(true);
  const onSubmit = async e => {
    e.preventDefault();
    await createWorkspaceMutation({
      variables: {
        title: workspaceName,
        autoJoinFromDomain: autoJoinWorkspace,
      },
      refetchQueries: [CURRENT_USER],
      awaitRefetchQueries: true,
    });
  };

  return (
    <VStack w={'100%'} h={'100%'}>
      <Box margin={'auto !important'} w={'100%'} maxW={'400px'}>
        <VStack as="form" onSubmit={onSubmit} spacing={8}>
          <FormControl>
            <FormLabel>Workspace name</FormLabel>
            <Input
              type="text"
              autoFocus
              value={workspaceName}
              onChange={e => setWorkspaceName(e.target.value)}
            />
          </FormControl>
          <FormControl display="flex" alignItems="center">
            <Switch
              isChecked={autoJoinWorkspace}
              id="auto-join-from-domain"
              onChange={e => setAutoJoinWorkspace(e.target.checked)}
            />
            <FormLabel
              fontSize={'sm'}
              htmlFor="auto-join-from-domain"
              mb="0"
              ml={4}
            >
              Let people signing up from <strong>{domain}</strong> auto join
              your workspace?
            </FormLabel>
          </FormControl>
          <Button
            colorScheme="brand"
            type="submit"
            size={'md'}
            w={'100%'}
            isLoading={loading}
          >
            Create workspace
          </Button>
        </VStack>
      </Box>
    </VStack>
  );
};

export default CreateWorkspace;
