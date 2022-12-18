/**
 * Asynchronously loads the component for HomePage
 */

import { lazyLoad } from 'utils/loadable';

export const VerifyEmail = lazyLoad(
  () => import('./index'),
  module => module.VerifyEmail,
);
