import React, { useState } from 'react';
import {VStack, Box, Select} from '@chakra-ui/react';
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
declare const window: any;

const CreateWorkspace = (props: { currentUser: CurrentUser }) => {
  const { currentUser } = props;
  const domain = currentUser.email.split('@')[1];
  const [createWorkspaceMutation, { loading }] = useMutation(
    CREATE_WORKSPACE_MUTATION,
  );
  const [workspaceName, setWorkspaceName] = useState<string>(domain);
  const [numOfEmployees, setNumOfEmployees] = useState<string>(domain);
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
    window.analytics.track('Workspace Created', {
      workspaceTitle: domain,
      createdBy: currentUser.email,
      numOfEmployees,
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
          <FormControl mt={4}>
            <FormLabel htmlFor="number-of-employees">
              Number of Employees
            </FormLabel>
            <Select
                value={numOfEmployees}
                isRequired
                id="number-of-employees"
                name="numOfEmployees"
                onChange={e => setNumOfEmployees(e.target.value)}
            >
              <option value="">Select the number of employees</option>
              <option value="1-10">1-10</option>
              <option value="11-50">11-50</option>
              <option value="51-200">51-200</option>
              <option value="201-500">201-500</option>
              <option value="500+">500+</option>
            </Select>
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
