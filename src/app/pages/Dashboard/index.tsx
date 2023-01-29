import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import WelcomeToDistilled from 'app/components/WelcomeToDistilled';
import CreateNewPlanModal from 'app/components/CreateNewPlanModal';
import AppIcon from 'app/components/AppIcons';
import {
  Box,
  Divider,
  Flex,
  Grid,
  Heading,
  GridItem,
  Text,
  VStack,
  Image,
  LinkBox,
  LinkOverlay,
} from '@chakra-ui/react';
import NewWorkspaceMemberModal from './NewWorkspaceMemberModal';
import gallery from './icon/web-gallery.png';
import flack from './icon/flack.png';
import book from './icon/book.png';

export function Page() {
  const [showNewWorkspaceMemberModal, setShowNewWorkspaceMemberModal] =
    useState<boolean>(false);

  return (
    <>
      <Helmet>
        <title>Welcome</title>
        <meta name="description" content="Welcome" />
      </Helmet>
      <NewWorkspaceMemberModal
        isOpen={showNewWorkspaceMemberModal}
        onClose={() => setShowNewWorkspaceMemberModal(false)}
      />
      <Grid templateColumns="1fr" alignItems="center" justifyContent="center">
        <VStack align="center" justify="center">
          <WelcomeToDistilled />
        </VStack>
      </Grid>
      <Box w="100%" px={{ base: '2', xl: '20' }}>
        <Divider justifyContent="center" width="100%" />
        <Heading justifyContent="left" size="md" pl="6" mt="6">
          Get the most from Distilled
        </Heading>
      </Box>
      <Grid
        templateColumns="repeat(2, 1fr)"
        gap={6}
        alignItems="center"
        justifyContent="center"
        px={{ base: '2', xl: '20' }}
      >
        <GridItem w="100%" p={5}>
          <Flex display={{ base: 'block', xl: 'flex' }}>
            <Box
              p={2}
              display="flex"
              w="55px"
              h="55px"
              alignItems="center"
              justifyContent="center"
              bgColor="rgb(237,242,247)"
              borderRadius="15px"
            >
              <Image as={AppIcon['slack']} w="40px" h="40px" alt="slack" />
            </Box>
            <Box ml="10px">
              <Text as="b">Request an invite</Text>
              <Text>
                Join a shared Slack Connect channel with the Distilled team
              </Text>
            </Box>
          </Flex>
        </GridItem>
        <LinkBox onClick={() => setShowNewWorkspaceMemberModal(true)}>
          <GridItem _hover={{ bg: 'gray.50', borderRadius: '5' }} w="100%">
            <LinkOverlay href="#">
              <Flex display={{ base: 'block', xl: 'flex' }}>
                <Box
                  p={2}
                  display="flex"
                  h="60px"
                  w="60px"
                  alignItems="center"
                  justifyContent="center"
                  bgColor="rgb(237,242,247)"
                  borderRadius="15px"
                  _hover={{ bg: 'gray.50' }}
                >
                  <Image src={flack} w="30px" h="40px" alt="flack" />
                </Box>
                <Box ml="10px">
                  <Text as="b">Invite your teammates</Text>
                  <Text>
                    Invite your team to collaboratively build strategy
                  </Text>
                </Box>
              </Flex>
            </LinkOverlay>
          </GridItem>
        </LinkBox>
      </Grid>
      <Box w="100%" px={{ base: '2', xl: '20' }}>
        <Divider justifyContent="center" width="100%" />
        <Heading justifyContent="left" size="md" pl="6" mt="6">
          Learn about OKRs
        </Heading>
      </Box>
      <Grid
        templateColumns="repeat(2, 1fr)"
        gap={6}
        alignItems="center"
        justifyContent="center"
        px={{ base: '2', xl: '20' }}
      >
        <GridItem w="100%" py={5} pl={5}>
          <Flex display={{ base: 'block', xl: 'flex' }}>
            <Box
              p={2}
              display="flex"
              h="60px"
              w="60px"
              alignItems="center"
              justifyContent="center"
              bgColor="rgb(237,242,247)"
              borderRadius="15px"
            >
              <Image src={gallery} w="100px" h="100%" alt="gallery" />
            </Box>
            <Box ml="10px">
              <Text as="b">Gallery (Coming soon)</Text>
              <Text>Access over 500+ OKR resources and templates</Text>
            </Box>
          </Flex>
        </GridItem>
        <GridItem w="100%">
          <Flex display={{ base: 'block', xl: 'flex' }}>
            <Box
              p={2}
              display="flex"
              h="60px"
              w="60px"
              alignItems="center"
              justifyContent="center"
              bgColor="rgb(237,242,247)"
              borderRadius="15px"
            >
              <Image src={book} w="100%" h="100%" alt="book" />
            </Box>
            <Box ml="10px">
              <Text as="b">OKR Academy (Coming soon)</Text>
              <Text>
                Learn strategy development techniques from experts in various
                niche
              </Text>
            </Box>
          </Flex>
        </GridItem>
      </Grid>
    </>
  );
}
