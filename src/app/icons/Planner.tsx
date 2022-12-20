import React from 'react';
import { Icon } from '@chakra-ui/react';

const PlannerIcon = props => (
  <Icon viewBox="0 0 192 192" {...props}>
    <defs>
      <style>
        {
          '.plan-cls-1,.plan-cls-2{fill:none;stroke-miterlimit:10;stroke-width:12px;}.plan-cls-1{stroke:var(--chakra-colors-orange-300);}.plan-cls-2{stroke:var(--chakra-colors-orange-300);stroke-linecap:round;}'
        }
      </style>
    </defs>
    <rect
      className="plan-cls-1"
      x={47.11}
      y={18.64}
      width={110.28}
      height={154.72}
      rx={22.5}
    />
    <line className="plan-cls-2" x1={34.61} y1={54.33} x2={60.86} y2={54.33} />
    <line className="plan-cls-2" x1={34.61} y1={96} x2={60.86} y2={96} />
    <line
      className="plan-cls-2"
      x1={34.61}
      y1={137.67}
      x2={60.86}
      y2={137.67}
    />
    <line
      className="plan-cls-2"
      x1={134.33}
      y1={40.31}
      x2={134.33}
      y2={151.69}
    />
  </Icon>
);

export default PlannerIcon;
