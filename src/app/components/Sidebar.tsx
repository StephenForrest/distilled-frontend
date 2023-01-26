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
import { RiLogoutBoxRLine } from 'react-icons/ri';
import { FcMenu } from 'react-icons/fc';
import { IconType } from 'react-icons';
import { ReactText } from 'react';
import { SIGNOUT_MUTATION } from 'app/lib/mutations/Auth';
import { useMutation, useReactiveVar } from '@apollo/client';
import { sessionIdVar } from 'app/lib/cache';
import { onSignOut } from 'app/lib/mutations/Auth';
import LogoFullBlack from './LogoFull';
import { useNavigate } from 'react-router-dom';
import NavHeader from 'app/components/NavHeader';
import AppIcons from 'app/components/AppIcons';
interface LinkItemProps {
  name: string;
  icon: IconType;
  url: string;
}
const LinkItems: Array<LinkItemProps> = [
  { name: 'Welcome', icon: AppIcons['waving'], url: '/' },
  { name: 'Plans', icon: AppIcons['plan'], url: '/plans' },
  { name: 'Tasks', icon: AppIcons['action'], url: '/tasks' },
];

export default function SimpleSidebar({ children }: { children: ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box h="100%">
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
        <NavHeader />
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
      bg={'gray.50'}
      borderRadius={'0px 12px 0px 0px'}
      border="2px"
      borderColor="gray.200"
      boxShadow="lg"
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
        <LogoFullBlack />
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map(link => (
        <NavItem
          key={link.name}
          icon={link.icon}
          textColor="gray.600"
          fontSize="md"
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
        textDecoration: 'black',
        font: 'body',
      }}
      _focus={{ boxShadow: 'lg' }}
      mt={stickToBottom ? 'auto' : ''}
      onClick={typeof onClick !== 'undefined' ? onClick : () => null}
    >
      <Flex
        align="center"
        p="3"
        px="8"
        fontWeight="medium"
        role="group"
        cursor="pointer"
        color="gray.600"
        borderRadius={'8px 8px 8px 8px'}
        _hover={{
          bg: 'brand.500',
          color: 'white',
          mr: '4',
          ml: '4',
          fontWeight: 'medium',
        }}
        {...rest}
      >
        {icon && <Icon mr="4" boxSize="6" as={icon} />}
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
        <LogoFullBlack />
      </Text>
    </Flex>
  );
};
