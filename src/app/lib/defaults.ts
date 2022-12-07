import uuid from 'react-uuid';

export const defaultMilestoneTracking = endDateString => {
  return {
    id: uuid(),
    item: '',
    dueDate: new Date(endDateString).toISOString(),
  };
};
