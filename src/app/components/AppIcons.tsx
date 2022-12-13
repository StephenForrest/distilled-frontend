import React from 'react';
import { GrLineChart } from 'react-icons/gr';
import { BiTask } from 'react-icons/bi';
import { TbChecklist } from 'react-icons/tb';
import { GoMilestone } from 'react-icons/go';
import { FaSlackHash } from 'react-icons/fa';
import { FiTarget } from 'react-icons/fi';

const Icons = {
  goal: FiTarget,

  action: BiTask,
  measurement: GrLineChart,

  checklist: TbChecklist,
  milestone: GoMilestone,

  slack: FaSlackHash,
};

export default Icons;
