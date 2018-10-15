import React from 'react';
import { render } from 'react-dom';
import './injectGlobalStyles';
import createApolloClient from './apollo/createApolloClient';
import createApolloLink from './apollo/createApolloLink';
import App from './App';

const isProd = process.env.NODE_ENV === 'production';

const client = createApolloClient({
  ssrMode: true,
  options: {
    connectToDevTools: !isProd,
    queryDeduplication: true
  },
  link: createApolloLink({
    debug: !isProd,
    retry: {
      initialDelay: 3000,
      maxAttempts: 5
    }
  }),
  initialState: window.__cache
});

const props = {
  client,
};
const root = document.getElementById('root');

render(<App {...props} />, root);
