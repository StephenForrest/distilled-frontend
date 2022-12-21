import React from 'react';
import { SuccessCriteria } from 'types';
import { Icon } from '@chakra-ui/react';
import AppIcon from 'app/components/AppIcons';

const SuccessCriteriaIcon = (props: { successCriteria: SuccessCriteria }) => {
  const { successCriteria } = props;
  if (successCriteria.successCriteriaType === 'action') {
    return (
      <Icon
        as={AppIcon['action']}
        boxSize={5}
        className="ListSuccessCriteriaActionIcon"
        mb={2}
      />
    );
  } else {
    return (
      <Icon
        as={AppIcon['measurement']}
        boxSize={5}
        className="ListSuccessCriteriaIcon"
        mb={2}
      />
    );
  }
};

export default SuccessCriteriaIcon;
