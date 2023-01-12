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

export function App() {
  const { i18n } = useTranslation();
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
    </BrowserRouter>
  );
}
