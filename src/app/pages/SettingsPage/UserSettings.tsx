import React, { useState } from 'react';
import { VStack } from '@chakra-ui/react';
import { FormControl, FormLabel, Button, Box, Input } from '@chakra-ui/react';
import { CURRENT_USER } from 'app/lib/queries/User';
import { UPDATE_USER_MUTATION } from 'app/lib/mutations/User';
import Loader from 'app/components/Loader';
import { useQuery, useMutation } from '@apollo/client';
import { useToast } from '@chakra-ui/react';

type Form = {
  name: string;
  email: string;
};

const UserSettingsForm = (props: { data: Form }) => {
  const toast = useToast();
  const { data } = props;
  const [updateUserMutation, { loading }] = useMutation(UPDATE_USER_MUTATION);

  const [form, setForm] = useState<Form>({
    name: data.name || '',
    email: data.email,
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await updateUserMutation({
      variables: { name: form.name },
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
      <VStack w={'300px'} spacing={4} alignItems={'flex-start'} mt={4}>
        <FormControl>
          <FormLabel fontSize={'sm'}>Email address</FormLabel>
          <Input
            size={'sm'}
            disabled
            type="email"
            onChange={() => null}
            required={true}
            value={form.email}
          />
        </FormControl>
        <FormControl>
          <FormLabel fontSize={'sm'}>Name</FormLabel>
          <Input
            size={'sm'}
            type="text"
            value={form.name}
            required={true}
            onChange={e => setForm({ ...form, name: e.target.value })}
          />
        </FormControl>
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

const UserSettings = () => {
  const { data, loading } = useQuery(CURRENT_USER);

  if (loading) {
    return <Loader />;
  }

  const user = data.currentUser;
  return <UserSettingsForm data={user} />;
};

export default UserSettings;
