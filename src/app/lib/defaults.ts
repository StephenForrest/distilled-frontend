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
      item: 'Start',
      percent: 0,
      dueDate: new Date(endDateString).toISOString(),
      checked: false,
    },
    {
      item: '',
      percent: 50,
      dueDate: new Date(endDateString).toISOString(),
      checked: false,
    },
    {
      item: 'Finish',
      percent: 100,
      dueDate: new Date(endDateString).toISOString(),
      checked: false,
    },
  ];
};

export const addNewMilestoneItem = (endDateString, percent) => {
  return {
    item: '',
    percent,
    dueDate: new Date(endDateString).toISOString(),
    checked: false,
  };
};
