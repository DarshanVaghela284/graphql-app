import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation createUser ($first_name: String!, $last_name: String!, $mobile: String!, $email: String!, $password: String!, $is_active: Boolean){
     createUser (first_name: $first_name, last_name: $last_name, mobile: $mobile, email: $email, password: $password, is_active: $is_active) {
        first_name
        last_name
        email
        mobile
        is_active
        password
     }
  }
`

export const UPDATE_USER = gql`
  mutation UpdateUser ($id: ID!, $first_name: String, $last_name: String, $mobile: String, $email: String, $is_active: Boolean){
     updateUser (id: $id, first_name: $first_name, last_name: $last_name, mobile: $mobile, email: $email, is_active: $is_active) {
        id
        first_name
        last_name
        email
        mobile
        is_active
     }
  }
`

export const DELETE_USER = gql`
  mutation DeleteUser ($id: ID!){
   deleteUser(id: $id)
  }
`

export const LOGIN_USER = gql`
  mutation LoginUser($mobile: String!, $password: String!) {
    loginUser(mobile: $mobile, password: $password) {
      code
      message
      data {
        user {
          id
          first_name
          email
          mobile
        } 
        token
      }
  }
}`