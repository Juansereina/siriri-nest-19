import { graphql, buildSchema } from 'graphql';
import express from 'express';
import graphqlMiddleware from 'express-graphql';

const app = express();
const port = process.env.port || 3000;

const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

const rootValue = {
  hello: () => 'Hello world :)'
}

app.use('/api', graphqlMiddleware({
  schema,
  rootValue,
  graphiql: true
}));

app.listen(port, () => console.log(`Serve running at http://localhost:${port}/api`));
