import React, { Fragment } from 'react';
import styled from 'react-emotion';
import { object } from 'prop-types';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Forex from './routes/Forex';

const GlobalWrapper = styled('div')`
  width: 100%;
  min-height: 100vh;
`;

const App = ({ client }) => (
  <ApolloProvider client={client}>
    <GlobalWrapper>
      <Router>
        <Fragment>
          <Route path="/" component={Forex} />
        </Fragment>
      </Router>
    </GlobalWrapper>
  </ApolloProvider>
);

App.propTypes = {
  client: object.isRequired
};

export default App;
