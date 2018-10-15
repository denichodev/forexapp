import http from 'http';

import app from './index';

let currentApp = app.callback();
const server = http.createServer(currentApp);
const host = 'localhost'
const port = process.env.PORT;

server.listen(port, err => {
  if (err) {
    console.error(err);
  } else {
    console.log(`GraphQL server, running at http://${host}:${port} env:${process.env.NODE_ENV}`);
  }
});

if (module.hot) {
  module.hot.accept('./index', () => {
    server.removeListener('request', currentApp);
    currentApp = app.callback();
    server.on('request', currentApp);
  });
}
