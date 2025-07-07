import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ApolloProvider } from "@apollo/client";
import Client from "./client/apolloClient.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={Client}>
      <App />
    </ApolloProvider>
  </StrictMode>
);
