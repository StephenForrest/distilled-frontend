import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  html,
  body,
  #root {
    height: 100%;
    width: 100%;
  }

  .full-width {
    width: 100%;
  }

  .MilestoneTimeline {
    position: relative;
  }

  .MilestoneTimeline::after {
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    left: -11px;
    background-color: white;
    border: 3px solid var(--chakra-colors-brand-200);
    top: 22px;
    border-radius: 50%;
    z-index: 1;
  }

  .MilestoneTimelineAdd {
    opacity: 0;
    transition: opacity .2s ease-in-out;
  }

  .MilestoneTimeline:hover .MilestoneTimelineAdd {
    opacity: 1;
  }

  .NavbarIcon path {
    stroke: var(--chakra-colors-gray-200);
  }

  .NavbarIcon:hover path {
    stroke: var(--chakra-colors-brand-200);
  }

  .ListSuccessCriteriaIcon path {
    stroke: var(--chakra-colors-gray-500);
  }

  .ListSuccessCriteriaActionIcon {
    color: var(--chakra-colors-gray-500);
  }
`;
