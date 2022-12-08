import uuid from 'react-uuid';

export const defaultChecklistTracking = endDateString => {
  return {
    id: uuid(),
    item: '',
    dueDate: new Date(endDateString).toISOString(),
    checked: false,
  };
};
