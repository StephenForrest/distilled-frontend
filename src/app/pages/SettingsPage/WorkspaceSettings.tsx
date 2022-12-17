import React, { useState } from 'react';
import { HStack, VStack } from '@chakra-ui/react';
import {
  FormControl,
  FormLabel,
  Button,
  Box,
  Input,
  Switch,
} from '@chakra-ui/react';
import { CURRENT_USER } from 'app/lib/queries/User';
import { GET_WORKSPACE_DETAILS } from 'app/lib/queries/Workspace';
import { UPDATE_WORKSPACE_MUTATION } from 'app/lib/mutations/Workspace';
import Loader from 'app/components/Loader';
import { useQuery, useMutation } from '@apollo/client';
import { useToast } from '@chakra-ui/react';
import WorkspaceMembers from './WorkspaceMembers';

type Form = {
  title: string;
  domain: string;
  personalDomain?: boolean;
  autoJoinFromDomain: boolean;
};

const WorkspaceSettingsForm = (props: { data: Form }) => {
  const toast = useToast();
  const { data } = props;
  const [updateWorkspaceMutation, { loading }] = useMutation(
    UPDATE_WORKSPACE_MUTATION,
  );

  const [form, setForm] = useState<Form>({
    title: data.title || '',
    domain: data.domain,
    autoJoinFromDomain: data.autoJoinFromDomain,
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await updateWorkspaceMutation({
      variables: {
        title: form.title,
        autoJoinFromDomain: form.autoJoinFromDomain,
      },
      refetchQueries: [{ query: CURRENT_USER }],
    });
    toast({
      title: 'Updates saved',
      status: 'success',
      position: 'bottom-right',
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <VStack w={'100%'} spacing={6} alignItems={'flex-start'} mt={4}>
        <HStack w={'100%'} spacing={6}>
          <FormControl w={'300px'}>
            <FormLabel fontSize={'sm'}>Name</FormLabel>
            <Input
              size={'sm'}
              type="text"
              onChange={e => setForm({ ...form, title: e.target.value })}
              value={form.title}
            />
          </FormControl>
          {!data.personalDomain ? (
            <FormControl w={'300px'}>
              <FormLabel fontSize={'sm'}>Domain</FormLabel>
              <Input
                size={'sm'}
                type="text"
                onChange={e => null}
                value={form.domain || ''}
                disabled
              />
            </FormControl>
          ) : null}
        </HStack>

        {!data.personalDomain ? (
          <FormControl display="flex" alignItems="center" w={'500px'}>
            <Switch
              isChecked={form.autoJoinFromDomain}
              id="auto-join-from-domain"
              onChange={e =>
                setForm({ ...form, autoJoinFromDomain: e.target.checked })
              }
            />
            <FormLabel
              fontSize={'sm'}
              htmlFor="auto-join-from-domain"
              mb="0"
              ml={4}
            >
              Let people from same domain auto join your workspace?
            </FormLabel>
          </FormControl>
        ) : null}

        <Box marginTop={'24px !important'}>
          <Button
            size={'sm'}
            colorScheme="brand"
            type="submit"
            isLoading={loading}
          >
            Save
          </Button>
        </Box>
      </VStack>
    </form>
  );
};

const WorkspaceSettings = () => {
  const { data, loading } = useQuery(GET_WORKSPACE_DETAILS);

  if (loading) {
    return <Loader />;
  }

  const workspace = data?.getWorkspaceDetails;
  return (
    <VStack w={'100%'} alignItems={'flex-start'}>
      <WorkspaceSettingsForm data={workspace!} />
      <WorkspaceMembers data={workspace!.workspaceMembers} />
    </VStack>
  );
};

export default WorkspaceSettings;
