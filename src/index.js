import { makeExecutableSchema } from 'graphql-tools';
import express from 'express';
import graphqlMiddleware from 'express-graphql';
import { readFileSync } from 'fs';
import { join } from 'path';
import resolvers from './lib/resolvers';

require('dotenv').config();

const app = express();
const port = process.env.APP_PORT || 3000;

const typeDefs = readFileSync(
  join(__dirname, 'lib', 'schema.graphql'),
  'utf-8'
);

const schema = makeExecutableSchema({ typeDefs, resolvers });

app.use('/api', graphqlMiddleware({
  schema,
  rootValue: resolvers,
  graphiql: true
}));

app.listen(port, async () => {
  console.log(`Serve running at http://localhost:${port}/api`);
});
