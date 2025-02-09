/**
 * Asynchronously loads the component for HomePage
 */

import { lazyLoad } from 'utils/loadable';

export const IntegrationsPage = lazyLoad(
  () => import('./index'),
  module => module.IntegrationsPage,
);
