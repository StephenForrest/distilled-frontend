/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';

import { Helmet } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { GlobalStyle } from 'styles/global-styles';

import { useTranslation } from 'react-i18next';
import RoutesComponent from './components/Routes';
import WebSocketConnect from './components/WebSocketConnect';
import { CURRENT_USER } from 'app/lib/queries/User';
import { useQuery } from '@apollo/client';

export function App() {
  const { i18n } = useTranslation();
  const { loading, data } = useQuery(CURRENT_USER);
  return (
    <BrowserRouter>
      <Helmet
        titleTemplate="%s - Distilled"
        defaultTitle="Distilled"
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta name="description" content="Distilled" />
      </Helmet>

      <RoutesComponent />
      <GlobalStyle />
      {!loading && data?.currentUser && (
        <WebSocketConnect user={data.currentUser} />
      )}
    </BrowserRouter>
  );
}
