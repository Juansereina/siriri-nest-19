import { graphql, buildSchema } from 'graphql';

const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

const resolvers = {
  hello: () => 'Hello world :)'
}

graphql(schema, '{ hello }', resolvers).then(console.log);
