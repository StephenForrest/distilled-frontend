import { InMemoryCache, ReactiveVar, makeVar } from '@apollo/client';
import tokenStorage from './tokenStorage';

const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Plan: {
      keyFields: ['id'],
    },
    Goal: {
      keyFields: ['id'],
    },
    SucccessCriteria: {
      keyFields: ['id'],
    },
  },
});

export const sessionIdVar: ReactiveVar<String | null> = makeVar<String | null>(
  tokenStorage.read(),
);

export const selectedDrawerConfig: ReactiveVar<{
  goalId: number | undefined;
  successCriteriaId?: string | undefined;
}> = makeVar<{ goalId: number | undefined }>({ goalId: undefined });

export const activeWorkspaceIdVar: ReactiveVar<string | null> = makeVar<
  string | null
>(localStorage.getItem('activeWorkspaceId'));

export const requestedRoute: ReactiveVar<String | null> =
  makeVar<String | null>('');

export default cache;
