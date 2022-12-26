import React, { useState } from 'react';
import { Text, Input, HStack, Button } from '@chakra-ui/react';
import { UPDATE_GOAL_MUTATION } from 'app/lib/mutations/Plan';
import { useMutation } from '@apollo/client';

const EditableInput = (props: {
  title: string;
  editable: boolean;
  id: number;
  onFinishEdit: () => void;
}) => {
  const [updateGoal, { loading }] = useMutation(UPDATE_GOAL_MUTATION);
  const [editableName, setEditableName] = useState<string>(props.title);
  const { title, editable, onFinishEdit } = props;

  const onSubmit = async e => {
    e.preventDefault();
    const res = await updateGoal({
      variables: {
        id: props.id,
        title: editableName,
      },
    });
    if (res.data.updateGoal) {
      onFinishEdit();
    }
  };

  if (!editable) {
    return <Text>{title}</Text>;
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
