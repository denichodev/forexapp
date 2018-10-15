import fetch from 'isomorphic-fetch';
import { ApolloLink } from 'apollo-link';
import { BatchHttpLink } from 'apollo-link-batch-http';
import { RetryLink } from 'apollo-link-retry';
import { get } from 'lodash';

export default function createLink({
  debug = false,
  headers = {},
  retry = {
    initialDelay: 500,
    maxAttempts: 3,
  },
} = {}) {
  const retryLink = new RetryLink({
    delay: {
      initial: retry.initialDelay,
      max: Infinity,
      jitter: true,
    },
    attempts: {
      max: retry.maxAttempts,
      retryIf: (error, { query }) => !!error && /^query$/i.test(get(query, 'definitions[0].operation')),
    },
  });

  const consoleLink = new ApolloLink((operation, forward) => {
    operation.setContext({ start: new Date() });
    console.groupCollapsed(`Starting request for ${operation.operationName}`);
    console.log('variables', operation.variables);
    console.groupEnd();

    return forward(operation).map(data => {
      const time = new Date() - operation.getContext().start;

      console.groupCollapsed(`End request for ${operation.operationName} in ${time}ms`);
      console.log('data', data);
      console.groupEnd();

      return data;
    });
  });

  const customFetch = (uri, options) => {
    return fetch(process.env.NODE_ENV === 'development' ? 'http://localhost:3030/graphql' : '/graphql', {
      ...options,
      headers: {
        ...headers,
        'content-type': 'application/json',
      }
    });
  };

  const requestLink = new BatchHttpLink({
    fetch: customFetch,
  });

  const links = [retryLink, debug ? consoleLink : null, requestLink].filter(l => l);

  return ApolloLink.from(links);
}
