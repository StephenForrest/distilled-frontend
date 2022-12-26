import React from 'react';
import {
  Box,
  HStack,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Button,
  Icon,
  Text,
  MenuOptionGroup,
  MenuItemOption,
} from '@chakra-ui/react';
import { useQuery, useMutation, useReactiveVar } from '@apollo/client';
import { CURRENT_USER } from 'app/lib/queries/User';
import { RiLogoutBoxRLine } from 'react-icons/ri';
import { SIGNOUT_MUTATION } from 'app/lib/mutations/Auth';
import { onSignOut } from 'app/lib/mutations/Auth';
import { sessionIdVar, activeWorkspaceIdVar } from 'app/lib/cache';
import { useNavigate } from 'react-router-dom';

const NavHeader = () => {
  const [logOut] = useMutation(SIGNOUT_MUTATION);
  const { data } = useQuery(CURRENT_USER);
  const sessionId = useReactiveVar(sessionIdVar);
  const activeWorkspaceId = useReactiveVar(activeWorkspaceIdVar);
  const navigate = useNavigate();
  return (
    <Box bg="white" pl={8} pr={8} pt={4} pb={4}>
      <HStack>
        <Box id={'Header'}></Box>
        <Box marginLeft={'auto !important'}>
          {(() => {
            if (data?.currentUser) {
              return (
                <Menu>
                  <MenuButton
                    as={Button}
                    rounded={'full'}
                    variant={'link'}
                    cursor={'pointer'}
                    minW={0}
                  >
                    <Avatar
                      name={data.currentUser.name}
                      size={'sm'}
                      src={data.currentUser.profilePic || undefined}
                      referrerPolicy={'no-referrer'}
                    />
                  </MenuButton>

                  <MenuList fontSize={'sm'}>
                    <MenuOptionGroup
                      defaultValue={`${activeWorkspaceId}`}
                      title="Workspace"
                    >
                      {data.currentUser.workspaces.map(workspace => {
                        return (
                          <MenuItemOption
                            value={workspace.id}
                            key={workspace.id}
                          >
                            {workspace.title}
                          </MenuItemOption>
                        );
                      })}
                    </MenuOptionGroup>
                    <MenuDivider />
                    <MenuItem onClick={() => navigate('/settings')}>
                      Settings
                    </MenuItem>
                    <MenuDivider />
                    <MenuItem
                      onClick={() => {
                        logOut({ variables: { sessionId: sessionId! } });
                        onSignOut();
                      }}
                    >
                      <HStack>
                        <Icon
                          boxSize={3.5}
                          color={'gray.500'}
                          className="NavbarIcon"
                          as={RiLogoutBoxRLine}
                        />
                        <Text fontSize={'sm'}>Sign out</Text>
                      </HStack>
                    </MenuItem>
                  </MenuList>
                </Menu>
              );
            } else {
              return null;
            }
          })()}
        </Box>
      </HStack>
    </Box>
  );
};

export default NavHeader;
