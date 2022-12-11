import { gql } from '@apollo/client';

export const CREATE_SLACK_INTEGRATION = gql`
  mutation CreateSlackIntegration($code: String!) {
    createSlackIntegration(code: $code) {
      integration {
        id
        name
      }
      errors
    }
  }
`;
