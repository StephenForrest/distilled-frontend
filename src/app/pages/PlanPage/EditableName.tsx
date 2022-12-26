import React, { useState } from 'react';
import { Text, Input, HStack, Button } from '@chakra-ui/react';
import { UPDATE_PLAN_MUTATION } from 'app/lib/mutations/Plan';
import { useMutation } from '@apollo/client';

const EditableInput = (props: {
  name: string;
  editable: boolean;
  id: string;
  onFinishEdit: () => void;
}) => {
  const [updatePlan, { loading }] = useMutation(UPDATE_PLAN_MUTATION);
  const [editableName, setEditableName] = useState<string>(props.name);
  const { name, editable, onFinishEdit } = props;

  const onSubmit = async e => {
    e.preventDefault();
    const res = await updatePlan({
      variables: {
        id: props.id,
        name: editableName,
      },
    });
    if (res.data.updatePlan) {
      onFinishEdit();
    }
  };

  if (!editable) {
    return (
      <Text fontSize={'2xl'} fontWeight={'bold'}>
        {name}
      </Text>
    );
  } else {
    return (
      <HStack as="form" spacing={3} onSubmit={onSubmit}>
        <Input
          value={editableName}
          size={'sm'}
          autoFocus={true}
          onChange={e => setEditableName(e.target.value)}
        />
        <Button
          size="sm"
          variant={'outline'}
          isLoading={loading}
          onClick={onSubmit}
        >
          Save
        </Button>
        <Button size="sm" variant={'ghost'} onClick={onFinishEdit}>
          Cancel
        </Button>
      </HStack>
    );
  }
};

export default EditableInput;
