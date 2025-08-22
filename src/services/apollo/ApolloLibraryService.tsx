import { ApolloClient, HttpLink, InMemoryCache, from } from "@apollo/client";
import { authLink, errorLink } from "./ApolloService";
import { LIBRARY_GRAPHQL_BASE_URL } from "./GraphQLUrls";


const httpLink = new HttpLink({
  uri: LIBRARY_GRAPHQL_BASE_URL,
});

export const apolloLibraryClient = new ApolloClient({
  link: from([authLink, errorLink, httpLink]),
  cache: new InMemoryCache(),
});
