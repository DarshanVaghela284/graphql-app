import "./src/database/conn.js";
import express from "express";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import typeDefs from "./src/graphql/schema.js";
import resolvers from "./src/graphql/resolvers.js";
import { graphqlUploadExpress } from "graphql-upload";
import { ApolloServerPluginUsageReporting } from "apollo-server-core";
import { authContext } from "./src/utils/authContext.js";

const app = express();
const port = 8080;

app.use(cors());

function authenticate(req) {
  console.log(req);
  // Implement your authentication logic here
  // For example, check for a token in headers or cookies
  // const token = req.headers.authorization || req.cookies.token;
  // if (!token) {
  //   throw new Error("Authentication required");
  // }
  // Validate the token and set user context if needed
  // Example: req.user = validateToken(token);
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    return authContext(req);
  },
  // plugins: [ApolloServerPluginUsageReporting()],
  // apollo: {
  //   key:
  //     process.env.APOLLO_KEY ||
  //     "user:gh.d85dd260-f8d0-48b3-af81-5e8c3f641474:C4pqQrHxNYHQ5jzhAf0Olw",
  //   graphRef:
  //     process.env.APOLLO_GRAPH_REF ||
  //     "user:gh.d85dd260-f8d0-48b3-af81-5e8c3f641474:uECQ5l7sPa_Um09PEheVFQ",
  // },
});

app.use(express.urlencoded({ limit: "12mb", extended: true }));
app.use(graphqlUploadExpress());

const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  return res.status(status).json({
    status,
    message,
    type: err.type || "INTERNAL_SERVER_ERROR",
  });
};

app.use(errorHandler);

async function startServer() {
  try {
    await server.start();
    server.applyMiddleware({ app });

    console.log("Apollo Server is running", server.graphqlPath);

    app.listen(port, () =>
      console.log(
        `🚀 Server is up at http://localhost:${port + server.graphqlPath}`
      )
    );
  } catch (error) {
    console.error("Error starting the server:", error);
  }
}

startServer();
