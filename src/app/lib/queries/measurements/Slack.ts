import { gql } from '@apollo/client';

export const GET_SLACK_ACTION_LOGS = gql`
  query getSlackActionLogs($measurementsSlackId: String!) {
    getSlackActionLogs(measurementsSlackId: $measurementsSlackId) {
      id
      metric
      value
      createdAt
    }
  }
`;
