import { gql } from '@apollo/client';

export const CURRENT_USER = gql`
  query currentUser {
    currentUser {
      id
      email
      firstName
      lastName
      position
      company
      workspaces {
        id
        title
        domain
        autoJoinFromDomain
        currentOnboardingStep
      }
      emailVerified
      profilePic
    }
  }
`;
