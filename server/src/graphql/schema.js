import { gql } from "apollo-server-express";

export default gql`
  type User {
    id: ID!
    first_name: String!
    last_name: String
    mobile: String!
    email: String
    password: String!
    is_active: Boolean!
    createdAt: String
    updatedAt: String
  }

  type AuthResponse {
    code: Int!
    message: String!
    data: AuthData
  }

  type Query {
    users: [User!]
    user(id: ID!): User
  }

  type AuthData {
    user: User
    token: String
  }

  type Mutation {
    createUser(
      first_name: String!
      last_name: String
      mobile: String!
      email: String
      password: String!
      is_active: Boolean
    ): User

    loginUser(mobile: String!, password: String!): AuthResponse

    updateUser(
      id: ID!
      first_name: String
      last_name: String
      mobile: String
      email: String
      password: String
      is_active: Boolean
    ): User

    deleteUser(id: ID!): String
  }
`;
