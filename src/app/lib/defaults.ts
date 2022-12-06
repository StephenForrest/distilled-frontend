import { formatDateForInput } from 'app/lib/utilities';
import uuid from 'react-uuid';

export const defaultMilestoneTracking = endDateString => ({
  id: uuid(),
  item: '',
  dueDate: formatDateForInput(new Date(new Date(endDateString).toString())),
});
