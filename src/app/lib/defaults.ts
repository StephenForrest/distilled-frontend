import uuid from 'react-uuid';

export const defaultChecklistTracking = endDateString => {
  return {
    id: uuid(),
    item: '',
    dueDate: new Date(endDateString).toISOString(),
    checked: false,
  };
};

export const defaultMilestoneTracking = endDateString => {
  return [
    {
      id: uuid(),
      item: 'Start',
      percent: 0,
      dueDate: new Date(endDateString).toISOString(),
      checked: false,
    },
    {
      id: uuid(),
      item: '',
      percent: 50,
      dueDate: new Date(endDateString).toISOString(),
      checked: false,
    },
    {
      id: uuid(),
      item: 'Finish',
      percent: 100,
      dueDate: new Date(endDateString).toISOString(),
      checked: false,
    },
  ];
};

export const addNewMilestoneItem = (endDateString, percent) => {
  return {
    id: uuid(),
    item: '',
    percent,
    dueDate: new Date(endDateString).toISOString(),
    checked: false,
  };
};
