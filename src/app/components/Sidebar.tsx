import React, { ReactNode } from 'react';
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
} from '@chakra-ui/react';
import { GrHome, GrTask, GrVulnerability, GrServices } from 'react-icons/gr';
import { RiLogoutBoxRLine } from 'react-icons/ri';
import { FcMenu } from 'react-icons/fc';
import { IconType } from 'react-icons';
import { ReactText } from 'react';
import { SIGNOUT_MUTATION } from 'app/lib/mutations/Auth';
import { useMutation, useReactiveVar } from '@apollo/client';
import { sessionIdVar } from 'app/lib/cache';
import { onSignOut } from 'app/lib/mutations/Auth';
import LogoFull from './LogoFull';
import { useNavigate } from 'react-router-dom';

interface LinkItemProps {
  name: string;
  icon: IconType;
  url: string;
}
const LinkItems: Array<LinkItemProps> = [
  { name: 'Dashboard', icon: GrHome, url: '/' },
  { name: 'Plans', icon: GrVulnerability, url: '/plans' },
  { name: 'Milestones', icon: GrTask, url: '/' },
  { name: 'Integrations', icon: GrServices, url: '/integrations' },
];

export default function SimpleSidebar({ children }: { children: ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box h="100%" bg={'#E6F6FD'}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'flex' }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} h={'100%'}>
        {children}
      </Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const navigate = useNavigate();
  const sessionId = useReactiveVar(sessionIdVar);

  const [logOut] = useMutation(SIGNOUT_MUTATION);
  return (
    <Box
      bg={'black'}
      borderRight="1px"
      borderRightColor={'black'}
      borderRadius={'0px 12px 12px 12px'}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      overflow="hidden"
      {...rest}
      flexDirection="column"
    >
      <Flex
        h="20"
        alignItems="center"
        mx="8"
        mb="2"
        justifyContent="space-between"
      >
        <LogoFull />
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map(link => (
        <NavItem
          key={link.name}
          icon={link.icon}
          textColor="white"
          onClick={() => navigate(link.url)}
        >
          {link.name}
        </NavItem>
      ))}
      <NavItem
        stickToBottom={true}
        key={'signout'}
        icon={RiLogoutBoxRLine}
        onClick={() => {
          logOut({ variables: { sessionId: sessionId! } });
          onSignOut();
        }}
      >
        Sign out
      </NavItem>
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
  stickToBottom?: boolean;
  onClick?: () => void;
}
const NavItem = ({
  icon,
  stickToBottom,
  onClick,
  children,
  ...rest
}: NavItemProps) => {
  return (
    <Link
      href="#"
      style={{
        textDecoration: 'none',
        font: 'body',
      }}
      _focus={{ boxShadow: 'none' }}
      mt={stickToBottom ? 'auto' : ''}
      onClick={typeof onClick !== 'undefined' ? onClick : () => null}
    >
      <Flex
        align="center"
        p="3"
        px="8"
        role="group"
        cursor="pointer"
        color="white"
        _hover={{
          bg: 'secondary.500',
          color: 'black',
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'black',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent="flex-start"
      {...rest}
    >
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FcMenu />}
      />

      <Text fontSize="2xl" ml="8" fontFamily="body" fontWeight="bold">
        <LogoFull />
      </Text>
    </Flex>
  );
};
