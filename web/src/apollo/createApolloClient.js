import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';

export default function createApolloClient({ options = {}, link, initialState }) {
  if (!link) {
    throw Error('Please pass a network interface to be used on apollo client');
  }

  const cache = new InMemoryCache({
    dataIdFromObject: result => (result.id && result.__typename ? `${result.__typename}:${result.id}` : null),
    addTypename: true,
  });

  return new ApolloClient({
    link,
    cache: initialState ? cache.restore(initialState) : cache,
    ...options,
  });
}
