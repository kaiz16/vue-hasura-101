import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  split,
} from "@apollo/client/core";
import { WebSocketLink } from "@apollo/client/link/ws";
import { setContext } from "apollo-link-context";
import { getMainDefinition } from "@apollo/client/utilities";
// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: "https://advanced-beetle-91.hasura.app/v1/graphql",
});

const headers = async () => {
  return {
    // "x-hasura-role": "anonymous",
  };
};

// Create a WebSocket link:
const wsLink = new WebSocketLink({
  uri: `wss://advanced-beetle-91.hasura.app/v1/graphql`,
  options: {
    reconnect: true,
  },
});

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

/*eslint-disable*/
// getting headers for http
const authLink = setContext(async (_) => {
  return {
    headers: await headers(),
  };
});
/*eslint-enable*/
// Cache implementation
const cache = new InMemoryCache();

// Create the apollo client
export const apolloClient = new ApolloClient({
  link: authLink.concat(link),
  cache,
});
