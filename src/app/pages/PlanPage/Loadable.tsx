/**
 * Asynchronously loads the component for HomePage
 */

import { lazyLoad } from 'utils/loadable';

export const PlanPage = lazyLoad(
  () => import('./index'),
  module => module.Page,
);
