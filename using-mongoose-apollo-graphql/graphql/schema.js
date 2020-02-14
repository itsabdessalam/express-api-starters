const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    address: Address!
    phones: [Phone!]!
  }

  type Address {
    number: Int
    street: String
    zipCode: String!
    city: String!
  }

  input AddressInput {
    number: Int
    street: String
    zipCode: String!
    city: String!
  }

  input PhoneInput {
    label: String
    value: String!
  }

  type Phone {
    label: String
    value: String!
  }

  type Query {
    users: [User]
    user(id: ID!): User
  }

  type Mutation {
    addUser(
      firstName: String!
      lastName: String!
      phones: [PhoneInput!]!
      address: AddressInput!
    ): User
    updateUser(
      id: ID!
      firstName: String
      lastName: String
      phones: [PhoneInput!]
      address: AddressInput
    ): User
    deleteUser(id: ID!): User
  }
`;

module.exports = typeDefs;
