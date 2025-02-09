import React from 'react';
import { Icon } from '@chakra-ui/react';

export const PlannerIcon = props => (
  <Icon viewBox="0 0 256 256" {...props}>
    <rect width={256} height={256} fill="none" />
    <circle
      cx={72}
      cy={184}
      r={28}
      fill="none"
      stroke="#000000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={24}
    />
    <line
      x1={40}
      y1={76}
      x2={80}
      y2={116}
      fill="none"
      stroke="#000000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={24}
    />
    <line
      x1={80}
      y1={76}
      x2={40}
      y2={116}
      fill="none"
      stroke="#000000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={24}
    />
    <line
      x1={176}
      y1={172}
      x2={216}
      y2={212}
      fill="none"
      stroke="#000000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={24}
    />
    <line
      x1={216}
      y1={172}
      x2={176}
      y2={212}
      fill="none"
      stroke="#000000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={24}
    />
    <polyline
      points="140 84 140 44 180 44"
      fill="none"
      stroke="#000000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={24}
    />
    <path
      d="M140,44l12,12c38.3,38.3,10.5,84-20,94.8"
      fill="none"
      stroke="#000000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={24}
    />
  </Icon>
);

export default PlannerIcon;
