import tokenStorage from '../tokenStorage';
import { sessionIdVar } from '../cache';
import { gql } from '@apollo/client';

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
  mutation Signup($email: String!, $password: String!, $name: String!) {
    signUp(email: $email, password: $password, name: $name) {
      sessionId
    }
  }
`;

export const onSignIn = (sessionId: string) => {
  tokenStorage.write(sessionId);
  sessionIdVar(sessionId);
};

export const onSignOut = () => {
  tokenStorage.delete();
  sessionIdVar(null);
};
