import React, { useEffect } from 'react';
import { VStack, Box, Text } from '@chakra-ui/react';
import { getWindowLocationQueryVariable } from 'app/lib/utilities';
import { useMutation } from '@apollo/client';
import { VERIFY_EMAIL } from 'app/lib/mutations/Auth';
import Loader from 'app/components/Loader';
import { useNavigate } from 'react-router-dom';
import { CURRENT_USER } from 'app/lib/queries/User';

const token = getWindowLocationQueryVariable('token');

export function VerifyEmail() {
  const navigate = useNavigate();
  const [verifyEmail, { loading, error }] = useMutation(VERIFY_EMAIL);

  useEffect(() => {
    const fn = async () => {
      const res = await verifyEmail({
        variables: { token },
        refetchQueries: [CURRENT_USER],
        awaitRefetchQueries: true,
      });
      if (res.data.verifyEmail.success) {
        navigate('/');
      }
    };
    fn();
  }, []);

  return (
    <VStack w={'100%'} h={'100%'}>
      <Box margin={'auto !important'}>
        {loading ? (
          <VStack spacing={4}>
            <Loader />
            <Text fontSize={'md'}>Verifying your email address</Text>
          </VStack>
        ) : null}

        {error ? <Text fontSize={'md'}>{error.message}</Text> : null}
      </Box>
    </VStack>
  );
}
