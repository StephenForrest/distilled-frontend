import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Center, Box, HStack, Button, useDisclosure } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { GET_PLAN } from 'app/lib/queries/Plan';
import { useQuery } from '@apollo/client';
import type { Plan } from 'types';
import { NotFoundPage } from 'app/components/NotFoundPage/index';
import Goals from 'app/pages/PlanPage/Goals';
import PageHeader from 'app/components/PageHeader';
import PlannerIcon from 'app/icons/Planner';
import Loader from 'app/components/Loader';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import DeletePlanDialog from './DeletePlanDialog';
import EditableName from './EditableName';

export function Page() {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [editPlanName, setEditPlanName] = useState<boolean>(false);

  const { uuid } = useParams();
  const { data, loading } = useQuery<{ getPlan: Plan }>(GET_PLAN, {
    variables: { uuid },
  });
  if (loading) {
    return (
      <Center>
        <Box p={10}>
          <Loader size={8} />
        </Box>
      </Center>
    );
  } else if (!data) {
    return (
      <>
        <Helmet>
          <title>No plan found</title>
          <meta name="description" content="Plans page" />
        </Helmet>
        <NotFoundPage />
      </>
    );
  } else {
    return (
      <>
        <Helmet>
          <title>Plan {data!.getPlan?.name}</title>
          <meta name="description" content="Plans page" />
        </Helmet>
        <Box p={6} pt={0}>
          <PageHeader>
            <HStack spacing={3}>
              <PlannerIcon boxSize={6} />
              <EditableName
                name={data!.getPlan?.name}
                editable={editPlanName}
                id={uuid!}
                onFinishEdit={() => setEditPlanName(false)}
              />
              <HStack
                spacing={2}
                color={'gray.300'}
                _hover={{ color: 'gray.500' }}
              >
                {!editPlanName && (
                  <Button
                    p={2}
                    variant="ghost"
                    _hover={{ bg: 'brand.50' }}
                    size={'xs'}
                    onClick={() => setEditPlanName(true)}
                  >
                    <EditIcon boxSize={4} />
                  </Button>
                )}
                <Button
                  p={2}
                  variant="ghost"
                  _hover={{ bg: 'brand.50' }}
                  size={'xs'}
                  onClick={onOpen}
                >
                  <DeleteIcon boxSize={4} />
                </Button>
                <DeletePlanDialog isOpen={isOpen} onClose={onClose} id={uuid} />
              </HStack>
            </HStack>
          </PageHeader>
          <Goals goals={data!.getPlan?.goals || []} />
        </Box>
      </>
    );
  }
}
