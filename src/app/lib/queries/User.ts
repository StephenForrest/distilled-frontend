import { gql } from '@apollo/client';

export const CURRENT_USER = gql`
  query currentUser {
    currentUser {
      id
      email
      name
      workspaces {
        id
        title
        domain
        autoJoinFromDomain
      }
      emailVerified
      profilePic
    }
  }
`;
