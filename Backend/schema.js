// schema.js
const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Query {
        hello: String
        password(email: String!): String
    }

    type Mutation {
        login(email: String!, password: String!): AuthPayload
        register(email: String!, password: String!): String
    }

    type AuthPayload {
        token: String
    }
`;

module.exports = typeDefs;
