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
import {
  FcHome,
  FcPlanner,
  FcFlowChart,
  FcServices,
  FcMenu,
} from 'react-icons/fc';
import { RiLogoutBoxRLine } from 'react-icons/ri';
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
  { name: 'Dashboard', icon: FcHome, url: '/' },
  { name: 'Plans', icon: FcPlanner, url: '/plans' },
  { name: 'Milestones', icon: FcFlowChart, url: '/' },
  { name: 'Integrations', icon: FcServices, url: '/' },
];

export default function SimpleSidebar({ children }: { children: ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box borderRightRadius="4" boxShadow="dark-lg" h="100%" bg={'brand.500'}>
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
      bg={'brand.500'}
      borderRight="1px"
      borderRightColor={'brand.500'}
      borderRightRadius="4"
      boxShadow="dark-lg"
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
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
      style={{ textDecoration: 'none', color: 'white' }}
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
        _hover={{
          bg: 'brand.100',
          color: 'white',
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
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

      <Text fontSize="2xl" ml="8" fontFamily="monospace" fontWeight="bold">
        <LogoFull />
      </Text>
    </Flex>
  );
};
