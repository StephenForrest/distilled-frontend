/**
 * Asynchronously loads the component for HomePage
 */

import { lazyLoad } from 'utils/loadable';

export const SignupPage = lazyLoad(
  () => import('./index'),
  module => module.Signup,
);
