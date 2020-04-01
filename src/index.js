import { makeExecutableSchema } from 'graphql-tools';
import express from 'express';
import graphqlMiddleware from 'express-graphql';
import cors from 'cors';
import webpush from 'web-push';
import resolvers from './lib/resolvers';
import typeDefs from './lib/schema.graphql';

require('dotenv').config();

const app = express();
const port = process.env.APP_PORT || 3000;
const isDev = process.env.NODE_ENV !== 'production';

const schema = makeExecutableSchema({ typeDefs, resolvers });

const pushKeyPub = process.env.PUSH_KEY_PUB;
const pushKey = process.env.PUSH_KEY;

webpush.setVapidDetails(
  'mailto:test@test.com',
  pushKeyPub,
  pushKey
);

app.use(cors());

app.use('/api', graphqlMiddleware({
  schema,
  rootValue: resolvers,
  graphiql: isDev
}));

app.post('/subscribe', (req, res) => {
  // Get pushSubscription object
  const subscription = req.body;

  // Send 201 - resource created
  res.status(201).json({});

  // Create payload
  const payload = JSON.stringify({ title: 'Push Test' });

  // Pass object into sendNotification
  webpush
    .sendNotification(subscription, payload)
    .catch(err => console.error(err));
});

app.listen(port, async () => {
  console.log(`Serve running at http://localhost:${port}/api`);
});
