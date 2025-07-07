import {
    ApolloClient,
    InMemoryCache,
    createHttpLink,
    from,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { graphqlApiUrl } from "../environments";

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem("token");

    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        },
    };
});

// --- Error Handling Link
const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
        for (const err of graphQLErrors) {
            if (
                err.message.toLowerCase().includes("unauthorized") ||
                err.message.toLowerCase().includes("invalid token")
            ) {

                localStorage.removeItem("token");
                window.location.href = "/login";
            }

            console.error(
                `[GraphQL error]: Message: ${err.message}, Location: ${err.locations}, Path: ${err.path}`
            );

        }
    }

    if (networkError) {
        console.error(`[Network error]: ${networkError}`);
    }
});

const httpLink = createHttpLink({
    uri: graphqlApiUrl,
});

const Client = new ApolloClient({
    link: from([errorLink, authLink, httpLink]),
    cache: new InMemoryCache(),
    defaultOptions: {
        watchQuery: {
            fetchPolicy: "cache-and-network",
            errorPolicy: "all",
        },
        query: {
            fetchPolicy: "network-only",
            errorPolicy: "all",
        },
        mutate: {
            errorPolicy: "all",
        },
    },
});

export default Client;
