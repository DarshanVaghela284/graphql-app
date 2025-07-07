import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const users = [
  {
    id: "1",
    name: "John Doe",
    email: "john@gmail.com",
    age: 30,
    isActive: true,
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@gmail.com",
    age: 25,
    isActive: false,
  },
  {
    id: "3",
    name: "Alice Johnson",
    email: "alice@gmail.com",
    age: 28,
    isActive: false,
  },
];

const typeDefs = `
   type Query {
     getUsers: [User]
     getUserById(id: ID!): User
   }

   type Mutation {
     createUser (name: String!, email: String!, age: Int, isActive: Boolean! ): User
   }

   type User {
     id: ID!
     name: String!
     email: String!
     age: Int
     isActive: Boolean!
    }
`;

const resolvers = {
  Query: {
    getUsers: () => {
      return users;
    },
    getUserById: (parent, args) => {
      const id = args.id;
      return users.find((user) => user.id === id);
    },
  },
  Mutation: {
    createUser: (parent, args) => {
      const { name, age, email, isActive = false } = args;
      const newUser = {
        id: (users.length + 1).toString(),
        name,
        age,
        email,
        isActive,
      };
      users.push(newUser);
    },
  },
};
const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, {
  listen: { port: 8080 },
});

console.log(`Server is up and running at: ${url}`);
