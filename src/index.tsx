/**
 * index.tsx
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import * as React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import { ApolloClient, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import tokenStorage from 'app/lib/tokenStorage';
import cache from 'app/lib/cache';
import { onSignOut } from 'app/lib/mutations/Auth';
import theme from './theme';

// Use consistent styling
import 'sanitize.css/sanitize.css';

// Import root app
import { App } from 'app';

import { HelmetProvider } from 'react-helmet-async';

import reportWebVitals from 'reportWebVitals';

// Initialize languages
import './locales/i18n';
import { onError } from '@apollo/client/link/error';

// Log any GraphQL errors or network error that occurred
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) => {
      if (message === 'Authentication expired') {
        onSignOut();
      }
    });
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const MOUNT_NODE = document.getElementById('root') as HTMLElement;

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = tokenStorage.read();
  // return the headers to the context so httpLink can read them

  if (typeof token === 'undefined') {
    return { headers: { ...headers } };
  } else {
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  }
});

const link = createHttpLink({
  uri: `${process.env.REACT_APP_API_ENDPOINT}/execute`,
});

export const client = new ApolloClient({
  cache,
  link: authLink.concat(errorLink).concat(link),
});

ReactDOMClient.createRoot(MOUNT_NODE!).render(
  <ApolloProvider client={client}>
    <HelmetProvider>
      <React.StrictMode>
        <ChakraProvider theme={theme}>
          <App />
        </ChakraProvider>
      </React.StrictMode>
    </HelmetProvider>
  </ApolloProvider>,
);

// Hot reloadable translation json files
if (module.hot) {
  module.hot.accept(['./locales/i18n'], () => {
    // No need to render the App again because i18next works with the hooks
  });
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
