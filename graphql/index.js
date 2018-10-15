import Koa from 'koa';
import { ApolloServer } from 'apollo-server-koa';
import bodyParser from 'koa-bodyparser';
import schema from './schema';

const isProd = process.env.NODE_ENV === 'production';
const HOST = 'localhost';
const { PORT } = process.env;

const app = new Koa();

app.use(bodyParser());

app.use(async (ctx, next) => {
  await next();
})

const apolloServer = new ApolloServer({
  schema,
  introspection: true /* This should be false on prod, but it is a demo app */
});

apolloServer.applyMiddleware({ app });

if (isProd) {
  app.listen(PORT);
  console.log(
    `(${process.pid}) Graphql running at http://${HOST}:${PORT}`
  );
}

export default app;
