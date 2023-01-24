import { gql } from '@apollo/client';

// Define mutation
export const CREATE_WORKSPACE_MUTATION = gql`
  mutation createWorkspace($title: String!, $autoJoinFromDomain: Boolean!) {
    createWorkspace(title: $title, autoJoinFromDomain: $autoJoinFromDomain) {
      workspace {
        title
        autoJoinFromDomain
      }
    }
  }
`;

export const UPDATE_WORKSPACE_MUTATION = gql`
  mutation updateWorkspace($title: String!, $autoJoinFromDomain: Boolean!) {
    updateWorkspace(title: $title, autoJoinFromDomain: $autoJoinFromDomain) {
      workspace {
        title
        autoJoinFromDomain
        domain
      }
    }
  }
`;

export const CREATE_WORKSPACE_MEMBER = gql`
  mutation createWorkspaceMember($email: String!, $name: String!) {
    createWorkspaceMember(email: $email, name: $name) {
      workspaceMember {
        id
      }
    }
  }
`;

export const DELETE_WORKSPACE_MEMBER = gql`
  mutation deleteWorkspaceMember($email: String!) {
    deleteWorkspaceMember(email: $email) {
      workspaceMember {
        id
      }
    }
  }
`;

export const PASS_ONBOARDING_STEP = gql`
  mutation passOnboardingStep($name: StepNameEnum!) {
    passOnboardingStep(name: $name) {
      workspace {
        id
      }
    }
  }
`;
