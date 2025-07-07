import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query GetUsers {
    users {
      id
      first_name
      last_name
      mobile
      email
      is_active
    }
  }
`;

export const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      first_name
      last_name
      mobile
      email
      is_active
    }
  }
`;