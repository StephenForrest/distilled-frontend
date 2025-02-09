import tokenStorage from '../tokenStorage';
import { sessionIdVar } from '../cache';
import { gql } from '@apollo/client';
import { client } from 'index';

// Define mutation
export const SIGNOUT_MUTATION = gql`
  mutation Signout($sessionId: String!) {
    signOut(sessionId: $sessionId) {
      sessionId
    }
  }
`;

export const CREATE_AUTH = gql`
  mutation CreateAuth($email: String!, $password: String!) {
    createAuth(email: $email, password: $password) {
      sessionId
    }
  }
`;

export const SIGNUP = gql`
  mutation SignUp($email: String!, $password: String!, $firstName: String!, $lastName: String!, $company: String!, $position: String!) {
    signUp(email: $email, password: $password, firstName: $firstName, lastName: $lastName, company: $company, position: $position) {
      sessionId
    }
  }
`;

export const VERIFY_EMAIL = gql`
  mutation VerifyEmail($token: String!) {
    verifyEmail(token: $token) {
      success
    }
  }
`;

export const onSignIn = (sessionId: string) => {
  tokenStorage.write(sessionId);
  sessionIdVar(sessionId);
};

export const onSignOut = () => {
  client.resetStore();
  tokenStorage.delete();
  localStorage.removeItem('activeWorkspaceId');
  sessionIdVar(null);
};
