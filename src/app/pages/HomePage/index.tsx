import React from 'react';
import { Helmet } from 'react-helmet-async';
import Sidebar from 'app/components/Sidebar';
import { Outlet } from 'react-router-dom';
import { Center, Box } from '@chakra-ui/react';
import { useQuery } from '@apollo/client';
import { CURRENT_USER } from 'app/lib/queries/User';

export function HomePage() {
  const { loading: userLoading } = useQuery(CURRENT_USER);

  if (userLoading) {
    return <Center>Loading...</Center>;
  }

  return (
    <>
      <Helmet>
        <title>HomePage</title>
        <meta name="description" content="Well hello" />
      </Helmet>
      <Sidebar>
        <Box w={'100%'} background={'white'} h={'100%'} borderRadius={8}>
          <Outlet />
        </Box>
      </Sidebar>
    </>
  );
}
