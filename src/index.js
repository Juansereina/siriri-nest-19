import { graphql, buildSchema } from 'graphql';

const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

graphql(schema, '{ hello }').then(console.log);
