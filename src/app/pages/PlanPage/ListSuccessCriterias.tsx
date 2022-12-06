import React from 'react';
import { SuccessCriteria } from 'types';
import { VStack, Box } from '@chakra-ui/react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Text,
  Heading,
} from '@chakra-ui/react';

const ListSuccessCriterias = (props: {
  successCriterias: SuccessCriteria[];
}) => {
  const { successCriterias } = props;
  return (
    <VStack>
      {successCriterias.map(successCriteria => {
        return (
          <Card key={successCriteria.id}>
            <CardHeader>
              <Heading size="sm">{successCriteria.name}</Heading>
            </CardHeader>
            <CardBody>
              <Text>
                {successCriteria.name}, {successCriteria.description} View a
                summary of all your customers over the last month.
              </Text>
            </CardBody>
          </Card>
        );
      })}
    </VStack>
  );
};

export default ListSuccessCriterias;
