import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Sidebar from 'app/components/Sidebar';
import { useIntercom } from 'react-use-intercom';
import { Outlet } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import { useQuery } from '@apollo/client';
import { CURRENT_USER } from 'app/lib/queries/User';
import { useReactiveVar } from '@apollo/client';
import GoalDrawer from 'app/components/Goals/GoalDrawer';
import { selectedDrawerConfig } from 'app/lib/cache';
import { motion } from 'framer-motion';
import Loader from 'app/components/Loader';

export function HomePage() {
  const { loading: userLoading } = useQuery(CURRENT_USER);
  const drawerConfig = useReactiveVar(selectedDrawerConfig);
  const autoBoot = useIntercom();

  useEffect(() => {}, [autoBoot]);

  if (userLoading) {
    return (
      <Box p={10}>
        <Loader size={10} />
      </Box>
    );
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
            goalId={drawerConfig.goalId}
            onClose={() =>
              selectedDrawerConfig({
                goalId: undefined,
                successCriteriaId: undefined,
              })
            }
          />
        </Box>
      </Sidebar>
    </>
  );
}
