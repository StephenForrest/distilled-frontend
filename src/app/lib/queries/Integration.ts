import { gql } from '@apollo/client';

export const GET_INTEGRATIONS_BY_TYPE = gql`
  query getIntegrationsByType($integrationType: String!) {
    getIntegrationsByType(integrationType: $integrationType) {
      id
      name
    }
  }
`;

export const GET_INTEGRATION_DETAILS = gql`
  query getIntegration($id: String!) {
    getIntegration(id: $id) {
      id
      name
      integrationType
      settings {
        __typename
        ... on Slack {
          id
          channels
        }
      }
    }
  }
`;
