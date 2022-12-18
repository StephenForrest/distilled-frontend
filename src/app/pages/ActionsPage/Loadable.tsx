/**
 * Asynchronously loads the component for HomePage
 */

import { lazyLoad } from 'utils/loadable';

export const ActionsPage = lazyLoad(
  () => import('./index'),
  module => module.ActionPage,
);
