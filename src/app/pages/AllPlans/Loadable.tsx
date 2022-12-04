/**
 * Asynchronously loads the component for HomePage
 */

import { lazyLoad } from 'utils/loadable';

export const AllPlans = lazyLoad(
  () => import('./index'),
  module => module.Page,
);
