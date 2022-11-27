import { InMemoryCache, ReactiveVar, makeVar } from '@apollo/client';
import tokenStorage from './tokenStorage';

const cache: InMemoryCache = new InMemoryCache();

export const sessionIdVar: ReactiveVar<String | null> = makeVar<String | null>(
  tokenStorage.read(),
);

export const requestedRoute: ReactiveVar<String | null> =
  makeVar<String | null>('');

export default cache;
