import React from 'react';
import {
  Button,
  Text,
  Image,
  HStack,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/hooks';
import PageHeader from 'app/components/PageHeader';

export const IntegrationsPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <PageHeader text="Integrations" />
      <HStack pl="5">
        <Box w="350px" bg="gray.100" h="200px" m="5" borderRadius={4}>
          <Image
            src="https://asset.brandfetch.io/idNMs_nMA0/idDC3DWoZ8.svg?updated=1667563370508"
            mx="auto"
            alt="Zapier logo"
            style={{ width: '200px', height: '200px' }}
            onClick={onOpen}
          />
        </Box>
      </HStack>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Integrate via Zapier</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <zapier-full-experience
              client-id="QRpZR4B484qiMIhBjreSnjECgKX1VudjON13vY7D"
              theme="light"
              app-search-bar-display="show"
            />
          </ModalBody>
          <ModalFooter>
            <Button bgColor="brand.500" mr={3} onClick={onClose}>
              Submit
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
