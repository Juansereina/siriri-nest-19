import { makeExecutableSchema } from 'graphql-tools';
import express from 'express';
import graphqlMiddleware from 'express-graphql';
import cors from 'cors';
import resolvers from './lib/resolvers';
import typeDefs from './lib/schema.graphql';

require('dotenv').config();

const app = express();
const port = process.env.APP_PORT || 3000;
const isDev = process.env.NODE_ENV !== 'production';

const schema = makeExecutableSchema({ typeDefs, resolvers });

app.use(cors());

app.use('/api', graphqlMiddleware({
  schema,
  rootValue: resolvers,
  graphiql: isDev
}));

app.listen(port, async () => {
  console.log(`Serve running at http://localhost:${port}/api`);
});
