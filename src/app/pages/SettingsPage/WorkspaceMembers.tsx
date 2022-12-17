import React, { useState } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Text,
  VStack,
  HStack,
  Box,
  Button,
  useToast,
} from '@chakra-ui/react';
import { DeleteIcon, AddIcon } from '@chakra-ui/icons';
import NewWorkspaceMemberModal from './NewWorkspaceMemberModal';
import { client } from 'index';
import { CURRENT_USER } from 'app/lib/queries/User';
import { GET_WORKSPACE_DETAILS } from 'app/lib/queries/Workspace';
import { DELETE_WORKSPACE_MEMBER } from 'app/lib/mutations/Workspace';
import { useMutation } from '@apollo/client';
import Loader from 'app/components/Loader';

type WorkspaceMember = {
  id: string;
  role: string;
  user: {
    id: number;
    email: string;
    name: string;
  };
};

const SmallText = (props: { text: string }) => (
  <Text fontSize="sm">{props.text}</Text>
);

const WorkspaceMembers = (props: { data: WorkspaceMember[] }) => {
  const toast = useToast();
  const [deletePending, setDeletePending] = useState<{
    [key: string]: boolean;
  }>({});
  const [deleteWorkspaceMember] = useMutation(DELETE_WORKSPACE_MEMBER);
  const [showNewWorkspaceMemberModal, setShowNewWorkspaceMemberModal] =
    useState<boolean>(false);

  const res = client.readQuery({
    query: CURRENT_USER,
  });

  const deleteMember = async (email: string) => {
    setDeletePending({ ...deletePending, [email]: true });
    await deleteWorkspaceMember({
      variables: { email: email },
      refetchQueries: [{ query: GET_WORKSPACE_DETAILS }],
    });
    setDeletePending({ ...deletePending, [email]: false });
    toast({ title: 'Member successfully deleted', position: 'top' });
  };

  return (
    <>
      <NewWorkspaceMemberModal
        isOpen={showNewWorkspaceMemberModal}
        onClose={() => setShowNewWorkspaceMemberModal(false)}
      />
      <VStack w={'100%'} alignItems={'flex-start'} spacing={4}>
        <HStack w={'100%'} alignItems={'flex-end'}>
          <Text fontSize={'md'} fontWeight={'semibold'} mt={8}>
            Workspace members
          </Text>
          <Button
            size={'xs'}
            ml={'auto !important'}
            leftIcon={<AddIcon boxSize={2} />}
            onClick={() => setShowNewWorkspaceMemberModal(true)}
          >
            Create Member
          </Button>
        </HStack>

        <Box mt={4} w={'100%'}>
          <TableContainer w={'100%'}>
            <Table variant="simple" size="sm">
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Email</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {props.data.map(wm => {
                  return (
                    <Tr key={wm.id}>
                      <Td>
                        <SmallText text={wm.user.name} />
                      </Td>
                      <Td>
                        <SmallText text={wm.user.email} />
                      </Td>
                      <Td>
                        {(() => {
                          if (deletePending[wm.user.email]) {
                            return <Loader size={4} />;
                          } else if (res.currentUser.email !== wm.user.email) {
                            return (
                              <Button
                                p={1}
                                variant="ghost"
                                _hover={{ bg: 'red.100' }}
                                h={'20px !important'}
                                width={'20px !important'}
                                minWidth={'40px !important'}
                                mt={'auto !important'}
                                onClick={() => deleteMember(wm.user.email)}
                              >
                                <DeleteIcon boxSize={3} />
                              </Button>
                            );
                          }
                        })()}
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </VStack>
    </>
  );
};

export default WorkspaceMembers;
