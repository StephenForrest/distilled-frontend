import { gql } from '@apollo/client';

export const GET_WORKSPACE_DETAILS = gql`
  query getWorkspaceDetails {
    getWorkspaceDetails {
      id
      title
      domain
      personalDomain
      autoJoinFromDomain
      apiKey
      workspaceMembers {
        id
        user {
          firstName
          lastName
          id
          email
        }
        role
      }
    }
  }
`;
