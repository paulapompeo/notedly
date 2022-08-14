const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
require('dotenv').config();
const models = require('./models');

const db = require('./db');

// Run the server on a port specified in our .env file or port 4000
const port = process.env.PORT || 4000;
// Store the DB_HOST value as a variable
const DB_HOST = process.env.DB_HOST;

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Mutation {
    newNote(content: String!): Note!
  }

  type Note {
    id: ID!
    content: String!
    author: String!
  }

  type Query {
    hello: String
    notes: [Note!]!
    note(id: ID!): Note
  }
`;

// Provide resolver functions for our schema fields
const resolvers = {
  Query: {
    hello: () => 'Hello baby!',
    notes: async () => {
      return await models.Note.find();
    },
    note: async (parent, args) => {
      return models.Note.findById(args.id);
    }
  },

  Mutation: {
    newNote: async (parent, args) => {
      return await models.Note.create({
        content: args.content,
        author: 'Paula Pompeo'
      });
    }
  }
};

const app = express();

// Connect to the database
db.connect(DB_HOST);

// Apollo Server setup
const server = new ApolloServer({ typeDefs, resolvers });

// Apply the Apollo GraphQL middleware and set the path to /api
server.applyMiddleware({ app, path: '/' });

// app.get('/', (req, res) => res.send('hello baby!!!!!'));
// app.listen(port, () => console.log(`Listening on port ${port}!`));

app.listen({ port }, () =>
  console.log(
    `GraphQL server running at http://localhost:${port}${server.graphqlPath}`
  )
);
