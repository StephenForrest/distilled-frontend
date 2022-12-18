import React from 'react';
import { Helmet } from 'react-helmet-async';
import Sidebar from 'app/components/Sidebar';
import { Outlet } from 'react-router-dom';
import { Center, Box } from '@chakra-ui/react';
import { useQuery } from '@apollo/client';
import { CURRENT_USER } from 'app/lib/queries/User';
import { useReactiveVar } from '@apollo/client';
import GoalDrawer from 'app/components/Goals/GoalDrawer';
import { selectedGoalVar } from 'app/lib/cache';
import { motion } from 'framer-motion';

export function HomePage() {
  const { loading: userLoading } = useQuery(CURRENT_USER);
  const selectedGoal = useReactiveVar(selectedGoalVar);

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
        <Box w={'100%'} h={'100%'} borderRadius={0} overflow={'auto'}>
          <motion.div
            initial="initial"
            animate="in"
            exit="out"
            style={{ height: '100%' }}
            variants={{
              initial: {
                opacity: 0,
              },
              in: {
                opacity: 1,
              },
              out: {
                opacity: 0,
              },
            }}
            transition={{
              duration: 0.3,
              type: 'tween',
            }}
          >
            <Outlet />
          </motion.div>
          <GoalDrawer
            goalId={selectedGoal}
            onClose={() => selectedGoalVar(undefined)}
          />
        </Box>
      </Sidebar>
    </>
  );
}
