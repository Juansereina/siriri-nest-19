import { buildSchema } from 'graphql';
import express from 'express';
import graphqlMiddleware from 'express-graphql';
import { Client } from 'pg';

require('dotenv').config();

const app = express();
const port = process.env.port || 3000;

const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

const rootValue = {
  hello: () => 'Hello world :)'
};

app.use('/api', graphqlMiddleware({
  schema,
  rootValue,
  graphiql: true
}));

const db = async () => {
  const client = new Client();
  await client.connect();
  const { rows } = await client.query('SELECT * FROM siriri');
  console.log(rows);
};

app.listen(port, async () => {
  await db();

  console.log(`Serve running at http://localhost:${port}/api`);
});
