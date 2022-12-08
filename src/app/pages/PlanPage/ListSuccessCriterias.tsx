import React from 'react';
import { SuccessCriteria } from 'types';
import { VStack } from '@chakra-ui/react';
import { Card, CardHeader, CardBody, Text, Heading } from '@chakra-ui/react';

const ListSuccessCriterias = (props: {
  successCriterias: SuccessCriteria[];
  onSuccessCriteriaSelect: (id: string) => void;
}) => {
  const { successCriterias } = props;
  return (
    <VStack w={'100%'} spacing={4}>
      {successCriterias.map(successCriteria => {
        return (
          <Card
            key={successCriteria.id}
            w={'100%'}
            variant={'outline'}
            onClick={() => props.onSuccessCriteriaSelect(successCriteria.id)}
          >
            <CardHeader>
              <Heading size="sm">{successCriteria.name}</Heading>
            </CardHeader>
            <CardBody>
              <Text>
                {successCriteria.name}, {successCriteria.description}
              </Text>
            </CardBody>
          </Card>
        );
      })}
    </VStack>
  );
};

export default ListSuccessCriterias;
